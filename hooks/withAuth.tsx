import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { ServerStatus } from '../Utils/Types/global';
import { roleMap } from './roleMap';

const mapStateToProps = (state: RootState) => ({
  userRole: state.auth.user?.role,
  loginStatus: state.auth.loginStatus,
})

const mapDispatchToProps = {}

export type WithAuthPropsType = {
  userRole?: string
  loginStatus: ServerStatus
};

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = ({ userRole, loginStatus, ...props }: WithAuthPropsType) => {
    const router = useRouter()
    const componentName = WrappedComponent.displayName || WrappedComponent.name
    const extractedComponentName = componentName.match(/\(([^)]+)\)/)?.[1] || componentName

    useEffect(() => {
      const requiredRole = roleMap[extractedComponentName]
      if (userRole !== undefined && (loginStatus !== ServerStatus.FETCH || userRole !== requiredRole)) {
        router.push('/notAuthorized')
      }
    }, [loginStatus, userRole])

    return <WrappedComponent {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithAuth)
}

export default withAuth