import {UserService} from "../../user/user.service";
import {CanActivate, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Socket} from 'socket.io';

@Injectable()
export class LocationGuard implements CanActivate {

    constructor(private userService: UserService) {
    }

    canActivate(
        context: any,
    ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
        const client: Socket = context.switchToWs().getClient();
        console.log(client)

        return true
    }
}