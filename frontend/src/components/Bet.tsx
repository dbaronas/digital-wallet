import {useBackendApi} from '../hooks/useBackendApi.tsx';
import type {BetResponseDto} from '../types.ts';
import toast from 'react-hot-toast';
import {useState} from 'react';
import useAuth from '../hooks/useAuth.tsx';

function Bet({onBetPlaced}: { onBetPlaced: () => Promise<void> }) {
    const [amount, setAmount] = useState("");
    const [submitInProgress, setSubmitInProgress] = useState(false);
    const {bet} = useBackendApi();
    const {auth, setAuth} = useAuth();

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setSubmitInProgress(true)
        const promise = new Promise<BetResponseDto>(async (resolve, reject) => {
            try {
                const res = await bet({amount: parseFloat(amount)});
                setAuth((prevAuth) => {
                    if (!prevAuth) return prevAuth;
                    return {...prevAuth, balance: res.balance};
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        })

        try {
            await toast.promise(promise, {
                loading: "Placing the bet",
                success: "The bet has been placed",
                error: (error) => error.response.data?.message || "An error has occurred while placing the bet",
            })
            setAmount("");
            if (onBetPlaced) {
                onBetPlaced();
            }
        } finally {
            setSubmitInProgress(false);
        }
    }

    return (
        <div className="mt-8 max-w-sm mx-auto">
            {auth?.balance && auth?.balance > 0 ? (
                <>
                    <h2 className="text-center text-primary text-4xl font-medium mb-4">Place a bet</h2>
                    <form onSubmit={handleFormSubmit} className="">
                        <input
                            required
                            name="amount"
                            type="number"
                            min="1"
                            step="0.01"
                            placeholder="amount"
                            disabled={submitInProgress}
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                        />
                        <button className="bg-secondary button" type="submit" disabled={submitInProgress}>Submit</button>
                    </form>
                </>
            ) : (
                <p className="text-center text-primary text-3xl font-medium mb-4">You have ran out of money, your
                    balance is&nbsp;
                    <span className="underline">
                        {auth?.balance}&#8364;
                    </span>
                </p>
            )}
        </div>
    );
}

export default Bet;