/* -----> Third Party Packages <----- */
import {useState} from 'react' // React Hooks
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom' // routing Components

/* -----> import External Components <----- */
import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import InstaContext from './context/InstaContext'
import NightModeStyles from './styledComponents/NightModeStyles'

/* -----> import styles <----- */
import './App.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const App = () => {
  console.log('App Component')

  // Initialization
  const [selectedNavItem, setSelectedNavItem] = useState('home')
  const [searchValue, setSearchValue] = useState('')
  const [isSearchBoxActive, setIsSearchBoxActive] = useState(false)
  const [isNightModeActive, setIsNightModeActive] = useState(false)
  const [isHamburgerActive, setIsHamburgerActive] = useState(false)
  const [searchPostsList, setSearchPostsList] = useState([])
  const [userProfileData, setUserProfileData] = useState({})
  const [myProfileData, setMyProfileData] = useState({})
  const [searchIconStatus, setSearchIconStatus] = useState(false)

  // Methods
  const onUpdateSelectedNavItem = updatedSelectedNavItem => {
    setSelectedNavItem(updatedSelectedNavItem)
  }

  const onUpdateSearchValue = updatedSearchValue => {
    setSearchValue(updatedSearchValue)
  }

  const onUpdateIsSearchBoxActive = updatedIsSearchBoxActive => {
    setIsSearchBoxActive(updatedIsSearchBoxActive)
  }

  const onToggleSearchIconStatus = updatedSearchIconStatus => {
    setSearchIconStatus(updatedSearchIconStatus)
  }

  const onUpdateIsNightModeActive = updatedIsNightModeActive => {
    setIsNightModeActive(updatedIsNightModeActive)
  }

  const onUpdateIsHamburgerActive = updatedIsHamburgerActive => {
    setIsHamburgerActive(updatedIsHamburgerActive)
  }

  const onUpdateSearchPostsList = updatedSearchPostsList => {
    setSearchPostsList(updatedSearchPostsList)
  }

  const onUpdateUserProfileData = updatedUserProfileData => {
    setUserProfileData(updatedUserProfileData)
  }

  const onUpdateMyProfileData = updatedMyProfileData => {
    setMyProfileData(updatedMyProfileData)
  }

  // Here, Providing React Context Object
  const InstaContextProviderObject = {
    selectedNavItem,
    onUpdateSelectedNavItem,

    searchValue,
    onUpdateSearchValue,

    isSearchBoxActive,
    onUpdateIsSearchBoxActive,

    searchIconStatus,
    onToggleSearchIconStatus,

    isNightModeActive,
    onUpdateIsNightModeActive,

    isHamburgerActive,
    onUpdateIsHamburgerActive,

    searchPostsList,
    onUpdateSearchPostsList,

    userProfileData,
    onUpdateUserProfileData,

    myProfileData,
    onUpdateMyProfileData,
  }

  // Return JSX
  return (
    <InstaContext.Provider value={InstaContextProviderObject}>
      <div className="app-component">
        {isNightModeActive && <NightModeStyles />}

        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/users/:id" component={UserProfile} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </div>
    </InstaContext.Provider>
  )
}

/* -----> Default Export <----- */
export default App
