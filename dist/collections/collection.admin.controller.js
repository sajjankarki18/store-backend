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
exports.CollectionsAdminController = void 0;
const common_1 = require("@nestjs/common");
const collection_service_1 = require("./collection.service");
const create_collection_dto_1 = require("./dto/create-collection.dto");
const swagger_1 = require("@nestjs/swagger");
const update_collection_dto_1 = require("./dto/update-collection.dto");
const create_collectionRedirect_dto_1 = require("./dto/create-collectionRedirect.dto");
const status_enum_1 = require("../enums/status.enum");
let CollectionsAdminController = class CollectionsAdminController {
    constructor(collecitonService) {
        this.collecitonService = collecitonService;
    }
    createCollection(collectionDto) {
        return this.collecitonService.createCollection(collectionDto);
    }
    searchCollection(query) {
        return this.collecitonService.searchCollection(query);
    }
    findCollectionById(id) {
        return this.collecitonService.findCollectionById(id);
    }
    fetchAllCollections(page = 1, limit = 10, status) {
        if (!page || !limit) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: ['page and limit are empty!'],
                error: 'Bad Request',
            });
        }
        return this.collecitonService.fetchAllCollections({ page, limit, status });
    }
    updateCollection(id, collectionDto) {
        return this.collecitonService.updateCollection(id, collectionDto);
    }
    deleteCollection(id) {
        return this.collecitonService.deleteCollection(id);
    }
    createCollectionRedirect(collectionRedirectDto) {
        return this.collecitonService.createCollectionRedirect(collectionRedirectDto);
    }
};
exports.CollectionsAdminController = CollectionsAdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Collection' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Collection created sucessfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collection_dto_1.CreateCollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "createCollection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search a collection' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'fetched searched collection' }),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "searchCollection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find collection by Id' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'collection found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'collection not found' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "findCollectionById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all collections' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'collections fetched sucessfully' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "fetchAllCollections", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a collection' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'collection updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'collection not found' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_collection_dto_1.UpdateCollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "updateCollection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a collection' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'collection deleted' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'collection not found' }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "deleteCollection", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Collection redirect' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Collection redirect created sucessfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, common_1.Post)('/collection-redirect'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collectionRedirect_dto_1.CreateCollectionRedirectDto]),
    __metadata("design:returntype", void 0)
], CollectionsAdminController.prototype, "createCollectionRedirect", null);
exports.CollectionsAdminController = CollectionsAdminController = __decorate([
    (0, common_1.Controller)('/admin/collections'),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionsAdminController);
//# sourceMappingURL=collection.admin.controller.js.map