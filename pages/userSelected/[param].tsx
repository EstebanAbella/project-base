import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RootState } from '../../redux/rootReducer'
import { getUser } from '../../redux/user/actions'
import { UsersReducerPropsTypes } from '../../Utils/Types/userType'
import { connect } from 'react-redux'
import { ServerStatus } from '../../Utils/Types/global'
import Loader from '../../components/Loader'
import AccessConsume from '../../wrappers/auth/AccessConsume'
import Layout from '../../components/Layout'

const mapStateToProps = (state: RootState) => {
  const usersReducer = state.user
  return {
    user: usersReducer.user,
    userStatus: usersReducer.userStatus,
  }
}

const mapDispatchToProps = {
  getUser,
}

export type UserPropType = {
  getUser: Function
} & UsersReducerPropsTypes

const UserSelected = ({ getUser, user, userStatus }: UserPropType) => {
  const router = useRouter()
  const { param } = router.query

  useEffect(() => {
    if (param) {
      getUser(param)
    }
  }, [param])
  return (
    <AccessConsume>
      <Layout isNavigation={true} newRoute={'/users'} title={'All users'}>
        <>
          {userStatus === ServerStatus.FETCH && user && (
            <section className="userSelected">
              <p>
                Id: <span className="userSpan">{user.id}</span>
              </p>
              <p>
                Nombre: <span className="userSpan">{user.name}</span>
              </p>
              <p>
                E-mail: <span className="userSpan">{user.email}</span>
              </p>
              <p>
                Role: <span className="userSpan">{user.role}</span>
              </p>
            </section>
          )}
          {userStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSelected)
