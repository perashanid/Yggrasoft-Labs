import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogCard } from './BlogCard';
import { SkeletonGrid } from '../shared/SkeletonLoader';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  tags: string[];
  publishedAt: string;
  views: number;
}

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 400;
      
      if (direction === 'left') {
        // If at the start, loop to the end
        if (container.scrollLeft <= 0) {
          container.scrollTo({
            left: container.scrollWidth - container.clientWidth,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            left: container.scrollLeft - scrollAmount,
            behavior: 'smooth'
          });
        }
      } else {
        // If at the end, loop to the start
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        setShowScrollButtons(
          scrollContainerRef.current.scrollWidth > scrollContainerRef.current.clientWidth
        );
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [blogs]);

  useEffect(() => {
    fetchBlogs();
  }, [selectedTag, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedTag) params.append('tag', selectedTag);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await axios.get(`/api/blogs?${params.toString()}`);
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags))
  );

  return (
    <section ref={ref} className="relative py-20 px-4 overflow-hidden" id="blog">
      {/* Subtle atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e]/20 via-[#0f1419]/10 to-[#1a1f2e]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(140,114,49,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Latest Insights
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our thoughts on technology, development, and innovation
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background-secondary text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-accent-primary text-white'
                    : 'bg-background-secondary text-text-secondary hover:bg-accent-primary/20'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-accent-primary text-white'
                      : 'bg-background-secondary text-text-secondary hover:bg-accent-primary/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Blog Grid with Horizontal Scroll */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No articles found</p>
          </div>
        ) : (
          <div className="relative">
            {/* Left Arrow - Minimal */}
            {showScrollButtons && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-gold/60 hover:text-gold transition-colors hidden md:block"
                aria-label="Scroll left"
              >
                <FaChevronLeft size={32} />
              </button>
            )}

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {blogs.map((blog, index) => (
                <div key={blog._id} className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                  <BlogCard blog={blog} index={index} />
                </div>
              ))}
            </div>

            {/* Right Arrow - Minimal */}
            {showScrollButtons && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-gold/60 hover:text-gold transition-colors hidden md:block"
                aria-label="Scroll right"
              >
                <FaChevronRight size={32} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
