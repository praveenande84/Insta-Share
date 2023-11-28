/* -----> Third Party Packages <----- */
import {useContext, useEffect, useState} from 'react' // React Hooks
import Cookies from 'js-cookie'

/* -----> import External Components <----- */
import UserPostItem from '../UserPostItem'
import InstaContext from '../../../context/InstaContext' // React Context
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

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
const SearchPosts = () => {
  console.log('SearchPosts Component')

  // Initialization
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchPostsList, setSearchPostsList] = useState([])

  // React Context -> // Here, we can access React context values
  const {searchIconStatus, searchValue} = useContext(InstaContext)

  // API Call
  const getSearchPostsList = async () => {
    console.log('getSearchPostsList From API')
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const searchPostsApiList = data.posts

      const formattedData = searchPostsApiList.map(each => ({
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
        isLiked: false,
      }))
      console.log(formattedData)
      setSearchPostsList(formattedData)

      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // Mounting
  useEffect(() => {
    getSearchPostsList()
    // eslint-disable-next-line
  }, [searchIconStatus])

  // Methods

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

    const updatedPostsList = searchPostsList.map(eachPost => {
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
    setSearchPostsList(updatedPostsList)
  }

  const renderSearchResultNotFoundContainer = () => (
    <div className="search-not-found-container">
      <img
        className="search-not-found-image"
        src="https://res.cloudinary.com/dd863dehd/image/upload/v1691849374/Insta%20Share/Desktop/Home/search-not-found_vvz28f.png"
        alt="search not found"
      />
      <h1 className="search-not-found-heading">Search Not Found</h1>
      <p className="search-not-found-description">
        Try different keyword or search again
      </p>
    </div>
  )

  // Component Parts

  const renderSearchPostsComponent = () => (
    <div>
      {searchPostsList.length > 0 ? (
        <ul className="search-posts-container">
          <h1 className="search-results-heading">Search Results</h1>
          {searchPostsList.map(eachPost => (
            <UserPostItem
              key={eachPost.postId}
              eachPost={eachPost}
              onLikeIcon={onLikeIcon}
            />
          ))}
        </ul>
      ) : (
        renderSearchResultNotFoundContainer()
      )}
    </div>
  )

  // Component Views

  const loadingView = () => <LoadingView />
  const failureView = () => <FailureView tryAgainAPICall={getSearchPostsList} />
  const successView = () => renderSearchPostsComponent()

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
  return <div className="search-posts-component">{renderView()}</div>
}

/* -----> Default Export <----- */
export default SearchPosts
