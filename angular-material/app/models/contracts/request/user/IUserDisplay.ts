import { RoleType } from '../../roletype';
export interface IUserDisplay {
    name: string; 
    lastName: string;
    email: string;
    userName: string;
    role: RoleType;
    image: string;
}