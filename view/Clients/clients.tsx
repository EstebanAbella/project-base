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
    useCreateClientStatus,
    useEditClientStatus,
    useDeleteClientStatus,
  } = useClients()

  return (
    <Layout>
      <BreadcrumbWrapper>
        <ModalManager
          stateModal={stateModal}
          setStateModal={setStateModal}
          initialData={dataInitialModal}
          operations={{
            delete: {
              title: "Do you want to delete a client?",
              textButton: "Delete",
              onClick: handleClickDeleteClient,
              status: useDeleteClientStatus,
            },
            create: {
              title: "",
              textButton: "Add client",
              onClick: handleClickCreateClient,
              object: createClientObject,
              status: useCreateClientStatus,
            },
            edit: {
              title: "",
              textButton: "Update client",
              onClick: handleClickEditClient,
              object: editClientObject,
              status: useEditClientStatus,
            },
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
            <div className='containerTableLoader'>
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
              {useGetClientsByUserIdStatus === ServerStatus.FETCHING && (
                <Loader />
              )}
            </div>
          </section>

          <Pagination
            limit={limit}
            offsetState={offsetState}
            totalItems={totalItems}
            setOffsetState={setOffsetState}
          />
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}

export default withAuth(Clients)
