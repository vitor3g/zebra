import { Logger } from "../common/logger";
import { Core } from "../core";
import { Scanner } from "./scanner";

export class ResourcesStatic {
  private readonly z_logger: Logger;
  private readonly z_scanner: Scanner;

  constructor(private readonly z_core: Core) {
    this.z_logger = new Logger("zebra-resources");
    this.z_scanner = new Scanner(this);
  }

  public async init() {
    this.z_scanner.scan();
  }

  get getLogger (): Logger {
    return this.z_logger;
  }

  get getCore (): Core {
    return this.z_core;
  }
}
