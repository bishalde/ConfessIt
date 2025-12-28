'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { confessionAPI } from '@/utils/api';
import { FiSend } from 'react-icons/fi';

export default function Post() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    content: '',
    category: 'other',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'love', label: '💕 Love', description: 'Matters of the heart' },
    { value: 'work', label: '💼 Work', description: 'Professional life' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family', description: 'Family matters' },
    { value: 'friendship', label: '👥 Friendship', description: 'Friend stories' },
    { value: 'secret', label: '🤫 Secret', description: 'Your deepest secrets' },
    { value: 'regret', label: '😔 Regret', description: 'Things you wish were different' },
    { value: 'achievement', label: '🏆 Achievement', description: 'Your proud moments' },
    { value: 'other', label: '✨ Other', description: 'Everything else' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.content.trim().length < 10) {
      setError('Confession must be at least 10 characters long');
      return;
    }

    setLoading(true);

    try {
      await confessionAPI.create(formData);
      router.push('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post confession. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-sky-50">
        <Navbar />
        
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent mb-3">
              Share Your Confession
            </h1>
            <p className="text-gray-600 text-lg">Your identity remains completely anonymous 🔒</p>
          </div>

          {/* Post Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-purple-100">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 animate-shake">
                <strong>⚠️ </strong>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  Choose a category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <label
                      key={cat.value}
                      className={`relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition duration-300 transform hover:scale-105 ${
                        formData.category === cat.value
                          ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={formData.category === cat.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="text-lg font-bold text-gray-800 mb-1">
                          {cat.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {cat.description}
                        </div>
                      </div>
                      {formData.category === cat.value && (
                        <div className="flex-shrink-0 text-purple-600">
                          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-lg font-bold text-gray-800 mb-3">
                  Your confession
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-5 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none text-gray-800 text-base"
                  placeholder="Share your thoughts... Pour your heart out. This is a safe space. (minimum 10 characters)"
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <div className={`text-sm font-medium ${
                    formData.content.length < 10 ? 'text-red-500' : 'text-green-600'
                  }`}>
                    {formData.content.length < 10 
                      ? `${10 - formData.content.length} more characters needed` 
                      : '✓ Ready to post'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formData.content.length} characters
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || formData.content.length < 10}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <FiSend size={22} />
                <span>{loading ? 'Posting...' : 'Post Confession'}</span>
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5">
              <p className="text-sm text-purple-900 font-medium">
                <strong className="text-base">🔒 Your privacy matters:</strong><br />
                All confessions are posted anonymously. Your identity will never be revealed. 
                Feel free to express yourself without fear of judgment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
