"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const banner_entity_1 = require("../banners/entities/banner.entity");
const faker_1 = require("@faker-js/faker");
const redirectTypes_enum_1 = require("../enums/redirectTypes.enum");
const status_enum_1 = require("../enums/status.enum");
const category_entity_1 = require("../categories/entities/category.entity");
const category_seed_1 = require("./static-data/category.seed");
const product_entity_1 = require("../products/entities/product.entity");
const productVariant_entity_1 = require("../products/entities/productVariant.entity");
const productPricing_entity_1 = require("../products/entities/productPricing.entity");
const variants_enum_1 = require("../enums/variants.enum");
const currency_enum_1 = require("../enums/currency.enum");
const collection_entity_1 = require("../collections/entities/collection.entity");
const CollectionRedirect_entity_1 = require("../collections/entities/CollectionRedirect.entity");
const collectionRedirectType_enum_1 = require("../enums/collectionRedirectType.enum");
const seedData = async (dataSource) => {
    await seedBannersData(dataSource);
    await seedCategoriesData(dataSource);
    await seedProductsData(dataSource);
    await seedCollectionsData(dataSource);
};
exports.seedData = seedData;
const seedBannersData = async (dataSource) => {
    await seedCategoriesData(dataSource);
    await seedProductsData(dataSource);
    const bannersRepository = dataSource.getRepository(banner_entity_1.Banner);
    const categoriesRepository = dataSource.getRepository(category_entity_1.Category);
    const productsRepository = dataSource.getRepository(product_entity_1.Product);
    const categories = await categoriesRepository.find();
    const products = await productsRepository.find();
    let bannersData = [];
    const bannersPublishedData = async () => {
        const categoryData = faker_1.faker.helpers.arrayElement(categories);
        const productsData = faker_1.faker.helpers.arrayElement(products);
        const bannersCategoryRedirect = bannersRepository.create({
            title: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            redirect_type: redirectTypes_enum_1.RedirectTypeEnum.Category,
            redirect_id: categoryData.id,
            image_url: './images/randomImage.png',
            is_active: faker_1.faker.datatype.boolean(),
            status: faker_1.faker.helpers.arrayElement([
                status_enum_1.StatusEnum.Published,
                status_enum_1.StatusEnum.Draft,
            ]),
        });
        const bannersProductRedirect = bannersRepository.create({
            title: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            redirect_type: redirectTypes_enum_1.RedirectTypeEnum.Product,
            redirect_id: productsData.id,
            image_url: './images/randomImage.png',
            is_active: faker_1.faker.datatype.boolean(),
            status: faker_1.faker.helpers.arrayElement([
                status_enum_1.StatusEnum.Published,
                status_enum_1.StatusEnum.Draft,
            ]),
        });
        return [bannersCategoryRedirect, bannersProductRedirect];
    };
    bannersData = [
        ...bannersData,
        ...(await Promise.all(Array.from({ length: 30 }, () => bannersPublishedData()))).flat(),
    ];
    await bannersRepository.save(bannersData);
};
const seedCategoriesData = async (dataSource) => {
    const categoryRepository = dataSource.getRepository(category_entity_1.Category);
    const reversedData = [...category_seed_1.categoryData].reverse();
    for (const categoryDataItem of reversedData) {
        let deviceCategory = await categoryRepository.findOneBy({
            title: categoryDataItem.title,
            parent_id: null,
        });
        if (!deviceCategory) {
            deviceCategory = await categoryRepository.save({
                title: categoryDataItem.title,
                status: faker_1.faker.helpers.arrayElement([
                    status_enum_1.StatusEnum.Published,
                    status_enum_1.StatusEnum.Draft,
                ]),
                is_active: faker_1.faker.datatype.boolean(),
            });
        }
        for (const skinTypeData of categoryDataItem.skinTypes) {
            let skinTypeCategory = await categoryRepository.findOneBy({
                title: skinTypeData.title,
                parent_id: deviceCategory.id,
            });
            if (!skinTypeCategory) {
                skinTypeCategory = await categoryRepository.save({
                    title: skinTypeData.title,
                    parent_id: deviceCategory.id,
                    status: faker_1.faker.helpers.arrayElement([
                        status_enum_1.StatusEnum.Published,
                        status_enum_1.StatusEnum.Draft,
                    ]),
                    is_active: faker_1.faker.datatype.boolean(),
                });
            }
            for (const subcategoryData of skinTypeData.subcategories) {
                const subCategory = await categoryRepository.findOneBy({
                    title: subcategoryData.title,
                    parent_id: skinTypeCategory.id,
                });
                if (!subCategory) {
                    await categoryRepository.save({
                        title: subcategoryData.title,
                        parent_id: skinTypeCategory.id,
                        status: faker_1.faker.helpers.arrayElement([
                            status_enum_1.StatusEnum.Published,
                            status_enum_1.StatusEnum.Draft,
                        ]),
                        is_active: faker_1.faker.datatype.boolean(),
                    });
                }
            }
        }
    }
};
const seedProductsData = async (datasource) => {
    const productsRepository = datasource.getRepository(product_entity_1.Product);
    const productVariantsRepository = datasource.getRepository(productVariant_entity_1.ProductVariant);
    const productPricingRepository = datasource.getRepository(productPricing_entity_1.ProductPricing);
    const categoryRepository = datasource.getRepository(category_entity_1.Category);
    const categories = await categoryRepository.find();
    let productsData = [];
    const productsSeedData = async () => {
        const categoryData = faker_1.faker.helpers.arrayElement(categories);
        return productsRepository.create({
            title: faker_1.faker.lorem.word(),
            description: faker_1.faker.lorem.words(),
            category_id: categoryData.id,
            status: faker_1.faker.helpers.arrayElement([
                status_enum_1.StatusEnum.Published,
                status_enum_1.StatusEnum.Draft,
            ]),
            is_active: faker_1.faker.datatype.boolean(),
        });
    };
    productsData = [
        ...productsData,
        ...(await Promise.all(Array.from({ length: 20 }, () => productsSeedData()))),
    ];
    const savedProducts = await productsRepository.save(productsData);
    for (const product of savedProducts) {
        const maxVariants = faker_1.faker.number.int({ min: 1, max: 3 });
        for (let i = 0; i < maxVariants; i++) {
            const variants = productVariantsRepository.create({
                product_id: product.id,
                color: faker_1.faker.helpers.arrayElement([
                    variants_enum_1.ProductVariantColorsEnum.Black,
                    variants_enum_1.ProductVariantColorsEnum.Red,
                    variants_enum_1.ProductVariantColorsEnum.Blue,
                    variants_enum_1.ProductVariantColorsEnum.Green,
                    variants_enum_1.ProductVariantColorsEnum.Orange,
                    variants_enum_1.ProductVariantColorsEnum.White,
                ]),
                size: faker_1.faker.helpers.arrayElement([
                    variants_enum_1.ProductVariantsSizeEnum.L,
                    variants_enum_1.ProductVariantsSizeEnum.M,
                    variants_enum_1.ProductVariantsSizeEnum.S,
                ]),
                in_stock: faker_1.faker.datatype.boolean(),
            });
            await productVariantsRepository.save(variants);
        }
    }
    const productVariantsData = await productVariantsRepository.find();
    for (const productVariant of productVariantsData) {
        const maxPricing = faker_1.faker.number.int({ min: 1, max: 3 });
        for (let i = 0; i < maxPricing; i++) {
            const pricing = productPricingRepository.create({
                variant_id: productVariant.id,
                country_code: faker_1.faker.location.countryCode(),
                currency: faker_1.faker.helpers.arrayElement([
                    currency_enum_1.CurrencyEnum.USD,
                    currency_enum_1.CurrencyEnum.INR,
                    currency_enum_1.CurrencyEnum.NPR,
                ]),
                price: faker_1.faker.number.float({ min: 50, max: 10000, fractionDigits: 2 }),
            });
            await productPricingRepository.save(pricing);
        }
    }
};
const seedCollectionsData = async (datasource) => {
    const collectionRepository = datasource.getRepository(collection_entity_1.Collection);
    const collectionRedirectRepository = datasource.getRepository(CollectionRedirect_entity_1.CollectionRedirect);
    const categoriesRepository = datasource.getRepository(category_entity_1.Category);
    const productsRepository = datasource.getRepository(product_entity_1.Product);
    const products = await productsRepository.find();
    const categories = await categoriesRepository.find();
    const createCollections = async () => {
        return collectionRepository.create({
            title: faker_1.faker.lorem.word(),
            status: faker_1.faker.helpers.arrayElement([
                status_enum_1.StatusEnum.Published,
                status_enum_1.StatusEnum.Draft,
            ]),
            image_url: './images/randomImage.png',
        });
    };
    let createdCollections = [];
    createdCollections = [
        ...createdCollections,
        ...(await Promise.all(Array.from({ length: 30 }, () => createCollections()))),
    ];
    const collectionsData = await collectionRepository.save(createdCollections);
    const collectionRedirectData = [];
    for (const collection of collectionsData) {
        const maxCollection = faker_1.faker.number.int({ min: 1, max: 2 });
        const categoryData = faker_1.faker.helpers.arrayElement(categories);
        const productData = faker_1.faker.helpers.arrayElement(products);
        for (let i = 0; i < maxCollection; i++) {
            collectionRedirectData.push(collectionRedirectRepository.create({
                collection_id: collection.id,
                redirect_id: categoryData.id,
                redirect_type: collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Category,
            }));
            collectionRedirectData.push(collectionRedirectRepository.create({
                collection_id: collection.id,
                redirect_id: productData.id,
                redirect_type: collectionRedirectType_enum_1.CollectionRedirectTypeEnum.Product,
            }));
        }
        await collectionRedirectRepository.save(collectionRedirectData);
    }
};
//# sourceMappingURL=seed-data.js.map