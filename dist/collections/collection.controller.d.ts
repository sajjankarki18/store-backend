import { BannersService } from '../banners/banners.service';
export declare class BannersController {
    private readonly bannerService;
    constructor(bannerService: BannersService);
    fetchCollectionsWithRedirects(): void;
}
