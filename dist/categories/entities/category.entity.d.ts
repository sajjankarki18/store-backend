import { StatusEnum } from 'src/enums/status.enum';
export declare class Category {
    id: string;
    title: string;
    description: string;
    parent_id: string;
    image_url: string;
    status: StatusEnum;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
