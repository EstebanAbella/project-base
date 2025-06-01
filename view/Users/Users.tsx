import React from "react"
import router from "next/router"
import { ServerStatus } from "../../interface/global"
import { Layout } from "../../wrappers/Layout/Layout"
import { Button, ButtonType } from "../../components/Button/Button"
import { Search } from "../../components/Search/Search"
import { Pagination } from "../../components/Pagination/Pagination"
import { Loader } from "../../components/Loader/Loader"
import { ModalCrud } from "../../components/ModalCrud"
import withAuth from "../../hooks/withAuth"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useUsers } from "./useUsers"
import { Modal } from "../../components/Modal"

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
  } = useUsers()

  return (
    // <AccessConsume>
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
            <Search query={query} setQuery={setQuery}></Search>

            <Button
              type={ButtonType.SUCCESS}
              value={"Add user"}
              onClick={() => handleClickOnModal("create")}
              extraClassName={"buttonTable"}
            ></Button>
          </section>
          <section className='containerTable'>
            {useGetUsersStatus !== ServerStatus.FETCHING && (
              <table className='table table-striped custom-bg'>
                <thead className='table-dark tableThead'>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody className='tableBody'>
                  {useGetUsersData?.items ? (
                    useGetUsersData?.items.map((data) => (
                      <tr key={data.id}>
                        <>
                          <td>{data.id}</td>
                          <td>
                            <p
                              onClick={() =>
                                router.push(`/userSelected/${data.id}`)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {data.name}
                            </p>
                          </td>
                          <td>{data.email}</td>
                          <td>{data.role}</td>
                          <td>
                            <div className='containerButtonTable'>
                              <Button
                                type={ButtonType.ERROR}
                                value={"Delete"}
                                onClick={() =>
                                  handleClickOnModal("delete", data.id)
                                }
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
            )}
          </section>
          <Pagination
            limit={limit}
            offsetState={offsetState}
            totalItems={totalItems}
            setOffsetState={setOffsetState}
          />
          {useGetUsersStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </section>
      </BreadcrumbWrapper>
    </Layout>
    // </AccessConsume>
  )
}

export default withAuth(Users)
