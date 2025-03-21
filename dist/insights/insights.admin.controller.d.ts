import { InsightsService } from './insights.service';
export declare class InsightsController {
    private readonly insightsService;
    constructor(insightsService: InsightsService);
    getInSightsData(): Promise<{
        data: any[];
    }>;
}
