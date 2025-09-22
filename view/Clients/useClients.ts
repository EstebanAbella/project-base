import { useEffect, useMemo, useState } from "react"
import { ServerStatus } from "../../interface/global"
import { TextFieldType } from "../../components/TextField/TextField"
import {
  useCreateClient,
  useDeleteClient,
  useEditClient,
  useGetClientsByUserId,
} from "./useClientsData"
import { UseCallOfTables } from "../../hooks/useCallOfTables"
import { useAuthContext } from "../../context/auth/AuthContext"

export const useClients = () => {
  const [stateModal, setStateModal] = useState<{
    type: string
    state: boolean
  }>({ type: "", state: false })
  const [dataInitialModal, setDataInitialModal] = useState()
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)
  const limit = 5
  const order = "ASC"

  const { user } = useAuthContext()

  const {
    useGetClientsByUserIdHandler,
    useGetClientsByUserIdData,
    useGetClientsByUserIdStatus,
  } = useGetClientsByUserId()

  const { useCreateClientHandler, useCreateClientStatus } = useCreateClient()

  const { useEditClientHandler, useEditClientStatus } = useEditClient()

  const { useDeleteClientHandler, useDeleteClientStatus } = useDeleteClient()

  const totalItems = useMemo(() => {
    return useGetClientsByUserIdData?.count ?? 0
  }, [useGetClientsByUserIdData?.count])

  const roles = user?.role

  UseCallOfTables({
    id: user?.id,
    offsetState,
    limit,
    query,
    filter,
    order,
    roles,
    action: (
      id?: string,
      offset?: number,
      limit?: number,
      query?: string,
      filter?: string,
      order?: string,
      roles?: string
    ) =>
      useGetClientsByUserIdHandler(
        id,
        offset,
        limit,
        query,
        filter,
        order,
        roles
      ),
    setOffsetState,
  })

  useEffect(() => {
    if (!user?.id) return
    useGetClientsByUserIdHandler(
      user?.id,
      offsetState,
      limit,
      query ?? "",
      filter ?? "",
      order ?? "",
      roles ?? ""
    )
  }, [user?.id])

  useEffect(() => {
    if (useCreateClientStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems
      const isLastPage = offsetState + limit >= anticipatedTotalItems
      if (isLastPage && totalItems % limit === 0) {
        setOffsetState((prevOffset) => prevOffset + limit)
      } else {
        useGetClientsByUserIdHandler(
          user?.id,
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
  }, [useCreateClientStatus])

  useEffect(() => {
    if (useDeleteClientStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems - 1
      const isLastPage = offsetState + limit >= anticipatedTotalItems

      if (
        isLastPage &&
        anticipatedTotalItems <= offsetState &&
        offsetState > 0
      ) {
        setOffsetState((prevOffset) => prevOffset - limit)
      } else {
        useGetClientsByUserIdHandler(
          user?.id,
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
  }, [useDeleteClientStatus])

  useEffect(() => {
    if (useEditClientStatus === ServerStatus.FETCH) {
      useGetClientsByUserIdHandler(
        user?.id,
        offsetState,
        limit,
        query ?? "",
        filter ?? "",
        order ?? "",
        roles ?? ""
      )
      setStateModal({ type: "", state: false })
    }
  }, [useEditClientStatus])

  const createClientObject = useMemo(
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
        label: "Address",
        name: "address",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "text",
        placeholder: "Address",
      },
      {
        label: "UserId",
        name: "userId",
        typeTextField: TextFieldType.PRIMARY,
        disabled: true,
        type: "text",
        placeholder: "UserId",
        defaultValue: user?.id,
        isShown: false,
      },
    ],
    [user?.id]
  )

  const editClientObject = useMemo(
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
        label: "Address",
        name: "address",
        typeTextField: TextFieldType.PRIMARY,
        disabled: false,
        type: "text",
        placeholder: "Address",
      },
    ],
    [user?.id]
  )

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "create") {
      setStateModal({ type: "create", state: true })
    } else if (typeModal === "edit") {
      setStateModal({ type: "edit", state: true })
      setDataInitialModal(data)
    } else if (typeModal === "delete") {
      setStateModal({ type: "delete", state: true })
      setDataInitialModal(data)
    }
  }

  const handleClickCreateClient = (data: any) => {
    useCreateClientHandler(data)
  }

  const handleClickEditClient = (data: any) => {
    useEditClientHandler(data)
  }

  const handleClickDeleteClient = (data: any) => {
    useDeleteClientHandler(data)
  }

  const columns = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name", isLink: true, linkBasePath: "/clientSelected" },
    { id: "email", name: "E-mail" },
    { id: "address", name: "Address" },
  ]

  return {
    createClientObject,
    editClientObject,
    handleClickOnModal,
    handleClickCreateClient,
    handleClickEditClient,
    useGetClientsByUserIdData,
    useGetClientsByUserIdStatus,
    offsetState,
    query,
    totalItems,
    stateModal,
    dataInitialModal,
    limit,
    setQuery,
    setOffsetState,
    setStateModal,
    handleClickDeleteClient,
    columns,
    setFilter,
    useCreateClientStatus,
    useEditClientStatus,
    useDeleteClientStatus,
  }
}
