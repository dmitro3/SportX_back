import {HttpException, Injectable} from '@nestjs/common';
import axios from "axios";
import {Repository} from "typeorm";
import {Maps} from "./maps.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";

@Injectable()
export class MapsService {
  private city = "Warsaw";
  private arrayPolygonId: any[] = [
    {
      city: this.city,
      region: "Ochota",
      id: 2534033
    },
    {
      city: this.city,
      region: "Bielany",
      id: 2531981
    },
    {
      city: this.city,
      region: "Bemowo",
      id: 2531595
    },
    {
      city: this.city,
      region: "Wawer",
      id: 2579782
    },
    {
      city: this.city,
      region: "Wesoła",
      id: 2579783
    },
    {
      city: this.city,
      region: "Wilanów",
      id: 2536108
    },
    {
      city: this.city,
      region: "Włochy",
      id: 2534035
    },
    {
      city: this.city,
      region: "Wola",
      id: 2531982
    },
    {
      city: this.city,
      region: "Żoliborz",
      id: 2531983
    },
    {
      city: this.city,
      region: "Praga-Południe",
      id: 2544288
    },
    {
      city: this.city,
      region: "Praga-Północ",
      id: 2553341
    },
    {
      city: this.city,
      region: "Rembertów",
      id: 2579781
    },
    {
      city: this.city,
      region: "Śródmieście",
      id: 2534036
    },
    {
      city: this.city,
      region: "Targówek",
      id: 2556630
    },
    {
      city: this.city,
      region: "Ursus",
      id: 2534034
    },
    {
      city: this.city,
      region: "Ursynów",
      id: 2536107
    },
    {
      city: this.city,
      region: "Mokotów",
      id: 2536106
    },
    {
      city: this.city,
      region: "Białołęka",
      id: 2556629
    }
  ];

  constructor(
    @InjectRepository(Maps)
    private readonly mapsRepository: Repository<Maps>,
    private readonly userService: UserService
  ) {
  }

  async getPolygon(): Promise<any> {
    for (let i = 0; i < this.arrayPolygonId.length; i++) {
      let coordinatePairs: any = [];
      await axios.get(`https://polygons.openstreetmap.fr/get_poly.py?id=${this.arrayPolygonId[i].id}&params=0`).then(async res => {
        let lines = res.data.split('\n').map(function (line: string) {
          return line.trim();
        }).filter(function (line: string | any[]) {
          return line.length > 0;
        });


        for (let i = 2; i < lines.length - 1; i++) { // Начинаем с 2, чтобы пропустить заголовок и число
          let coordinates = lines[i].split(/\s+/); // Разбиваем строку на координаты
          if (coordinates.length === 2) { // Проверяем, что есть ровно две координаты
            let pair = {
              longitude: parseFloat(coordinates[0]),
              latitude: parseFloat(coordinates[1])
            };
            coordinatePairs.push(pair);
          }
        }
      })
      const findRegion = await this.mapsRepository.findOne({
        where: {
          id: this.arrayPolygonId[i].id
        }
      })
      await this.mapsRepository.save({
        ...findRegion,
        id: this.arrayPolygonId[i].id,
        city: this.city,
        region: this.arrayPolygonId[i].region,
        array: coordinatePairs
      })
    }

  }

  async getList(): Promise<any> {
    const maps = await this.mapsRepository.find();
    return maps.map(el => {
      return {
        id: el.id,
        polygon: el.array.map((item: { longitude: any; latitude: any; }) => {
          console.log(item)
          return {
            longitude: item.longitude,
            latitude: item.latitude,
            isBuy: el.isBuy,
            id: el.id
          }
        })
      }
    })
  }

  async buyRegion(id: number, userId: string): Promise<any> {
    const user = await this.userService.findUser(userId)
    const region = await this.mapsRepository.findOne({
      where: {
        id: id,
        isBuy: false
      }
    })
    if (!region) {
      throw new HttpException("The region has already been purchased", 400)
    }

    if (region.amount > user.balance) {
      throw new HttpException("Not enough money", 400)
    }

    user.balance -= region.amount

    const maps = await this.mapsRepository.save({
      ...region,
      isBuy: true,
      userId: user.id
    })
    user.maps.push(maps);
    await this.userService.update(user);
  }
}
