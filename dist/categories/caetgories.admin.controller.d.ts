import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StatusEnum } from 'src/enums/status.enum';
export declare class CategoriesAdminController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(categoryDto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    fetchAllCategories(page: number, limit: number, status: StatusEnum, query: string): Promise<{
        data: import("./entities/category.entity").Category[];
        page: number;
        limit: number;
        total: number;
    }>;
    fetchCategoryById(id: string): Promise<{
        data: import("./entities/category.entity").Category;
    }>;
    updateCategory(id: string, categoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    deleteCategory(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
