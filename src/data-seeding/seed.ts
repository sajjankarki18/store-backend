import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { seedData } from './seed-data';

const runSeedData = async () => {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await seedData(dataSource);
  await app.close();
};

runSeedData();
