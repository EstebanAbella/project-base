import { useRouter } from "next/router"
import React from "react"
import { ServerStatus } from "../../interface/global"
import { Loader } from "../../components/Loader/Loader"
import AccessConsume from "../../wrappers/auth/AccessConsume"
import { Layout } from "../../wrappers/Layout/Layout"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useUserSelected } from "./useUserSelected"

export const UserSelected = () => {
  const router = useRouter()
  const { param } = router.query

  const { useGetUserData, useGetUserStatus } = useUserSelected(param as string)

  return (
    <AccessConsume>
      <Layout>
        <BreadcrumbWrapper>
          <section className='userSelected'>
            <section className='userSelectedContainer'>
              <>
                {useGetUserStatus === ServerStatus.FETCH && useGetUserData && (
                  <div className='userSelectedContainerData'>
                    <p>
                      Id: <span className='userSpan'>{useGetUserData.id}</span>
                    </p>
                    <p>
                      Nombre:{" "}
                      <span className='userSpan'>{useGetUserData.name}</span>
                    </p>
                    <p>
                      E-mail:{" "}
                      <span className='userSpan'>{useGetUserData.email}</span>
                    </p>
                    <p>
                      Role:{" "}
                      <span className='userSpan'>{useGetUserData.role}</span>
                    </p>
                  </div>
                )}
                {useGetUserStatus === ServerStatus.FETCHING && (
                  <Loader></Loader>
                )}
              </>
            </section>
          </section>
        </BreadcrumbWrapper>
      </Layout>
    </AccessConsume>
  )
}
