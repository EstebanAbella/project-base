import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { RootState } from "../../redux/rootReducer"
import { getUser } from "../../redux/user/actions"
import { UsersReducerPropsTypes } from "../Users/user.interface"
import { connect, useDispatch, useSelector } from "react-redux"
import { ServerStatus } from "../../interface/global"
import { Loader } from "../../components/Loader/Loader"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import { Layout } from "../../wrappers/Layout/Layout"
import { AppDispatch } from "../../redux/store"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"

export const UserSelected = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { param } = router.query

  const { user, userStatus } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (param) {
      dispatch(getUser(param as string))
    }
  }, [param, dispatch])

  return (
    <AccessConsume>
      <Layout>
        <BreadcrumbWrapper>
          <section className='userSelected'>
            <section className='userSelectedContainer'>
              <>
                {userStatus === ServerStatus.FETCH && user && (
                  <div className='userSelectedContainerData'>
                    <p>
                      Id: <span className='userSpan'>{user.id}</span>
                    </p>
                    <p>
                      Nombre: <span className='userSpan'>{user.name}</span>
                    </p>
                    <p>
                      E-mail: <span className='userSpan'>{user.email}</span>
                    </p>
                    <p>
                      Role: <span className='userSpan'>{user.role}</span>
                    </p>
                  </div>
                )}
                {userStatus === ServerStatus.FETCHING && <Loader></Loader>}
              </>
            </section>
          </section>
        </BreadcrumbWrapper>
      </Layout>
    </AccessConsume>
  )
}
