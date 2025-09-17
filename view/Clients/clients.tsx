import React from "react"
import { Button, ButtonType } from "../../components/Button/Button"
import { ServerStatus } from "../../interface/global"
import withAuth from "../../hooks/withAuth"
import { Layout } from "../../wrappers/Layout"
import { Loader } from "../../components/Loader"
import { Pagination } from "../../components/Pagination"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useClients } from "./useClients"
import { Table } from "../../components/Table"
import { Search } from "../../components/Search"
import { FilterSearchIn } from "../../components/FilterSearchIn"
import { ModalManager } from "../../components/ModalManager"

const Clients = () => {
  const {
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
  } = useClients()

  return (
    <Layout>
      <BreadcrumbWrapper>
        <ModalManager
          stateModal={stateModal}
          setStateModal={setStateModal}
          initialData={dataInitialModal}
          handleClickDelete={handleClickDeleteClient}
          handleClickCreate={handleClickCreateClient}
          handleClickEdit={handleClickEditClient}
          createObject={createClientObject}
          editObject={editClientObject}
          title={{
            delete: "Do you want to delete a client?",
            create: "",
            update: "",
          }}
          textButton={{
            delete: "Delete",
            create: "Add client",
            update: "Update client",
          }}
        />
        <section className='clientsPage'>
          <h3>Clients</h3>
          <section className='addClientAction'>
            <Button
              type={ButtonType.SUCCESS}
              value={"Add client"}
              onClick={() => handleClickOnModal("create")}
              extraClassName={"buttonTable"}
            />
          </section>

          <section className='containerTable'>
            <div className='ContainerFilterSearchInTable'>
              <Search query={query} setQuery={setQuery} />
              <FilterSearchIn filterOptions={columns} setFilter={setFilter} />
            </div>
            {useGetClientsByUserIdStatus !== ServerStatus.FETCHING && (
              <Table
                columns={columns}
                data={useGetClientsByUserIdData?.items ?? []}
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

          {useGetClientsByUserIdStatus === ServerStatus.FETCHING && <Loader />}
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}

export default withAuth(Clients)
