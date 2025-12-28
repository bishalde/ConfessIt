'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { userAPI, confessionAPI } from '@/utils/api';
import { FiEdit2, FiSave, FiX, FiHeart, FiMessageCircle } from 'react-icons/fi';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [myConfessions, setMyConfessions] = useState([]);
  const [stats, setStats] = useState({ totalConfessions: 0, totalLikes: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    fetchProfile();
    fetchMyConfessions();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getProfile();
      const userData = response.data.user || response.data;
      setUser(userData);
      setFormData({
        fullName: userData.fullName || '',
        username: userData.username || '',
        email: userData.email || '',
        bio: userData.bio || '',
        gender: userData.gender || '',
        age: userData.age || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // If API fails, use localStorage data
      const localUser = localStorage.getItem('user');
      if (localUser) {
        const userData = JSON.parse(localUser);
        setUser(userData);
        setFormData({
          fullName: userData.fullName || '',
          username: userData.username || '',
          email: userData.email || '',
          bio: userData.bio || '',
          gender: userData.gender || '',
          age: userData.age || '',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMyConfessions = async () => {
    try {
      const response = await confessionAPI.getAll(1);
      const allConfessions = response.data.confessions || response.data;
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData._id || userData.id;
      
      console.log('Current User ID:', userId);
      console.log('All Confessions:', allConfessions);
      
      // Filter confessions by current user - check multiple possible user ID fields
      const userConfessions = allConfessions.filter(confession => {
        const confessionUserId = confession.user?._id || confession.user?.id || confession.user || confession.userId;
        console.log('Comparing confession user:', confessionUserId, 'with current user:', userId);
        return confessionUserId === userId;
      });
      
      console.log('User Confessions:', userConfessions);
      setMyConfessions(userConfessions);
      
      // Calculate stats - handle both array and number formats
      const totalLikes = userConfessions.reduce((sum, confession) => {
        const likes = confession.likes;
        // Check if likes is an array (list of user IDs) or a number
        const likeCount = Array.isArray(likes) ? likes.length : (typeof likes === 'number' ? likes : 0);
        console.log('Confession likes:', likes, 'Count:', likeCount);
        return sum + likeCount;
      }, 0);
      
      console.log('Total Likes Calculated:', totalLikes);
      setStats({
        totalConfessions: userConfessions.length,
        totalLikes: totalLikes,
      });
    } catch (error) {
      console.error('Failed to fetch confessions:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await userAPI.updateProfile(formData);
      const updatedUser = response.data.user || response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName || '',
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || '',
      gender: user.gender || '',
      age: user.age || '',
    });
    setIsEditing(false);
    setMessage('');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-sky-50">
        <Navbar />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header with Stats */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent mb-4">
              My Profile
            </h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-violet-500 transform hover:scale-105 transition duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Confessions</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalConfessions}</p>
                  </div>
                  <div className="bg-violet-100 p-3 rounded-full">
                    <FiMessageCircle className="text-violet-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-rose-500 transform hover:scale-105 transition duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Likes Received</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalLikes}</p>
                  </div>
                  <div className="bg-rose-100 p-3 rounded-full">
                    <FiHeart className="text-rose-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-500 transform hover:scale-105 transition duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Average Likes</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats.totalConfessions > 0 ? Math.round(stats.totalLikes / stats.totalConfessions) : 0}
                    </p>
                  </div>
                  <div className="bg-sky-100 p-3 rounded-full">
                    <span className="text-sky-600 text-2xl font-bold">📊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-5xl font-bold text-white">
                        {formData.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-poppins">{formData.username}</h2>
                  <p className="text-gray-500 text-sm mt-1">{formData.email}</p>
                </div>

                {message && (
                  <div className={`mb-6 px-4 py-3 rounded-lg text-sm animate-fade-in ${
                    message.includes('success')
                      ? 'bg-green-50 border border-green-200 text-green-600'
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                          isEditing
                            ? 'border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600'
                        }`}
                        required
                      />
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                          isEditing
                            ? 'border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600'
                        }`}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                          isEditing
                            ? 'border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600'
                        }`}
                        required
                      />
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition resize-none ${
                          isEditing
                            ? 'border-violet-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600'
                        }`}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                          isEditing
                            ? 'border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600'
                        }`}
                      >
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        disabled={!isEditing}
                        min="13"
                        max="120"
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                          isEditing
                            ? 'border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white'
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-600'
                        }`}
                        placeholder="Your age"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col space-y-3 pt-4">
                      {isEditing && (
                        <>
                          <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-gradient-to-r from-violet-600 to-rose-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-rose-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <FiSave size={18} />
                            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2 shadow hover:shadow-md"
                          >
                            <FiX size={18} />
                            <span>Cancel</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </form>

                {/* Edit Button - Outside Form */}
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-4 bg-gradient-to-r from-violet-600 to-rose-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-rose-700 transition duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FiEdit2 size={18} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* My Confessions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-6">My Confessions</h2>
                
                {myConfessions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-500 text-lg">You haven&apos;t posted any confessions yet</p>
                    <button
                      onClick={() => window.location.href = '/post'}
                      className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-lg"
                    >
                      Post Your First Confession
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myConfessions.map((confession) => (
                      <div
                        key={confession._id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-300 bg-gradient-to-br from-white to-gray-50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-semibold">
                            {confession.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(confession.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-base leading-relaxed mb-4">
                          {confession.content}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <FiHeart className="text-pink-500" />
                            <span className="font-medium">{confession.likes?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
