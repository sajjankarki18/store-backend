import { CollectionService } from './collection.service';
export declare class CollectionsController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    fetchCollectionsWithRedirects(): Promise<{
        data: any[];
    }>;
    fetchCollectionsRedirectDataFrontEnd(): Promise<{
        data: any[];
    }>;
}
