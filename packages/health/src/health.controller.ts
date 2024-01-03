import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/')
@ApiTags('health')
export class HealthController {
    @Get()
    health() {
        return true;
    }
}
