import { StatusEnum } from 'src/enums/status.enum';
export declare class Product {
    id: string;
    title: string;
    description: string;
    category_id: string;
    status: StatusEnum;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
