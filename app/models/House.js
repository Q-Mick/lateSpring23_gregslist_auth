import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.id = data.id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get HouseCard() {
    return /*html*/ `
    <div class="col-md-4 my-3">
      <div class="card elevation-1">
        <img class="rounded-top" src="${this.imgUrl}" alt="house loading">
        <div class="card-body">
          <p class="fs-4 mb-2 d-flex justify-content-between">
            <span>
              Bedroom: ${this.bedrooms} Bathrooms: ${this.bathrooms}
            </span>
            <span>
            $${this.price}
            </span>
            <p>${this.description}</p>
          </p>
          <div class="d-flex align-items-center justify-content-between border-top pt-2">
              
          ${this.deleteButtonIfOwner}
          
              <div>
                <span class="text-capitalize">${this.creator.name}</span>
                <img class="rounded seller-picture" src="${this.creator.picture}" alt="${this.creator.name}">
              </div>
          </div>
        </div>
      </div>
    </div>
    `
  }

  get deleteButtonIfOwner() {
    if (this.creatorId != AppState.account?.id) {
      return ""
    }
    return /*html*/ `
    <button class="btn btn-danger"
    onclick="app.HousesController.deleteHouse('${this.id}')">delete</button>
    <button onclick="app.HousesController.editHouse('${this.id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#the-edit-id" >Edit</button>`
  }

  static HouseForm() {
    return /*html*/ `
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">List House</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <form onsubmit="app.HousesController.createHouse()">
      <div class="modal-body container-fluid">
        <section class="row">
          <div class="mb-3 col-4">
            <label for="make" class="form-label">Bedrooms</label>
            <input required minlength="1" maxlength="5" type="number" class="form-control" id="bedrooms" name="bedrooms"
              placeholder="Number of bedrooms">
          </div>
          <div class="mb-3 col-4">
            <label for="bathrooms" class="form-label">Bathrooms</label>
            <input required minlength="1" maxlength="20" type="number" class="form-control" id="bathrooms" name="bathrooms"
              placeholder="Bathrooms">
          </div>
          <div class="mb-3 col-4">
            <label for="year" class="form-label">Year</label>
            <input required min="1920" type="number" class="form-control" id="year" name="year"  placeholder="House Year">
          </div>
          <div class="mb-3 col-6">
            <label for="price" class="form-label">House Price</label>
            <input required min="2000" max="1000000" type="number" class="form-control" id="price" name="price"
              placeholder="House Price">
          </div>
          <div class="mb-3 col-6">
            <label for="levels" class="form-label">House Levels</label>
            <input required min="1" max="1000000" type="number" class="form-control" id="price" name="levels"
              placeholder="House levels">
          </div>
          <div class="mb-3 col-12">
            <label for="description" class="form-label">House Description</label>
            <input required minlength="3" maxlength="50" type="text" class="form-control" id="description" name="description"
              placeholder="house Description">
          </div>
          <div class="mb-3 col-12">
            <label for="imgUrl" class="form-label">House Image</label>
            <input required type="text" class="form-control" id="imgUrl" name="imgUrl" placeholder="House Image">
          </div>
        </section>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Create Listing</button>
      </div>
    </form>
    `
  }
  static EditHouseForm() {
    return /*html*/ `
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Listing</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <form onsubmit="app.HousesController.editHouse()">
      <div class="modal-body container-fluid">
        <section class="row">
          <div class="mb-3 col-4">
            <label for="make" class="form-label">Bedrooms</label>
            <input required minlength="1" maxlength="5" type="number" class="form-control" id="bedrooms" name="bedrooms"
              placeholder="Number of bedrooms">
          </div>
          <div class="mb-3 col-4">
            <label for="bathrooms" class="form-label">Bathrooms</label>
            <input required minlength="1" maxlength="20" type="number" class="form-control" id="bathrooms" name="bathrooms"
              placeholder="Bathrooms">
          </div>
          <div class="mb-3 col-4">
            <label for="year" class="form-label">Year</label>
            <input required min="1920" type="number" class="form-control" id="year" name="year"  placeholder="House Year">
          </div>
          <div class="mb-3 col-6">
            <label for="price" class="form-label">House Price</label>
            <input required min="2000" max="1000000" type="number" class="form-control" id="price" name="price"
              placeholder="House Price">
          </div>
          <div class="mb-3 col-6">
            <label for="levels" class="form-label">House Levels</label>
            <input required min="1" max="1000000" type="number" class="form-control" id="price" name="levels"
              placeholder="House levels">
          </div>
          <div class="mb-3 col-12">
            <label for="description" class="form-label">House Description</label>
            <input required minlength="3" maxlength="50" type="text" class="form-control" id="description" name="description"
              placeholder="house Description">
          </div>
          <div class="mb-3 col-12">
            <label for="imgUrl" class="form-label">House Image</label>
            <input required type="text" class="form-control" id="imgUrl" name="imgUrl" placeholder="House Image">
          </div>
        </section>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Edit Listing</button>
      </div>
    </form>
    `
  }
}
