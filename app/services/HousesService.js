import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";

class HousesService{
  async editHouse(formData,id) {
      const res = await api.put('api/houses', formData)
      console.log('returned data -->', res.data)
      // Find the house to update in AppState.houses
      // const houseToUpdate = AppState.houses.findIndex(h => h.id === formData.id);
      // AppState.houses[houseToUpdate] = res.data;
      // AppState.emit('houses')
    }

  async deleteHouse(id){
    const res = await api.delete(`api/houses/${id}`)
    console.log("Did the house get removed?", res.data)
    AppState.houses = AppState.houses.filter(h=> h.id != id)
  }
  async createHouse(formData) {
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