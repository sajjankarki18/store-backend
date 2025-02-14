import { StatusEnum } from 'src/enums/status.enum';
export declare class CreateProductDto {
    title: string;
    description: string;
    category_id: string;
    status: StatusEnum;
}
