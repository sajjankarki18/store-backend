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
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const collection_entity_1 = require("./entities/collection.entity");
const collection_repository_1 = require("./repositories/collection.repository");
const CollectionRedirect_entity_1 = require("./entities/CollectionRedirect.entity");
const collectionRedirect_repository_1 = require("./repositories/collectionRedirect.repository");
const typeorm_1 = require("@nestjs/typeorm");
const status_enum_1 = require("../enums/status.enum");
const collectionRedirectType_enum_1 = require("../enums/collectionRedirectType.enum");
const category_entity_1 = require("../categories/entities/category.entity");
const Category_repository_1 = require("../categories/repositories/Category.repository");
const product_entity_1 = require("../products/entities/product.entity");
const product_repository_1 = require("../products/repositories/product.repository");
const typeorm_2 = require("typeorm");
let CollectionService = class CollectionService {
    constructor(collectionRepository, collectionRedirectRepository, categoryRepository, productRepository) {
        this.collectionRepository = collectionRepository;
        this.collectionRedirectRepository = collectionRedirectRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async createCollection(collectionDto) {
        try {
            const collection = this.collectionRepository.create({
                title: collectionDto.title,
                status: collectionDto.status || status_enum_1.StatusEnum.Draft,
                image_url: collectionDto.image_url,
            });
            return await this.collectionRepository.save(collection);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating colleciton', error],
                error: 'Internal server Error',
            });
        }
    }
    async findCollectionById(id) {
        const collection = await this.collectionRepository.findOne({
            where: { id },
        });
        if (!collection) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['collection not found!'],
                error: 'Not Found',
            });
        }
        return collection;
    }
    async searchCollection(query) {
        let searchedCollection = [];
        if (query) {
            searchedCollection = await this.collectionRepository.find({
                where: {
                    title: (0, typeorm_2.ILike)(`%${query}%`),
                },
            });
        }
        else {
            searchedCollection = await this.collectionRepository.find();
        }
        const totalSearchedCollection = searchedCollection.length;
        if (totalSearchedCollection === 0) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['no results for searched collections'],
                error: 'Not Found',
            });
        }
        return {
            data: searchedCollection,
            total: totalSearchedCollection,
        };
    }
    async fetchAllCollections({ page, limit, status, }) {
        if (Number(isNaN(page) || Number(isNaN(limit)) || page < 0 || limit < 0)) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: ['page and limit must of positive Integers!'],
                error: 'Bad Request',
            });
        }
        const new_limit = limit > 10 ? 10 : limit;
        const [collectionsData, totalCollections] = await this.collectionRepository.findAndCount({
            where: {
                status: !status || status.trim() === ''
                    ? (0, typeorm_2.In)([status_enum_1.StatusEnum.Published, status_enum_1.StatusEnum.Draft])
                    : status.trim().toLowerCase() === status_enum_1.StatusEnum.Published
                        ? status_enum_1.StatusEnum.Published
                        : status_enum_1.StatusEnum.Draft,
            },
            skip: (page - 1) * new_limit,
            take: new_limit,
            order: { created_at: 'DESC' },
        });
        return {
            data: collectionsData,
            page,
            limit: new_limit,
            total: totalCollections,
        };
    }
    async fetchCollectionsWithRedirects() {
        const collectionsRedirects = await this.collectionRedirectRepository.find();
        const collectionRedirectData = [];
        for (const redirect of collectionsRedirects) {
            let redirects = null;
            if (redirect.redirect_type === collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Category) {
                const categoryData = await this.productRepository.find({
                    where: {
                        category_id: redirect.redirect_id,
                    },
                });
                redirects = await Promise.all(categoryData.map(async (category) => {
                    return { title: category.title, id: category.id };
                }));
            }
            else if (redirect.redirect_type === collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Product) {
                const productsData = await this.productRepository.findOne({
                    where: {
                        id: redirect.redirect_id,
                    },
                });
                redirects = productsData
                    ? { title: productsData.title, id: productsData.id }
                    : { title: null, description: null };
            }
            collectionRedirectData.push({
                ...redirect,
                redirects,
            });
        }
        return { data: collectionRedirectData };
    }
    async fetchCollectionsRedirectDataFrontEnd() {
        const collections = await this.collectionRepository.find();
        const collectionRedirects = await this.collectionRedirectRepository.find();
        const categories = await this.categoryRepository.find();
        const collectionsDataArray = [];
        for (const collection of collections) {
            const productsDataArray = [];
            const redirectsData = collectionRedirects.filter((collectionRedirect) => {
                return collectionRedirect.collection_id === collection.id;
            });
            for (const redirect of redirectsData) {
                if (redirect.redirect_type === collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Category) {
                    const categoryData = await this.productRepository.find({
                        where: {
                            category_id: redirect.redirect_id,
                        },
                    });
                    productsDataArray.push(...categoryData);
                }
                else if (redirect.redirect_type === collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Product) {
                    const productData = await this.productRepository.findOne({
                        where: {
                            id: redirect.redirect_id,
                        },
                    });
                    productsDataArray.push(productData);
                }
            }
            collectionsDataArray.push({
                title: collection.title,
                products: productsDataArray.map((product) => {
                    const category = categories.find((category) => {
                        return category.id === product.category_id;
                    });
                    return {
                        id: product.id,
                        title: product.title,
                        category_id: category ? category.id : null,
                        name: category ? category.title : null,
                    };
                }),
            });
        }
        return {
            data: collectionsDataArray,
        };
    }
    async updateCollection(id, collectionDto) {
        const banner = await this.collectionRedirectRepository.findOne({
            where: { id },
        });
        if (!banner) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['collection not found'],
                error: 'Not Found',
            });
        }
        try {
            await this.collectionRepository.update({ id }, {
                title: collectionDto.title,
                status: collectionDto.status,
                image_url: collectionDto.image_url,
            });
            return await this.collectionRedirectRepository.findOne({ where: { id } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while updating the banner', error],
                error: 'Internal server error',
            });
        }
    }
    async deleteCollection(id) {
        const collection = await this.collectionRepository.findOne({
            where: { id },
        });
        if (!collection) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: ['collection not found'],
                error: 'Not Found',
            });
        }
        try {
            await this.collectionRepository.softDelete(id);
            return { id: `${id}`, message: 'collection has been deleted' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while updating the collection', error],
                error: 'Internal server error',
            });
        }
    }
    async createCollectionRedirect(collectionRedirectDto) {
        const collection = await this.collectionRepository.findOne({
            where: {
                id: collectionRedirectDto.collection_id,
            },
        });
        if (!collection) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: [
                    `collection with ${collectionRedirectDto.collection_id} not found`,
                ],
                error: 'Not Found',
            });
        }
        if (collectionRedirectDto.redirect_type &&
            collectionRedirectDto.redirect_id) {
            if (collectionRedirectDto.redirect_type ===
                collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Category) {
                const category = await this.categoryRepository.findOne({
                    where: {
                        id: collectionRedirectDto.redirect_id,
                    },
                });
                if (!category) {
                    throw new common_1.BadRequestException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: ['Invalid redirect id for category'],
                        error: 'Bad Request',
                    });
                }
            }
            else if (collectionRedirectDto.redirect_type ===
                collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Product) {
                const product = await this.productRepository.findOne({
                    where: {
                        id: collectionRedirectDto.redirect_id,
                    },
                });
                if (!product) {
                    throw new common_1.BadRequestException({
                        statusCode: common_1.HttpStatus.BAD_REQUEST,
                        message: ['Invalid redirect id for product'],
                        error: 'Bad Request',
                    });
                }
            }
        }
        else {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: ['redirect_id and redirect_type should not be empty!'],
                error: 'Bad Request',
            });
        }
        try {
            const collection_redirect = this.collectionRedirectRepository.create({
                collection_id: collectionRedirectDto.collection_id,
                redirect_id: collectionRedirectDto.redirect_id,
                redirect_type: collectionRedirectDto.redirect_type,
            });
            return await this.collectionRedirectRepository.save(collection_redirect);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ['some error occured while creating redirect', error],
                error: 'Internal server error',
            });
        }
    }
};
exports.CollectionService = CollectionService;
exports.CollectionService = CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collection_entity_1.Collection)),
    __param(1, (0, typeorm_1.InjectRepository)(CollectionRedirect_entity_1.CollectionRedirect)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [collection_repository_1.CollectionRepository,
        collectionRedirect_repository_1.CollectionredirectRepository,
        Category_repository_1.CategoryRepository,
        product_repository_1.ProductRepository])
], CollectionService);
//# sourceMappingURL=collection.service.js.map