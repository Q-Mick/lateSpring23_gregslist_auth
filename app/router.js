import { AboutController } from "./controllers/AboutController.js";
import { CarsController } from "./controllers/CarsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { HousesController } from "./controllers/HousesController.js";

export const router = [
  {
    path: '',
    controller: HomeController
  },
  {
    path: '#/about',
    controller: AboutController
  },
  {
    path: '#/cars',
    controller: CarsController
  },
  {
    path: '#/houses',
    controller: HousesController
  }
]