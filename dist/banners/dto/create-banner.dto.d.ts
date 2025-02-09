import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
export declare class CreateBannerDto {
    title: string;
    description: string;
    redirect_type: RedirectTypeEnum;
    redirect_id: string;
}
