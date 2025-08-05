import axios, {type AxiosInstance} from 'axios'
import type {
    BetDto,
    BetResponseDto, CancelBetResponseDto,
    LoginDto,
    LoginResponseDto, PaginateResponseDto, PaginateTransactionResponseDto,
    RegisterPlayerDto,
    RegisterPlayerResponseDto
} from '../types.ts';

const BASE_URL = `http://localhost:3000/`

export const axiosBackend = axios.create({
    baseURL: BASE_URL,
})

export async function register(data: RegisterPlayerDto): Promise<RegisterPlayerResponseDto> {
    try {
        const res = await axiosBackend.post('/register', data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function login(data: LoginDto): Promise<LoginResponseDto> {
    try {
        const res = await axiosBackend.post('/login', data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function bet(data: BetDto, axiosInstance: AxiosInstance): Promise<BetResponseDto> {
    try {
        const res = await axiosInstance.post('/bet', data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function cancelBet(id: string, axiosInstance: AxiosInstance): Promise<CancelBetResponseDto> {
    try {
        const res = await axiosInstance.delete(`/my-bet/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchMyBets(
    id: string | null,
    status: string | null,
    page: number,
    limit: number,
    axiosInstance: AxiosInstance
): Promise<PaginateResponseDto> {
    try {
        const res = await axiosInstance.get(`/my-bets`, {
            params: {
                ...(id && {id}),
                ...(status && {status}),
                page,
                limit
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchMyTransactions(
    id: string | null,
    type: string | null,
    page: number,
    limit: number,
    axiosInstance: AxiosInstance
): Promise<PaginateTransactionResponseDto> {
    try {
        const res = await axiosInstance.get(`/my-transactions`, {
            params: {
                ...(id && {id}),
                ...(type && {type}),
                page,
                limit
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
