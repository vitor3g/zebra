import { ZebraFactory } from "./code/zebra-factory";

async function bootstrap() {
  await ZebraFactory.create();
}

bootstrap();
