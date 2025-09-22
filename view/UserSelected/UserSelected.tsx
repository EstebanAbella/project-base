import { useRouter } from "next/router"
import React from "react"
import { ServerStatus } from "../../interface/global"
import { Loader } from "../../components/Loader/Loader"
import { Layout } from "../../wrappers/Layout/Layout"
import { BreadcrumbWrapper } from "../../wrappers/breadcrumbWrapper"
import { useUserSelected } from "./useUserSelected"
import withAuth from "../../hooks/withAuth"

const UserSelected = () => {
  const router = useRouter()
  const { param } = router.query

  const { useGetUserData, useGetUserStatus } = useUserSelected(param as string)

  return (
    <Layout>
      <BreadcrumbWrapper>
        <section className='userSelected'>
          <section className='userSelectedContainer'>
            <>
              {useGetUserStatus === ServerStatus.FETCH && useGetUserData && (
                <>
                  <h2 className='userTitle'>User Selected</h2>
                  <div className='userInfo'>
                    <p>
                      <strong>Id:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.id}</span>
                    </p>
                    <p>
                      <strong>Name:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.name}</span>
                    </p>
                    <p>
                      <strong>E-mail:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.email}</span>
                    </p>
                    <p>
                      <strong>Role:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.role}</span>
                    </p>
                    <div className='permissions'>
                      <strong>Permissions:</strong>
                      <div className='permissionsList'>
                        {useGetUserData?.permissions &&
                          Object.keys(useGetUserData.permissions).length >
                            0 && (
                            <div className='permissionsList'>
                              {Object.entries(useGetUserData.permissions).map(
                                ([section, actions]) =>
                                  Array.isArray(actions) &&
                                  actions.length > 0 && (
                                    <div
                                      key={section}
                                      className='permissionItem'
                                    >
                                      <span className='permissionSection'>
                                        {section}:
                                      </span>{" "}
                                      {actions.join(", ")}
                                    </div>
                                  )
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {useGetUserStatus === ServerStatus.FETCHING && (
                <div className='loaderWrapper'>
                  <Loader />
                </div>
              )}
            </>
          </section>
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}

export default withAuth(UserSelected)
