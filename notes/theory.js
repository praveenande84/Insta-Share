/* -----> Third Party Packages <----- */
import React from 'react' // convert html element to react element
import {useState, useContext, useEffect} from 'react' // React Hookss
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom' // routing Components
import Cookies from 'js-cookie' // Cookies is used to store data on client-side with expiry duration.

/*

react Hooks:
useState => This is used for state Initialization
useEffect => This is used for Mounting & Unmounting
useContext => we can access React contextObject values
===================
routing Component:
-------------------
Route => The Route Component renders specific UI component when path matches current URL => exact keyword renders the route if path matches exactly the current url.
Redirect =>  The Redirect Component is used to redirect to another path.
Link => The Link Component creates hyperlinks that allows to navigate around in application.
The to prop specifies absolute path.
withRouter => To provide history prop to other components, we can wrap it with the withRouter function while exporting it.
*/

/* -----> import External Components <----- */
import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'

/* -----> import styles <----- */
import './App.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const App = () => {
  console.log('App Component')

  // Return JSX
  return (
    <div className="app-component">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:id" component={UserProfile} />
          <Route exact path="/my-profile" component={MyProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

/* -----> Default Export <----- */
export default App
