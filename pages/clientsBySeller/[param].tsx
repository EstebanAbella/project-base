import React, { useEffect, useState } from 'react'
import AccessConsume from '../../wrappers/auth/AccessConsume'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { ServerStatus } from '../../Utils/Types/global'
import {
  SurveyClientType,
  SurveySellerType,
  SurveysReducerPropsTypes,
} from '../../Utils/Types/surveyType'
import ClientCard from '../../components/ClientCard'
import SellerCard from '../../components/SellerCard'
import Navigation from '../../components/Navigation'
import { SearchReducerPropsTypes } from '../../Utils/Types/SearchModel'
import Search from '../../components/Search'
import Loader from '../../components/Loader'
import Layout from '../../components/Layout'
import { getClients } from '../../redux/surveys/actions'
import { SurveyResult } from '../../mock'

const mapStateToProps = (state: RootState) => {
  const surveyReducer = state.survey
  const searchReducer = state.search
  return {
    clientsStatus: surveyReducer.clientsStatus,
    clients: surveyReducer.clients,

    surveysStatus: surveyReducer.surveysStatus,
    surveys: surveyReducer.surveys,

    surveyClientSearchStatus: searchReducer.surveyClientSearchStatus,
    surveyClientSearch: searchReducer.surveyClientSearch,
  }
}

const mapDispatchToProps = {
  getClients,
}

export type ClientsBySellerPropType = {
  getClients: Function
} & SearchReducerPropsTypes &
  SurveysReducerPropsTypes

const ClientsBySeller = ({
  clientsStatus,
  clients,
  surveysStatus,
  surveys,
  surveyClientSearchStatus,
  surveyClientSearch,
  getClients,
}: ClientsBySellerPropType) => {
  const [sellerSelected, setSellerSelected] = useState<SurveySellerType>()
  const [stateSearch, setStateSearch] = useState<boolean>(
    surveyClientSearch && surveyClientSearch?.length !== 0 ? false : true
  )
  const router = useRouter()
  const { param } = router.query

  useEffect(() => {
    // if (surveysStatus === ServerStatus.FETCH && surveys && param) {
    if (param) {
      const sellerSelectedFilter = SurveyResult?.filter(
        (data) => data.seller.id === parseInt(param[0])
      )
      setSellerSelected(sellerSelectedFilter[0].seller)
      getClients(SurveyResult, parseInt(param[0]))
    }
    // }
  }, [param])

  return (
    <AccessConsume>
      <Layout isNavigation={true} newRoute={'/home'} title={'Distribuidor'}>
        <section className="clientsBySeller">
          {sellerSelected && (
            <SellerCard
              id={sellerSelected.id}
              name={sellerSelected.name}
              address={sellerSelected.address}
              clients={''}
              lastVisit={''}
              seeClients={false}
            />
          )}

          <div className="clientSearchContainer">
            <Search
              data={clients}
              setStateSearch={setStateSearch}
              searchType={'CLIENTS'}
              searchString={
                surveyClientSearch ? surveyClientSearch[0]?.name : ''
              }
            />
            <span className="icon-points"></span>
          </div>
          <h2>Encuestas a puntos de venta</h2>

          {clientsStatus === ServerStatus.FETCH &&
            clients &&
            stateSearch === true &&
            clients?.map((data: SurveyClientType) => (
              <ClientCard
                id={data.id}
                name={data.name}
                address={data.address}
                cuit={'0000'}
                lastVisit={'000'}
                channelName={data.channelName}
                channelId={data.channelId}
                code={data.code}
                state={'pending'}
                key={data.id}
              />
            ))}

          {surveyClientSearchStatus === ServerStatus.FETCH &&
            surveyClientSearch &&
            stateSearch === false &&
            surveyClientSearch.map((data: SurveyClientType) => (
              <ClientCard
                id={data.id}
                name={data.name}
                address={data.address}
                cuit={'0000'}
                lastVisit={'000'}
                channelName={data.channelName}
                channelId={data.channelId}
                code={data.code}
                state={'pending'}
                key={data.id}
              />
            ))}

          {surveyClientSearchStatus === ServerStatus.FETCH_ERROR &&
            stateSearch === false && <p>No se encontraron resultados!</p>}

          {surveyClientSearchStatus === ServerStatus.FETCHING &&
            stateSearch === false && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsBySeller)
