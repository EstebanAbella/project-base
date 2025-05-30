import { useEffect, useState } from "react"
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
  const [stateModal, setStateModal] = useState<boolean>(false)
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

  const totalItems = useGetUsersData?.count ? useGetUsersData?.count : 0
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
      setStateModal(false)
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
      setStateModal(false)
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
      setStateModal(false)
    }
  }, [useEditUserStatus])

  const createUserObject = [
    {
      label: "Nombre",
      name: "name",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "Escriba su nombre",
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
      type: "checkbox",
      placeholder: "-",
      moduleName: "user",
      checkboxItems: ["view", "create", "update", "delete", "import", "export"],
    },
    // {
    //   label: "Permissions",
    //   name: "permissions",
    //   typeTextField: TextFieldType.PRIMARY,
    //   disabled: false,
    //   type: "checkbox",
    //   placeholder: "-",
    //   moduleName: "admin",
    //   checkboxItems: ["view", "create", "update", "delete", "import", "export"],
    // },
  ]

  const editUserObject = [
    {
      label: "Nombre",
      name: "name",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "Escriba su nombre",
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
      type: "checkbox",
      placeholder: "-",
      moduleName: "user",
      checkboxItems: ["view", "create", "update", "delete", "import", "export"],
    },
    // {
    //   label: "Permissions",
    //   name: "permissions",
    //   typeTextField: TextFieldType.PRIMARY,
    //   disabled: false,
    //   type: "checkbox",
    //   placeholder: "-",
    //   moduleName: "admin",
    //   checkboxItems: ["view", "create", "update", "delete", "import", "export"],
    // },
  ]

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "create") {
      setTypeModal("modal-create-user")
      setStateModal(true)
    } else if (typeModal === "edit") {
      setTypeModal("modal-edit-user")
      setStateModal(true)
      setDataInitialModal(data)
    } else if (typeModal === "delete") {
      setTypeModal("modal-delete-user")
      setStateModal(true)
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
  }
}
