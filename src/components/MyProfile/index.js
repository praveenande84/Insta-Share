/* -----> Third Party Packages <----- */
import {useState, useEffect, useContext} from 'react' // React Hooks
import Cookies from 'js-cookie'

/* -----> import External Components <----- */
import Header from '../common/Header'
import LoadingView from '../common/LoadingView'
import FailureView from '../common/FailureView'
import InstaContext from '../../context/InstaContext'
import MyProfileSection from '../common/MyProfileSection'
import MyPostsSection from '../common/MyPostsSection'

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// API Status Constants
const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Functional Component
const MyProfile = () => {
  console.log('MyProfile Component')

  // React Context -> // Here, we can access React context values
  const {onUpdateMyProfileData} = useContext(InstaContext)

  // Initialization
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  // API Call
  const getMyProfileData = async () => {
    console.log('getMyProfileData From API')
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options) // Network Call
      const data = await response.json()
      const profileData = data.profile
      const formattedData = {
        id: profileData.id,
        userId: profileData.user_id,

        profilePic: profileData.profile_pic,

        userName: profileData.user_name,

        postsCount: profileData.posts_count,
        followersCount: profileData.followers_count,
        followingCount: profileData.following_count,

        userBio: profileData.user_bio,

        stories: profileData.stories
          ? profileData.stories.map(eachStory => ({
              id: eachStory.id,
              image: eachStory.image,
            }))
          : [],

        posts: profileData.posts
          ? profileData.posts.map(eachPost => ({
              id: eachPost.id,
              image: eachPost.image,
            }))
          : [],
      }
      console.log(formattedData)
      onUpdateMyProfileData(formattedData)
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // Mounting
  useEffect(() => {
    getMyProfileData()
    // eslint-disable-next-line
  }, [])

  // Component Views
  const loadingView = () => <LoadingView />
  const failureView = () => <FailureView tryAgainAPICall={getMyProfileData} />

  const successView = () => (
    <div className="my-profile-container">
      <MyProfileSection />
      <MyPostsSection />
    </div>
  )

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return loadingView()
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.failure:
        return failureView()
      default:
        return null
    }
  }

  // Return JSX
  return (
    <div className="my-profile-component">
      <Header />
      {renderView()}
    </div>
  )
}

/* -----> Default Export <----- */
export default MyProfile
