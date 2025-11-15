import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  isActive?: boolean;
}

export const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/projects', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const projectData: Project = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
      imageUrl: formData.get('imageUrl') as string,
      githubUrl: formData.get('githubUrl') as string,
      liveUrl: formData.get('liveUrl') as string,
      featured: formData.get('featured') === 'on',
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      };
      
      if (editingProject?._id) {
        await axios.put(`/api/projects/${editingProject._id}`, projectData, config);
      } else {
        await axios.post('/api/projects', projectData, config);
      }
      fetchProjects();
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/projects/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
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
          <h2 className="text-3xl font-bold text-[#D4AF37] font-heading">Manage Projects</h2>
          <p className="text-[#D4AF37]/70 mt-1">Create and manage your portfolio projects</p>
        </div>
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg font-semibold shadow-lg hover:bg-[#D4AF37]/90 transition-all"
          >
            <FaPlus /> Add Project
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
              {editingProject ? 'Edit Project' : 'New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Title *</label>
                  <input
                    name="title"
                    defaultValue={editingProject?.title}
                    required
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Image URL</label>
                  <input
                    name="imageUrl"
                    defaultValue={editingProject?.imageUrl}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Description *</label>
                <textarea
                  name="description"
                  defaultValue={editingProject?.description}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Technologies (comma-separated) *</label>
                <input
                  name="technologies"
                  defaultValue={editingProject?.technologies?.join(', ')}
                  required
                  placeholder="React, TypeScript, Node.js"
                  className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">GitHub URL</label>
                  <input
                    name="githubUrl"
                    defaultValue={editingProject?.githubUrl}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37]/70 mb-2 text-sm font-semibold">Live URL</label>
                  <input
                    name="liveUrl"
                    defaultValue={editingProject?.liveUrl}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-[#0a0e1a] border border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-[#D4AF37]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingProject?.featured}
                    className="w-4 h-4 rounded border-[#D4AF37]/20 bg-[#0a0e1a] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-[#D4AF37]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingProject?.isActive ?? true}
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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1f2e] backdrop-blur-xl rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-[#D4AF37]">{project.title}</h3>
                {project.featured && (
                  <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded-full">Featured</span>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-[#20B2AA]/20 text-[#20B2AA] text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#20B2AA]/20 text-[#20B2AA] rounded-lg hover:bg-[#20B2AA]/30 transition-colors text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id!)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No projects yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
};
