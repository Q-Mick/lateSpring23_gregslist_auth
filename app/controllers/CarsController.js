import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { carsService } from "../services/CarsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawCars() {
  console.log('the cars are drawing....')
  let template = ''

  AppState.cars.forEach(c => {
    template += c.CarCard
  })

  setHTML('app', template)
}


function _drawButton() {
  if (AppState.account) {
    setHTML('the-place-to-put-the-button', '<button class="btn btn-dark square" data-bs-toggle="modal" data-bs-target="#the-target-id" >OPEN THE MODAL</button>')
  }
}



export class CarsController {
  constructor() {
    setHTML('app', '<h1>🚙🌫️  vroom vroom </h1>')
    setHTML('modal-guts', Car.CarForm())
    _drawButton()

    // if you refresh on the carspage
    AppState.on('account', _drawButton)

    this.getCarsFromApi()
    AppState.on('cars', _drawCars)
    AppState.on('account', _drawCars)
  }

  async getCarsFromApi() {
    try {
      await carsService.getCarsFromApi()
    } catch (error) {
      Pop.error(error)
    }
  }


  async createCar() {
    try {
      // we are submitting a form.... 
      // @ts-ignore
      window.event.preventDefault()
      // 🛩️ target acquired
      // @ts-ignore
      const form = window.event.target
      // how do we extract the data from the form?
      const formData = getFormData(form)
      console.log('what is in the formData', formData)
      await carsService.createCar(formData)
      // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#the-target-id').hide()

    } catch (error) {
      Pop.error(error)
    }
  }


  async deleteCar(id) {
    try {

      const yes = await Pop.confirm('🤷‍♂️ Do you want to delete the car????')

      if (!yes) {
        return
      }

      // 💀 now we can delete the car
      await carsService.deleteCar(id)

    } catch (error) {
      Pop.error(error)
    }
  }








}