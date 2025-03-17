import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionRedirectDto } from './dto/create-collectionRedirect.dto';
import { StatusEnum } from 'src/enums/status.enum';
export declare class CollectionsAdminController {
    private readonly collecitonService;
    constructor(collecitonService: CollectionService);
    createCollection(collectionDto: CreateCollectionDto): Promise<import("./entities/collection.entity").Collection>;
    searchCollection(query: string): Promise<{
        data: import("./entities/collection.entity").Collection[];
        total: number;
    }>;
    findCollectionById(id: string): Promise<import("./entities/collection.entity").Collection>;
    fetchAllCollections(page: number, limit: number, status: StatusEnum): Promise<{
        data: import("./entities/collection.entity").Collection[];
        page: number;
        limit: number;
        total: number;
    }>;
    updateCollection(id: string, collectionDto: UpdateCollectionDto): Promise<import("./entities/CollectionRedirect.entity").CollectionRedirect>;
    deleteCollection(id: string): Promise<{
        id: string;
        message: string;
    }>;
    createCollectionRedirect(collectionRedirectDto: CreateCollectionRedirectDto): Promise<import("./entities/CollectionRedirect.entity").CollectionRedirect>;
}
