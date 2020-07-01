import { Controller, Get, Param, Res } from '@nestjs/common'

@Controller()
export class AppController {

  @Get('/i/:path')
  getImage(@Param('path') image, @Res() res): void {
    res.sendFile(image, { root: 'uploads' })
  }
}
