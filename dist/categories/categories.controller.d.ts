import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    fetchAllParentCategories(): Promise<{
        data: import("./entities/category.entity").Category[];
    }>;
    fetchAllCategoriesWithChildProducts(): Promise<{
        data: import("./entities/category.entity").Category[];
    }>;
}
