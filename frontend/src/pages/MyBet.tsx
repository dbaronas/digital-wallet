import {useParams} from 'react-router-dom';
import {useBackendApi} from '../hooks/useBackendApi.tsx';
import {useEffect, useState} from 'react';
import type {CancelBetResponseDto, MyBetsResponseDto} from '../types.ts';
import {getStatusClass} from '../utils.ts';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.tsx';
import CancelButton from '../components/CancelButton.tsx';

function MyBet() {
    const [bet, setBet] = useState<MyBetsResponseDto>();
    const {fetchMyBets, cancelBet} = useBackendApi();
    const {id} = useParams<{ id: string }>();
    const {setAuth} = useAuth();

    useEffect(() => {
        fetchMyBets(id as string, null, 1, 1).then(res => setBet(res.data[0]));
    }, [id])

    async function hadleDeleteClick(id: string) {
        const promise = new Promise<CancelBetResponseDto>(async (resolve, reject) => {
            try {
                const res = await cancelBet(id);
                setAuth((prevAuth) => {
                    if (!prevAuth) return prevAuth;
                    return {...prevAuth, balance: res.balance};
                });
                setBet((prevBet) => {
                    if (!prevBet) return prevBet;
                    return {...prevBet, status: "canceled"};
                })
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })

        await toast.promise(promise, {
            loading: "Canceling the bet",
            success: "The bet has been canceled successfully",
            error: (error) => error.response.data?.message || "An error has occurred while canceling the bet"
        })
    }

    return (
        <section className="mt-8">
            <h2 className="text-center text-4xl text-primary">Bet information</h2>
            {bet && (
                <div className="max-w-3xl mx-auto mt-6">
                    <table className="w-full border border-gray-300 rounded-md">
                        <thead className="bg-secondary">
                        <tr>
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Created</th>
                            <th className="p-2 border-b">Amount</th>
                            <th className="p-2 border-b">Win</th>
                            <th className="p-2 border-b">Status</th>
                            {bet.status !== "canceled" && (
                                <th className="p-2 border-b"></th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={bet.id} className="text-sm text-center p-4">
                            <td className="py-3 px-1 border-t w-[300px]">{bet.id}</td>
                            <td className="p-2 border-t w-42">{new Date(bet.createdAt).toLocaleString()}</td>
                            <td className="p-2 border-t">{bet.amount}</td>
                            <td className="p-2 border-t">{bet.winAmount}</td>
                            <td className={`p-2 border-t ${getStatusClass(bet.status)}`}>{bet.status}</td>
                            {bet.status !== "canceled" && (
                                <td className="p-2 border-t">
                                    <CancelButton onCancel={() => hadleDeleteClick(bet.id)}/>
                                </td>
                            )}
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}

export default MyBet;