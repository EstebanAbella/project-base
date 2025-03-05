import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { RootState } from "../../redux/rootReducer"
import { getClient } from "../../redux/client/actions"
import { useDispatch, useSelector } from "react-redux"
import { ServerStatus } from "../../interface/global"
import { Loader } from "../../components/Loader/Loader"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import { Layout } from "../../wrappers/Layout/Layout"
import { Navigation } from "../../components/Navigation/Navigation"
import { AppDispatch } from "../../redux/store"

export const ClientSelected = () => {
  const router = useRouter()
  const { param } = router.query

  const dispatch = useDispatch<AppDispatch>()
  const { client, clientStatus } = useSelector(
    (state: RootState) => state.client
  )

  useEffect(() => {
    if (param) {
      dispatch(getClient(param as string))
    }
  }, [param, dispatch])

  return (
    <AccessConsume>
      <Layout>
        <section className='clientSelected'>
          <Navigation></Navigation>
          <section className='clientSelectedContainer'>
            <>
              {clientStatus === ServerStatus.FETCH && client && (
                <div className='clientSelectedContainerData'>
                  <p>
                    Id: <span className='clientSpan'>{client.id}</span>
                  </p>
                  <p>
                    Nombre: <span className='clientSpan'>{client.name}</span>
                  </p>
                  <p>
                    E-mail: <span className='clientSpan'>{client.email}</span>
                  </p>
                  <p>
                    Addres: <span className='clientSpan'>{client.address}</span>
                  </p>
                </div>
              )}
              {clientStatus === ServerStatus.FETCHING && <Loader></Loader>}
            </>
          </section>
        </section>
      </Layout>
    </AccessConsume>
  )
}
