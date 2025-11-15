import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Review {
  _id?: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  review: string;
  avatar?: string;
  projectId?: string;
  isActive?: boolean;
  order?: number;
}

export const ReviewManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/reviews', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const reviewData: Review = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      rating: parseInt(formData.get('rating') as string),
      review: formData.get('review') as string,
      avatar: formData.get('avatar') as string,
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      };
      
      if (editingReview?._id) {
        await axios.put(`/api/reviews/${editingReview._id}`, reviewData, config);
      } else {
        await axios.post('/api/reviews', reviewData, config);
      }
      fetchReviews();
      setShowForm(false);
      setEditingReview(null);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/reviews/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReview(null);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#D4AF37] font-heading">Manage Reviews</h2>
          <p className="text-[#D4AF37]/70 mt-1">Add and manage client testimonials</p>
        </div>
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold shadow-lg hover:bg-[#D4AF37]/90 transition-all"
          >
            <FaPlus /> Add Review
          </motion.button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1a1f2e] backdrop-blur-xl rounded-xl p-6 border border-[#D4AF37]/20"
          >
            <h3 className="text-xl font-bold text-[#D4AF37] mb-4">
              {editingReview ? 'Edit Review' : 'New Review'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Name *</label>
                  <input
                    name="name"
                    defaultValue={editingReview?.name}
                    required
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Role *</label>
                  <input
                    name="role"
                    defaultValue={editingReview?.role}
                    required
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Company</label>
                  <input
                    name="company"
                    defaultValue={editingReview?.company}
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Rating *</label>
                  <select
                    name="rating"
                    defaultValue={editingReview?.rating || 5}
                    required
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map(num => (
                      <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Avatar URL</label>
                <input
                  name="avatar"
                  defaultValue={editingReview?.avatar}
                  placeholder="https://i.pravatar.cc/150?img=1"
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Review *</label>
                <textarea
                  name="review"
                  defaultValue={editingReview?.review}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#D4AF37]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingReview?.isActive ?? true}
                    className="w-4 h-4 rounded border-[#D4AF37]/20 bg-[#0a0e1a] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  Active
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

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1f2e] backdrop-blur-xl rounded-xl p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              {review.avatar && (
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#D4AF37]">{review.name}</h3>
                <p className="text-sm text-gray-400">{review.role}</p>
                {review.company && (
                  <p className="text-xs text-gray-500">{review.company}</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-1 mb-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3">{review.review}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#20B2AA]/20 text-[#20B2AA] rounded-lg hover:bg-[#20B2AA]/30 transition-colors text-sm"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(review._id!)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No reviews yet. Add your first one!</p>
        </div>
      )}
    </div>
  );
};
