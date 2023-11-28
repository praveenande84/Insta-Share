/* -----> Third Party Packages <----- */
import {useContext} from 'react' // React Hooks

/* -----> import External Components <----- */
import Header from '../common/Header'
import InstaContext from '../../context/InstaContext'
import UserStories from '../common/UserStories'
import UserPosts from '../common/UserPosts'
import SearchPosts from '../common/SearchPosts'

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const Home = () => {
  console.log('Home Component')

  // React Context -> // Here, we can access React context values
  const {isSearchBoxActive} = useContext(InstaContext)

  // Component Parts
  const renderUserStoriesAndUserPosts = () => (
    <div>
      <UserStories />
      <UserPosts />
    </div>
  )

  const renderSearchPosts = () => (
    <div>
      <SearchPosts />
    </div>
  )

  // Component Views
  const renderView = () => (
    <div>
      {isSearchBoxActive
        ? renderSearchPosts()
        : renderUserStoriesAndUserPosts()}
    </div>
  )

  // Return JSX
  return (
    <div className="home-component">
      <Header />
      {renderView()}
    </div>
  )
}

/* -----> Default Export <----- */
export default Home
