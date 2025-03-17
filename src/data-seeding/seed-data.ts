import { DataSource } from 'typeorm';
import { Banner } from '../banners/entities/banner.entity';
import { faker } from '@faker-js/faker';
import { RedirectTypeEnum } from 'src/enums/redirectTypes.enum';
import { StatusEnum } from 'src/enums/status.enum';
import { Category } from '../categories/entities/category.entity';
import { categoryData } from './static-data/category.seed';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from '../products/entities/productVariant.entity';
import { ProductPricing } from 'src/products/entities/productPricing.entity';
import {
  ProductVariantColorsEnum,
  ProductVariantsSizeEnum,
} from 'src/enums/variants.enum';
import { CurrencyEnum } from 'src/enums/currency.enum';
import { Collection } from 'src/collections/entities/collection.entity';
import { CollectionRedirect } from 'src/collections/entities/CollectionRedirect.entity';
import { CollectionRedirectTypeEnum } from 'src/enums/collectionRedirectType.enum';

export const seedData = async (dataSource: DataSource): Promise<void> => {
  await seedBannersData(dataSource);
  await seedCategoriesData(dataSource);
  await seedProductsData(dataSource);
  await seedCollectionsData(dataSource);
};

const seedBannersData = async (dataSource: DataSource) => {
  await seedCategoriesData(dataSource);
  await seedProductsData(dataSource);

  const bannersRepository = dataSource.getRepository(Banner);
  const categoriesRepository = dataSource.getRepository(Category);
  const productsRepository = dataSource.getRepository(Product);

  const categories = await categoriesRepository.find();
  const products = await productsRepository.find();

  let bannersData: Banner[] = [];

  const bannersPublishedData = async (): Promise<Banner[]> => {
    const categoryData = faker.helpers.arrayElement(categories);
    const productsData = faker.helpers.arrayElement(products);

    /* seed banners redirect-category data */
    const bannersCategoryRedirect = bannersRepository.create({
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      redirect_type: RedirectTypeEnum.Category,
      redirect_id: categoryData.id,
      image_url: './images/randomImage.png',
      is_active: faker.datatype.boolean(),
      status: faker.helpers.arrayElement([
        StatusEnum.Published,
        StatusEnum.Draft,
      ]),
    });

    /* seed banners redirect-products data */
    const bannersProductRedirect = bannersRepository.create({
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      redirect_type: RedirectTypeEnum.Product,
      redirect_id: productsData.id,
      image_url: './images/randomImage.png',
      is_active: faker.datatype.boolean(),
      status: faker.helpers.arrayElement([
        StatusEnum.Published,
        StatusEnum.Draft,
      ]),
    });

    return [bannersCategoryRedirect, bannersProductRedirect];
  };

  bannersData = [
    ...bannersData,
    ...(
      await Promise.all(
        Array.from({ length: 30 }, () => bannersPublishedData()),
      )
    ).flat(),
  ];

  await bannersRepository.save(bannersData);
};

const seedCategoriesData = async (dataSource: DataSource) => {
  const categoryRepository = dataSource.getRepository(Category);

  const reversedData = [...categoryData].reverse();
  for (const categoryDataItem of reversedData) {
    // Insert Device Type: First Level
    let deviceCategory = await categoryRepository.findOneBy({
      title: categoryDataItem.title,
      parent_id: null,
    });

    if (!deviceCategory) {
      deviceCategory = await categoryRepository.save({
        title: categoryDataItem.title,
        status: faker.helpers.arrayElement([
          StatusEnum.Published,
          StatusEnum.Draft,
        ]),
        is_active: faker.datatype.boolean(),
      });
    }

    for (const skinTypeData of categoryDataItem.skinTypes) {
      // Insert Skin Type: Second Level
      let skinTypeCategory = await categoryRepository.findOneBy({
        title: skinTypeData.title,
        parent_id: deviceCategory.id,
      });

      if (!skinTypeCategory) {
        skinTypeCategory = await categoryRepository.save({
          title: skinTypeData.title,
          parent_id: deviceCategory.id,
          status: faker.helpers.arrayElement([
            StatusEnum.Published,
            StatusEnum.Draft,
          ]),
          is_active: faker.datatype.boolean(),
        });
      }

      for (const subcategoryData of skinTypeData.subcategories) {
        // Insert Specific Skin Type: Third Level
        const subCategory = await categoryRepository.findOneBy({
          title: subcategoryData.title,
          parent_id: skinTypeCategory.id,
        });

        if (!subCategory) {
          await categoryRepository.save({
            title: subcategoryData.title,
            parent_id: skinTypeCategory.id,
            status: faker.helpers.arrayElement([
              StatusEnum.Published,
              StatusEnum.Draft,
            ]),
            is_active: faker.datatype.boolean(),
          });
        }
      }
    }
  }
};

const seedProductsData = async (datasource: DataSource) => {
  const productsRepository = datasource.getRepository(Product);
  const productVariantsRepository = datasource.getRepository(ProductVariant);
  const productPricingRepository = datasource.getRepository(ProductPricing);

  const categoryRepository = datasource.getRepository(Category);
  const categories = await categoryRepository.find();

  let productsData: Product[] = [];

  const productsSeedData = async () => {
    const categoryData = faker.helpers.arrayElement(categories);

    return productsRepository.create({
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      category_id: categoryData.id,
      status: faker.helpers.arrayElement([
        StatusEnum.Published,
        StatusEnum.Draft,
      ]),
      is_active: faker.datatype.boolean(),
    });
  };

  productsData = [
    ...productsData,
    ...(await Promise.all(
      Array.from({ length: 20 }, () => productsSeedData()),
    )),
  ];

  const savedProducts = await productsRepository.save(productsData);

  for (const product of savedProducts) {
    const maxVariants = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < maxVariants; i++) {
      const variants = productVariantsRepository.create({
        product_id: product.id,
        color: faker.helpers.arrayElement([
          ProductVariantColorsEnum.Black,
          ProductVariantColorsEnum.Red,
          ProductVariantColorsEnum.Blue,
          ProductVariantColorsEnum.Green,
          ProductVariantColorsEnum.Orange,
          ProductVariantColorsEnum.White,
        ]),
        size: faker.helpers.arrayElement([
          ProductVariantsSizeEnum.L,
          ProductVariantsSizeEnum.M,
          ProductVariantsSizeEnum.S,
        ]),
        in_stock: faker.datatype.boolean(),
      });

      await productVariantsRepository.save(variants);
    }
  }

  const productVariantsData = await productVariantsRepository.find();

  for (const productVariant of productVariantsData) {
    const maxPricing = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < maxPricing; i++) {
      const pricing = productPricingRepository.create({
        variant_id: productVariant.id,
        country_code: faker.location.countryCode(),
        currency: faker.helpers.arrayElement([
          CurrencyEnum.USD,
          CurrencyEnum.INR,
          CurrencyEnum.NPR,
        ]),
        price: faker.number.float({ min: 50, max: 10000, fractionDigits: 2 }),
      });

      await productPricingRepository.save(pricing);
    }
  }
};

const seedCollectionsData = async (datasource: DataSource) => {
  const collectionRepository = datasource.getRepository(Collection);
  const collectionRedirectRepository =
    datasource.getRepository(CollectionRedirect);

  const categoriesRepository = datasource.getRepository(Category);
  const productsRepository = datasource.getRepository(Product);

  const products = await productsRepository.find();
  const categories = await categoriesRepository.find();

  const createCollections = async () => {
    return collectionRepository.create({
      title: faker.lorem.word(),
      status: faker.helpers.arrayElement([
        StatusEnum.Published,
        StatusEnum.Draft,
      ]),
      image_url: './images/randomImage.png',
    });
  };

  let createdCollections: Collection[] = [];

  createdCollections = [
    ...createdCollections,
    ...(await Promise.all(
      Array.from({ length: 30 }, () => createCollections()),
    )),
  ];

  const collectionsData = await collectionRepository.save(createdCollections);

  const collectionRedirectData: CollectionRedirect[] = [];

  for (const collection of collectionsData) {
    const maxCollection = faker.number.int({ min: 1, max: 2 });

    const categoryData = faker.helpers.arrayElement(categories);
    const productData = faker.helpers.arrayElement(products);

    for (let i = 0; i < maxCollection; i++) {
      /* category-redirect data */
      collectionRedirectData.push(
        collectionRedirectRepository.create({
          collection_id: collection.id,
          redirect_id: categoryData.id,
          redirect_type: CollectionRedirectTypeEnum.Category,
        }),
      );

      /* product-redirect data */
      collectionRedirectData.push(
        collectionRedirectRepository.create({
          collection_id: collection.id,
          redirect_id: productData.id,
          redirect_type: CollectionRedirectTypeEnum.Product,
        }),
      );
    }

    await collectionRedirectRepository.save(collectionRedirectData);
  }
};
