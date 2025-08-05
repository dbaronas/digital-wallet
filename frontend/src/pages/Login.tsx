import {useState} from 'react';
import {login} from '../api/BackendApi.tsx';
import useAuth from '../hooks/useAuth.tsx';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import type {LoginResponseDto} from '../types.ts';
import toast from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginInProgress, setLoginInProgress] = useState(false);
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoginInProgress(true);
        const data = {email, password};
        const promise = new Promise<LoginResponseDto>(async (resolve, reject) => {
            try {
                const res = await login(data);
                setAuth(res);
                resolve(res);
            } catch (error) {
                reject(error);
            }
        })

        try {
            await toast.promise(promise, {
                loading: "Logging in the user",
                success: "User logged in successfully",
                error: (error) => error.response.data?.message || "An error has occurred while logging the user"
            })
        } finally {
            setLoginInProgress(false);
        }
        navigate(from, { replace: true });
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-medium mb-4">Login</h1>
            <form onSubmit={handleFormSubmit} className="max-w-xs mx-auto">
                <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    disabled={loginInProgress}
                />
                <input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    disabled={loginInProgress}
                />
                <button className="bg-secondary button" type="submit" disabled={loginInProgress}>Submit</button>
                <p className="hover:text-cyan-200 text-md">
                    <Link to="/register" className="flex justify-center mt-2 underline">
                        Don't have an account? Sign up here
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Login;