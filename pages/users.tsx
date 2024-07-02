import React, { useEffect } from 'react'
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
  }, [userCreateStatus, userDeleteStatus, userEditStatus])
  return (
    <AccessConsume>
      <Layout isNavigation={false}>
        <section className="usersPage">
          <h1>Users</h1>
          <section className="addUserAction">
            <Button
              type={ButtonType.SUCCESS}
              value={'Add user'}
              onClick={() => createUser()}
            ></Button>
          </section>
          {usersStatus !== ServerStatus.FETCHING && (
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
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.role}</td>
                        <td>
                          <Button
                            type={ButtonType.ERROR}
                            value={'Delete'}
                            onClick={() => deleteUser(data.id)}
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
          )}

          {usersStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
