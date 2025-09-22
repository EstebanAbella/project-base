import { clientType, mocked_clients } from '../models/models'

export type globalType = {
  clientService?: ClientService
}

let currentId = 1
class ClientService {
  clients: clientType[]

  constructor() {
    if ((global as globalType).clientService) {
      throw new Error('New instance cannot be created!!')
    } else {
      this.clients = mocked_clients
      if (this.clients.length > 0) {
        currentId = Math.max(...this.clients.map(client => parseInt(client.id || '0'))) + 1
      }
    }
    ;(global as globalType).clientService = this
  }

  validateClient(client: clientType) {
    if (
      client.name == undefined ||
      client.name == null ||
      client.address == undefined ||
      client.address == null ||
      client.email == undefined ||
      client.email == null ||
      client.userId == undefined ||
      client.userId == null
    )
      return false
    return true
  }

  getAllClients() {
    return this.clients
  }

  updateClient(
    newClient: clientType,
    options: { where: (client: clientType) => boolean }
  ) {
    let returnClient: clientType | undefined
    this.clients = this.clients.map((client) => {
      if (options.where(client)) {
        returnClient = newClient
        return newClient
      }
      return client
    })
    return returnClient
  }

  addClient(newClient: clientType) {
    newClient.id = currentId.toString()
    currentId++
    this.clients.push(newClient)
    return newClient
  }

  deleteClient(id: string): clientType | undefined {
    const clientIndex = this.clients.findIndex((client) => client.id === id)
    if (clientIndex !== -1) {
      const deletedClient = this.clients.splice(clientIndex, 1)[0]
      return deletedClient
    }
    return undefined
  }
}

let clientServiceSingleton
if (!(global as globalType).clientService)
  clientServiceSingleton = new ClientService()
else clientServiceSingleton = (global as globalType).clientService
export default clientServiceSingleton as ClientService
