import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { RootState } from "../../redux/rootReducer"
import { getBotTraining } from "../../redux/botTraining/actions"
import { BotTrainingsReducerPropsTypes } from "../../Utils/Types/botTrainingType"
import { connect } from "react-redux"
import { ServerStatus } from "../../Utils/Types/global"
import Loader from "../../components/Loader"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import Layout from "../../components/Layout"
import Navigation from "../../components/Navigation"

const mapStateToProps = (state: RootState) => {
  const botTrainingsReducer = state.botTraining
  return {
    botTraining: botTrainingsReducer.botTraining,
    botTrainingStatus: botTrainingsReducer.botTrainingStatus,
  }
}

const mapDispatchToProps = {
  getBotTraining,
}

export type BotTrainingPropType = {
  getBotTraining: Function
} & BotTrainingsReducerPropsTypes

const BotTrainingSelected = ({
  getBotTraining,
  botTraining,
  botTrainingStatus,
}: BotTrainingPropType) => {
  const router = useRouter()
  const { param } = router.query

  useEffect(() => {
    if (param) {
      getBotTraining(param)
    }
  }, [param])
  return (
    <AccessConsume>
      <Layout>
        <section className='botTrainingSelected'>
          <Navigation
            newRoute={"/botTraining"}
            title={"All botTrainings"}
          ></Navigation>
          <section className='botTrainingSelectedContainer'>
            <>
              {botTrainingStatus === ServerStatus.FETCH && botTraining && (
                <div className='botTrainingSelectedContainerData'>
                  <p>
                    Id:{" "}
                    <span className='botTrainingSpan'>{botTraining.id}</span>
                  </p>
                  <p>
                    Nombre:{" "}
                    <span className='botTrainingSpan'>{botTraining.name}</span>
                  </p>
                </div>
              )}
              {botTrainingStatus === ServerStatus.FETCHING && <Loader></Loader>}
            </>
          </section>
        </section>
      </Layout>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BotTrainingSelected)
