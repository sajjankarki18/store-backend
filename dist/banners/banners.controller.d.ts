import { BannersService } from './banners.service';
export declare class BannersControllers {
    private readonly bannersService;
    constructor(bannersService: BannersService);
    fetchAllBannersFE(): Promise<{
        data: import("./entities/banner.entity").Banner[];
    }>;
    fetchBannersWithRedirects(): Promise<{
        data: import("./entities/banner.entity").Banner[];
    }>;
}
