import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/rootReducer'
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from '../redux/user/actions'
import { UsersReducerPropsTypes } from '../Utils/Types/userType'
import { connect } from 'react-redux'
import Button, { ButtonType } from '../components/Button'
import { ServerStatus } from '../Utils/Types/global'
import Loader from '../components/Loader'
import AccessConsume from '../wrappers/auth/AccessConsume'
import Layout from '../components/Layout'
import router from 'next/router'
import Modal from '../components/Modal'
import { TextFieldType } from '../components/TextField'

const mapStateToProps = (state: RootState) => {
  const usersReducer = state.user
  return {
    user: usersReducer.user,
    userStatus: usersReducer.userStatus,

    users: usersReducer.users,
    usersStatus: usersReducer.usersStatus,

    userCreateStatus: usersReducer.userCreateStatus,
    userDeleteStatus: usersReducer.userDeleteStatus,
    userEditStatus: usersReducer.userEditStatus,
  }
}

const mapDispatchToProps = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  editUser,
}

export type UsersPropType = {
  getUsers: Function
  getUser: Function
  createUser: Function
  deleteUser: Function
  editUser: Function
} & UsersReducerPropsTypes

const Users = ({
  getUsers,
  getUser,
  createUser,
  deleteUser,
  editUser,
  user,
  userStatus,
  users,
  usersStatus,
  userCreateStatus,
  userDeleteStatus,
  userEditStatus,
}: UsersPropType) => {
  const [stateModal, setStateModal] = useState<boolean>(false)
  const [typeModal, setTypeModal] = useState<string>('')

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (
      userCreateStatus === ServerStatus.FETCH ||
      userDeleteStatus === ServerStatus.FETCH ||
      userEditStatus === ServerStatus.FETCH
    )
      getUsers()
    setStateModal(false)
  }, [userCreateStatus, userDeleteStatus, userEditStatus])

  const createUserObject = [
    {
      label: 'Id',
      name: 'id',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'number',
      placeholder: 'Id',
    },
    {
      label: 'Nombre',
      name: 'name',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'text',
      placeholder: 'Escriba su nombre',
    },
    {
      label: 'E-mail',
      name: 'email',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'email',
      placeholder: 'email@email.com',
    },
    {
      label: 'Password',
      name: 'password',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'password',
      placeholder: 'Password',
    },
    {
      label: 'Role',
      name: 'role',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'select',
      placeholder: '-',
      valueSelect: ['User', 'Admin'],
    },
  ]

  const editUserObject = [
    {
      label: 'Id',
      name: 'id',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'number',
      placeholder: 'Id',
    },
    {
      label: 'Nombre',
      name: 'name',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'text',
      placeholder: 'Escriba su nombre',
    },
    {
      label: 'E-mail',
      name: 'email',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'email',
      placeholder: 'email@email.com',
    },
    {
      label: 'Password',
      name: 'password',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'password',
      placeholder: 'Password',
    },
    {
      label: 'Role',
      name: 'role',
      typeTextField: TextFieldType.PRIMARY,
      disabled: false,
      type: 'select',
      placeholder: '-',
      valueSelect: ['User', 'Admin'],
    },
  ]

  const handleClickCreateUSer = (data: any) => {
    createUser(data)
  }

  const handleClickEditUSer = (data: any) => {
    console.log(data)
    editUser(data)
  }

  const handleClickOnModal = (typeModal: string, data?: any) => {
    if (typeModal === 'create') {
      setTypeModal('modal-create-user')
      setStateModal(true)
    } else if (typeModal === 'edit') {
      setTypeModal('modal-edit-user')
      setStateModal(true)
    }
  }

  return (
    <AccessConsume>
      <Layout isNavigation={false}>
        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={createUserObject}
          textButton={'Add user'}
          typeButton={ButtonType.SUCCESS}
          onClick={handleClickCreateUSer}
          isDisabled={typeModal === 'modal-create-user'}
        />

        <Modal
          stateModal={stateModal}
          setStateModal={setStateModal}
          dataForm={editUserObject}
          textButton={'Update user'}
          typeButton={ButtonType.INFORMATION}
          onClick={handleClickEditUSer}
          isDisabled={typeModal === 'modal-edit-user'}
        />
        <section className="usersPage">
          <h1>Users</h1>
          {usersStatus !== ServerStatus.FETCHING && (
            <>
              <section className="addUserAction">
                <Button
                  type={ButtonType.SUCCESS}
                  value={'Add user'}
                  onClick={() => handleClickOnModal('create')}
                  extraClassName={'buttonTable'}
                ></Button>
              </section>
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users ? (
                    users?.map((data) => (
                      <tr key={data.id}>
                        <>
                          <td>{data.id}</td>
                          <td>
                            <p
                              onClick={() =>
                                router.push(`/userSelected/${data.id}`)
                              }
                              style={{ cursor: 'pointer' }}
                            >
                              {data.name}
                            </p>
                          </td>
                          <td>{data.email}</td>
                          <td>{data.role}</td>
                          <td className="containerButtonTable">
                            <Button
                              type={ButtonType.ERROR}
                              value={'Delete'}
                              onClick={() => deleteUser(data.id)}
                              extraClassName={'buttonTable'}
                            ></Button>
                            <Button
                              type={ButtonType.INFORMATION}
                              value={'Update'}
                              onClick={() => handleClickOnModal('edit')}
                              extraClassName={'buttonTable'}
                            ></Button>
                          </td>
                        </>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                        <td>{'-'}</td>
                      </>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {usersStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
/*
add user: generar el id en el back
update user: que funcione y completar automaticamente los datos del modal

copiar lo mismo de usuarios en clientes

copiar lo mismo de usuarios en items

relacionar items con clientes

proteger ruta usuarios solo para roles admin

llamada para validar token por ususario

dar estilos sitio web

eliminar lo que no es necesario
*/
