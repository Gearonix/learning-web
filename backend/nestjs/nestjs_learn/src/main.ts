import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MainModule } from "./main.module";

const start = async () => {
  const PORT = process.env.PORT || 6868;
  const app = await NestFactory.create(MainModule)

  const config = new DocumentBuilder()
    .setTitle('some_title')
    .setDescription('some_description')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)



  await app.listen(PORT, () => console.log('server started at port ' + PORT))

}


start()
