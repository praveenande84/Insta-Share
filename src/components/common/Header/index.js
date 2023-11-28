/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */

/* -----> Third Party Packages <----- */
import {useState, useContext, useEffect} from 'react' // React Hooks
import {Link, withRouter} from 'react-router-dom' // routing Components
import Cookies from 'js-cookie'

/* -----> React Icons <----- */
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseCircle} from 'react-icons/io5'
import {RiMoonFill} from 'react-icons/ri'
import {WiSunrise} from 'react-icons/wi'

/* -----> import External Components <----- */
import InstaContext from '../../../context/InstaContext' // React Context

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const Header = props => {
  console.log('Header Component')

  // Initialization
  const [isMobileSearchBoxOpen, setIsMobileSearchBoxOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  // React Context -> // Here, we can access React contextObject values
  const {
    selectedNavItem,
    onUpdateSelectedNavItem,

    onUpdateSearchValue,

    onUpdateIsSearchBoxActive,

    isNightModeActive,
    onUpdateIsNightModeActive,

    isHamburgerActive,
    onUpdateIsHamburgerActive,

    searchIconStatus,
    onToggleSearchIconStatus,
  } = useContext(InstaContext)

  // Mounting
  useEffect(() => {
    onUpdateSearchValue(searchInput)
    // eslint-disable-next-line
  }, [searchInput])

  // Methods

  const onSearchNavItem = () => {
    setIsMobileSearchBoxOpen(true)
    onUpdateIsHamburgerActive(false)
  }

  const onLogoutButton = () => {
    console.log('onLogoutButton Method')
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onSearchIcon = () => {
    console.log('onSearchIcon')
    const {history} = props
    console.log(searchInput)
    onUpdateSearchValue(searchInput)
    onUpdateIsSearchBoxActive(true)
    history.replace('/')
    onUpdateSelectedNavItem('search')
    onToggleSearchIconStatus(!searchIconStatus)
  }

  const onSearchBox = event => {
    const updatedSearchValue = event.target.value
    setSearchInput(updatedSearchValue)
  }

  // Component Parts
  const renderLogoContainer = () => (
    <div>
      <Link
        to="/"
        onClick={() => {
          onUpdateSelectedNavItem('home')
          onUpdateIsSearchBoxActive(false)
        }}
      >
        <img
          className="website-logo"
          src="https://res.cloudinary.com/dd863dehd/image/upload/v1691407532/Insta%20Share/Desktop/Login/website-logo_ybrmrv.png"
          alt="website logo"
        />
      </Link>
    </div>
  )

  const rendreLogoHeading = () => <h1 className="logo-heading">Insta Share</h1>

  const renderSearchBoxContainer = () => (
    <div className="search-box-container">
      <input
        className="search-box"
        type="search"
        placeholder="Search Caption"
        onChange={onSearchBox}
        value={searchInput}
      />
      <button
        className="search-icon-container"
        type="button"
        testid="searchIcon"
        onClick={() => {
          onSearchIcon()
          onUpdateSelectedNavItem('search')
        }}
      >
        <FaSearch className="search-icon" />
      </button>
    </div>
  )

  const renderNightModeIcon = () => (
    <li className="nav-item">
      {isNightModeActive ? (
        <WiSunrise
          className="night-mode-icon"
          onClick={() => onUpdateIsNightModeActive(false)}
        />
      ) : (
        <RiMoonFill
          className="night-mode-icon"
          onClick={() => onUpdateIsNightModeActive(true)}
        />
      )}
    </li>
  )

  const renderHomeNavItem = () => (
    <li
      className="nav-item"
      onClick={() => {
        onUpdateSelectedNavItem('home')
        onUpdateIsSearchBoxActive(false)
      }}
    >
      <Link
        className={`nav-link ${
          selectedNavItem === 'home' ? 'activeTabButtonClassName' : ''
        }`}
        to="/"
      >
        Home
      </Link>
    </li>
  )

  const renderSearchNavItem = () => (
    <li
      id="search"
      className={`nav-item ${
        selectedNavItem === 'search' ? 'activeTabButtonClassName' : ''
      }`}
      onClick={() => {
        onSearchNavItem()
        onUpdateSelectedNavItem('search')
        onUpdateIsSearchBoxActive(true)
      }}
    >
      Seacrh
    </li>
  )

  const renderProfileNavItem = () => (
    <li
      className="nav-item"
      onClick={() => {
        onUpdateSelectedNavItem('profile')
        onUpdateIsSearchBoxActive(false)
      }}
    >
      <Link
        className={`nav-link ${
          selectedNavItem === 'profile' ? 'activeTabButtonClassName' : ''
        }`}
        to="/my-profile"
      >
        Profile
      </Link>
    </li>
  )

  const renderLogoutButtonContainer = () => (
    <div>
      <button className="logout-button" type="button" onClick={onLogoutButton}>
        Logout
      </button>
    </div>
  )

  const renderHamburgerIconContainer = () => (
    <div>
      <GiHamburgerMenu
        className="hamburger-icon"
        onClick={() => {
          onUpdateIsHamburgerActive(true)
          setIsMobileSearchBoxOpen(false)
        }}
      />
    </div>
  )

  const renderCloseIconContainer = () => (
    <div>
      <IoCloseCircle
        className="close-icon"
        onClick={() => onUpdateIsHamburgerActive(false)}
      />
    </div>
  )

  // Return JSX
  return (
    <div className="header-component">
      <div className="desktop-view">
        <div className="logo-heading-section">
          {renderLogoContainer()}
          {rendreLogoHeading()}
        </div>
        <div className="search-navlinks-button-section">
          <div>{renderSearchBoxContainer()}</div>

          <ul className="nav-items-group">
            {renderNightModeIcon()}
            {renderHomeNavItem()}
            {renderProfileNavItem()}
          </ul>
          <div>{renderLogoutButtonContainer()}</div>
        </div>
      </div>
      <div className="mobile-view">
        <div className="logo-heading-hamburger-section">
          <div className="logo-heading-group">
            {renderLogoContainer()}
            {rendreLogoHeading()}
          </div>
          <div>{renderHamburgerIconContainer()}</div>
        </div>
        {isHamburgerActive && (
          <div className="navItems-button-close-section">
            <div className="navItems-button-group">
              {renderNightModeIcon()}
              {renderHomeNavItem()}
              {renderSearchNavItem()}
              {renderProfileNavItem()}
              {renderLogoutButtonContainer()}
            </div>
            <div>{renderCloseIconContainer()}</div>
          </div>
        )}
        {isMobileSearchBoxOpen && renderSearchBoxContainer()}
      </div>
    </div>
  )
}

/* -----> Default Export <----- */
// To provide history prop to other components, we can wrap it with the withRouter function while exporting it.
export default withRouter(Header)
