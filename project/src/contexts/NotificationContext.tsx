import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  type: 'booking' | 'progress' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  userId: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'userId'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedNotifications = localStorage.getItem(`lanspeech_notifications_${user.id}`);
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications).map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          }));
          setNotifications(parsed);
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      }
    }
  }, [user]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`lanspeech_notifications_${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  // Simulate real-time notifications for demo purposes
  useEffect(() => {
    if (!user) return;

    const simulateNotifications = () => {
      const demoNotifications: Array<Omit<Notification, 'id' | 'timestamp' | 'read' | 'userId'>> = [];

      if (user.role === 'therapist') {
        demoNotifications.push(
          {
            type: 'booking',
            title: 'New Booking Request',
            message: 'Maria Santos has requested an Initial Assessment session',
            priority: 'high',
            actionUrl: '/therapist-dashboard'
          },
          {
            type: 'progress',
            title: 'Client Progress Update',
            message: 'Alex Thompson completed a 15-minute practice session',
            priority: 'medium',
            actionUrl: '/therapist-dashboard'
          }
        );
      } else {
        demoNotifications.push(
          {
            type: 'booking',
            title: 'Session Confirmed',
            message: 'Your session with Dr. Sarah Chen is confirmed for tomorrow at 2:00 PM',
            priority: 'high',
            actionUrl: '/profile'
          },
          {
            type: 'reminder',
            title: 'Practice Reminder',
            message: 'You haven\'t practiced today. Start a quick 5-minute session?',
            priority: 'low',
            actionUrl: '/practice'
          }
        );
      }

      // Add demo notifications after a delay
      setTimeout(() => {
        demoNotifications.forEach((notification, index) => {
          setTimeout(() => {
            addNotification(notification);
          }, index * 3000); // Stagger notifications
        });
      }, 2000);
    };

    // Only add demo notifications if there are none
    if (notifications.length === 0) {
      simulateNotifications();
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'userId'>) => {
    if (!user) return;

    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
      userId: user.id
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const clearAll = () => {
    setNotifications([]);
    if (user) {
      localStorage.removeItem(`lanspeech_notifications_${user.id}`);
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}