import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
import { StatusEnum } from 'src/enums/status.enum';
export declare class Banner {
    id: string;
    title: string;
    description: string;
    redirect_type: RedirectTypeEnum;
    redirect_id: string;
    is_active: boolean;
    status: StatusEnum;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
