import { createContext, ReactFragment, useEffect, useRef, useState } from 'react'
import { IAuthProvider, IContext, IUser } from './types'
import api from '../../services/api'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'

export const AuthContext = createContext<IContext>({} as IContext)

type childrenType = {
    children: string | number | boolean | ReactFragment | Element
}

export const AuthProvider = ({children}: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>()
    const [authenticate, setAuthenticate] = useState<boolean>(false)
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user)
            setAuthenticate(true)
        }
    }, [])
    
    const getAuthenticated = () :boolean => authenticate

    const setUserLocalStorage = (user: IUser | null) => {
        localStorage.setItem('_user', JSON.stringify(user));
    }

    const getUserLocalStorage = () => {
        const userJson = localStorage.getItem('_user');

        if (!userJson) {
            return null;
        }
        
        const user = JSON.parse(userJson);

        return user ?? null;
    }

    const Login = async(email: string, password: string): Promise<any> => {
        try {
            const response = await api.post('/auth/login', { email: email, password: password} );

            console.log("RESPONSE ", response);

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

            const payload = {
                token: response.data.token, 
                name: response.data.user.name,
                id: response.data.user.id,
                renewToken: response.data.user.renewToken,
                email, 
            };

            setUserLocalStorage(payload);

            setUser(payload);
            
            return response;
        } catch (error) {
            return error;
        }
    }
    
    const logout = async () => {
        try {
            setUser(null);
            setUserLocalStorage(null);
        } finally {
            navigate("/login");
            setUser({});
        }
    }

    

    return (
        <AuthContext.Provider value={{ ...user, Login, logout, getAuthenticated}}>
            <span className="">
                {children}
            </span>
        </AuthContext.Provider>
    )
}


export const RequireAuth = ({ children }: childrenType) => {
    const userJson: any = localStorage.getItem('_user')
    const location = useLocation();

    if (!JSON.parse(userJson)?.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <>
            { children }
        </>
    )
    
};