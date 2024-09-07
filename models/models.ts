export enum ServerStatus {
  IDLE,
  FETCH,
  FETCHING,
  FETCH_ERROR,
}

export type Paginator<T> = {
  items: T[]
  count: number
  actualPage: number
  pages: number
}

export type loggedUser = {
  name: string
  id?: string
  email: string
  password: string
  role: string
  token?: string
}

export type clientType = {
  name: string
  address: string
  email: string
  id: string
  userId: string
}

export const mocked_users: loggedUser[] = [
  {
    name: 'Admin',
    id: '1',
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin',
  },
  {
    name: 'User',
    id: '2',
    email: 'user@user.com',
    password: 'user',
    role: 'user',
  },
  {
    name: 'Natalia',
    id: '3',
    email: 'natalia@user.com',
    password: 'user',
    role: 'user',
  },
  {
    name: 'Veronica',
    id: '4',
    email: 'veronica@user.com',
    password: 'user',
    role: 'user',
  },
  {
    name: 'borrar',
    id: '5',
    email: 'borrar@user.com',
    password: 'user',
    role: 'user',
  },
  {
    name: 'borrar',
    id: '6',
    email: 'borrar@user.com',
    password: 'user',
    role: 'user',
  },
  {
    name: 'borrar',
    id: '7',
    email: 'borrar@user.com',
    password: 'user',
    role: 'user',
  },
  {
    name: 'borrar',
    id: '8',
    email: 'borrar@user.com',
    password: 'user',
    role: 'user',
  },
]

export const mocked_clients: clientType[] = [
  {
    name: 'Javier Roldano',
    address: '123 Main St',
    email: 'javier@gmail.com',
    id: '1',
    userId: '2'
  },
  {
    name: 'Maria Gonzalez',
    address: '456 Oak St',
    email: 'maria@gmail.com',
    id: '2',
    userId: '2'
  },
  {
    name: 'Juan Perez',
    address: '789 Pine St',
    email: 'juan@gmail.com',
    id: '3',
    userId: '1'
  },
  {
    name: 'Laura Martinez',
    address: '321 Maple St',
    email: 'laura@gmail.com',
    id: '4',
    userId: '2'
  },
  {
    name: 'Carlos Ruiz',
    address: '654 Elm St',
    email: 'carlos@gmail.com',
    id: '5',
    userId: '3'
  },
]
