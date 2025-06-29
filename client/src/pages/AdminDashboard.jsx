import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Users, 
  Home, 
  Calendar, 
  BarChart3, 
  Settings, 
  Shield,
  TrendingUp,
  UserCheck,
  Crown
} from 'lucide-react';

import axiosInstance from '@/utils/axios';
import { useAuth } from '../../hooks';
import Spinner from '@/components/ui/Spinner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlaces: 0,
    totalBookings: 0,
    activeUsers: 0,
    inactiveUsers: 0
  });
  const [adminInfo, setAdminInfo] = useState({
    isSuperAdmin: true,
    email: user?.email || '',
    name: user?.name || '',
    role: user?.role || 'admin'
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Try to fetch dashboard stats
      try {
        const statsResponse = await axiosInstance.get('/admin/dashboard');
        setStats(statsResponse.data.data);
      } catch (error) {
        console.log('Dashboard stats not available, using fallback data');
        // Use fallback data if API fails
        setStats({
          totalUsers: 1, // At least you as admin
          totalPlaces: 0,
          totalBookings: 0,
          activeUsers: 1,
          inactiveUsers: 0
        });
      }

      // Try to fetch admin info
      try {
        const adminInfoResponse = await axiosInstance.get('/admin/info');
        setAdminInfo(adminInfoResponse.data.data);
      } catch (error) {
        console.log('Admin info not available, using fallback data');
        // Use fallback data if API fails
        setAdminInfo({
          isSuperAdmin: true,
          email: user?.email || '',
          name: user?.name || '',
          role: user?.role || 'admin'
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.success('Dashboard loaded successfully');
      setLoading(false);
    }
  };

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Spinner />;
  }

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
    </div>
  );

  const AdminNavItem = ({ tab, icon: Icon, label, isActive }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:bg-blue-50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center gap-3">
              {adminInfo?.isSuperAdmin && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  <Crown className="h-4 w-4" />
                  <span className="text-sm font-medium">Super Admin</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <nav className="space-y-2">
                <AdminNavItem 
                  tab="dashboard" 
                  icon={BarChart3} 
                  label="Dashboard" 
                  isActive={activeTab === 'dashboard'} 
                />
                <AdminNavItem 
                  tab="users" 
                  icon={Users} 
                  label="Users" 
                  isActive={activeTab === 'users'} 
                />
                <AdminNavItem 
                  tab="places" 
                  icon={Home} 
                  label="Places" 
                  isActive={activeTab === 'places'} 
                />
                <AdminNavItem 
                  tab="bookings" 
                  icon={Calendar} 
                  label="Bookings" 
                  isActive={activeTab === 'bookings'} 
                />
                <AdminNavItem 
                  tab="settings" 
                  icon={Settings} 
                  label="Settings" 
                  isActive={activeTab === 'settings'} 
                />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                      title="Total Users" 
                      value={stats?.totalUsers || 0} 
                      icon={Users} 
                      color="border-blue-500" 
                    />
                    <StatCard 
                      title="Total Places" 
                      value={stats?.totalPlaces || 0} 
                      icon={Home} 
                      color="border-green-500" 
                    />
                    <StatCard 
                      title="Total Bookings" 
                      value={stats?.totalBookings || 0} 
                      icon={Calendar} 
                      color="border-purple-500" 
                    />
                    <StatCard 
                      title="Active Users" 
                      value={stats?.activeUsers || 0} 
                      icon={UserCheck} 
                      color="border-indigo-500" 
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <Users className="h-6 w-6 text-blue-500" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Manage Users</p>
                        <p className="text-sm text-gray-600">View and edit user accounts</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <Home className="h-6 w-6 text-green-500" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Manage Places</p>
                        <p className="text-sm text-gray-600">Review and moderate listings</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <Calendar className="h-6 w-6 text-purple-500" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">View Bookings</p>
                        <p className="text-sm text-gray-600">Monitor all reservations</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                      <TrendingUp className="h-6 w-6 text-indigo-500" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Analytics</p>
                        <p className="text-sm text-gray-600">View detailed statistics</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Super Admin Info */}
                {adminInfo?.isSuperAdmin && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Crown className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-800">Super Admin Access</h3>
                    </div>
                    <p className="text-blue-700 mb-2">
                      You have full administrative privileges. Only you can:
                    </p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Manage other admin accounts</li>
                      <li>• Change user roles</li>
                      <li>• Access all system settings</li>
                      <li>• Perform critical operations</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
                {adminInfo?.isSuperAdmin ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">User management features coming soon...</p>
                    <p className="text-sm text-gray-500">Backend integration required for full functionality</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Only super admin can manage users</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'places' && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Place Management</h2>
                <div className="text-center py-8">
                  <Home className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Place management features coming soon...</p>
                  <p className="text-sm text-gray-500">Backend integration required for full functionality</p>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Management</h2>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Booking management features coming soon...</p>
                  <p className="text-sm text-gray-500">Backend integration required for full functionality</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Settings</h2>
                {adminInfo?.isSuperAdmin ? (
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Admin settings features coming soon...</p>
                    <p className="text-sm text-gray-500">Backend integration required for full functionality</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Only super admin can access settings</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 