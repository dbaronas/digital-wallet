import type {
    BetDto,
    BetResponseDto,
    CancelBetResponseDto,
    PaginateResponseDto,
    PaginateTransactionResponseDto
} from '../types.ts';
import {bet, cancelBet, fetchMyBets, fetchMyTransactions} from '../api/BackendApi.tsx';
import UseAxiosAuth from './useAxiosAuth.tsx';

export function useBackendApi() {
    const axiosAuth = UseAxiosAuth();

    return {
        bet: (data: BetDto): Promise<BetResponseDto> => bet(data, axiosAuth),
        cancelBet: (id: string): Promise<CancelBetResponseDto> => cancelBet(id, axiosAuth),
        fetchMyBets: (id: string | null, status: string | null, page: number, limit: number): Promise<PaginateResponseDto> => fetchMyBets(id, status, page, limit, axiosAuth),
        fetchMyTransactions: (id: string | null, type: string | null, page: number, limit: number): Promise<PaginateTransactionResponseDto> => fetchMyTransactions(id, type, page, limit, axiosAuth)
    };
}