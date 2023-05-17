import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";

class HousesService{
  async CreateHouse(formData) {
    const res = await api.post('api/houses', formData)
    console.log('returned data -->', res.data)
    const newHouse = new House (res.data)
    AppState.houses.push(newHouse)
    AppState.emit('houses')
  }
  async getHousesFromApi() {
    const res = await api.get(`api/houses`) 
    // do mapping here
    // console.log(res);
  AppState.houses = res.data.map(h => new House(h))
  console.log(AppState.houses);
  }

}

export const housesService = new HousesService