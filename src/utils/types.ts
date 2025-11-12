export interface UserType {
    _id?: string;
    name: string;
    email: string;
    targetAmount?: number;
    role: 'ADMIN' | 'USER';
    incomes: string[];
    expenses: string[];
    investments: string[];
    createdAt: Date;
    updatedAt: Date;
}