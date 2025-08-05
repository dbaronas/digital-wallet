import Bet from '../components/Bet.tsx';
import {useEffect, useState} from 'react';
import {useBackendApi} from '../hooks/useBackendApi.tsx';
import type {CancelBetResponseDto, MyBetsResponseDto} from '../types.ts';
import {Link} from 'react-router-dom';
import CancelButton from '../components/CancelButton.tsx';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth.tsx';
import {getStatusClass} from '../utils.ts';
import {AxiosError} from 'axios';
import usePagination from '../hooks/usePagination.tsx';

function MyBets() {
    const [bets, setBets] = useState<MyBetsResponseDto[]>([]);
    const [total, setTotal] = useState(0);
    const {setAuth} = useAuth();
    const {fetchMyBets, cancelBet} = useBackendApi();
    const {paginationControls, currentPage, itemsPerPage} = usePagination(total);

    useEffect(() => {
        loadBets();
    }, [currentPage])

    async function loadBets() {
        try {
            const res = await fetchMyBets(null, null, currentPage, itemsPerPage);
            setBets(res.data);
            setTotal(res.total);
        } catch (error) {
            toast.error(error instanceof AxiosError ? error.response?.data?.message : "An error has occurred while canceling the bet");
        }
    }

    async function hadleCancelClick(id: string) {
        const promise = new Promise<CancelBetResponseDto>(async (resolve, reject) => {
            try {
                const res = await cancelBet(id);
                setAuth((prevAuth) => {
                    if (!prevAuth) return prevAuth;
                    return {...prevAuth, balance: res.balance};
                });
                setBets((prevBets) =>
                    prevBets.map((bet) =>
                        bet.id === id ? {...bet, status: "canceled"} : bet
                    )
                )
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
        <section>
            <Bet onBetPlaced={loadBets}/>
            {bets.length > 0 ? (
                <div className="max-w-3xl mx-auto mt-6">
                    <h2 className="text-4xl font-semibold mb-4 text-center">My Bets</h2>
                    <table className="w-full border border-gray-300 rounded-md">
                        <thead className="bg-secondary">
                        <tr>
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Created</th>
                            <th className="p-2 border-b">Amount</th>
                            <th className="p-2 border-b">Win</th>
                            <th className="p-2 border-b">Status</th>
                            <th className="p-2 border-b"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {bets.map((bet: MyBetsResponseDto) =>
                            <tr key={bet.id} className="text-sm text-center p-4">
                                <td className="py-3 px-1 border-t w-[300px] underline cursor-pointer">
                                    <Link to={`/my-bet/${bet.id}`}>
                                        {bet.id}
                                    </Link>
                                </td>
                                <td className="p-2 border-t w-42">{new Date(bet.createdAt).toLocaleString()}</td>
                                <td className="p-2 border-t">{bet.amount}</td>
                                <td className="p-2 border-t">{bet.winAmount}</td>
                                <td className={`p-2 border-t ${getStatusClass(bet.status)}`}>{bet.status}</td>
                                <td className="p-2 border-t">
                                    {bet.status !== "canceled" && (
                                        <CancelButton onCancel={() => hadleCancelClick(bet.id)}/>
                                    )}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {paginationControls}
                </div>
            ) : (
                <p className="text-center mt-6 text-gray-500 text-4xl text-primary">No bets found.</p>
            )}
        </section>
    );
}

export default MyBets;