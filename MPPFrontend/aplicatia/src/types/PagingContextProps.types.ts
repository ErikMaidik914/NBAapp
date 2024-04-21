import { User } from '../models/user';

export type PagingContextProps = {
    users: User[];
    setUsers: (newUsers: User[]) => void;
    currentPage: number;
    setCurrentPage: (newPage: number) => void;
    pageSize: number;
};
