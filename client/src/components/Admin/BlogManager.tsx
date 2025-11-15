import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  isPublished?: boolean;
  publishedAt?: string;
}

export const BlogManager = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/blogs', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const title = formData.get('title') as string;
    const blogData: Blog = {
      title,
      slug: formData.get('slug') as string || generateSlug(title),
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      coverImage: formData.get('coverImage') as string,
      author: formData.get('author') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
      isPublished: formData.get('isPublished') === 'on',
    };

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      };
      
      if (editingBlog?._id) {
        await axios.put(`/api/blogs/${editingBlog._id}`, blogData, config);
      } else {
        await axios.post('/api/blogs', blogData, config);
      }
      fetchBlogs();
      setShowForm(false);
      setEditingBlog(null);
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/blogs/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-12 w-12 border-4 border-[#D4AF37] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#D4AF37] font-heading">Manage Blogs</h2>
          <p className="text-[#D4AF37]/70 mt-1">Create and publish blog posts</p>
        </div>
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold shadow-lg hover:bg-[#D4AF37]/90 transition-all"
          >
            <FaPlus /> Add Blog Post
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1a1f2e] backdrop-blur-xl rounded-xl p-6 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl font-bold text-[#D4AF37] mb-4">
              {editingBlog ? 'Edit Blog Post' : 'New Blog Post'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Title *</label>
                  <input
                    name="title"
                    defaultValue={editingBlog?.title}
                    required
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Slug</label>
                  <input
                    name="slug"
                    defaultValue={editingBlog?.slug}
                    placeholder="auto-generated-from-title"
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Excerpt *</label>
                <textarea
                  name="excerpt"
                  defaultValue={editingBlog?.excerpt}
                  required
                  rows={2}
                  placeholder="Brief summary"
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Content *</label>
                <textarea
                  name="content"
                  defaultValue={editingBlog?.content}
                  required
                  rows={8}
                  placeholder="Full content"
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Cover Image URL</label>
                  <input
                    name="coverImage"
                    defaultValue={editingBlog?.coverImage}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Author *</label>
                  <input
                    name="author"
                    defaultValue={editingBlog?.author || 'Yggrasoft Labs'}
                    required
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Tags (comma-separated) *</label>
                <input
                  name="tags"
                  defaultValue={editingBlog?.tags?.join(', ')}
                  required
                  placeholder="AI, Technology"
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#D4AF37]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={editingBlog?.isPublished ?? true}
                    className="w-4 h-4 rounded border-[#D4AF37]/20 bg-[#0a0e1a] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  Published
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-[#D4AF37] text-[#0a0e1a] rounded-lg font-semibold hover:bg-[#D4AF37]/90 transition-colors"
                >
                  <FaSave /> Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1f2e] backdrop-blur-xl rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
          >
            {blog.coverImage && (
              <img src={blog.coverImage} alt={blog.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-[#D4AF37] line-clamp-1">{blog.title}</h3>
                {blog.isPublished && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full whitespace-nowrap">Published</span>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags?.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-[#20B2AA]/20 text-[#20B2AA] text-xs rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#20B2AA]/20 text-[#20B2AA] rounded-lg hover:bg-[#20B2AA]/30 transition-colors text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id!)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No blog posts yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
};
