import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

interface LoginForm {
  username: string;
  password: string;
}

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('adminToken', response.data.token);
      onLogin(response.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] via-[#1a1f2e] to-[#0f1419] px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-teal rounded-2xl flex items-center justify-center shadow-2xl"
          >
            <FaLock className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gold mb-2 font-heading">Admin Portal</h1>
          <p className="text-gold-light">Secure access to Yggdrasil dashboard</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-background-secondary/90 to-background-secondary/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gold/20"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
              >
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </motion.div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-gold mb-2 font-semibold text-sm uppercase tracking-wide">
                Username
              </label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-light group-focus-within:text-gold transition-colors" />
                <input
                  {...register('username', { required: 'Username is required' })}
                  type="text"
                  className="w-full pl-12 pr-4 py-3.5 bg-background-primary/50 text-text-primary rounded-xl border-2 border-gold/20 focus:border-gold focus:outline-none transition-all placeholder:text-gray-500"
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.username.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gold mb-2 font-semibold text-sm uppercase tracking-wide">
                Password
              </label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-light group-focus-within:text-gold transition-colors" />
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-3.5 bg-background-primary/50 text-text-primary rounded-xl border-2 border-gold/20 focus:border-gold focus:outline-none transition-all placeholder:text-gray-500"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-light hover:text-gold transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-gold to-teal text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  'Access Dashboard'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal to-gold opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Protected by Yggdrasil Security
            </p>
          </div>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <a
            href="/"
            className="text-gold-light hover:text-gold transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>←</span> Back to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
