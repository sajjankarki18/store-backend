import { StatusEnum } from 'src/enums/status.enum';
export declare class Customer {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: StatusEnum;
    country: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
