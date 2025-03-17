import { CollectionRedirectTypeEnum } from 'src/enums/collectionRedirectType.enum';
export declare class CollectionRedirect {
    id: string;
    collection_id: string;
    redirect_id: string;
    redirect_type: CollectionRedirectTypeEnum;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
