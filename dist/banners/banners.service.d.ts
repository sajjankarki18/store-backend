import { BannerRepository } from './repositories/banner.repository';
import { Banner } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { CategoryRepository } from '../categories/repositories/Category.repository';
import { CollectionRepository } from '../collections/repositories/collection.repository';
export declare class BannersService {
    private readonly bannerRepository;
    private readonly productsRepository;
    private readonly categoriesRepository;
    private readonly collectionRepository;
    constructor(bannerRepository: BannerRepository, productsRepository: ProductRepository, categoriesRepository: CategoryRepository, collectionRepository: CollectionRepository);
    validateRedirects: (redirectId: string, redirectType: RedirectTypeEnum) => Promise<void>;
    limitBannersUpdation: () => Promise<void>;
    createBanner(bannerDto: CreateBannerDto): Promise<Banner>;
    findBannerById(id: string): Promise<{
        data: Banner;
    }>;
    fetchAllBanners(): Promise<{
        data: Banner[];
    }>;
    fetchAllBannersFE(): Promise<{
        data: Banner[];
    }>;
    fetchBannersWithRedirects(): Promise<{
        data: Banner[];
    }>;
    updateBanner(id: string, bannerDto: UpdateBannerDto): Promise<Banner>;
    deleteBanner(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
