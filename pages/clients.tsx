import React, { useEffect, useState } from "react"
import { RootState } from "../redux/rootReducer"
import {
  createClient,
  deleteClient,
  editClient,
  getClient,
  getClientsByUserId,
  getClients,
} from "../redux/client/actions"
import { ClientsReducerPropsType } from "../Utils/Types/clientType"
import { connect } from "react-redux"
import Button, { ButtonType } from "../components/Button"
import { ServerStatus } from "../Utils/Types/global"
import Loader from "../components/Loader"
import AccessConsume from "../wrappers/auth/AccessConsume"
import Layout from "../components/Layout"
import router from "next/router"
import Modal from "../components/Modal"
import { TextFieldType } from "../components/TextField"
import { loggedUser } from "../Utils/Types/authModel"
import Pagination from "../components/Pagination"
import Search from "../components/Search"
import { UseCallOfTables } from "../hooks/useCallOfTables"

const mapStateToProps = (state: RootState) => {
  const clientsReducer = state.client
  const authReducer = state.auth
  return {
    client: clientsReducer.client,
    clientStatus: clientsReducer.clientStatus,

    clients: clientsReducer.clients,
    clientsStatus: clientsReducer.clientsStatus,

    clientsByUserId: clientsReducer.clientsByUserId,
    clientsByUserIdStatus: clientsReducer.clientsByUserIdStatus,

    clientCreateStatus: clientsReducer.clientCreateStatus,
    clientDeleteStatus: clientsReducer.clientDeleteStatus,
    clientEditStatus: clientsReducer.clientEditStatus,

    user: authReducer.user,
  }
}

const mapDispatchToProps = {
  getClients,
  getClient,
  createClient,
  deleteClient,
  editClient,
  getClientsByUserId,
}

export type ClientsPropType = {
  getClients: Function
  getClient: Function
  createClient: Function
  deleteClient: Function
  editClient: Function
  getClientsByUserId: Function
  user: loggedUser | undefined
} & ClientsReducerPropsType

const Clients = ({
  getClients,
  getClient,
  getClientsByUserId,
  createClient,
  deleteClient,
  editClient,
  client,
  clientStatus,
  clients,
  clientsStatus,
  clientCreateStatus,
  clientDeleteStatus,
  clientEditStatus,
  clientsByUserId,
  clientsByUserIdStatus,
  user,
}: ClientsPropType) => {
  const [stateModal, setStateModal] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>("")
  const [dataInitialModal, setDataInitialModal] = useState()
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)
  const limit = 5
  const totalItems = clientsByUserId?.count ? clientsByUserId?.count : 0
  const order = "ASC"
  const roles = user?.role

  useEffect(() => {
    getClientsByUserId(
      user?.id,
      offsetState,
      limit,
      query ?? "",
      filter ?? "",
      order ?? "",
      roles ?? ""
    )
  }, [])

  useEffect(() => {
    if (clientDeleteStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems - 1
      const isLastPage = offsetState + limit >= anticipatedTotalItems

      if (
        isLastPage &&
        anticipatedTotalItems <= offsetState &&
        offsetState > 0
      ) {
        setOffsetState((prevOffset) => prevOffset - limit)
      } else {
        getClientsByUserId(
          user?.id,
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
  }, [clientDeleteStatus])

  useEffect(() => {
    if (clientEditStatus === ServerStatus.FETCH) {
      getClientsByUserId(
        user?.id,
        offsetState,
        limit,
        query ?? "",
        filter ?? "",
        order ?? "",
        roles ?? ""
      )
      setStateModal(false)
    }
  }, [clientEditStatus])

  useEffect(() => {
    if (clientCreateStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems
      const isLastPage = offsetState + limit >= anticipatedTotalItems
      if (isLastPage && totalItems % limit === 0) {
        setOffsetState((prevOffset) => prevOffset + limit)
      } else {
        getClientsByUserId(
          user?.id,
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
  }, [clientCreateStatus])

  UseCallOfTables({
    id: user?.id,
    offsetState,
    limit,
    query,
    filter,
    order,
    roles,
    action: getClientsByUserId,
    setOffsetState,
  })

  const createClientObject = [
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
      label: "Dirección",
      name: "address",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "Dirección",
    },
    {
      label: "UserId",
      name: "userId",
      typeTextField: TextFieldType.PRIMARY,
      disabled: true,
      type: "text",
      placeholder: "UserId",
      defaultValue: user?.id,
    },
  ]

  const editClientObject = [
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
      label: "Dirección",
      name: "address",
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: "text",
      placeholder: "Dirección",
    },
  ]

  const handleClickCreateUSer = (data: any) => {
    createClient(data)
  }

  const handleClickEditUSer = (data: any) => {
    editClient(data)
  }

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "create") {
      setTypeModal("modal-create-client")
      setStateModal(true)
    } else if (typeModal === "edit") {
      setTypeModal("modal-edit-client")
      setStateModal(true)
      setDataInitialModal(data)
    }
  }

  return (
    <AccessConsume>
      <Layout isNavigation={false}>
        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={createClientObject}
          textButton={"Add client"}
          typeButton={ButtonType.SUCCESS}
          onClick={handleClickCreateUSer}
          isDisabled={typeModal === "modal-create-client"}
        />

        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={editClientObject}
          textButton={"Update client"}
          typeButton={ButtonType.INFORMATION}
          onClick={handleClickEditUSer}
          isDisabled={typeModal === "modal-edit-client"}
          initialData={dataInitialModal}
        />
        <section className='clientsPage'>
          <h1>Clients</h1>
          <Search filter={filter} setFilter={setFilter}></Search>
          {clientsByUserIdStatus !== ServerStatus.FETCHING && (
            <>
              <section className='addClientAction'>
                <Button
                  type={ButtonType.SUCCESS}
                  value={"Add client"}
                  onClick={() => handleClickOnModal("create")}
                  extraClassName={"buttonTable"}
                ></Button>
              </section>
              <table className='table table-striped table-bordered custom-bg'>
                <thead className='table-dark tableThead'>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody className='tableBody'>
                  {clientsByUserId ? (
                    clientsByUserId?.items.map((data) => (
                      <tr key={data.id}>
                        <>
                          <td>{data.id}</td>
                          <td>
                            <p
                              onClick={() =>
                                router.push(`/clientSelected/${data.id}`)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {data.name}
                            </p>
                          </td>
                          <td>{data.email}</td>
                          <td>{data.address}</td>
                          <td>
                            <div className='containerButtonTable'>
                              <Button
                                type={ButtonType.ERROR}
                                value={"Delete"}
                                onClick={() => deleteClient(data.id)}
                                extraClassName={"buttonTable"}
                              ></Button>
                              <Button
                                type={ButtonType.INFORMATION}
                                value={"Update"}
                                onClick={() => handleClickOnModal("edit", data)}
                                extraClassName={"buttonTable"}
                              ></Button>
                            </div>
                          </td>
                        </>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <>
                        <td>{"-"}</td>
                        <td>{"-"}</td>
                        <td>{"-"}</td>
                        <td>{"-"}</td>
                        <td>{"-"}</td>
                      </>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          <Pagination
            limit={limit}
            offsetState={offsetState}
            totalItems={totalItems}
            setOffsetState={setOffsetState}
          />
          {clientsByUserIdStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
