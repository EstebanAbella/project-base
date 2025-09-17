import React from "react"
import { ServerStatus } from "../../interface/global"
import { Layout } from "../../wrappers/Layout/Layout"
import { Button, ButtonType } from "../../components/Button/Button"
import { Pagination } from "../../components/Pagination/Pagination"
import { Loader } from "../../components/Loader/Loader"
import withAuth from "../../hooks/withAuth"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useUsers } from "./useUsers"
import { Table } from "../../components/Table/Table"
import { Search } from "../../components/Search"
import { FilterSearchIn } from "../../components/FilterSearchIn"
import { ModalManager } from "../../components/ModalManager"

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
        <ModalManager
          stateModal={stateModal}
          setStateModal={setStateModal}
          initialData={dataInitialModal}
          handleClickDelete={handleClickDeleteUSer}
          handleClickCreate={handleClickCreateUSer}
          handleClickEdit={handleClickEditUSer}
          createObject={createUserObject}
          editObject={editUserObject}
          title={{
            delete: "Do you want to delete a user?",
            create: "",
            update: "",
          }}
          textButton={{
            delete: "Delete",
            create: "Add user",
            update: "Update user",
          }}
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
