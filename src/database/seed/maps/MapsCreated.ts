import {MapsService} from "../../../maps/maps.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MapsCreated {

    constructor(private readonly mapsService: MapsService) {
    }

    async run() {
        await this.mapsService.getPolygon();
    }
}
