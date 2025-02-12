import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
declare const UpdateProductDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    readonly id: string;
}
export {};
