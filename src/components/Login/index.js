// Login Component

/* -----> Third Party Packages <----- */
import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

/* -----> import styles <----- */
import './index.css'

/* -----> Creating Components <----- */

// Functional Component
const Login = props => {
  console.log('Login Component')

  // Initialization
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)

  // Methods
  const onUsername = event => {
    const updatedUsername = event.target.value
    setUsername(updatedUsername)
  }

  const onPassword = event => {
    const updatedPassword = event.target.value
    setPassword(updatedPassword)
  }

  const onSubmitSuccess = formData => {
    console.log(formData)
    const {history} = props

    const jwtToken = formData.jwt_token
    console.log(jwtToken)

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/') // Automatic Browser Path change
  }

  const onSubmitFailure = formData => {
    console.log(formData)
    setShowSubmitError(true)
    const errMsg = formData.error_msg
    console.log(errMsg)
    setErrorMessage(errMsg)
  }

  const onFormSubmit = async event => {
    console.log('Form Submitted')
    event.preventDefault() // Avoid form default behaviour

    const userDetails = {username, password}
    console.log(userDetails)

    const apiUrl = 'https://apis.ccbp.in/login/'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options) // Network Call
    console.log(response)

    if (response.ok) {
      console.log('Success')
      const data = await response.json()
      onSubmitSuccess(data)
    } else {
      console.log('Failure')
      const data = await response.json()
      onSubmitFailure(data)
    }
  }

  // Component Parts

  const renderLoginImageContainer = () => (
    <div className="login-image-container">
      <img
        className="website-login"
        src="https://res.cloudinary.com/dd863dehd/image/upload/v1691407532/Insta%20Share/Desktop/Login/website-login_wtcais.png"
        alt="website login"
      />
    </div>
  )

  const renderUsernameContainer = () => (
    <div className="input-container">
      <label htmlFor="username" className="input-label">
        USERNAME
      </label>
      <input
        id="username"
        className="input-box"
        type="text"
        placeholder="username : rahul"
        onChange={onUsername}
        value={username}
      />
    </div>
  )

  const renderPasswordContainer = () => (
    <div className="input-container">
      <label htmlFor="password" className="input-label">
        PASSWORD
      </label>
      <input
        id="password"
        className="input-box"
        type="password"
        placeholder="password : rahul@2021"
        onChange={onPassword}
        value={password}
      />
    </div>
  )

  const renderLoginButton = () => (
    <div className="login-button-container">
      <button className="login-button" type="submit">
        Login
      </button>
    </div>
  )

  const renderLoginFormContainer = () => (
    <div className="login-form-container">
      <img
        className="website-logo"
        src="https://res.cloudinary.com/dd863dehd/image/upload/v1691407532/Insta%20Share/Desktop/Login/website-logo_ybrmrv.png"
        alt="website logo"
      />
      <h1 className="logo-heading">Insta Share</h1>
      <form className="form-container" onSubmit={onFormSubmit}>
        {renderUsernameContainer()}
        {renderPasswordContainer()}
        {showSubmitError && <p className="error-message">{errorMessage}</p>}

        {renderLoginButton()}
      </form>
    </div>
  )

  // Return JSX
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    console.log('Redirect to Home Component')
    return <Redirect to="/" />
  }
  return (
    <div className="login-component">
      {renderLoginImageContainer()}
      {renderLoginFormContainer()}
    </div>
  )
}

/* -----> Default Export <----- */
export default Login
