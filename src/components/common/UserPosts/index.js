/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */

/* -----> Third Party Packages <----- */
import {useState, useEffect} from 'react' // React Hooks
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

/* -----> import External Components <----- */
import UserPostItem from '../UserPostItem'

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
const UserPosts = () => {
  console.log('UserPosts Component')

  // Initialization
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [userPostsList, setUserPostsList] = useState([])

  // API Call
  const getUserPostsList = async () => {
    console.log('getUserPostsList From API')
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options) // Network Call
      const data = await response.json()
      const {posts} = data
      const formattedData = posts.map(each => ({
        comments: each.comments.map(eachComment => ({
          comment: eachComment.comment,
          commentUserId: eachComment.user_id,
          userName: eachComment.user_name,
        })),

        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetails: {
          caption: each.post_details.caption,
          imageUrl: each.post_details.image_url,
        },
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
        message: each.message, // like_status
      }))
      console.log(formattedData)
      setUserPostsList(formattedData)
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // Mounting
  useEffect(() => {
    getUserPostsList()
  }, [])

  // Method

  const onLikeIcon = async (postId, updatedIsLiked) => {
    const isLikeStatus = {
      like_status: updatedIsLiked, // If you want to like a post then set like_status as true otherwise set it as false.
    }

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(isLikeStatus),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)

    const updatedUserPostsList = userPostsList.map(eachPost => {
      if (postId === eachPost.postId) {
        return {
          ...eachPost,
          message: data.message,
          likesCount: updatedIsLiked
            ? eachPost.likesCount + 1
            : eachPost.likesCount - 1,
        }
      }
      return eachPost
    })
    setUserPostsList(updatedUserPostsList)
  }

  // Component Views
  const loadingView = () => {
    console.log('Loading View')
    return (
      <div className="loading-view loader-container" testid="loader">
        <Loader
          className="loader"
          type="TailSpin"
          color="#4094EF"
          height={50}
          width={50}
        />
      </div>
    )
  }

  const successView = () => (
    <ul className="Success-view">
      {userPostsList.map(eachPost => (
        <UserPostItem
          key={eachPost.postId}
          eachPost={eachPost}
          onLikeIcon={onLikeIcon}
        />
      ))}
    </ul>
  )

  const failureView = () => {
    console.log('Failure View')
    return (
      <div className="posts-failure-view">
        <img
          className="user-stories-alert-icon"
          src="https://res.cloudinary.com/dd863dehd/image/upload/v1692257657/Insta%20Share/Desktop/Home/alert-triangle_kbe6di.png"
          alt="failure view"
        />
        <p className="user-posts-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          className="user-posts-try-again-button"
          type="button"
          onClick={getUserPostsList}
        >
          Try again
        </button>
      </div>
    )
  }

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
  return <div className="user-posts-component">{renderView()}</div>
}

/* -----> Default Export <----- */
export default UserPosts
