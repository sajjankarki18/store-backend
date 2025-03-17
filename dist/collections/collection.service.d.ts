import { Collection } from './entities/collection.entity';
import { CollectionRepository } from './repositories/collection.repository';
import { CollectionRedirect } from './entities/CollectionRedirect.entity';
import { CollectionredirectRepository } from './repositories/collectionRedirect.repository';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionRedirectDto } from './dto/create-collectionRedirect.dto';
import { CategoryRepository } from '../categories/repositories/Category.repository';
import { ProductRepository } from '../products/repositories/product.repository';
export declare class CollectionService {
    private readonly collectionRepository;
    private readonly collectionRedirectRepository;
    private readonly categoryRepository;
    private readonly productRepository;
    constructor(collectionRepository: CollectionRepository, collectionRedirectRepository: CollectionredirectRepository, categoryRepository: CategoryRepository, productRepository: ProductRepository);
    createCollection(collectionDto: CreateCollectionDto): Promise<Collection>;
    findCollectionById(id: string): Promise<Collection>;
    searchCollection(query: string): Promise<{
        data: Collection[];
        total: number;
    }>;
    fetchAllCollections({ page, limit, status, }: {
        page: number;
        limit: number;
        status: StatusEnum;
    }): Promise<{
        data: Collection[];
        page: number;
        limit: number;
        total: number;
    }>;
    fetchCollectionsWithRedirects(): Promise<CollectionRedirect[]>;
    updateCollection(id: string, collectionDto: UpdateCollectionDto): Promise<CollectionRedirect>;
    deleteCollection(id: string): Promise<{
        id: string;
        message: string;
    }>;
    createCollectionRedirect(collectionRedirectDto: CreateCollectionRedirectDto): Promise<CollectionRedirect>;
}
