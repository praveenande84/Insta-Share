/* -----> Third Party Packages <----- */
import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

/*
	Redirection Logic can be reused by separating out into a React Component called Wrapper Component.
    Each route will be wrapped with it.
*/

// ProtectedRoute is the Wrapper Component
const ProtectedRoute = props => {
  const jwtToken = Cookie.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

/* -----> Default Export <----- */
export default ProtectedRoute
