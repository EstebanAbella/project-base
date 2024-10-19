import React, { useEffect, useState } from "react"
import { RootState } from "../redux/rootReducer"
import {
  createBotTraining,
  deleteBotTraining,
  editBotTraining,
  getBotTraining,
  getBotTrainings,
} from "../redux/botTraining/actions"
import {
  BotTrainingResult,
  BotTrainingsReducerPropsTypes,
} from "../Utils/Types/botTrainingType"
import { connect } from "react-redux"
import Button, { ButtonType } from "../components/Button"
import { ServerStatus } from "../Utils/Types/global"
import Loader from "../components/Loader"
import AccessConsume from "../wrappers/auth/AccessConsume"
import Layout from "../components/Layout"
import router from "next/router"
import Modal from "../components/Modal"
import { TextFieldType } from "../components/TextField"
import withAuth from "../hooks/withAuth"
import Pagination from "../components/Pagination"
import Search from "../components/Search"
import { UseCallOfTables } from "../hooks/useCallOfTables"
import { loggedUser } from "../Utils/Types/authModel"
import FilterSearchIn from "../components/FilterSearchIn"

const mapStateToProps = (state: RootState) => {
  const botTrainingsReducer = state.botTraining
  const authReducer = state.auth
  return {
    botTraining: botTrainingsReducer.botTraining,
    botTrainingStatus: botTrainingsReducer.botTrainingStatus,

    botTrainings: botTrainingsReducer.botTrainings,
    botTrainingsStatus: botTrainingsReducer.botTrainingsStatus,

    botTrainingCreateStatus: botTrainingsReducer.botTrainingCreateStatus,
    botTrainingDeleteStatus: botTrainingsReducer.botTrainingDeleteStatus,
    botTrainingEditStatus: botTrainingsReducer.botTrainingEditStatus,

    userLogged: authReducer.user,
  }
}

const mapDispatchToProps = {
  getBotTrainings,
  getBotTraining,
  createBotTraining,
  deleteBotTraining,
  editBotTraining,
}

export type BotTrainingsPropType = {
  getBotTrainings: Function
  getBotTraining: Function
  createBotTraining: Function
  deleteBotTraining: Function
  editBotTraining: Function
  userLogged: loggedUser | undefined
} & BotTrainingsReducerPropsTypes

const BotTrainings = ({
  getBotTrainings,
  getBotTraining,
  createBotTraining,
  deleteBotTraining,
  editBotTraining,
  botTraining,
  botTrainingStatus,
  botTrainings,
  botTrainingsStatus,
  botTrainingCreateStatus,
  botTrainingDeleteStatus,
  botTrainingEditStatus,
  userLogged,
}: BotTrainingsPropType) => {
  const [stateModal, setStateModal] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>("")
  const [dataInitialModal, setDataInitialModal] = useState()
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)
  const limit = 5
  const totalItems = botTrainings?.count ? botTrainings?.count : 0
  const order = "ASC"
  const roles = userLogged?.role

  useEffect(() => {
    getBotTrainings(
      offsetState,
      limit,
      query ?? "",
      filter ?? "",
      order ?? "",
      roles ?? ""
    )
  }, [])

  useEffect(() => {
    if (botTrainingDeleteStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems - 1
      const isLastPage = offsetState + limit >= anticipatedTotalItems

      if (
        isLastPage &&
        anticipatedTotalItems <= offsetState &&
        offsetState > 0
      ) {
        setOffsetState((prevOffset) => prevOffset - limit)
      } else {
        getBotTrainings(
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
  }, [botTrainingDeleteStatus])

  useEffect(() => {
    if (botTrainingEditStatus === ServerStatus.FETCH) {
      getBotTrainings(
        offsetState,
        limit,
        query ?? "",
        filter ?? "",
        order ?? "",
        roles ?? ""
      )
      setStateModal(false)
    }
  }, [botTrainingEditStatus])

  useEffect(() => {
    if (botTrainingCreateStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems
      const isLastPage = offsetState + limit >= anticipatedTotalItems
      if (isLastPage && totalItems % limit === 0) {
        setOffsetState((prevOffset) => prevOffset + limit)
      } else {
        getBotTrainings(
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
  }, [botTrainingCreateStatus])

  UseCallOfTables({
    offsetState,
    limit,
    query,
    filter,
    order,
    roles,
    action: getBotTrainings,
    setOffsetState,
  })

  const createBotTrainingObject = [
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
      valueSelect: ["botTraining", "admin"],
    },
  ]

  const editBotTrainingObject = [
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
      valueSelect: ["botTraining", "admin"],
    },
  ]

  const handleClickCreateUSer = (data: any) => {
    createBotTraining(data)
  }

  const handleClickEditUSer = (data: any) => {
    editBotTraining(data)
  }

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "create") {
      setTypeModal("modal-create-botTraining")
      setStateModal(true)
    } else if (typeModal === "edit") {
      setTypeModal("modal-edit-botTraining")
      setStateModal(true)
      setDataInitialModal(data)
    }
  }

  const filterOptions = () => {
    return [
      { id: 1, name: "id" },
      { id: 2, name: "body" },
      { id: 3, name: "footer" },
    ]
  }

  return (
    <AccessConsume>
      <Layout isNavigation={false}>
        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={createBotTrainingObject}
          textButton={"Add botTraining"}
          typeButton={ButtonType.SUCCESS}
          onClick={handleClickCreateUSer}
          isDisabled={typeModal === "modal-create-botTraining"}
        />

        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={editBotTrainingObject}
          textButton={"Update botTraining"}
          typeButton={ButtonType.INFORMATION}
          onClick={handleClickEditUSer}
          isDisabled={typeModal === "modal-edit-botTraining"}
          initialData={dataInitialModal}
        />
        <section className='botTrainingsPage'>
          <h3>BotTrainings</h3>

          <section className='addBotTrainingAction'>
            <Search query={query} setQuery={setQuery}></Search>
            <FilterSearchIn
              filterOptions={filterOptions()}
              setFilter={setFilter}
            ></FilterSearchIn>
            <Button
              type={ButtonType.SUCCESS}
              value={"Add botTraining"}
              onClick={() => handleClickOnModal("create")}
              extraClassName={"buttonTable"}
            ></Button>
          </section>
          {botTrainingsStatus !== ServerStatus.FETCHING && (
            <section className='containerTable'>
              <table className='table table-striped custom-bg table-bordered align-middle'>
                <thead className='table-dark tableThead'>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Body</th>
                    <th scope='col'>Footer</th>
                    <th scope='col'>Seed</th>
                    <th scope='col'>Trigger</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Options</th>
                    <th scope='col'>Addit. Act.</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody className='tableBody'>
                  {botTrainings?.items ? (
                    botTrainings?.items?.map((data: BotTrainingResult) => (
                      <tr key={data.id}>
                        <>
                          <td>{data.id}</td>
                          <td>
                            <p
                              onClick={() =>
                                router.push(`/botTrainingSelected/${data.id}`)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {data.body}
                            </p>
                          </td>
                          <td>{data.footer}</td>
                          <td>{data.seed}</td>
                          <td>{data.trigger}</td>
                          <td>{data.type}</td>
                          <td>
                            {data.options.map((data: string) => (
                              <p>{data}</p>
                            ))}
                          </td>
                          <td>
                            <div className='additionalActionsTable'>
                              {data.additional_actions.map((data: any) => (
                                <div className='additionalActionsContainer'>
                                  {data.reaction && (
                                    <td>Reaction: {data.reaction}</td>
                                  )}
                                  {data.sticker_name && (
                                    <td>Sticker: {data.sticker_name}</td>
                                  )}
                                  {data.delay && <td>Delay: {data.delay}</td>}
                                  <td>Type: {data.type}</td>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className='containerButtonTable'>
                              <Button
                                type={ButtonType.ERROR}
                                value={"Delete"}
                                onClick={() => deleteBotTraining(data.id)}
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
            </section>
          )}

          {botTrainingsStatus === ServerStatus.FETCH && (
            <Pagination
              limit={limit}
              offsetState={offsetState}
              totalItems={totalItems}
              setOffsetState={setOffsetState}
            />
          )}

          {botTrainingsStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps)(BotTrainings)
)
