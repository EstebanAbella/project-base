import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { RootState } from '../../redux/rootReducer'
import { getClient } from '../../redux/client/actions'
import { connect } from 'react-redux'
import { ServerStatus } from '../../Utils/Types/global'
import Loader from '../../components/Loader'
import AccessConsume from '../../wrappers/auth/AccessConsume'
import Layout from '../../components/Layout'
import { ClientsReducerPropsType } from '../../Utils/Types/clientType'

const mapStateToProps = (state: RootState) => {
  const clientsReducer = state.client
  return {
    client: clientsReducer.client,
    clientStatus: clientsReducer.clientStatus,
  }
}

const mapDispatchToProps = {
  getClient,
}

export type ClientPropType = {
  getClient: Function
} & ClientsReducerPropsType

const ClientSelected = ({ getClient, client, clientStatus }: ClientPropType) => {
  const router = useRouter()
  const { param } = router.query

  useEffect(() => {
    if (param) {
      getClient(param)
    }
  }, [param])

  return (
    <AccessConsume>
      <Layout isNavigation={true} newRoute={'/clients'} title={'All clients'}>
        <>
          {clientStatus === ServerStatus.FETCH && client && (
            <section className="clientSelected">
              <p>
                Id: <span className="clientSpan">{client.id}</span>
              </p>
              <p>
                Nombre: <span className="clientSpan">{client.name}</span>
              </p>
              <p>
                E-mail: <span className="clientSpan">{client.email}</span>
              </p>
              <p>
                Addres: <span className="clientSpan">{client.address}</span>
              </p>
            </section>
          )}
          {clientStatus === ServerStatus.FETCHING && <Loader></Loader>}
        </>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientSelected)
