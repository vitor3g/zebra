import { SString } from "../utils/shared.utils";
import { Core } from "./core";
import * as fs from "fs";
import * as path from "path";

interface MetadataSampleConfig {
    app: string;
    sourceRoot: string,
    resources: string[]
}

export class Metadata {
  private readonly config: Readonly<MetadataSampleConfig>;

  constructor(private readonly z_core: Core) {
    const configPath = path.join(process.cwd(), "zebra-cli.json");
    this.config = this.loadConfig(configPath);
  }

  private loadConfig(filePath: string): Readonly<any> {
    try {
      const rawData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(rawData);
    } catch (error) {
      throw this.z_core.getLogger.error(
        "Failed to load the configuration file: " + error
      );
    }
  }

  public init() {
    this.z_core.getLogger.log(SString("App(%s) metadata loaded", this.config.app));
  }

  get getOriginalConfig() {
    return this.config;
  }

  get getResourceRoot() {
    return path.join(process.cwd(), this.config.sourceRoot);
  }
}
