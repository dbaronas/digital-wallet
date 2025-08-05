import {createContext, type ReactNode, useState} from 'react';
import type {LoginResponseDto} from '../types.ts';

type Props = {
    children: ReactNode;
}

type AuthContextType = {
    auth: LoginResponseDto | undefined;
    setAuth: React.Dispatch<React.SetStateAction<LoginResponseDto | undefined>>
}

export const AuthContext = createContext<AuthContextType>({
    auth: undefined,
    setAuth: (() => {
    }) as React.Dispatch<React.SetStateAction<LoginResponseDto | undefined>>
})

export default function AuthProvider(props: Props) {
    const [auth, setAuth] = useState<LoginResponseDto | undefined>(undefined)

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}