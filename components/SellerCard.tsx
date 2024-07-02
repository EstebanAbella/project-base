import React from 'react'
import Button, { ButtonType } from './Button'
import router from 'next/router'

export type RoutesCardPropsType = {
  id: number
  name: string
  address: string
  clients: string
  lastVisit: string
  seeClients: boolean
}

const SellerCard = ({
  id,
  name,
  address,
  clients,
  lastVisit,
  seeClients,
}: RoutesCardPropsType) => {
  return (
    <section className="sellerCard">
      <div className="sellerDescription">
        <p className="nameSeller">{name}</p>
        <p>{address}</p>
        <p>{`Clientes: ${clients}`}</p>
        <p>{`Último visita: ${lastVisit}`}</p>
      </div>

      <div className="routesBySellerButton">
        {seeClients && (
          <Button
            value={'Ver PDVs'}
            type={ButtonType.TERTIARY}
            onClick={() => router.push(`/clientsBySeller/${id}`)}
          ></Button>
        )}
      </div>
    </section>
  )
}

export default SellerCard
