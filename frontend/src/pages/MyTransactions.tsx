import {useEffect, useState} from 'react';
import {useBackendApi} from '../hooks/useBackendApi.tsx';
import type {MyTransactionResponseDto} from '../types.ts';
import toast from 'react-hot-toast';
import {AxiosError} from 'axios';
import {getTypeClass} from '../utils.ts';
import usePagination from '../hooks/usePagination.tsx';

function MyTransactions() {
    const [transactions, setTransactions] = useState<MyTransactionResponseDto[]>([]);
    const {fetchMyTransactions} = useBackendApi();
    const [total, setTotal] = useState(0);
    const {paginationControls, currentPage, itemsPerPage} = usePagination(total);

    useEffect(() => {
        loadMyTransactions();
    }, [currentPage]);

    async function loadMyTransactions() {
        try {
            const res = await fetchMyTransactions(null, null, currentPage, itemsPerPage);
            setTransactions(res.data);
            setTotal(res.total);
        } catch (error) {
            toast.error(error instanceof AxiosError ? error.response?.data?.message : "An error has occurred while fetching your transactions");
        }
    }


    return (
        <section className="mt-8">
            {transactions.length > 0 ? (
                <div className="max-w-3xl mx-auto mt-6">
                    <h2 className="text-4xl font-semibold mb-4 text-center">My Transactions</h2>
                    <table className="w-full border border-gray-300 rounded-md">
                        <thead className="bg-secondary">
                        <tr>
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Created</th>
                            <th className="p-2 border-b">Amount</th>
                            <th className="p-2 border-b">Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((t: MyTransactionResponseDto) =>
                            <tr key={t.id} className="text-sm text-center p-4">
                                <td className="py-3 px-1 border-t w-[300px]">
                                        {t.id}
                                </td>
                                <td className="p-2 border-t w-42">{new Date(t.createdAt).toLocaleString()}</td>
                                <td className="p-2 border-t">{t.amount}</td>
                                <td className={`p-2 border-t ${getTypeClass(t.type)}`}>{t.type}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {paginationControls}
                </div>
            ) : (
                <p className="text-center mt-6 text-primary text-4xl">No bets found.</p>
            )}
        </section>
    );
}

export default MyTransactions;