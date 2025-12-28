'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ConfessionCard from '@/components/ConfessionCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { confessionAPI } from '@/utils/api';
import { FiFilter } from 'react-icons/fi';

export default function Home() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
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
      setConfessions(response.data.confessions || response.data);
    } catch (error) {
      console.error('Failed to fetch confessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfession = (confessionId) => {
    setConfessions(confessions.filter((c) => c._id !== confessionId));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-poppins text-gray-800 mb-2">
              Confessions Feed
            </h1>
            <p className="text-gray-600">Discover what others are sharing</p>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <FiFilter className="text-purple-600" />
              <span className="font-semibold text-gray-700">Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === category.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Confessions List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : confessions.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No confessions found</p>
              <p className="text-gray-400 mt-2">Be the first to share!</p>
            </div>
          ) : (
            <div>
              {confessions.map((confession) => (
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
