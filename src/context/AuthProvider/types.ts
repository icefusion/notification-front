export interface IUser {
    id?: string;
    renewToken?: string;
    email?: string;
    name?: string;
    token?: string;
}

export interface IContext {
    email?: any;
    Login: (email:string, password:string) => Promise<any>;
    logout: () => void;
    getAuthenticated: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}

