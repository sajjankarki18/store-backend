import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/Category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StatusEnum } from 'src/enums/status.enum';
import { ProductRepository } from '../products/repositories/product.repository';
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly productsRepository;
    constructor(categoryRepository: CategoryRepository, productsRepository: ProductRepository);
    validateCategoryUpdation: (categoryDto: UpdateCategoryDto) => Promise<void>;
    createCategory(categoryDto: CreateCategoryDto): Promise<Category>;
    fetchAllParentCategories(): Promise<{
        data: Category[];
    }>;
    fetchAllCategoriesWithChildProducts(): Promise<{
        data: Category[];
    }>;
    fetchAllCategories({ page, limit, status, query, }: {
        page: number;
        limit: number;
        status: StatusEnum;
        query: string;
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
