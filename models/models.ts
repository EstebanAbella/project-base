import { TPermissionsObject } from "../interface/global"

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
  permissions?: TPermissionsObject
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
    name: "Admin",
    id: "1",
    email: "admin@admin.com",
    password: "admin",
    role: "admin",
    permissions: {
      users: ["view", "create", "update", "delete", "import", "export"],
      userSelected: ["view"],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "User",
    id: "2",
    email: "user@user.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "Natalia",
    id: "3",
    email: "natalia@gmail.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "Veronica",
    id: "4",
    email: "veronica@gmail.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "Leonidas",
    id: "5",
    email: "Leonidas@gmail.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "Eliseo",
    id: "6",
    email: "Eliseo@gmail.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "Gena",
    id: "7",
    email: "gena@gmail.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
  {
    name: "Viviana",
    id: "8",
    email: "Viviana@gmail.com",
    password: "user",
    role: "user",
    permissions: {
      users: [],
      userSelected: [],
      clients: ["view", "create", "update", "delete", "import", "export"],
    },
  },
]

export const mocked_clients: clientType[] = [
  {
    name: "Javier Roldano",
    address: "123 Main St",
    email: "javier@gmail.com",
    id: "1",
    userId: "2",
  },
  {
    name: "Maria Gonzalez",
    address: "456 Oak St",
    email: "maria@gmail.com",
    id: "2",
    userId: "2",
  },
  {
    name: "Juan Perez",
    address: "789 Pine St",
    email: "juan@gmail.com",
    id: "3",
    userId: "1",
  },
  {
    name: "Laura Martinez",
    address: "321 Maple St",
    email: "laura@gmail.com",
    id: "4",
    userId: "2",
  },
  {
    name: "Carlos Ruiz",
    address: "654 Elm St",
    email: "carlos@gmail.com",
    id: "5",
    userId: "3",
  },
  {
    name: "Fernando Lopez",
    address: "741 Cedar St",
    email: "fernando@gmail.com",
    id: "6",
    userId: "5",
  },
  {
    name: "Lucia Fernandez",
    address: "852 Birch St",
    email: "lucia@gmail.com",
    id: "7",
    userId: "4",
  },
  {
    name: "Sofia Morales",
    address: "963 Palm St",
    email: "sofia@gmail.com",
    id: "8",
    userId: "7",
  },
  {
    name: "Andres Ramirez",
    address: "159 Chestnut St",
    email: "andres@gmail.com",
    id: "9",
    userId: "6",
  },
  {
    name: "Paula Ortega",
    address: "753 Oakwood St",
    email: "paula@gmail.com",
    id: "10",
    userId: "8",
  },
  {
    name: "Roberto Sanchez",
    address: "147 Spruce St",
    email: "roberto@gmail.com",
    id: "11",
    userId: "9",
  },
  {
    name: "Gabriela Figueroa",
    address: "258 Poplar St",
    email: "gabriela@gmail.com",
    id: "12",
    userId: "10",
  },
  {
    name: "Miguel Herrera",
    address: "369 Sycamore St",
    email: "miguel@gmail.com",
    id: "13",
    userId: "3",
  },
  {
    name: "Patricia Diaz",
    address: "951 Redwood St",
    email: "patricia@gmail.com",
    id: "14",
    userId: "15",
  },
  {
    name: "Carmen Torres",
    address: "357 Aspen St",
    email: "carmen@gmail.com",
    id: "15",
    userId: "16",
  },
  {
    name: "Alejandro Vargas",
    address: "753 Beech St",
    email: "alejandro@gmail.com",
    id: "16",
    userId: "12",
  },
  {
    name: "Elena Castillo",
    address: "159 Maplewood St",
    email: "elena@gmail.com",
    id: "17",
    userId: "1",
  },
  {
    name: "Jorge Suarez",
    address: "864 Willow St",
    email: "jorge@gmail.com",
    id: "18",
    userId: "14",
  },
  {
    name: "Natalia Mendoza",
    address: "951 Juniper St",
    email: "natalia@gmail.com",
    id: "19",
    userId: "2",
  },
  {
    name: "Carlos Gomez",
    address: "753 Cedar Ln",
    email: "carlosg@gmail.com",
    id: "20",
    userId: "17",
  },
  {
    name: "Mariana Cruz",
    address: "864 Oakwood St",
    email: "mariana@gmail.com",
    id: "21",
    userId: "4",
  },
  {
    name: "Alberto Perez",
    address: "951 Maple St",
    email: "alberto@gmail.com",
    id: "22",
    userId: "6",
  },
  {
    name: "Valeria Silva",
    address: "753 Elmwood St",
    email: "valeria@gmail.com",
    id: "23",
    userId: "7",
  },
  {
    name: "Rodrigo Sosa",
    address: "753 Pinewood St",
    email: "rodrigo@gmail.com",
    id: "24",
    userId: "2",
  },
  {
    name: "Angela Torres",
    address: "951 Birchwood St",
    email: "angela@gmail.com",
    id: "25",
    userId: "5",
  },
  {
    name: "Santiago Vargas",
    address: "753 Cedarwood St",
    email: "santiago@gmail.com",
    id: "26",
    userId: "1",
  },
  {
    name: "Camila Herrera",
    address: "159 Redwood Ln",
    email: "camila@gmail.com",
    id: "27",
    userId: "8",
  },
  {
    name: "Martin Ortega",
    address: "357 Pine Ln",
    email: "martin@gmail.com",
    id: "28",
    userId: "14",
  },
  {
    name: "Florencia Diaz",
    address: "654 Oak Ln",
    email: "florencia@gmail.com",
    id: "29",
    userId: "15",
  },
  {
    name: "Gonzalo Figueroa",
    address: "753 Chestnut Ln",
    email: "gonzalo@gmail.com",
    id: "30",
    userId: "12",
  },
  {
    name: "Ana Ruiz",
    address: "951 Willow Ln",
    email: "ana@gmail.com",
    id: "31",
    userId: "10",
  },
  {
    name: "Oscar Lopez",
    address: "753 Spruce Ln",
    email: "oscar@gmail.com",
    id: "32",
    userId: "13",
  },
  {
    name: "Viviana Alvarez",
    address: "951 Aspen Ln",
    email: "viviana@gmail.com",
    id: "33",
    userId: "9",
  },
  {
    name: "Daniela Morales",
    address: "753 Maplewood Ln",
    email: "daniela@gmail.com",
    id: "34",
    userId: "17",
  },
  {
    name: "Diego Ramirez",
    address: "951 Birchwood Ln",
    email: "diego@gmail.com",
    id: "35",
    userId: "6",
  },
  {
    name: "Hector Sanchez",
    address: "753 Elm Ln",
    email: "hector@gmail.com",
    id: "36",
    userId: "19",
  },
  {
    name: "Alejandra Torres",
    address: "159 Oakwood Ln",
    email: "alejandra@gmail.com",
    id: "37",
    userId: "3",
  },
  {
    name: "Esteban Garcia",
    address: "753 Sycamore Ln",
    email: "esteban@gmail.com",
    id: "38",
    userId: "18",
  },
  {
    name: "Miriam Vargas",
    address: "951 Chestnut St",
    email: "miriam@gmail.com",
    id: "39",
    userId: "11",
  },
  {
    name: "Pablo Rojas",
    address: "753 Pine Ln",
    email: "pablo@gmail.com",
    id: "40",
    userId: "16",
  },
  {
    name: "Marcela Fernandez",
    address: "951 Maple Ln",
    email: "marcela@gmail.com",
    id: "41",
    userId: "5",
  },
  {
    name: "Fabian Alvarez",
    address: "753 Cedar Ln",
    email: "fabian@gmail.com",
    id: "42",
    userId: "13",
  },
  {
    name: "Renata Gomez",
    address: "951 Oak Ln",
    email: "renata@gmail.com",
    id: "43",
    userId: "8",
  },
  {
    name: "Pedro Castillo",
    address: "753 Birch Ln",
    email: "pedro@gmail.com",
    id: "44",
    userId: "7",
  },
  {
    name: "Carolina Cruz",
    address: "951 Redwood Ln",
    email: "carolina@gmail.com",
    id: "45",
    userId: "14",
  },
  {
    name: "Bruno Medina",
    address: "753 Elmwood Ln",
    email: "bruno@gmail.com",
    id: "46",
    userId: "18",
  },
  {
    name: "Isabel Ortiz",
    address: "951 Maplewood Ln",
    email: "isabel@gmail.com",
    id: "47",
    userId: "2",
  },
]
