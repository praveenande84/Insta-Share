/* -----> Third Party Packages <----- */

import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'

/* -----> import External Components <----- */
import Header from '../common/Header'
import LoadingView from '../common/LoadingView'
import FailureView from '../common/FailureView'
import InstaContext from '../../context/InstaContext'
import UserProfileSection from '../common/UserProfileSection'
import UserPostsSection from '../common/UserPostsSection'

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
const UserProfile = props => {
  console.log('UserProfile Component')

  // Props Destructuring

  const {match} = props
  const {params} = match
  const userId = params.id
  console.log(userId)

  // Initialization
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  // React Context -> // Here, we can access React context values
  const {onUpdateUserProfileData} = useContext(InstaContext)

  // API Call
  const getUserProfileData = async () => {
    console.log('getUserProfileData From API')
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options) // Network Call
      const data = await response.json()
      const profileData = data.user_details
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
      onUpdateUserProfileData(formattedData)
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // Mounting
  useEffect(() => {
    getUserProfileData()
    // eslint-disable-next-line
  }, [])

  // Component View
  const loadingView = () => <LoadingView />
  const failureView = () => <FailureView tryAgainAPICall={getUserProfileData} />

  const successView = () => (
    <div className="my-profile-container">
      <UserProfileSection />
      <UserPostsSection />
    </div>
  )

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return loadingView()
      case apiStatusConstants.failure:
        return failureView()
      case apiStatusConstants.success:
        return successView()
      default:
        return null
    }
  }
  // Return JSX
  return (
    <div className="user-profile-component">
      <Header />
      {renderView()}
    </div>
  )
}

/* -----> Default Export <----- */
export default UserProfile
