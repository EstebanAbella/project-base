import React, { useEffect, useState } from "react"
import { RootState } from "../redux/rootReducer"
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
import FilterSearchIn from "../components/FilterSearchIn/FilterSearchIn"
import {
  useDeleteBotTraining,
  useGetBotTrainings,
} from "./botTrainingSelected/useBotTrainingSelected"

const mapStateToProps = (state: RootState) => {
  const authReducer = state.auth
  return {
    userLogged: authReducer.user,
  }
}

const mapDispatchToProps = {}

export type BotTrainingsPropType = {
  userLogged: loggedUser | undefined
}

const BotTrainings = ({ userLogged }: BotTrainingsPropType) => {
  const [stateModal, setStateModal] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>("")
  const [dataInitialModal, setDataInitialModal] = useState()
  const [dataIdDeleteModal, setDataIdDeleteModal] = useState<string>("")
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)

  const {
    useGetBotTrainingsHandler,
    useGetBotTrainingsData,
    useGetBotTrainingsStatus,
  } = useGetBotTrainings()

  const {
    useDeleteBotTrainingHandler,
    useDeleteBotTrainingData,
    useDeleteBotTrainingStatus,
  } = useDeleteBotTraining()

  const limit = 5
  const totalItems = useGetBotTrainingsData?.count
    ? useGetBotTrainingsData?.count
    : 0
  const order = "ASC"
  const roles = userLogged?.role

  useEffect(() => {
    useGetBotTrainingsHandler(
      offsetState,
      limit,
      query ?? "",
      filter ?? "",
      order ?? "",
      roles ?? ""
    )
  }, [])

  useEffect(() => {
    if (useDeleteBotTrainingStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems - 1
      const isLastPage = offsetState + limit >= anticipatedTotalItems

      if (
        isLastPage &&
        anticipatedTotalItems <= offsetState &&
        offsetState > 0
      ) {
        setOffsetState((prevOffset) => prevOffset - limit)
      } else {
        useGetBotTrainingsHandler(
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
  }, [useDeleteBotTrainingStatus])

  UseCallOfTables({
    offsetState,
    limit,
    query,
    filter,
    order,
    roles,
    action: useGetBotTrainingsHandler,
    setOffsetState,
  })

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "delete") {
      setTypeModal("modal-delete-botTraining")
      setStateModal(true)
      setDataIdDeleteModal(data)
    }
  }

  const filterOptions = () => {
    return [
      { id: 1, name: "body" },
      { id: 2, name: "footer" },
      { id: 3, name: "trigger" },
      { id: 4, name: "type" },
    ]
  }

  return (
    <AccessConsume>
      <Layout>
        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          title={"Do you want to delete a template?"}
          textButton={"Delete"}
          typeButton={ButtonType.PRIMARY}
          onClick={() => useDeleteBotTrainingHandler(dataIdDeleteModal)}
          isDisabled={typeModal === "modal-delete-botTraining"}
          buttonCloseModal={true}
          spanAlert={"alert"}
        />
        <section className='botTrainingsPage'>
          <h3>BotTrainings</h3>

          <section className='addBotTrainingAction'>
            <div className='addBotTrainingActionSearch'>
              <Search query={query} setQuery={setQuery}></Search>
              <FilterSearchIn
                filterOptions={filterOptions()}
                setFilter={setFilter}
              ></FilterSearchIn>
            </div>
            <Button
              type={ButtonType.SUCCESS}
              value={"Add botTraining"}
              onClick={() => router.push(`/botTrainingSelected/create`)}
              extraClassName={"buttonTable"}
            ></Button>
          </section>
          {useGetBotTrainingsStatus !== ServerStatus.FETCHING && (
            <section className='containerTable'>
              <table className='table table-striped custom-bg table-bordered align-middle'>
                <thead className='table-dark tableThead'>
                  <tr>
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
                  {useGetBotTrainingsData?.items ? (
                    useGetBotTrainingsData?.items?.map(
                      (data: BotTrainingResult) => (
                        <tr key={data.id}>
                          <>
                            <td>
                              <p>{data.body}</p>
                            </td>
                            <td>{data.footer}</td>
                            <td>{data.seed}</td>
                            <td>{data.trigger}</td>
                            <td>{data.type}</td>
                            <td>
                              {data?.options?.map((data: string, index) => (
                                <p key={`${data} ${index}`}>{data}</p>
                              ))}
                            </td>
                            <td>
                              <div className='additionalActionsTable'>
                                {data.additional_actions &&
                                  data.additional_actions?.map(
                                    (data: any, index: number) => (
                                      <div
                                        className='additionalActionsContainer'
                                        key={index}
                                      >
                                        {data.reaction && (
                                          <td>Reaction: {data.reaction}</td>
                                        )}
                                        {data.sticker_name && (
                                          <td>Sticker: {data.sticker_name}</td>
                                        )}
                                        {data.delay && (
                                          <td>Delay: {data.delay}</td>
                                        )}
                                        <td>Type: {data.type}</td>
                                      </div>
                                    )
                                  )}
                              </div>
                            </td>
                            <td>
                              <div className='containerButtonTable'>
                                <Button
                                  type={ButtonType.ERROR}
                                  value={"Delete"}
                                  onClick={() =>
                                    handleClickOnModal(
                                      "delete",
                                      data.id.toString()
                                    )
                                  }
                                  extraClassName={"buttonTable"}
                                ></Button>
                                <Button
                                  type={ButtonType.INFORMATION}
                                  value={"Update"}
                                  onClick={() =>
                                    router.push(
                                      `/botTrainingSelected/update/${data.id}`
                                    )
                                  }
                                  extraClassName={"buttonTable"}
                                ></Button>
                              </div>
                            </td>
                          </>
                        </tr>
                      )
                    )
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

          {useGetBotTrainingsStatus === ServerStatus.FETCH && (
            <Pagination
              limit={limit}
              offsetState={offsetState}
              totalItems={totalItems}
              setOffsetState={setOffsetState}
            />
          )}

          {useGetBotTrainingsStatus === ServerStatus.FETCHING && (
            <Loader></Loader>
          )}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default withAuth(
  connect(mapStateToProps, mapDispatchToProps)(BotTrainings)
)
