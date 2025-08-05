export type RegisterPlayerDto = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type RegisterPlayerResponseDto = {
    id:	string
    name: string
}

export type LoginDto = {
    email: string;
    password: string;
};

export type LoginResponseDto = {
    id: string;
    name: string;
    balance: number;
    currency: string;
    accessToken: string;
};

export type BetDto = {
    amount: number;
};

export type BetResponseDto = {
    transactionId: string;
    currency: string;
    balance: number;
    winAmount: number;
};

export type MyBetsResponseDto = {
    id: string;
    createdAt: string;
    amount: number;
    winAmount: number;
    status: string;
};

export type MyTransactionResponseDto = {
    id: string;
    createdAt: string;
    amount: number;
    type: string;
};

export type PaginateTransactionResponseDto = {
    data: MyTransactionResponseDto[];
    total: number;
    page: number;
    limit: number;
};

export type PaginateResponseDto = {
    data: MyBetsResponseDto[];
    total: number;
    page: number;
    limit: number;
};

export type CancelBetResponseDto = {
    transactionId: string;
    balance: number;
    currency: string;
};

