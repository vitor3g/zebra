import { LuaEngine } from "wasmoon";
import { ResourceStatic } from "./resource";
import fs from "fs";

export class ScriptStatic {
  private vm!: LuaEngine;

  constructor(
    private readonly z_resource: ResourceStatic,
    private readonly sourceRoot: string
  ) {
    this.start();
  }

  public async start() {
    this.vm = await this.z_resource.getFactory.createEngine();

    const fileRaw = fs.readFileSync(this.sourceRoot, "utf-8");

    this.vm.global.set("print", (str: string) => this.z_resource.getLogger.log(str));

    this.vm.doString(fileRaw);
  }

  get getLuaVM() {
    return this.vm;
  }
}
