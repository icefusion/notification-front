import React, { createContext, useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api'


type AuthContextUserType = {
  email: string | null;
  password: number | null;
};

type AuthContextType = {
  user: AuthContextUserType;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({})

type Props = {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }:Props) => {
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  
  const login = async (email: string, password: string) => {
    try {
      console.log("login....")
      const response = await api.post('/api/auth-admin/login', {
        email,
        password,
      })
      setUser(response.data.user)
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`
    } catch (error) {
      console.log('error', error)
    }
  }

  const logout = async () => {
    try {
      console.log("Codigo de logout...")
    } finally {
      navigate("/login");
      setUser({});
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}



export const useAuth = () => useContext(AuthContext);

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};