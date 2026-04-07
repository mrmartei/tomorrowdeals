import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'shop' | 'marketer' | 'customer';
  name: string;
  regionId?: string;
  marketerId?: string;
  joinedAt?: string;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  loginAsDemo: (role: UserProfile['role']) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  profile: null, 
  loading: true,
  loginAsDemo: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo session in localStorage
    const demoSession = localStorage.getItem('tomorrow_deals_session');
    if (demoSession) {
      const mockProfile = JSON.parse(demoSession) as UserProfile;
      setProfile(mockProfile);
      setUser({ uid: mockProfile.uid, email: mockProfile.email });
    }
    setLoading(false);
  }, []);

  const loginAsDemo = (role: UserProfile['role']) => {
    const mockProfile: UserProfile = {
      uid: `demo_${role}`,
      email: `${role}@demo.com`,
      role,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      joinedAt: new Date().toISOString()
    };
    localStorage.setItem('tomorrow_deals_session', JSON.stringify(mockProfile));
    setProfile(mockProfile);
    setUser({ uid: mockProfile.uid, email: mockProfile.email });
  };

  const logout = () => {
    localStorage.removeItem('tomorrow_deals_session');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
