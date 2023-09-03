import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {
  }


  @UseGuards(JwtAuthGuard)
  @Get("/me")
  getMe(@Req() req): any {
    console.log(req.user)
    return req.user;
  }

  @Post("/update")
  @UseGuards(JwtAuthGuard)
  async update(@Req() req, @Res() res, @Body() body): Promise<any> {
    await this.userService.updateBalance(req.user, body.amount);

    return res.send({
      success: true
    })
  }
}
