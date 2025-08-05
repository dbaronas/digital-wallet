import {useContext} from 'react';
import {AuthContext} from '../context/AuthProvider.tsx';

function UseAuth() {
    return useContext(AuthContext);
}

export default UseAuth;