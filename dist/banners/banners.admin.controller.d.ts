import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
export declare class BannersAdminController {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    createBanner(bannerDto: CreateBannerDto): Promise<import("./entities/banner.entity").Banner>;
    findBannerById(id: string): Promise<{
        data: import("./entities/banner.entity").Banner;
    }>;
    fetchAllBanners(): Promise<{
        data: import("./entities/banner.entity").Banner[];
    }>;
    updateBanner(id: string, bannerDto: UpdateBannerDto): Promise<import("./entities/banner.entity").Banner>;
    deleteBanner(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
