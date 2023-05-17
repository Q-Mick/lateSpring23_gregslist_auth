import { setHTML } from "../utils/Writer.js";
import { housesService } from "../services/HousesService.js";
import { House } from "../models/House.js";
import { Pop } from "../utils/Pop.js";
import { getFormData } from "../utils/FormHandler.js";
// import { setText } from "../utils/Writer.js";
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
    setHTML('modal-edit-guts', House.EditHouseForm())
    _drawButton()
    
    AppState.on('account', _drawButton)
    
    this.getHousesFromApi()
    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)
}

async deleteHouse(id){
  try {
    const yes = await Pop.confirm("Do you really want to delete the house?")
    if (!yes){
      return
    }
    // delete the house
    await housesService.deleteHouse(id)

  } catch (error) {
    Pop.error(error)
  }
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
      await housesService.createHouse(formData)
        // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#the-target-id').hide()
    } catch (error) {
      Pop.error(error)
      
    }
  }
  
  async editHouse(id){
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      const formData = getFormData(form)
      console.log('Form Data ---->', formData)
      await housesService.editHouse(formData, id)
        // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#the-target-id').hide()
    } catch (error) {
      Pop.error(error)
      
    }
  }

}