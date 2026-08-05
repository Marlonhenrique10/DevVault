import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
    async getStatus() {
        return {
            status: "ok",
            service: "auth-service",
            version: "1.0.0",
            timestamp: new Date().toISOString(),
        };
    }
}