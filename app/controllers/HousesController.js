import { setHTML } from "../utils/Writer.js";
import { housesService } from "../services/HousesService.js";
import { House } from "../models/House.js";
import { Pop } from "../utils/Pop.js";
import { getFormData } from "../utils/FormHandler.js";
import { setText } from "../utils/Writer.js";
import { AppState } from "../AppState.js";

function _drawHouses(){
  console.log("Drawing the 🏚️'s");
  let template = ''
  AppState.houses.forEach(h => {
    template += h.HouseCard
  })
  // console.log(template);
  setHTML('app', template)
}

function _drawButton(){
  if (AppState.account) {
    setHTML('the-place-to-put-the-button','<button class="btn btn-dark square" data-bs-toggle="modal" data-bs-target="#the-target-id" >OPEN THE MODAL</button>')
    
  }
}
export class HousesController{

  constructor(){
    setHTML('app', "<h1>🏠🛖🏚️🏡🏘️</h1>")
    setHTML('modal-guts', House.HouseForm())
    _drawButton()
    
    AppState.on('account', _drawButton)
    
    this.getHousesFromApi()
    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)
}
  async getHousesFromApi() {
    try {
      await housesService.getHousesFromApi()
    } catch (error) {
      Pop.error(error)
    }
  }

  async createHouse(){
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      const formData = getFormData(form)
      console.log('Form Data ---->', formData)
      await housesService.CreateHouse(formData)
    } catch (error) {
      Pop.error(error)
      
    }
  }


}