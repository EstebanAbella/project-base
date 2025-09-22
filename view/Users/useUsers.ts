import { useEffect, useMemo, useState } from "react"
import { ServerStatus } from "../../interface/global"
import { TextFieldType } from "../../components/TextField/TextField"
import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useGetUser,
  useGetUsers,
} from "./useUsersData"
import { UseCallOfTables } from "../../hooks/useCallOfTables"

export const useUsers = () => {
  const [stateModal, setStateModal] = useState<{
    type: string
    state: boolean
  }>({ type: "", state: false })
  const [typeModal, setTypeModal] = useState<string>("")
  const [dataInitialModal, setDataInitialModal] = useState()
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)
  const limit = 5
  const order = "ASC"

  const { useGetUsersHandler, useGetUsersData, useGetUsersStatus } =
    useGetUsers()

  const { useGetUserHandler, useGetUserData, useGetUserStatus } = useGetUser()

  const { useCreateUserHandler, useCreateUserData, useCreateUserStatus } =
    useCreateUser()

  const { useEditUserHandler, useEditUserData, useEditUserStatus } =
    useEditUser()

  const { useDeleteUserHandler, useDeleteUserData, useDeleteUserStatus } =
    useDeleteUser()

  const totalItems = useMemo(() => {
    return useGetUsersData?.count ?? 0
  }, [useGetUsersData?.count])
  const roles = useGetUserData?.role

  UseCallOfTables({
    offsetState,
    limit,
    query,
    filter,
    order,
    roles,
    action: (
      offset: number,
      limit?: number,
      query?: string,
      filter?: string,
      order?: string,
      roles?: string
    ) => useGetUsersHandler(offset, limit, query, filter, order, roles),
    setOffsetState,
  })

  useEffect(() => {
    useGetUserHandler
  }, [])

  useEffect(() => {
    useGetUsersHandler(
      offsetState,
      limit,
      query ?? "",
      filter ?? "",
      order ?? "",
      roles ?? ""
    )
  }, [])

  useEffect(() => {
    if (useCreateUserStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems
      const isLastPage = offsetState + limit >= anticipatedTotalItems
      if (isLastPage && totalItems % limit === 0) {
        setOffsetState((prevOffset) => prevOffset + limit)
      } else {
        useGetUsersHandler(
          offsetState,
          limit,
          query ?? "",
          filter ?? "",
          order ?? "",
          roles ?? ""
        )
      }
      setStateModal({ type: "", state: false })
    }
  }, [useCreateUserStatus])

  useEffect(() => {
    if (useDeleteUserStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems - 1
      const isLastPage = offsetState + limit >= anticipatedTotalItems

      if (
        isLastPage &&
        anticipatedTotalItems <= offsetState &&
        offsetState > 0
      ) {
        setOffsetState((prevOffset) => prevOffset - limit)
      } else {
        useGetUsersHandler(
          offsetState,
          limit,
          query ?? "",
          filter ?? "",
          order ?? "",
          roles ?? ""
        )
      }
      setStateModal({ type: "", state: false })
    }
  }, [useDeleteUserStatus])

  useEffect(() => {
    if (useEditUserStatus === ServerStatus.FETCH) {
      useGetUsersHandler(
        offsetState,
        limit,
        query ?? "",
        filter ?? "",
        order ?? "",
        roles ?? ""
      )
      setStateModal({ type: "", state: false })
    }
  }, [useEditUserStatus])

  const createUserObject = useMemo(
    () => [
      {
        label: "Name",
        name: "name",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "text",
        placeholder: "Write your name",
      },
      {
        label: "E-mail",
        name: "email",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "email",
        placeholder: "email@email.com",
      },
      {
        label: "Password",
        name: "password",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "password",
        placeholder: "Password",
      },
      {
        label: "Role",
        name: "role",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "select",
        placeholder: "-",
        valueSelect: ["user", "admin"],
      },
      {
        label: "Permissions",
        name: "permissions",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "checkboxModule",
        placeholder: "-",
        moduleName: {
          users: ["view", "create", "update", "delete", "import", "export"],
          userSelected: ["view", "import", "export"],
          clients: ["view", "create", "update", "delete", "import", "export"],
        },
      },
    ],
    []
  )

  const editUserObject = useMemo(
    () => [
      {
        label: "Name",
        name: "name",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "text",
        placeholder: "Write your name",
      },
      {
        label: "E-mail",
        name: "email",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "email",
        placeholder: "email@email.com",
      },
      {
        label: "Password",
        name: "password",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "password",
        placeholder: "Password",
      },
      {
        label: "Role",
        name: "role",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "select",
        placeholder: "-",
        valueSelect: ["user", "admin"],
      },
      {
        label: "Permissions",
        name: "permissions",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "checkboxModule",
        placeholder: "-",
        moduleName: {
          users: ["view", "create", "update", "delete", "import", "export"],
          userSelected: ["view", "import", "export"],
          clients: ["view", "create", "update", "delete", "import", "export"],
        },
      },
    ],
    []
  )

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "create") {
      setTypeModal("create")
      setStateModal({ type: "create", state: true })
    } else if (typeModal === "edit") {
      setTypeModal("edit")
      setStateModal({ type: "edit", state: true })
      setDataInitialModal(data)
    } else if (typeModal === "delete") {
      setTypeModal("delete")
      setStateModal({ type: "delete", state: true })
      setDataInitialModal(data)
    }
  }

  const handleClickCreateUSer = (data: any) => {
    useCreateUserHandler(data)
  }

  const handleClickEditUSer = (data: any) => {
    useEditUserHandler(data)
  }

  const handleClickDeleteUSer = (data: any) => {
    useDeleteUserHandler(data)
  }

  const columns = [
    { name: "Id", id: "id" },
    {
      name: "Name",
      id: "name",
      isLink: true,
      linkBasePath: "/userSelected",
    },
    { name: "E-mail", id: "email" },
    { name: "Role", id: "role" },
  ]

  return {
    createUserObject,
    editUserObject,
    handleClickOnModal,
    handleClickCreateUSer,
    handleClickEditUSer,
    useGetUsersData,
    useGetUsersStatus,
    offsetState,
    query,
    totalItems,
    stateModal,
    typeModal,
    dataInitialModal,
    limit,
    setQuery,
    setOffsetState,
    setStateModal,
    handleClickDeleteUSer,
    columns,
    setFilter,
    useCreateUserStatus,
    useEditUserStatus,
    useDeleteUserStatus,
  }
}
