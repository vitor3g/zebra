import fs from "node:fs";
import path from "node:path";
import { ResourcesStatic } from "./resources";
import { SString } from "../utils/shared.utils";
import yaml from "yaml";
import { Ajv } from "ajv";
import { manifestSchama } from "../common/manifest-schema";
import { ResourceStatic } from "./resource";

export interface Resource {
  name?: string;
  scripts: string[];
  author?: string;
  instance: ResourceStatic;
  sourceRoot: ResourceFolder;
}

type ResourceFolder = {
  folderName: string;
  sourceRoot: string;
};

export class Scanner {
  private readonly resources: Resource[] = [];
  private readonly ajv: Ajv;

  constructor(private readonly z_resources: ResourcesStatic) {
    this.ajv = new Ajv({
      allErrors: true,
      coerceTypes: true,
      removeAdditional: true,
    });
  }

  public async scan() {
    const resources = this.getScriptsFromFolder(
      this.z_resources.getCore.getMetadata.getResourceRoot
    );

    let resourcesLoaded = 0;

    for (let i = 0; i < resources.length; i++) {
      try {
        const resource = resources[i];

        const manifestPath = path.join(resource.sourceRoot, "manifest.yml");

        let rawManifest = fs.readFileSync(manifestPath, "utf8");
        rawManifest = yaml.parse(rawManifest);

        const isManifestValid = this.ajv.compile(manifestSchama);

        if (isManifestValid(rawManifest)) {
          const instance = new ResourceStatic({
            ...rawManifest.resource,
            sourceRoot: resource,
          } as Resource);

          resourcesLoaded++;

          this.resources.push({
            ...(rawManifest.resource as Resource),
            instance: instance,
            sourceRoot: resource,
          });

          this.z_resources.getLogger.log(
            SString("Resource '%s' started", resource.folderName)
          );
        } else {
          this.z_resources.getLogger.warn(
            SString(
              "Resource %s has no valid configuration",
              resource.folderName
            )
          );
        }
      } catch (error) {}
    }

    this.z_resources.getLogger.log(
      SString("%s resources has been loaded.", resourcesLoaded)
    );
  }

  private getScriptsFromFolder(root: string): ResourceFolder[] {
    const scripts: { folderName: string; sourceRoot: string }[] = [];

    if (!fs.existsSync(root)) {
      this.z_resources.getLogger.error(
        "It seems that the resources folder specified in sourceRoot doesn't exist"
      );
      return scripts;
    }

    const items = fs.readdirSync(root, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        const folderName = item.name;
        const manifestPath = path.join(root, folderName, "manifest.yml");

        if (fs.existsSync(manifestPath)) {
          const sourceRoot = path.join(root, folderName);
          scripts.push({ folderName: folderName, sourceRoot });
        }
      }
    }

    return scripts;
  }
}
