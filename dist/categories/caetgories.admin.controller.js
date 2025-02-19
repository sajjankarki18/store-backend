"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesAdminController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const status_enum_1 = require("../enums/status.enum");
const swagger_1 = require("@nestjs/swagger");
let CategoriesAdminController = class CategoriesAdminController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    createCategory(categoryDto) {
        return this.categoriesService.createCategory(categoryDto);
    }
    fetchAllCategories(page = 1, limit = 10, status, query) {
        if (!page || !limit) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: ['page and limit fields are empty!'],
                error: 'Bad Request',
            });
        }
        return this.categoriesService.fetchAllCategories({
            page,
            limit,
            status,
            query,
        });
    }
    fetchCategoryById(id) {
        return this.categoriesService.fetchCategoryById(id);
    }
    updateCategory(id, categoryDto) {
        return this.categoriesService.updateCategory(id, categoryDto);
    }
    deleteCategory(id) {
        return this.categoriesService.deleteCategory(id);
    }
};
exports.CategoriesAdminController = CategoriesAdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesAdminController.prototype, "createCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all Category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category fetched sucessfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], CategoriesAdminController.prototype, "fetchAllCategories", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Category by Id' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Category not found' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesAdminController.prototype, "fetchCategoryById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a Category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Category not found' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesAdminController.prototype, "updateCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category deleted' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Category not found' }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesAdminController.prototype, "deleteCategory", null);
exports.CategoriesAdminController = CategoriesAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Categories'),
    (0, common_1.Controller)('/admin/categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesAdminController);
//# sourceMappingURL=caetgories.admin.controller.js.map