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
exports.BannersAdminController = void 0;
const common_1 = require("@nestjs/common");
const banners_service_1 = require("./banners.service");
const create_banner_dto_1 = require("./dto/create-banner.dto");
const update_banner_dto_1 = require("./dto/update-banner.dto");
const swagger_1 = require("@nestjs/swagger");
let BannersAdminController = class BannersAdminController {
    constructor(bannersService) {
        this.bannersService = bannersService;
    }
    createBanner(bannerDto) {
        return this.bannersService.createBanner(bannerDto);
    }
    findBannerById(id) {
        return this.bannersService.findBannerById(id);
    }
    fetchAllBanners() {
        return this.bannersService.fetchAllBanners();
    }
    updateBanner(id, bannerDto) {
        return this.bannersService.updateBanner(id, bannerDto);
    }
    deleteBanner(id) {
        return this.bannersService.deleteBanner(id);
    }
};
exports.BannersAdminController = BannersAdminController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new banner' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Banner created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_dto_1.CreateBannerDto]),
    __metadata("design:returntype", void 0)
], BannersAdminController.prototype, "createBanner", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find banner by Id' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Banner found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Banner not found' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannersAdminController.prototype, "findBannerById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all banner' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Banner fetched sucessfully' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BannersAdminController.prototype, "fetchAllBanners", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a Banner' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Banner updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Banner not found' }),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_banner_dto_1.UpdateBannerDto]),
    __metadata("design:returntype", void 0)
], BannersAdminController.prototype, "updateBanner", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a banner' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Banner deleted' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Banner not found' }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BannersAdminController.prototype, "deleteBanner", null);
exports.BannersAdminController = BannersAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin Banners'),
    (0, common_1.Controller)('/admin/banners'),
    __metadata("design:paramtypes", [banners_service_1.BannersService])
], BannersAdminController);
//# sourceMappingURL=banners.admin.controller.js.map