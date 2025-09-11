import React from "react"
import { ServerStatus } from "../../interface/global"
import { Layout } from "../../wrappers/Layout/Layout"
import { Button, ButtonType } from "../../components/Button/Button"
import { Pagination } from "../../components/Pagination/Pagination"
import { Loader } from "../../components/Loader/Loader"
import { ModalCrud } from "../../components/ModalCrud"
import withAuth from "../../hooks/withAuth"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useUsers } from "./useUsers"
import { Modal } from "../../components/Modal"
import { Table } from "../../components/Table/Table"
import { Search } from "../../components/Search"
import { FilterSearchIn } from "../../components/FilterSearchIn"

const Users = () => {
  const {
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
  } = useUsers()

  return (
    <Layout>
      <BreadcrumbWrapper>
        <ModalCrud
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={createUserObject}
          textButton={"Add user"}
          typeButton={ButtonType.SUCCESS}
          onClick={handleClickCreateUSer}
          isDisabled={typeModal === "modal-create-user"}
        />

        <ModalCrud
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={editUserObject}
          textButton={"Update user"}
          typeButton={ButtonType.INFORMATION}
          onClick={handleClickEditUSer}
          isDisabled={typeModal === "modal-edit-user"}
          initialData={dataInitialModal}
        />

        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          title={"Do you want to delete a user?"}
          textButton={"Delete"}
          typeButton={ButtonType.PRIMARY}
          onClick={() => handleClickDeleteUSer(dataInitialModal)}
          isDisabled={typeModal === "modal-delete-user"}
          buttonCloseModal={true}
          spanAlert={"alert"}
        />
        <section className='usersPage'>
          <h3>Users</h3>
          <section className='addUserAction'>
            <Button
              type={ButtonType.SUCCESS}
              value={"Add user"}
              onClick={() => handleClickOnModal("create")}
              extraClassName={"buttonTable"}
            />
          </section>

          <section className='containerTable'>
            <div className='ContainerFilterSearchInTable'>
              <Search query={query} setQuery={setQuery} />
              <FilterSearchIn filterOptions={columns} setFilter={setFilter} />
            </div>
            {useGetUsersStatus !== ServerStatus.FETCHING && (
              <Table
                columns={columns}
                data={useGetUsersData?.items ?? []}
                haveActions={true}
                actions={{
                  onEdit: (row) => handleClickOnModal("edit", row),
                  onDelete: (row) => handleClickOnModal("delete", row.id),
                }}
              />
            )}
          </section>

          <Pagination
            limit={limit}
            offsetState={offsetState}
            totalItems={totalItems}
            setOffsetState={setOffsetState}
          />

          {useGetUsersStatus === ServerStatus.FETCHING && <Loader />}
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}

export default withAuth(Users)
