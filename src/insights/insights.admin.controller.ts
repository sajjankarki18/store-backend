import { Controller, Get } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller('/admin/insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  async getInSightsData() {
    return this.insightsService.getInSightsData();
  }
}
