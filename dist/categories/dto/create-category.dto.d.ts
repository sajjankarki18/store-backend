import { StatusEnum } from 'src/enums/status.enum';
export declare class CreateCategoryDto {
    title: string;
    description: string;
    parent_id: string;
    image_url: string;
    status: StatusEnum;
}
