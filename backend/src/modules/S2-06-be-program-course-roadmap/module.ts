import { Module } from '@nestjs/common'
import { S206BeProgramCourseRoadmapController } from './controller'
import { S206BeProgramCourseRoadmapService } from './service'

@Module({ controllers: [S206BeProgramCourseRoadmapController], providers: [S206BeProgramCourseRoadmapService], exports: [S206BeProgramCourseRoadmapService] })
export class S206BeProgramCourseRoadmapModule {}
