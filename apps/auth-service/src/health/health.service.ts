import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
    async check() {
        return {
            status: 'ok',
            message: 'Service is running',
        };
    }
}