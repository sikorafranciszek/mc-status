import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable Helmet
  app.use(helmet());
  
  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Trust proxy to get real IP
  app.getHttpAdapter().getInstance().set('trust proxy', true);
  
  await app.listen(3000);
}
bootstrap();
