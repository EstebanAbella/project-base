import React from "react"
import { Button, ButtonType } from "../../components/Button/Button"
import { ServerStatus } from "../../interface/global"
import withAuth from "../../hooks/withAuth"
import { Layout } from "../../wrappers/Layout"
import { Loader } from "../../components/Loader"
import { Pagination } from "../../components/Pagination"
import { clientType } from "./client.interface"
import { ModalCrud } from "../../components/ModalCrud"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { Modal } from "../../components/Modal"
import { useClients } from "./useClients"
import { Table } from "../../components/Table"
import { Search } from "../../components/Search"
import { FilterSearchIn } from "../../components/FilterSearchIn"

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
    typeModal,
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
        <ModalCrud
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={createClientObject}
          textButton={"Add client"}
          typeButton={ButtonType.SUCCESS}
          onClick={handleClickCreateClient}
          isDisabled={typeModal === "modal-create-client"}
        />

        <ModalCrud
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={editClientObject}
          textButton={"Update client"}
          typeButton={ButtonType.INFORMATION}
          onClick={handleClickEditClient}
          isDisabled={typeModal === "modal-edit-client"}
          initialData={dataInitialModal}
        />

        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          title={"Do you want to delete a client?"}
          textButton={"Delete"}
          typeButton={ButtonType.PRIMARY}
          onClick={() => handleClickDeleteClient(dataInitialModal)}
          isDisabled={typeModal === "modal-delete-client"}
          buttonCloseModal={true}
          spanAlert={"alert"}
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
