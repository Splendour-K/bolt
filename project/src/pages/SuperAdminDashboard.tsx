import React, { useState, useEffect } from 'react';
import { Shield, Users, UserCheck, DollarSign, Activity, Settings, AlertTriangle, CheckCircle, XCircle, Eye, Edit, Trash2, Plus, Search, Filter, Download, BarChart3, TrendingUp, Calendar, MessageSquare, Database, Server, Lock, FileText, CreditCard, Globe, Zap, Monitor, Key, RefreshCw, Archive, UserPlus, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PaymentService } from '../services/paymentService';

interface AdminStats {
  totalUsers: number;
  totalTherapists: number;
  pendingTherapists: number;
  totalSessions: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeUsers: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  serverUptime: string;
  databaseSize: string;
  apiCalls: number;
  errorRate: number;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'therapist' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  createdAt: string;
  lastLogin?: string;
  verified?: boolean;
  sessionsCount?: number;
  revenue?: number;
  loginHistory?: LoginRecord[];
  twoFactorEnabled?: boolean;
  permissions?: string[];
}

interface LoginRecord {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  success: boolean;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'security';
  message: string;
  timestamp: string;
  resolved: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'exercise' | 'talk';
  author: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  views: number;
  createdAt: string;
  moderated: boolean;
}

interface SystemConfig {
  siteName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailVerificationRequired: boolean;
  twoFactorRequired: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  apiRateLimit: number;
  fileUploadMaxSize: number;
  backupFrequency: string;
  cacheEnabled: boolean;
}

export function SuperAdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'client' | 'therapist' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const [paymentService] = useState(() => new PaymentService());
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Security check - only allow super admin access
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    
    // Log admin access
    logAdminAction('dashboard_access', 'Accessed Super Admin Dashboard');
  }, [user]);

  // Load mock data
  useEffect(() => {
    loadMockData();
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  const logAdminAction = (action: string, details: string) => {
    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      adminId: user?.id,
      adminEmail: user?.email,
      action,
      details,
      ipAddress: '192.168.1.100', // In production, get real IP
      userAgent: navigator.userAgent
    };
    
    setAuditLogs(prev => [logEntry, ...prev.slice(0, 99)]); // Keep last 100 logs
    console.log('Admin Action Logged:', logEntry);
  };

  const loadMockData = () => {
    // Mock admin stats
    setAdminStats({
      totalUsers: 1247,
      totalTherapists: 89,
      pendingTherapists: 12,
      totalSessions: 3456,
      totalRevenue: 425600,
      monthlyGrowth: 23.5,
      activeUsers: 892,
      systemHealth: 'healthy',
      serverUptime: '99.9%',
      databaseSize: '2.4 GB',
      apiCalls: 45678,
      errorRate: 0.02
    });

    // Mock users data with enhanced details
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'alex.thompson@email.com',
        firstName: 'Alex',
        lastName: 'Thompson',
        role: 'client',
        status: 'active',
        createdAt: '2025-01-15',
        lastLogin: '2025-01-19',
        sessionsCount: 8,
        twoFactorEnabled: true,
        permissions: ['book_sessions', 'view_progress'],
        loginHistory: [
          { timestamp: '2025-01-19T10:30:00Z', ipAddress: '192.168.1.50', userAgent: 'Chrome/120.0', location: 'New York, NY', success: true },
          { timestamp: '2025-01-18T14:20:00Z', ipAddress: '192.168.1.50', userAgent: 'Chrome/120.0', location: 'New York, NY', success: true }
        ]
      },
      {
        id: '2',
        email: 'dr.sarah.chen@email.com',
        firstName: 'Dr. Sarah',
        lastName: 'Chen',
        role: 'therapist',
        status: 'active',
        createdAt: '2024-12-10',
        lastLogin: '2025-01-19',
        verified: true,
        sessionsCount: 156,
        revenue: 18720,
        twoFactorEnabled: true,
        permissions: ['manage_sessions', 'view_client_data', 'update_profile'],
        loginHistory: [
          { timestamp: '2025-01-19T09:00:00Z', ipAddress: '10.0.0.25', userAgent: 'Safari/17.0', location: 'San Francisco, CA', success: true }
        ]
      },
      {
        id: '3',
        email: 'maria.santos@email.com',
        firstName: 'Maria',
        lastName: 'Santos',
        role: 'client',
        status: 'active',
        createdAt: '2025-01-18',
        lastLogin: '2025-01-18',
        sessionsCount: 2,
        twoFactorEnabled: false,
        permissions: ['book_sessions', 'view_progress']
      },
      {
        id: '4',
        email: 'dr.michael.rodriguez@email.com',
        firstName: 'Dr. Michael',
        lastName: 'Rodriguez',
        role: 'therapist',
        status: 'pending',
        createdAt: '2025-01-17',
        verified: false,
        sessionsCount: 0,
        twoFactorEnabled: false,
        permissions: []
      },
      {
        id: '5',
        email: 'david.kim@email.com',
        firstName: 'David',
        lastName: 'Kim',
        role: 'client',
        status: 'suspended',
        createdAt: '2024-11-22',
        lastLogin: '2025-01-10',
        sessionsCount: 15,
        twoFactorEnabled: true,
        permissions: []
      }
    ];

    setUsers(mockUsers);

    // Mock system alerts
    setSystemAlerts([
      {
        id: '1',
        type: 'warning',
        message: 'High server load detected - response times may be slower',
        timestamp: '2025-01-19T10:30:00Z',
        resolved: false,
        severity: 'medium'
      },
      {
        id: '2',
        type: 'info',
        message: 'Scheduled maintenance completed successfully',
        timestamp: '2025-01-19T08:00:00Z',
        resolved: true,
        severity: 'low'
      },
      {
        id: '3',
        type: 'error',
        message: 'Payment gateway timeout - 3 failed transactions',
        timestamp: '2025-01-19T09:15:00Z',
        resolved: false,
        severity: 'high'
      },
      {
        id: '4',
        type: 'security',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        timestamp: '2025-01-19T11:45:00Z',
        resolved: false,
        severity: 'critical'
      }
    ]);

    // Mock content items
    setContentItems([
      {
        id: '1',
        title: 'Breathing Techniques for Fluency',
        type: 'article',
        author: 'Dr. Sarah Chen',
        status: 'published',
        category: 'Exercises',
        views: 1247,
        createdAt: '2025-01-15',
        moderated: true
      },
      {
        id: '2',
        title: 'My Journey with Stuttering',
        type: 'talk',
        author: 'Alex Thompson',
        status: 'pending',
        category: 'Personal Stories',
        views: 0,
        createdAt: '2025-01-18',
        moderated: false
      }
    ]);

    // Mock system configuration
    setSystemConfig({
      siteName: 'LanSpeech',
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true,
      twoFactorRequired: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      apiRateLimit: 1000,
      fileUploadMaxSize: 10,
      backupFrequency: 'daily',
      cacheEnabled: true
    });
  };

  const handleUserAction = (userId: string, action: 'approve' | 'suspend' | 'activate' | 'delete' | 'reset_password' | 'toggle_2fa') => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          switch (action) {
            case 'approve':
              logAdminAction('user_approved', `Approved user: ${user.email}`);
              return { ...user, status: 'active' as const, verified: true };
            case 'suspend':
              logAdminAction('user_suspended', `Suspended user: ${user.email}`);
              return { ...user, status: 'suspended' as const };
            case 'activate':
              logAdminAction('user_activated', `Activated user: ${user.email}`);
              return { ...user, status: 'active' as const };
            case 'reset_password':
              logAdminAction('password_reset', `Reset password for user: ${user.email}`);
              alert(`Password reset email sent to ${user.email}`);
              return user;
            case 'toggle_2fa':
              logAdminAction('2fa_toggled', `Toggled 2FA for user: ${user.email}`);
              return { ...user, twoFactorEnabled: !user.twoFactorEnabled };
            case 'delete':
              logAdminAction('user_deleted', `Deleted user: ${user.email}`);
              return user; // In real app, would remove from array
            default:
              return user;
          }
        }
        return user;
      })
    );

    alert(`User ${action.replace('_', ' ')} successfully`);
  };

  const handleSystemConfigUpdate = (config: Partial<SystemConfig>) => {
    if (!systemConfig) return;
    
    const updatedConfig = { ...systemConfig, ...config };
    setSystemConfig(updatedConfig);
    logAdminAction('system_config_updated', `Updated system configuration: ${Object.keys(config).join(', ')}`);
    alert('System configuration updated successfully');
  };

  const handleContentAction = (contentId: string, action: 'approve' | 'reject' | 'delete' | 'feature') => {
    const content = contentItems.find(c => c.id === contentId);
    if (!content) return;

    setContentItems(prev => 
      prev.map(item => {
        if (item.id === contentId) {
          switch (action) {
            case 'approve':
              logAdminAction('content_approved', `Approved content: ${item.title}`);
              return { ...item, status: 'published' as const, moderated: true };
            case 'reject':
              logAdminAction('content_rejected', `Rejected content: ${item.title}`);
              return { ...item, status: 'draft' as const };
            case 'delete':
              logAdminAction('content_deleted', `Deleted content: ${item.title}`);
              return item; // In real app, would remove
            default:
              return item;
          }
        }
        return item;
      })
    );
  };

  const exportData = (type: 'users' | 'therapists' | 'sessions' | 'financial' | 'audit_logs') => {
    logAdminAction('data_export', `Exported ${type} data`);
    alert(`Exporting ${type} data...`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'system', label: 'System Config', icon: Settings },
    { id: 'financial', label: 'Financial Controls', icon: DollarSign },
    { id: 'technical', label: 'Technical Admin', icon: Server },
    { id: 'security', label: 'Security & Audit', icon: Shield }
  ];

  // Security check render
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-900 mb-2">Access Denied</h1>
          <p className="text-red-700">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Super Admin Dashboard</h1>
                <p className="text-sm text-gray-500">LanSpeech Platform Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                adminStats?.systemHealth === 'healthy' 
                  ? 'bg-green-100 text-green-800'
                  : adminStats?.systemHealth === 'warning'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {adminStats?.systemHealth === 'healthy' && '🟢 System Healthy'}
                {adminStats?.systemHealth === 'warning' && '🟡 System Warning'}
                {adminStats?.systemHealth === 'critical' && '🔴 System Critical'}
              </div>
              <div className="text-sm text-gray-600">
                Welcome, {user.firstName}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && adminStats && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+{adminStats.monthlyGrowth}%</span>
                  <span className="text-gray-500 ml-1">this month</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(adminStats.totalRevenue)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-500">Platform lifetime</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Server Uptime</p>
                    <p className="text-3xl font-bold text-gray-900">{adminStats.serverUptime}</p>
                  </div>
                  <Monitor className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-500">Last 30 days</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">API Calls</p>
                    <p className="text-3xl font-bold text-gray-900">{adminStats.apiCalls.toLocaleString()}</p>
                  </div>
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-500">Error rate: {adminStats.errorRate}%</span>
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'error' ? 'bg-red-500' :
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'security' ? 'bg-purple-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                            {alert.resolved ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="client">Clients</option>
                    <option value="therapist">Therapists</option>
                    <option value="admin">Admins</option>
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportData('users')}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button 
                    onClick={() => setShowCreateUserModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add User</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2FA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'therapist' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.sessionsCount || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'reset_password')}
                              className="text-orange-600 hover:text-orange-900"
                              title="Reset Password"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'toggle_2fa')}
                              className="text-purple-600 hover:text-purple-900"
                              title="Toggle 2FA"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            {user.status === 'pending' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'approve')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {user.status === 'active' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="Suspend"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            {user.status === 'suspended' && (
                              <button
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="text-green-600 hover:text-green-900"
                                title="Activate"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleUserAction(user.id, 'delete')}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Create Content
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contentItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 capitalize">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.author}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'published' ? 'bg-green-100 text-green-800' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.views}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleContentAction(item.id, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleContentAction(item.id, 'delete')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* System Configuration Tab */}
        {activeTab === 'system' && systemConfig && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">General Settings</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input
                      type="text"
                      value={systemConfig.siteName}
                      onChange={(e) => handleSystemConfigUpdate({ siteName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={systemConfig.maintenanceMode}
                      onChange={(e) => handleSystemConfigUpdate({ maintenanceMode: e.target.checked })}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={systemConfig.registrationEnabled}
                      onChange={(e) => handleSystemConfigUpdate({ registrationEnabled: e.target.checked })}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">Registration Enabled</label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Security Settings</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={systemConfig.sessionTimeout}
                      onChange={(e) => handleSystemConfigUpdate({ sessionTimeout: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Login Attempts</label>
                    <input
                      type="number"
                      value={systemConfig.maxLoginAttempts}
                      onChange={(e) => handleSystemConfigUpdate({ maxLoginAttempts: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={systemConfig.twoFactorRequired}
                      onChange={(e) => handleSystemConfigUpdate({ twoFactorRequired: e.target.checked })}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">Require 2FA for All Users</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Controls Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Controls</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900">Total Revenue</h4>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(425600)}</p>
                  <p className="text-sm text-green-700">+12.5% this month</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">Pending Payments</h4>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(12450)}</p>
                  <p className="text-sm text-blue-700">23 transactions</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900">Refunds Issued</h4>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(3200)}</p>
                  <p className="text-sm text-orange-700">8 refunds this month</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => exportData('financial')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export Financial Report
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Manage Payment Settings
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Process Refunds
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technical Administration Tab */}
        {activeTab === 'technical' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Administration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Server Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium text-green-600">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CPU Usage</span>
                      <span className="text-sm font-medium text-yellow-600">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Memory Usage</span>
                      <span className="text-sm font-medium text-blue-600">62%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Database Size</span>
                      <span className="text-sm font-medium text-gray-900">2.4 GB</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">System Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <RefreshCw className="w-4 h-4 inline mr-2" />
                      Restart Services
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <Database className="w-4 h-4 inline mr-2" />
                      Backup Database
                    </button>
                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Clear Cache
                    </button>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      <Monitor className="w-4 h-4 inline mr-2" />
                      System Diagnostics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security & Audit Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Security & Audit Logs</h3>
              
              <div className="mb-6">
                <button
                  onClick={() => exportData('audit_logs')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Export Audit Logs
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {auditLogs.slice(0, 10).map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{log.adminEmail}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.action}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="text-sm text-gray-900 capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Security & Activity</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">2FA Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sessions</label>
                    <p className="text-sm text-gray-900">{selectedUser.sessionsCount || 0}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Revenue</label>
                    <p className="text-sm text-gray-900">
                      {selectedUser.revenue ? formatCurrency(selectedUser.revenue) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {selectedUser.loginHistory && selectedUser.loginHistory.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-4">Recent Login History</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Timestamp</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">IP Address</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Location</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedUser.loginHistory.map((login, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {new Date(login.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">{login.ipAddress}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{login.location}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              login.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {login.success ? 'Success' : 'Failed'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New User</h3>
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option value="client">Client</option>
                  <option value="therapist">Therapist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    logAdminAction('user_created', 'Created new user account');
                    setShowCreateUserModal(false);
                    alert('User created successfully!');
                  }}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}