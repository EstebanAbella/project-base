import React, { useEffect, useState } from "react"
import { RootState } from "../redux/rootReducer"
import { connect } from "react-redux"
import { ButtonType } from "../components/Button"
import { ServerStatus } from "../Utils/Types/global"
import Loader from "../components/Loader"
import AccessConsume from "../wrappers/auth/AccessConsume"
import Layout from "../components/Layout"
import router from "next/router"
import Modal from "../components/Modal"
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
import Table from "../components/Table"

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
  const [dataIdDeleteModal, setDataIdDeleteModal] = useState<string>("")
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)

  const {
    useGetBotTrainingsHandler,
    useGetBotTrainingsData,
    useGetBotTrainingsStatus,
  } = useGetBotTrainings()

  const { useDeleteBotTrainingHandler, useDeleteBotTrainingStatus } =
    useDeleteBotTraining()

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
          <h4>BotTrainings</h4>

          <section className='addBotTrainingAction'>
            <div className='addBotTrainingActionSearch'>
              <Search query={query} setQuery={setQuery}></Search>
              <FilterSearchIn
                filterOptions={filterOptions()}
                setFilter={setFilter}
              ></FilterSearchIn>
            </div>
            <span
              className={`icon-plus-circle iconPlus`}
              onClick={() => router.push(`/botTrainingSelected/create`)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/botTrainingSelected/create`)
                }
              }}
              aria-label='Create'
            ></span>
          </section>
          {useGetBotTrainingsStatus !== ServerStatus.FETCHING && (
            <section className='containerTable'>
              <Table
                columns={[
                  { name: "Body", id: "body" },
                  { name: "Footer", id: "footer" },
                  { name: "Trigger", id: "trigger" },
                  { name: "Type", id: "type" },
                  { name: "Options", id: "options" },
                  { name: "Addit. Act.", id: "additional_actions" },
                ]}
                data={useGetBotTrainingsData?.items || []}
                handleClickOnModal={handleClickOnModal}
              />
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
