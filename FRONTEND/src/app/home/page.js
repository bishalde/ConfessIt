'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ConfessionCard from '@/components/ConfessionCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { confessionAPI } from '@/utils/api';
import { FiFilter, FiSearch } from 'react-icons/fi';

export default function Home() {
  const [confessions, setConfessions] = useState([]);
  const [filteredConfessions, setFilteredConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  const categories = [
    { value: '', label: 'All' },
    { value: 'love', label: 'Love' },
    { value: 'work', label: 'Work' },
    { value: 'family', label: 'Family' },
    { value: 'friendship', label: 'Friendship' },
    { value: 'secret', label: 'Secret' },
    { value: 'regret', label: 'Regret' },
    { value: 'achievement', label: 'Achievement' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserId(user._id || user.id);
    }
    fetchConfessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchConfessions = async () => {
    setLoading(true);
    try {
      const response = await confessionAPI.getAll(1, selectedCategory);
      const fetchedConfessions = response.data.confessions || response.data;
      setConfessions(fetchedConfessions);
      setFilteredConfessions(fetchedConfessions);
    } catch (error) {
      console.error('Failed to fetch confessions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConfessions(confessions);
    } else {
      const filtered = confessions.filter(confession =>
        confession.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConfessions(filtered);
    }
  }, [searchQuery, confessions]);

  const handleDeleteConfession = (confessionId) => {
    setConfessions(confessions.filter((c) => c._id !== confessionId));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-sky-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent mb-3">
              Confessions Feed
            </h1>
            <p className="text-gray-600 text-lg">Discover what others are sharing anonymously</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-purple-100">
            <div className="flex items-center space-x-3">
              <FiSearch className="text-purple-600" size={20} />
              <input
                type="text"
                placeholder="Search confessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-purple-100">
            <div className="flex items-center space-x-2 mb-4">
              <FiFilter className="text-purple-600" size={18} />
              <span className="font-bold text-gray-800">Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition duration-300 transform hover:scale-105 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-violet-600 to-rose-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {!loading && (
            <div className="mb-4 text-sm text-gray-600 font-medium">
              Showing {filteredConfessions.length} confession{filteredConfessions.length !== 1 ? 's' : ''}
            </div>
          )}

          {/* Confessions List */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading confessions...</p>
            </div>
          ) : filteredConfessions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-purple-100">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-700 text-xl font-semibold mb-2">No confessions found</p>
              <p className="text-gray-500 mt-2">
                {searchQuery ? 'Try a different search term' : 'Be the first to share!'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => window.location.href = '/post'}
                  className="mt-6 bg-gradient-to-r from-violet-600 to-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-rose-700 transition duration-300 shadow-lg"
                >
                  Post a Confession
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {filteredConfessions.map((confession) => (
                <ConfessionCard
                  key={confession._id}
                  confession={confession}
                  onDelete={handleDeleteConfession}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
