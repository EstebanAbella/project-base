import { clientListType, mocked_clients } from '../models/models'

export type globalType = {
  clientService?: ClientService
}

class ClientService {
  clients: clientListType[]

  constructor() {
    if ((global as globalType).clientService) {
      throw new Error('New instance cannot be created!!')
    } else {
      this.clients = mocked_clients
    }
    ;(global as globalType).clientService = this
  }

  validateClient(client: clientListType) {
    if (
      client.name == undefined ||
      client.name == null ||
      client.address == undefined ||
      client.address == null ||
      client.debt == undefined ||
      client.debt == null
    )
      return false
    return true
  }

  getAllClients() {
    return this.clients
  }

  updateClient(
    newClient: clientListType,
    options: { where: (client: clientListType) => boolean }
  ) {
    let returnClient: clientListType | undefined
    this.clients = this.clients.map((client) => {
      if (options.where(client)) {
        returnClient = newClient
        return newClient
      }
      return client
    })
    return returnClient
  }

  addClient(newClient: clientListType) {
    this.clients.push(newClient)
    return newClient
  }

  deleteClient(deleteClient: string) {
    this.clients.filter((client) => client.id !== deleteClient)
    return deleteClient
  }
}

let clientServiceSingleton
if (!(global as globalType).clientService)
  clientServiceSingleton = new ClientService()
else clientServiceSingleton = (global as globalType).clientService
export default clientServiceSingleton as ClientService
