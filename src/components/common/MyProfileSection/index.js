/* -----> Third Party Packages <----- */
import {useContext} from 'react' // React Hooks

/* -----> import External Components <----- */
import InstaContext from '../../../context/InstaContext' // React Context

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const MyProfileSection = () => {
  console.log('MyProfileSection Component')

  // React Context -> // Here, we can access context values
  const {myProfileData} = useContext(InstaContext)
  const {
    userId,
    profilePic,
    userName,
    postsCount,
    followersCount,
    followingCount,
    userBio,
    stories,
  } = myProfileData
  console.log(myProfileData)

  // Component Parts
  const renderProfilePic = () => (
    <div>
      <img src={profilePic} alt="my profile" className="profile-pic" />
    </div>
  )

  const renderUsername = () => <h1 className="username-heading">{userName}</h1>

  const renderPostsCount = () => (
    <p className="counting-container">
      <span className="counting">{postsCount}</span> posts
    </p>
  )

  const renderFollowersCount = () => (
    <p className="counting-container">
      <span className="counting">{followersCount}</span> followers
    </p>
  )

  const renderFollowingCount = () => (
    <p className="counting-container">
      <span className="counting">{followingCount}</span> follwowing
    </p>
  )

  const renderUserId = () => <p className="user-id">{userId}</p>

  const renderUserBio = () => <p className="user-bio">{userBio}</p>

  const renderStories = () => (
    <ul className="stories-container">
      {stories &&
        stories.map(eachStory => (
          <li
            key={eachStory.id}
            className="story-image-container user-story-item"
          >
            <img className="story-image" src={eachStory.image} alt="my story" />
          </li>
        ))}
    </ul>
  )

  const renderHorizontalLine = () => <hr />

  // Return JSX
  return (
    <div className="profile-section-component">
      <div className="profile-section-container">
        <div className="desktop-profile-pic">{renderProfilePic()}</div>
        <div>
          {renderUsername()}
          <div className="profile-details-container">
            <div className="mobile-profile-pic">{renderProfilePic()}</div>

            {renderPostsCount()}
            {renderFollowersCount()}
            {renderFollowingCount()}
          </div>

          {renderUserId()}
          {renderUserBio()}
        </div>
      </div>

      {renderStories()}
      {renderHorizontalLine()}
    </div>
  )
}

/* -----> Default Export <----- */
export default MyProfileSection
