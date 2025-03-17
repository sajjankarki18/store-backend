import { StatusEnum } from 'src/enums/status.enum';
export declare class Collection {
    id: string;
    title: string;
    status: StatusEnum;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
