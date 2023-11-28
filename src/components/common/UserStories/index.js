/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */

/* -----> Third Party Packages <----- */
import Cookies from 'js-cookie'
import {useEffect, useState} from 'react' // React Hooks
import Loader from 'react-loader-spinner'

/* -----> Third Party Components <----- */
import Slider from 'react-slick' // sliding component

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
const UserStories = () => {
  console.log('UserStories Component')

  // Initialization
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [userStoriesList, setUserStoriesList] = useState([])

  // API Call
  const getUserStoriesList = async () => {
    console.log('getUserStoriesList From API')
    setApiStatus(apiStatusConstants.inProgress)

    try {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options) // Network Call

      const data = await response.json()
      const userStoriesArray = data.users_stories
      const formattedData = userStoriesArray.map(eachStory => ({
        userId: eachStory.user_id,
        storyUrl: eachStory.story_url,
        userName: eachStory.user_name,
      }))
      console.log(formattedData)
      setUserStoriesList(formattedData)
      setApiStatus(apiStatusConstants.success)
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  // Mounting
  useEffect(() => {
    getUserStoriesList()
  }, [])

  // Methods

  // Component Parts
  const renderEachUserStory = eachStory => {
    console.log('renderEachUserStory Component Part')
    const {userId, userName, storyUrl} = eachStory
    return (
      <li key={userId}>
        <div className="user-story-container slick-item">
          <div className="user-story-image-container">
            <img className="user-story-image" src={storyUrl} alt="user story" />
          </div>

          <p className="user-story-username">{userName}</p>
        </div>
      </li>
    )
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const renderSlider = () => (
    <ul className="slick-container render-slider-container">
      <Slider {...settings}>
        {userStoriesList.map(each => renderEachUserStory(each))}
      </Slider>
    </ul>
  )

  // Component Views
  const loadingView = () => {
    console.log('Loading View')
    return (
      <div className="loader-container" testid="loader">
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

  const successView = () => {
    console.log('Success View')
    return <div className="success-view main-container">{renderSlider()}</div>
  }

  const failureView = () => {
    console.log('Failure View')
    return (
      <div className="user-stories-failure-view">
        <img
          className="user-stories-alert-icon"
          src="https://res.cloudinary.com/dd863dehd/image/upload/v1692257657/Insta%20Share/Desktop/Home/alert-triangle_kbe6di.png"
          alt="failure view"
        />
        <p className="user-stories-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          className="user-stories-try-again-button"
          type="button"
          onClick={getUserStoriesList}
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
  return <div className="user-stories-component">{renderView()}</div>
}

/* -----> Default Export <----- */
export default UserStories
