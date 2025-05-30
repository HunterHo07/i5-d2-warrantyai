'use client';

import { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, Check, Settings, Smartphone } from 'lucide-react';

const ReminderSystemDemo = ({ onComplete, isActive }) => {
  const [activeReminders, setActiveReminders] = useState([]);
  const [reminderSettings, setReminderSettings] = useState({
    email: true,
    push: true,
    sms: false,
    advanceNotice: 30
  });

  const sampleReminders = [
    {
      id: 1,
      title: "iPhone 15 Pro Warranty Expiring",
      message: "Your iPhone warranty expires in 30 days",
      type: "warranty_expiry",
      priority: "high",
      date: "2024-12-15",
      item: "iPhone 15 Pro"
    },
    {
      id: 2,
      title: "Tesla Service Due",
      message: "Annual service appointment recommended",
      type: "service_due",
      priority: "medium",
      date: "2024-12-20",
      item: "Tesla Model 3"
    },
    {
      id: 3,
      title: "Filter Replacement",
      message: "Samsung refrigerator water filter needs replacement",
      type: "maintenance",
      priority: "low",
      date: "2024-12-30",
      item: "Samsung Refrigerator"
    }
  ];

  useEffect(() => {
    if (isActive) {
      // Simulate receiving reminders
      const timer = setTimeout(() => {
        setActiveReminders(sampleReminders);
        setTimeout(() => onComplete && onComplete(), 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red-500';
      case 'medium': return 'yellow-500';
      case 'low': return 'green-500';
      default: return 'blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <h3 className="font-semibold text-accent mb-2">🔔 Smart Reminders Demo</h3>
        <p className="text-white/80 text-sm">
          Experience intelligent notifications that help you never miss important warranty deadlines or service appointments.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reminder Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Notification Preferences</h4>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-white">Email Notifications</span>
              </div>
              <button
                onClick={() => setReminderSettings(prev => ({ ...prev, email: !prev.email }))}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  reminderSettings.email ? 'bg-primary' : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                  reminderSettings.email ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-secondary" />
                <span className="text-white">Push Notifications</span>
              </div>
              <button
                onClick={() => setReminderSettings(prev => ({ ...prev, push: !prev.push }))}
                className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  reminderSettings.push ? 'bg-secondary' : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                  reminderSettings.push ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Advance Notice (days)</label>
              <input
                type="range"
                min="7"
                max="90"
                value={reminderSettings.advanceNotice}
                onChange={(e) => setReminderSettings(prev => ({ ...prev, advanceNotice: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="text-white/70 text-sm">{reminderSettings.advanceNotice} days before expiry</div>
            </div>
          </div>
        </div>

        {/* Active Reminders */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Active Reminders</h4>
          
          <div className="space-y-3">
            {activeReminders.map((reminder) => (
              <div key={reminder.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 bg-${getPriorityColor(reminder.priority)}`}></div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">{reminder.title}</h5>
                      <p className="text-white/70 text-xs">{reminder.message}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${getPriorityColor(reminder.priority)}/20 text-${getPriorityColor(reminder.priority)}`}>
                    {reminder.priority}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{reminder.item}</span>
                  <span className="text-white/60">{reminder.date}</span>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 px-3 py-1 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded text-primary text-xs transition-all duration-300">
                    Snooze
                  </button>
                  <button className="flex-1 px-3 py-1 bg-accent/20 hover:bg-accent/30 border border-accent/30 rounded text-accent text-xs transition-all duration-300">
                    Mark Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button className="px-4 py-2 border border-white/20 rounded-lg text-white/70 hover:text-white hover:border-white/40 transition-all duration-300">
          Customize Settings
        </button>
        
        <div className="flex items-center space-x-3">
          {activeReminders.length > 0 && (
            <div className="flex items-center space-x-2 text-accent">
              <Check className="w-4 h-4" />
              <span className="text-sm">Reminders Active!</span>
            </div>
          )}
          
          <button
            onClick={() => onComplete && onComplete()}
            className="px-6 py-2 bg-gradient-to-r from-accent to-primary rounded-lg text-white hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            Continue to 3D View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderSystemDemo;
