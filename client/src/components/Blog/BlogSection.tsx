import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BlogCard } from './BlogCard';
import { SkeletonGrid } from '../shared/SkeletonLoader';
import { FaSearch } from 'react-icons/fa';
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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

        {/* Blog Grid */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
