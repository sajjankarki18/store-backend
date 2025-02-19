import { CreateProductPricingDto } from './create-productPricing.dto';
declare const UpdateProductPricingDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductPricingDto>>;
export declare class UpdateProductPricingDto extends UpdateProductPricingDto_base {
    readonly id: string;
}
export {};
