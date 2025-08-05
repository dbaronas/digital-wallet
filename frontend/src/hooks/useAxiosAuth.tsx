import {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthProvider.tsx';
import {axiosBackend} from '../api/BackendApi.tsx';

function UseAxiosAuth() {
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosBackend.interceptors.request.use((config) => {
            if (auth?.accessToken) {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        return () => {
            axiosBackend.interceptors.request.eject(requestInterceptor);
        }
    }, [auth?.accessToken]);

    return axiosBackend;
}

export default UseAxiosAuth;