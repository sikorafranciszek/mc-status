import { Injectable } from '@nestjs/common';
import { status } from 'minecraft-server-util';
import * as dns from 'dns/promises';

@Injectable()
export class MinecraftService {
  private formatLatency(ms: number): string {
    if (ms < 100) {
      return `${ms}ms`;
    } else if (ms < 1000) {
      return `${(ms / 100).toFixed(1)}ms`;
    } else {
      return `${(ms / 1000).toFixed(2)}s`;
    }
  }

  private async getMinecraftPort(hostname: string): Promise<{ host: string; port: number }> {
    try {
      const records = await dns.resolveSrv(`_minecraft._tcp.${hostname}`);
      if (records && records.length > 0) {
        return {
          host: records[0].name,
          port: records[0].port
        };
      }
    } catch (err) {
      // If SRV record doesn't exist, return default values
      return {
        host: hostname,
        port: 25565
      };
    }
    return {
      host: hostname,
      port: 25565
    };
  }

  async getServerStatus(ip: string) {
    try {
      const { host, port } = await this.getMinecraftPort(ip);
      const startTime = Date.now();
      const response = await status(host, port, { timeout: 5000 });
      const latency = Date.now() - startTime;
      
      return {
        online: true,
        host: ip,
        resolvedHost: host,
        port: port,
        latency: {
          ms: latency,
          readable: this.formatLatency(latency)
        },
        version: response.version.name,
        players: {
          online: response.players.online,
          max: response.players.max,
          sample: response.players.sample || []
        },
        motd: response.motd.clean,
        favicon: response.favicon
      };
    } catch (err) {
      return {
        online: false,
        host: ip,
        error: err.message
      };
    }
  }
}
