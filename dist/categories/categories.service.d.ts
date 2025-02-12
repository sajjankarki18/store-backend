import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/Category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    validateCategoryUpdation: (categoryDto: UpdateCategoryDto) => Promise<void>;
    createCategory(categoryDto: CreateCategoryDto): Promise<Category>;
    fetchAllCategories({ page, limit, }: {
        page: number;
        limit: number;
    }): Promise<{
        data: Category[];
        page: number;
        limit: number;
        total: number;
    }>;
    fetchCategoryById(id: string): Promise<Category>;
    updateCategory(id: string, categoryDto: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: string): Promise<{
        id: string;
        message: string;
    }>;
}
