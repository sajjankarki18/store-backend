import { BannerRepository } from './repositories/banner.repository';
import { Banner } from './entities/banner.entity';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannersService {
    private readonly bannerRepository;
    constructor(bannerRepository: BannerRepository);
    createBanner(bannerDto: CreateBannerDto): Promise<Banner>;
    findBannerById(id: string): Promise<Banner>;
    fetchAllBanners(): Promise<{
        data: Banner[];
    }>;
    updateBanner(id: string, bannerDto: UpdateBannerDto): Promise<Banner>;
    deleteBanner(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
