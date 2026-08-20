import { Controller, Get ,Param} from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
    constructor(private readonly marketService: MarketService) {

    }
    @Get()
    getMarkets() {
        return this.marketService.getTickers();
    }

    @Get(':symbol')
    getMarket(@Param('symbol') symbol: string) {
        return this.marketService.getTicker(symbol);
    }
}
