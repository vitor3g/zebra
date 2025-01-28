import { LuaEngine, LuaFactory } from "wasmoon";
import { Logger } from "../common/logger";
import { Resource } from "./scanner";
import { ScriptStatic } from "./script";
import path from "path";

export interface Script {
  instance: ScriptStatic;
  lua_vm: LuaEngine;
  path: string;
}

export class ResourceStatic {
  private readonly z_factory: LuaFactory;
  private readonly z_logger: Logger;
  private readonly scripts: Script[] = [];

  constructor(private readonly resource: Resource) {
    this.z_logger = new Logger(`script::${resource.sourceRoot.folderName}`);
    this.z_factory = new LuaFactory();

    this.init();
  }

  private async init() {
    for (let i = 0; i < this.resource.scripts.length; i++) {
      const script = this.resource.scripts[i];
      const scriptPath = path.join(this.resource.sourceRoot.sourceRoot, script);
      const instance = new ScriptStatic(this, scriptPath);

      this.scripts.push({
        instance: instance,
        lua_vm: instance.getLuaVM,
        path: scriptPath,
      });
    }
  }

  get getFactory() {
    return this.z_factory;
  }

  get getLogger() {
    return this.z_logger;
  }
}
