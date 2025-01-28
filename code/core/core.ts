import { Logger } from "../common/logger";
import { ResourcesStatic } from "../resources";
import { Metadata } from "./metatada";

export class Core {
  private readonly z_logger: Logger;
  private readonly z_metadata: Metadata;
  private readonly z_resourcesStatic: ResourcesStatic

  constructor() {
    this.z_logger = new Logger("zebra-core");
    this.z_metadata = new Metadata(this);
    this.z_resourcesStatic = new ResourcesStatic(this);
  }

  public async init() {
    this.z_metadata.init();
    this.z_resourcesStatic.init();
    
    this.z_logger.log("Core has been initialized");
  }

  get getLogger(): Logger {
    return this.z_logger;
  }

  get getMetadata(): Metadata {
    return this.z_metadata;
  }

  get getResourcesStatic(): ResourcesStatic {
    return this.z_resourcesStatic;
  }
}
