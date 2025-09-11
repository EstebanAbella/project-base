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

  // return (
  //   <Layout>
  //     <BreadcrumbWrapper>
  //       <section className='userSelected'>
  //         <section className='userSelectedContainer'>
  //           <>
  //             {useGetUserStatus === ServerStatus.FETCH && useGetUserData && (
  //               <div className='userSelectedContainerData'>
  //                 <p>
  //                   Id: <span className='userSpan'>{useGetUserData.id}</span>
  //                 </p>
  //                 <p>
  //                   Nombre:{" "}
  //                   <span className='userSpan'>{useGetUserData.name}</span>
  //                 </p>
  //                 <p>
  //                   E-mail:{" "}
  //                   <span className='userSpan'>{useGetUserData.email}</span>
  //                 </p>
  //                 <p>
  //                   Rol: <span className='userSpan'>{useGetUserData.role}</span>
  //                 </p>
  //                 <p>
  //                   Permisos:
  //                   <br />
  //                   {Object.entries(useGetUserData.permissions).map(
  //                     ([section, actions]) => {
  //                       return (
  //                         <div key={section} className='userSpan'>
  //                           {section}:{" "}
  //                           {Array.isArray(actions)
  //                             ? actions.join(", ")
  //                             : "No permissions"}
  //                         </div>
  //                       )
  //                     }
  //                   )}
  //                 </p>
  //               </div>
  //             )}
  //             {useGetUserStatus === ServerStatus.FETCHING && <Loader></Loader>}
  //           </>
  //         </section>
  //       </section>
  //     </BreadcrumbWrapper>
  //   </Layout>
  // )
  return (
    <Layout>
      <BreadcrumbWrapper>
        <section className='userSelected'>
          <section className='userSelectedContainer'>
            <>
              {useGetUserStatus === ServerStatus.FETCH && useGetUserData && (
                <>
                  <h2 className='userTitle'>Usuario seleccionado</h2>
                  <div className='userInfo'>
                    <p>
                      <strong>Id:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.id}</span>
                    </p>
                    <p>
                      <strong>Nombre:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.name}</span>
                    </p>
                    <p>
                      <strong>E-mail:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.email}</span>
                    </p>
                    <p>
                      <strong>Rol:</strong>{" "}
                      <span className='userSpan'>{useGetUserData.role}</span>
                    </p>
                    <div className='permissions'>
                      <strong>Permisos:</strong>
                      <div className='permissionsList'>
                        {Object.entries(useGetUserData.permissions).map(
                          ([section, actions]) => (
                            <div key={section} className='permissionItem'>
                              <span className='permissionSection'>
                                {section}:
                              </span>{" "}
                              {Array.isArray(actions)
                                ? actions.join(", ")
                                : "No permissions"}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {useGetUserStatus === ServerStatus.FETCHING && <Loader />}
            </>
          </section>
        </section>
      </BreadcrumbWrapper>
    </Layout>
  )
}

export default withAuth(UserSelected)
