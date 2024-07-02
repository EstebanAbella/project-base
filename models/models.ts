export enum ServerStatus {
  IDLE,
  FETCH,
  FETCHING,
  FETCH_ERROR,
}

export type loggedUser = {
  name: string
  id: string
  email: string
  password: string
  role: string
  token?: string
}

export type clientListType = {
  name: string
  address: string
  id: string
  state: number
  debt: number
  bills: debtType[]
}

export type debtType = {
  id: string
  amount: number
  payments: string[]
  dueDate: number
}

export type itemType = {
  name: string
  id: number
  price: number
  quantity: number
  stock: number
}

export type itemClientType = {
  item: number
  quantity: number
  clientId: string
}

export type orderItemsType = {
  clientId: string
  items: Array<{
    target: number
    sold: number
    percentage: number
    type: orderType
  }>
}

export type orderType = 'goalPerDay' | 'goalPerMonth' | 'suggestedItems'

export type itemFullType = itemType & itemClientType

export const mocked_clients: clientListType[] = [
  {
    name: 'Armando Esteban Quito',
    address: '123 Main St',
    id: '1',
    state: 1, // debe
    debt: 0,
    bills: [
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
    ],
  },
  {
    name: 'Maria Gonzalez',
    address: '456 Oak St',
    id: '2',
    state: 1, // debe
    debt: 500,
    bills: [
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
    ],
  },
  {
    name: 'Juan Perez',
    address: '789 Pine St',
    id: '3',
    state: 1, // debe
    debt: 1000,
    bills: [
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
    ],
  },
  {
    name: 'Laura Martinez',
    address: '321 Maple St',
    id: '4',
    state: 1, // debe
    debt: 200,
    bills: [
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
    ],
  },
  {
    name: 'Carlos Ruiz',
    address: '654 Elm St',
    id: '5',
    state: 1, // debe
    debt: 700,
    bills: [
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
      {
        id: '007',
        amount: 5000,
        payments: ['008'],
        dueDate: 1630494000000,
      },
      {
        id: '008',
        amount: 3000,
        payments: ['009'],
        dueDate: 1630494000000,
      },
    ],
  },
]

export const mocked_users: loggedUser[] = [
  {
    name: 'Fernando',
    id: '1',
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin',
  },
  {
    name: 'Federico',
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

export const mocked_items: itemType[] = [
  {
    name: 'Item 1',
    id: 1,
    price: 100,
    quantity: 1,
    stock: 10,
  },
  {
    name: 'Item 2',
    id: 2,
    price: 200,
    quantity: 1,
    stock: 10,
  },
  {
    name: 'Item 3',
    id: 3,
    price: 300,
    quantity: 1,
    stock: 10,
  },
]

export const mocked_item_client: itemClientType[] = [
  {
    item: 1,
    quantity: 1,
    clientId: '1',
  },
  {
    item: 2,
    quantity: 1,
    clientId: '1',
  },
  {
    item: 3,
    quantity: 1,
    clientId: '1',
  },
]

export const mocked_orders: orderItemsType = {
  clientId: '1',
  items: [
    {
      target: 10000,
      sold: 5000,
      percentage: 30,
      type: 'goalPerDay',
    },
    {
      target: 10000,
      sold: 5000,
      percentage: 50,
      type: 'goalPerMonth',
    },
    {
      target: 10000,
      sold: 5000,
      percentage: 80,
      type: 'suggestedItems',
    },
  ],
}
