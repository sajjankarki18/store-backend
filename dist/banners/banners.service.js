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
exports.BannersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const banner_repository_1 = require("./repositories/banner.repository");
const banner_entity_1 = require("./entities/banner.entity");
const redirectTypes_enum_1 = require("../enums/redirectTypes.enum");
const product_entity_1 = require("../products/entities/product.entity");
const product_repository_1 = require("../products/repositories/product.repository");
const category_entity_1 = require("../categories/entities/category.entity");
const Category_repository_1 = require("../categories/repositories/Category.repository");
const banners_limit = parseInt(process.env.BANNERS_LIMIT) || 5;
let BannersService = class BannersService {
    constructor(bannerRepository, productsRepository, categoriesRepository) {
        this.bannerRepository = bannerRepository;
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.validateRedirects = async (redirectId, redirectType) => {
            if (!redirectId || !redirectType) {
                throw new common_1.NotFoundException({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: ['redirect fields are missing'],
                    error: 'Not Found',
                });
            }
            if (redirectType === redirectTypes_enum_1.RedirectTypeEnum.Category) {
                const category = await this.categoriesRepository.findOne({
                    where: { id: redirectId },
                });
                if (!category) {
                    throw new common_1.BadRequestException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: ['Invalid redirect id'],
                        error: 'Bad Request',
                    });
                }
            }
            else if (redirectType === redirectTypes_enum_1.RedirectTypeEnum.Product) {
                const product = await this.productsRepository.findOne({
                    where: { id: redirectId },
                });
                if (!product) {
                    throw new common_1.BadRequestException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: ['Invalid redirect id'],
                        error: 'Bad Request',
                    });
                }
            }
        };
    }
    async createBanner(bannerDto) {
        await this.validateRedirects(bannerDto.redirect_id, bannerDto.redirect_type);
        const banners = await this.bannerRepository.count();
        if (banners >= banners_limit) {
            throw new common_1.ConflictException({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: ['banners limit exeeded'],
                error: 'Conflict',
            });
        }
        try {
            const banner = this.bannerRepository.create({
                title: bannerDto.title,
                description: bannerDto.description,
                redirect_id: bannerDto.redirect_id,
                redirect_type: bannerDto.redirect_type,
            });
            return await this.bannerRepository.save(banner);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating the banner', error],
                error: 'Internal server error',
            });
        }
    }
    async findBannerById(id) {
        const banner = await this.bannerRepository.findOne({ where: { id } });
        if (!banner) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['banner not found'],
                error: 'Not Found',
            });
        }
        return banner;
    }
    async fetchAllBanners() {
        const banners = await this.bannerRepository.find({
            order: { created_at: 'DESC' },
        });
        return {
            data: banners,
        };
    }
    async updateBanner(id, bannerDto) {
        await this.validateRedirects(bannerDto.redirect_id, bannerDto.redirect_type);
        const banner = await this.bannerRepository.findOne({ where: { id } });
        if (!banner) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['banner not found'],
                error: 'Not Found',
            });
        }
        try {
            await this.bannerRepository.update({ id }, {
                title: bannerDto.title,
                description: bannerDto.description,
                redirect_id: bannerDto.redirect_id,
                redirect_type: bannerDto.redirect_type,
            });
            return await this.bannerRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while updating the banner', error],
                error: 'Internal server error',
            });
        }
    }
    async deleteBanner(id) {
        const banner = await this.bannerRepository.findOne({ where: { id } });
        if (!banner) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['banner not found'],
                error: 'Not Found',
            });
        }
        try {
            await this.bannerRepository.softDelete(id);
            return { id: `${id}`, message: 'banner has been deleted' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while updating the banner', error],
                error: 'Internal server error',
            });
        }
    }
};
exports.BannersService = BannersService;
exports.BannersService = BannersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(banner_entity_1.Banner)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [banner_repository_1.BannerRepository,
        product_repository_1.ProductRepository,
        Category_repository_1.CategoryRepository])
], BannersService);
//# sourceMappingURL=banners.service.js.map