"use client"
import React from "react"
import { ServerStatus } from "../../interface/global"
import { Loader } from "../../components/Loader/Loader"
import { Layout } from "../../wrappers/Layout/Layout"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useClientSelected } from "./useClientSelected"
interface Props {
  param: string
}

export const ClientSelected = ({ param }: Props) => {
  const { useGetClientData, useGetClientStatus } = useClientSelected(
    param as string
  )

  return (
    <Layout>
      <BreadcrumbWrapper>
        <section className='clientSelected'>
          <div className='clientSelectedCard'>
            {useGetClientStatus === ServerStatus.FETCH && useGetClientData && (
              <>
                <h2 className='clientTitle'>Customer Details</h2>
                <div className='clientInfo'>
                  <div className='clientRow'>
                    <span className='clientLabel'>ID:</span>
                    <span className='clientValue'>{useGetClientData.id}</span>
                  </div>
                  <div className='clientRow'>
                    <span className='clientLabel'>Name:</span>
                    <span className='clientValue'>{useGetClientData.name}</span>
                  </div>
                  <div className='clientRow'>
                    <span className='clientLabel'>E-mail:</span>
                    <span className='clientValue'>
                      {useGetClientData.email}
                    </span>
                  </div>
                  <div className='clientRow'>
                    <span className='clientLabel'>Address:</span>
                    <span className='clientValue'>
                      {useGetClientData.address}
                    </span>
                  </div>
                </div>
              </>
            )}
            {useGetClientStatus === ServerStatus.FETCHING && (
              <div className='loaderWrapper'>
                <Loader />
              </div>
            )}
          </div>
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}
