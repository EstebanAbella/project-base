import React, { useState } from 'react'
import Button from './Button'

export type ClientCardPropsType = {
  id: number
  name: string
  address: string
  cuit: string
  lastVisit: string
  channelName: string
  channelId: string
  code: string
  state: string
}

const ClientCard = ({
  id,
  name,
  address,
  cuit,
  lastVisit,
  channelName,
  channelId,
  code,
  state,
}: ClientCardPropsType) => {
  const [seeMore, setSeeMore] = useState(false)

  const handleClick = () => {
    setSeeMore(!seeMore)
  }

  return (
    <section className="clientCard">
      <div className="containerSurveyDescription">
        <div className="surveyDescription">
          <p className="nameSurvey">{name}</p>
          <p>{address}</p>
          <p>{`último relevamiento: ${lastVisit}`}</p>
          <p>{`CUIT: ${cuit}`}</p>

          <div className="indications">
            <span className="icon-location"></span>
            <p>¿Como llego?</p>
          </div>

          <div className="seeMore" onClick={handleClick}>
            <p>Ver</p>
            <span className={!seeMore ? 'icon-plus' : 'icon-minus'}></span>
          </div>
        </div>
        <div className="surveyButton">
          <Button
            value={'Iniciar'}
            extraClassName={`${!seeMore ? 'show' : 'hide'}`}
          ></Button>
        </div>
      </div>

      <div className={`containerSurveyMoreInfo ${seeMore ? 'show' : ''}`}>
        <div className="containerDataSurvey">
          <div>
            <p className="titleSurvey">Canal</p>
            <p>{channelName}</p>
          </div>
          <div>
            <p className="titleSurvey">Última visita</p>
            <p>{lastVisit}</p>
          </div>
          <div>
            <p className="titleSurvey">N° cliente</p>
            <p>{code}</p>
          </div>
        </div>

        <div className="containerInfoSurvey">
          <p className="titleSurvey">Encuestas</p>
          <p>Nueva Encuesta</p>
          <p>SEPA Kioscos 2023</p>
          <p>2024-01-1OT11:41:24-03:00</p>
        </div>

        <div className="containerButtonSurvey">
          <div
            className="stateSurvey"
            style={{
              backgroundColor: state === 'pending' ? '#FEA95D' : '#3BB439',
            }}
          >
            <p>{state}</p>
          </div>
          <Button value={'Iniciar'}></Button>
        </div>
      </div>
    </section>
  )
}

export default ClientCard
