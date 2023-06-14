import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const {loggedIn} = props
  return (
      loggedIn ? <Outlet/> : <Navigate to="/sign-in" />
  )
}

export default ProtectedRoute;