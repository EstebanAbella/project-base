import React from "react"
import { Button, ButtonType } from "../../components/Button/Button"
import { ServerStatus } from "../../interface/global"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import router from "next/router"
import withAuth from "../../hooks/withAuth"
import { Layout } from "../../wrappers/Layout"
import { Search } from "../../components/Search"
import { Loader } from "../../components/Loader"
import { Pagination } from "../../components/Pagination"
import { clientType } from "./client.interface"
import { ModalCrud } from "../../components/ModalCrud"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { Modal } from "../../components/Modal"
import { useClients } from "./useClients"

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
  } = useClients()

  return (
    <AccessConsume>
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
              <Search query={query} setQuery={setQuery}></Search>

              <Button
                type={ButtonType.SUCCESS}
                value={"Add client"}
                onClick={() => handleClickOnModal("create")}
                extraClassName={"buttonTable"}
              ></Button>
            </section>
            <section className='containerTable'>
              {useGetClientsByUserIdStatus !== ServerStatus.FETCHING && (
                <table className='table table-striped custom-bg'>
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
                    {useGetClientsByUserIdData ? (
                      useGetClientsByUserIdData?.items.map(
                        (data: clientType) => (
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
                                    // onClick={() =>
                                    //   dispatch(deleteClient(data.id))
                                    // }
                                    onClick={() =>
                                      handleClickOnModal("delete", data.id)
                                    }
                                    extraClassName={"buttonTable"}
                                  ></Button>
                                  <Button
                                    type={ButtonType.INFORMATION}
                                    value={"Update"}
                                    onClick={() =>
                                      handleClickOnModal("edit", data)
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
              )}
            </section>

            <Pagination
              limit={limit}
              offsetState={offsetState}
              totalItems={totalItems}
              setOffsetState={setOffsetState}
            />
            {useGetClientsByUserIdStatus === ServerStatus.FETCHING && (
              <Loader></Loader>
            )}
          </section>
        </BreadcrumbWrapper>
      </Layout>
    </AccessConsume>
  )
}

export default withAuth(Clients)
