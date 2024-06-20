import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SessionModule.forRoot({
      session: { secret: 'todo' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
