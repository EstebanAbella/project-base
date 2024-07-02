import React, { useEffect, useState } from 'react'
import AccessConsume from '../wrappers/auth/AccessConsume'
import SellerCard from '../components/SellerCard'
import {
  SurveySellerType,
  SurveysReducerPropsTypes,
} from '../Utils/Types/surveyType'
import { connect } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { getSellers, getSurveys } from '../redux/surveys/actions'
import { ServerStatus } from '../Utils/Types/global'
import Search from '../components/Search'
import { SearchReducerPropsTypes } from '../Utils/Types/SearchModel'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import { SurveyResult } from '../mock'

const mapStateToProps = (state: RootState) => {
  const surveyReducer = state.survey
  const searchReducer = state.search
  return {
    surveysStatus: surveyReducer.surveysStatus,
    surveys: surveyReducer.surveys,

    sellersStatus: surveyReducer.sellersStatus,
    sellers: surveyReducer.sellers,

    surveySellerSearchStatus: searchReducer.surveySellerSearchStatus,
    surveySellerSearch: searchReducer.surveySellerSearch,
  }
}

const mapDispatchToProps = {
  getSurveys,
  getSellers,
}

export type HomePropType = {
  getSurveys: Function
  getSellers: Function
} & SurveysReducerPropsTypes &
  SearchReducerPropsTypes

const Home = ({
  getSurveys,
  surveys,
  surveysStatus,
  surveySellerSearchStatus,
  surveySellerSearch,
  getSellers,
  sellersStatus,
  sellers,
}: HomePropType) => {
  const [stateSearch, setStateSearch] = useState<boolean>(
    surveySellerSearch && surveySellerSearch?.length !== 0 ? false : true
  )

  useEffect(() => {
    // if (surveysStatus === ServerStatus.FETCH) {
    getSellers(SurveyResult)
    // }
  }, [surveysStatus])

  return (
    <AccessConsume>
      <Layout isNavigation={false}>
        <section className="home">
          <div className="homeTitleContainer">
            <h2>Rutas por distribuidor</h2>
            <p>Martes 11 de Febrero</p>
          </div>
          <div className="homeSearchContainer">
            <Search
              data={sellers}
              setStateSearch={setStateSearch}
              searchType={'SELLER'}
              searchString={
                surveySellerSearch ? surveySellerSearch[0]?.name : ''
              }
            />
            <span className="icon-shareWindows"></span>
            <span className="icon-filter"></span>
          </div>

          {sellers &&
            stateSearch === true &&
            sellers.map((data) => (
              <SellerCard
                id={data.id}
                name={data.name}
                address={data.address}
                clients={data.clients ? data.clients.length.toString() : ''}
                lastVisit={''}
                seeClients={true}
                key={data.id}
              />
            ))}

          {surveySellerSearchStatus === ServerStatus.FETCH &&
            surveySellerSearch &&
            stateSearch === false &&
            surveySellerSearch.map((data) => (
              <SellerCard
                id={data.id}
                name={data.name}
                address={data.address}
                clients={data.clients ? data.clients.length.toString() : ''}
                lastVisit={''}
                seeClients={true}
                key={data.id}
              />
            ))}

          {surveySellerSearchStatus === ServerStatus.FETCH_ERROR &&
            stateSearch === false && <p>No se encontraron resultados!</p>}

          {surveySellerSearchStatus === ServerStatus.FETCHING &&
            stateSearch === false && <Loader></Loader>}
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
