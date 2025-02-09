import { CreateBannerDto } from './create-banner.dto';
declare const UpdateBannerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBannerDto>>;
export declare class UpdateBannerDto extends UpdateBannerDto_base {
    readonly id: string;
}
export {};
