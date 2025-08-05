import {useState} from 'react';
import {register} from '../api/BackendApi.tsx';
import type {RegisterPlayerResponseDto} from '../types.ts';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerInProgress, setRegisterInProgress] = useState(false);
    const [res, setRes] = useState<RegisterPlayerResponseDto>();

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setRegisterInProgress(true);
        const data = {name, email, password, confirmPassword}
        const promise = new Promise<RegisterPlayerResponseDto>(async (resolve, reject) => {
            try {
                const res = await register(data);
                setRes(res);
                resetForm();
                resolve(res);
            } catch (error) {
                reject(error)
            }
        })

        try {
            await toast.promise(promise, {
                loading: "Registering the user",
                success: "User registered successfully",
                error: (error) => error.response.data?.message || "An error has occurred while registering the user",
            })
        } finally {
            setRegisterInProgress(false);
        }
    }

    function resetForm() {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl font-medium mb-4">Register</h1>
            <form onSubmit={handleFormSubmit} className="max-w-xs mx-auto">
                <input
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    disabled={registerInProgress}
                />
                <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    disabled={registerInProgress}
                />
                <input
                    required
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    disabled={registerInProgress}
                />
                <input
                    required
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                    disabled={registerInProgress}
                />
                <button className="bg-secondary button" type="submit" disabled={registerInProgress}>Submit</button>
                <p className="hover:text-cyan-200 text-md">
                    <Link to="/login" className="flex justify-center mt-2 underline">
                        Already have an account? Sign in here
                    </Link>
                </p>
            </form>
            {res && (
                <>
                    <div className="text-center text-green-300 mt-2">Please now login with your newly created account&nbsp;
                        <span className='underline'>
                            <Link to="/login" className="pointer">here</Link>
                        </span>
                    </div>
                </>
            )}
        </section>
    );
}

export default Register;