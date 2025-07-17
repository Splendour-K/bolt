import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'therapist' | 'admin';
  profileComplete: boolean;
  avatar?: string;
  phone?: string;
  bio?: string;
  // Client-specific fields
  memberSince?: string;
  practiceStreak?: number;
  goals?: string[];
  // Therapist-specific fields
  specialty?: string;
  licenseNumber?: string;
  verified?: boolean;
  experience?: string;
  credentials?: string[];
  languages?: string[];
  sessionRate?: number;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'therapist' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock user database stored in localStorage
const MOCK_USERS_KEY = 'lanspeech_mock_users';
const CURRENT_USER_KEY = 'lanspeech_user';

// Default demo users
const DEFAULT_USERS: User[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'admin@lanspeech.com',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'admin',
    profileComplete: true,
    phone: '+1-800-LANSPEECH',
    bio: 'Platform administrator',
    memberSince: '2024-01-01'
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'therapist@demo.com',
    firstName: 'Dr. Sarah',
    lastName: 'Chen',
    role: 'therapist',
    profileComplete: true,
    phone: '+1-555-0102',
    bio: 'Specializes in working with adults and teens who stutter. Uses evidence-based techniques including fluency shaping and stuttering modification.',
    memberSince: '2024-01-01',
    specialty: 'Stuttering & Fluency',
    licenseNumber: 'SLP-12345-CA',
    verified: true,
    experience: '12 years',
    credentials: ['CCC-SLP', 'Board Certified Fluency Specialist'],
    languages: ['English', 'Mandarin'],
    sessionRate: 120,
    location: 'Online & NYC'
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'client@demo.com',
    firstName: 'Alex',
    lastName: 'Thompson',
    role: 'client',
    profileComplete: true,
    phone: '+1-555-0103',
    bio: 'Working on building confidence for workplace presentations and public speaking.',
    memberSince: '2024-01-01',
    practiceStreak: 12,
    goals: ['Improve presentation skills', 'Reduce speaking anxiety', 'Build confidence']
  }
];

// Initialize mock users in localStorage if they don't exist
function initializeMockUsers() {
  const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
}

// Get all mock users from localStorage
function getMockUsers(): User[] {
  const users = localStorage.getItem(MOCK_USERS_KEY);
  return users ? JSON.parse(users) : DEFAULT_USERS;
}

// Save mock users to localStorage
function saveMockUsers(users: User[]) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

// Find user by email and password
function findUser(email: string, password: string): User | null {
  const users = getMockUsers();
  // In a real app, you'd hash and compare passwords
  // For demo purposes, we'll use simple password matching
  const demoPasswords: Record<string, string> = {
    'admin@lanspeech.com': 'admin123',
    'therapist@demo.com': 'demo123',
    'client@demo.com': 'demo123'
  };
  
  const user = users.find(u => u.email === email);
  if (user && demoPasswords[email] === password) {
    return user;
  }
  
  // Check if it's a user created through signup
  const signupUsers = users.filter(u => !demoPasswords[u.email]);
  const signupUser = signupUsers.find(u => u.email === email);
  if (signupUser) {
    // For simplicity, we'll accept any password for signup users
    // In a real app, you'd store and verify hashed passwords
    return signupUser;
  }
  
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize mock users and check for existing session on mount
  useEffect(() => {
    initializeMockUsers();
    
    const checkExistingSession = () => {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem(CURRENT_USER_KEY);
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = findUser(email, password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }
      
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getMockUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('An account with this email already exists. Please use a different email or try logging in.');
      }
      
      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        profileComplete: userData.role === 'client',
        memberSince: new Date().toISOString().split('T')[0],
        // Set role-specific defaults
        ...(userData.role === 'client' && {
          practiceStreak: 0,
          goals: []
        }),
        ...(userData.role === 'therapist' && {
          verified: false,
          sessionRate: 120,
          location: 'Online',
          credentials: [],
          languages: ['English']
        })
      };
      
      // Add user to mock database
      users.push(newUser);
      saveMockUsers(users);
      
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getMockUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      // Update user in mock database
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      saveMockUsers(users);
      
      // Update current user state
      setUser(updatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}