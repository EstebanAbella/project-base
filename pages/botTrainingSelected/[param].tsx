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
                  <div className='optionsTrainingSingle'>
                    <p>Id: </p>
                    <p className='botTrainingSpan'>{botTraining.id}</p>
                  </div>

                  {botTraining.body ? (
                    <div className='optionsTrainingSingle'>
                      <p>Body: </p>
                      <p className='botTrainingSpan'>{botTraining.body}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {botTraining.footer ? (
                    <div className='optionsTrainingSingle'>
                      <p>Footer: </p>
                      <p className='botTrainingSpan'>{botTraining.footer}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {botTraining.seed ? (
                    <div className='optionsTrainingSingle'>
                      <p>Seed: </p>
                      <p className='botTrainingSpan'>{botTraining.seed}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {botTraining.trigger ? (
                    <div className='optionsTrainingSingle'>
                      <p>Trigger: </p>
                      <p className='botTrainingSpan'>{botTraining.trigger}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {botTraining.type ? (
                    <div className='optionsTrainingSingle'>
                      <p>Type: </p>
                      <p className='botTrainingSpan'>{botTraining.type}</p>
                    </div>
                  ) : (
                    ""
                  )}

                  {botTraining.options.length ? (
                    <div className='optionsTraining'>
                      <p>Options: </p>
                      <div className='optionsTrainingContainer'>
                        {botTraining.options.map((data: string, index) => (
                          <p
                            className='botTrainingSpan'
                            key={`${index} ${data}`}
                          >
                            {data}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {botTraining.additional_actions.length ? (
                    <div className='optionsTraining'>
                      <p>Additional actions: </p>
                      <div className='optionsTrainingContainer'>
                        {botTraining.additional_actions.map((data, index) => (
                          <div className='optionsTrainingContainerItems'>
                            {data.reaction ? (
                              <p
                                className='botTrainingSpan'
                                key={`${index} ${data.reaction}`}
                              >
                                Reaction: {data.reaction}
                              </p>
                            ) : (
                              ""
                            )}
                            {data.type ? (
                              <p
                                className='botTrainingSpan'
                                key={`${index} ${data.type}`}
                              >
                                Type: {data.type}
                              </p>
                            ) : (
                              ""
                            )}
                            {data.sticker_name ? (
                              <p
                                className='botTrainingSpan'
                                key={`${index} ${data.sticker_name}`}
                              >
                                Sticker name: {data.sticker_name}
                              </p>
                            ) : (
                              ""
                            )}
                            {data.delay ? (
                              <p
                                className='botTrainingSpan'
                                key={`${index} ${data.delay}`}
                              >
                                Delay: {data.delay}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
