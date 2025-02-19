import { CurrencyEnum } from 'src/enums/currency.enum';
export declare class CreateProductPricingDto {
    product_id: string;
    country_code: string;
    currency: CurrencyEnum;
    price: number;
    selling_price: number;
    crossed_price: number;
}
