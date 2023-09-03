import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {MapsService} from "./maps.service";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";

@Controller('maps')
export class MapsController {

  constructor(private readonly mapsService: MapsService) {
  }

  @Get("/polygons")
  async getPolygons(@Req() req, @Res() res): Promise<any[]> {
    return res.send(await this.mapsService.getList())
  }

  @UseGuards(JwtAuthGuard)
  @Post("/buy")
  async buy(@Req() req, @Res() res, @Body("regionId") regionId): Promise<any[]> {
    console.log(req.user)
    await this.mapsService.buyRegion(regionId, req.user.id);
    return res.send({
      success: true
    })
  }


}
