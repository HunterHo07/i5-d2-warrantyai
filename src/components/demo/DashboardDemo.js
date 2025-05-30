'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Filter, 
  Search, 
  Bell, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Eye
} from 'lucide-react';
import { demoItems, demoStats, demoCategories, demoNotifications } from '@/data/demoData';

const DashboardDemo = ({ onComplete, isActive }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('expiry');

  const filteredItems = demoItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      item.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status, daysRemaining) => {
    if (status === 'Expired') return 'red-500';
    if (daysRemaining <= 30) return 'yellow-500';
    return 'green-500';
  };

  const getStatusIcon = (status, daysRemaining) => {
    if (status === 'Expired') return <AlertTriangle className="w-4 h-4" />;
    if (daysRemaining <= 30) return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'items', name: 'Items', icon: <Package className="w-4 h-4" /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'notifications', name: 'Alerts', icon: <Bell className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Demo Instructions */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h3 className="font-semibold text-primary mb-2">📊 Dashboard Demo</h3>
        <p className="text-white/80 text-sm">
          Explore the warranty management dashboard. Navigate through different sections to see 
          how you can track, organize, and manage all your warranties in one place.
        </p>
      </div>

      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Warranty Dashboard</h2>
          <p className="text-white/70">Manage all your warranties and coverage</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all duration-300">
            <Bell className="w-5 h-5 text-white" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
            Add Item
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-white">{demoStats.totalItems}</span>
                </div>
                <div className="text-sm text-white/70">Total Items</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-white">{demoStats.activeWarranties}</span>
                </div>
                <div className="text-sm text-white/70">Active Warranties</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-white">{demoStats.expiringThisMonth}</span>
                </div>
                <div className="text-sm text-white/70">Expiring Soon</div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-white">
                    ${demoStats.totalValue.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-white/70">Total Value</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {demoNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' :
                      notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{notification.title}</div>
                      <div className="text-white/70 text-xs">{notification.message}</div>
                      <div className="text-white/50 text-xs mt-1">{notification.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors duration-300"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors duration-300"
              >
                {demoCategories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-surface text-white">
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                      <p className="text-white/70 text-xs">{item.brand} • {item.model}</p>
                    </div>
                    <div className={`flex items-center space-x-1 text-${getStatusColor(item.status, item.daysRemaining)}`}>
                      {getStatusIcon(item.status, item.daysRemaining)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-white/60">Warranty:</span>
                      <span className="text-white">{item.warrantyDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Expires:</span>
                      <span className="text-white">{item.warrantyExpiry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Days Left:</span>
                      <span className={`text-${getStatusColor(item.status, item.daysRemaining)}`}>
                        {item.daysRemaining > 0 ? item.daysRemaining : 'Expired'}
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-3 px-3 py-1 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded text-primary text-xs transition-all duration-300">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">Warranty Calendar</h3>
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/70">Calendar view coming soon...</p>
              <p className="text-white/50 text-sm">Track expiration dates and service schedules</p>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {demoNotifications.map((notification) => (
              <div key={notification.id} className={`border rounded-lg p-4 ${
                notification.read ? 'border-white/10 bg-white/5' : 'border-primary/30 bg-primary/10'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'error' ? 'bg-red-500' :
                      notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{notification.title}</h4>
                      <p className="text-white/70 text-sm">{notification.message}</p>
                      <p className="text-white/50 text-xs mt-1">{notification.date}</p>
                    </div>
                  </div>
                  <button className="text-white/60 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => setActiveTab('overview')}
          className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
        >
          Reset View
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-accent">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Dashboard Explored!</span>
          </div>
          
          <button
            onClick={() => onComplete && onComplete()}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Continue to Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;
