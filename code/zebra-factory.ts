import { Core } from "./core";

export class ZebraFactoryStatic {
    private z_core!: Core;

    public async create () {
        this.z_core = new Core();
    }

    public async init () {
        this.z_core.init();
    }
}


export const ZebraFactory = new ZebraFactoryStatic();