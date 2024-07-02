import jsonwebtoken from 'jsonwebtoken'

import { itemType, mocked_items, mocked_item_client } from '../models/models'

export type globalType = {
  itemService?: ItemService
}

class ItemService {
  items: itemType[]

  constructor() {
    if ((global as globalType).itemService) {
      throw new Error('New instance cannot be created!!')
    } else {
      this.items = mocked_items
    }
    ;(global as globalType).itemService = this
  }

  validateItem(item: itemType) {
    if (
      item.name == undefined ||
      item.name == null ||
      item.price == undefined ||
      item.price == null ||
      item.quantity == undefined ||
      item.quantity == null ||
      item.stock == undefined ||
      item.stock == null
    )
      return false
    return true
  }

  getAllItems() {
    return this.items
  }

  getItemsByClientId(clientId: string) {
    return mocked_item_client
      .filter((item) => item.clientId === clientId)
      .map((item) => {
        return {
          ...this.items.find((i) => parseInt(i.id) === item.item),
          quantity: item.quantity,
        }
      })
  }

  updateItem(
    newItem: itemType,
    options: { where: (item: itemType) => boolean }
  ) {
    let returnItem: itemType | undefined
    this.items = this.items.map((item) => {
      if (options.where(item)) {
        returnItem = newItem
        return newItem
      }
      return item
    })
    return returnItem
  }

  addItem(newItem: itemType) {
    this.items.push(newItem)
    return newItem
  }

  deleteItem(deleteItem: string) {
    this.items.filter((item) => item.id !== deleteItem)
    return deleteItem
  }
}

let itemServiceSingleton
if (!(global as globalType).itemService)
  itemServiceSingleton = new ItemService()
else itemServiceSingleton = (global as globalType).itemService
export default itemServiceSingleton as ItemService
