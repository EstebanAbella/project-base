import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { ServerStatus } from "../../interface/global"
import { Loader } from "../../components/Loader/Loader"
import { Layout } from "../../wrappers/Layout/Layout"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useClientSelected } from "./useClientSelected"

export const ClientSelected = () => {
  const router = useRouter()
  const { param } = router.query

  const { useGetClientData, useGetClientStatus } = useClientSelected(
    param as string
  )

  return (
    <Layout>
      <BreadcrumbWrapper>
        <section className='clientSelected'>
          <section className='clientSelectedContainer'>
            <>
              {useGetClientStatus === ServerStatus.FETCH &&
                useGetClientData && (
                  <div className='clientSelectedContainerData'>
                    <p>
                      Id:{" "}
                      <span className='clientSpan'>{useGetClientData.id}</span>
                    </p>
                    <p>
                      Nombre:{" "}
                      <span className='clientSpan'>
                        {useGetClientData.name}
                      </span>
                    </p>
                    <p>
                      E-mail:{" "}
                      <span className='clientSpan'>
                        {useGetClientData.email}
                      </span>
                    </p>
                    <p>
                      Addres:{" "}
                      <span className='clientSpan'>
                        {useGetClientData.address}
                      </span>
                    </p>
                  </div>
                )}
              {useGetClientStatus === ServerStatus.FETCHING && (
                <Loader></Loader>
              )}
            </>
          </section>
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}
