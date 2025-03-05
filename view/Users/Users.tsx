import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import router from "next/router"
import { AppDispatch } from "../../redux/store"
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from "../../redux/user/actions"
import { RootState } from "../../redux/rootReducer"
import { ServerStatus } from "../../interface/global"
import { UseCallOfTables } from "../../hooks/useCallOfTables"
import { TextFieldType } from "../../components/TextFieldModalCrud/TextFieldModalCrud"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import { Layout } from "../../wrappers/Layout/Layout"
import { Modal } from "../../components/Modal"
import { Button, ButtonType } from "../../components/Button/Button"
import { Search } from "../../components/Search/Search"
import { Pagination } from "../../components/Pagination/Pagination"
import { Loader } from "../../components/Loader/Loader"

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const {
    userStatus,
    users,
    usersStatus,
    userCreateStatus,
    userDeleteStatus,
    userEditStatus,
  } = useSelector((state: RootState) => state.user)
  const [stateModal, setStateModal] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>("")
  const [dataInitialModal, setDataInitialModal] = useState()
  const [filter, setFilter] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [offsetState, setOffsetState] = useState<number>(0)
  const limit = 5
  const totalItems = users?.count ? users?.count : 0
  const order = "ASC"
  const roles = user?.role

  useEffect(() => {
    dispatch(
      getUsers(
        offsetState,
        limit,
        query ?? "",
        filter ?? "",
        order ?? "",
        roles ?? ""
      )
    )
  }, [])

  useEffect(() => {
    if (userDeleteStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems - 1
      const isLastPage = offsetState + limit >= anticipatedTotalItems

      if (
        isLastPage &&
        anticipatedTotalItems <= offsetState &&
        offsetState > 0
      ) {
        setOffsetState((prevOffset) => prevOffset - limit)
      } else {
        dispatch(
          getUsers(
            offsetState,
            limit,
            query ?? "",
            filter ?? "",
            order ?? "",
            roles ?? ""
          )
        )
      }
      setStateModal(false)
    }
  }, [userDeleteStatus])

  useEffect(() => {
    if (userEditStatus === ServerStatus.FETCH) {
      dispatch(
        getUsers(
          offsetState,
          limit,
          query ?? "",
          filter ?? "",
          order ?? "",
          roles ?? ""
        )
      )
      setStateModal(false)
    }
  }, [userEditStatus])

  useEffect(() => {
    if (userCreateStatus === ServerStatus.FETCH) {
      const anticipatedTotalItems = totalItems
      const isLastPage = offsetState + limit >= anticipatedTotalItems
      if (isLastPage && totalItems % limit === 0) {
        setOffsetState((prevOffset) => prevOffset + limit)
      } else {
        dispatch(
          getUsers(
            offsetState,
            limit,
            query ?? "",
            filter ?? "",
            order ?? "",
            roles ?? ""
          )
        )
      }
      setStateModal(false)
    }
  }, [userCreateStatus])

  UseCallOfTables({
    offsetState,
    limit,
    query,
    filter,
    order,
    roles,
    action: dispatch(getUsers),
    setOffsetState,
  })

  const createUserObject = [
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
      valueSelect: ["user", "admin"],
    },
  ]

  const editUserObject = [
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
      valueSelect: ["user", "admin"],
    },
  ]

  const handleClickCreateUSer = (data: any) => {
    dispatch(createUser(data))
  }

  const handleClickEditUSer = (data: any) => {
    dispatch(editUser(data))
  }

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === "create") {
      setTypeModal("modal-create-user")
      setStateModal(true)
    } else if (typeModal === "edit") {
      setTypeModal("modal-edit-user")
      setStateModal(true)
      setDataInitialModal(data)
    }
  }

  return (
    <AccessConsume>
      <Layout>
        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={createUserObject}
          textButton={"Add user"}
          typeButton={ButtonType.SUCCESS}
          onClick={handleClickCreateUSer}
          isDisabled={typeModal === "modal-create-user"}
        />

        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={editUserObject}
          textButton={"Update user"}
          typeButton={ButtonType.INFORMATION}
          onClick={handleClickEditUSer}
          isDisabled={typeModal === "modal-edit-user"}
          initialData={dataInitialModal}
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
            {usersStatus !== ServerStatus.FETCHING && (
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
                  {users?.items ? (
                    users?.items.map((data) => (
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
                                onClick={() => dispatch(deleteUser(data.id))}
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
          {usersStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}
