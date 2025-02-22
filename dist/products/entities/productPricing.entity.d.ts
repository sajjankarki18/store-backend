import { CurrencyEnum } from '../../enums/currency.enum';
export declare class ProductPricing {
    id: string;
    variant_id: string;
    country_code: string;
    currency: CurrencyEnum;
    price: number;
    selling_price: number;
    crossed_price: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
