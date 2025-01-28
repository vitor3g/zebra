import { Logger } from "./common/logger";
import { Core } from "./core";

export class ZebraFactoryStatic {
  private z_core!: Core;

  public async create() {
    this.z_core = new Core();

    this.init();
  }

  public async init() {
    this.z_core.init();
  }
}

export const ZebraFactory = new ZebraFactoryStatic();
