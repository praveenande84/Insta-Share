/* -----> Third Party Packages <----- */
import React from 'react'

/* -----> React Context <----- */
// Context is a mechanism that provides different Components and allows us to pass data without doing prop drilling.
// It returns an object with different properties to update and access values from the context.

const InstaContext = React.createContext({
  selectedNavItem: 'home',
  onUpdateSelectedNavItem: () => {},

  searchValue: '',
  onUpdateSearchValue: () => {},

  isSearchBoxActive: false,
  onUpdateIsSearchBoxActive: () => {},

  searchIconStatus: false,
  onToggleSearchIconStatus: () => {},

  isNightModeActive: false,
  onUpdateIsNightModeActive: () => {},

  isHamburgerActive: false,
  onUpdateIsHamburgerActive: () => {},

  searchPostsList: [],
  onUpdateSearchPostsList: () => {},

  userProfileData: {},
  onUpdateUserProfileData: () => {},

  myProfileData: {},
  onUpdateMyProfileData: () => {},
})

/* -----> Default Export <----- */
export default InstaContext
