/* -----> Third Party Packages <----- */
import {useContext} from 'react' // React Hooks

/* -----> React Icons <----- */
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

/* -----> Third Party Components <----- */
import InstaContext from '../../../context/InstaContext'

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const UserPostsSection = () => {
  console.log('UserPostsSection Component')

  // React Context ->  Here, we can access context values
  const {userProfileData} = useContext(InstaContext)
  const {posts} = userProfileData
  console.log(posts)

  // Return JSX
  return (
    <div className="posts-section-component">
      <div className="postHeading-postsIcon-container">
        <BsGrid3X3 className="posts-icon" />
        <h1 className="posts-heading">Posts</h1>
      </div>
      <ul className="posts-container">
        {posts && posts.length > 0 ? (
          posts.map(eachPost => (
            <li key={eachPost.id} className="post-section-post-item">
              <img
                className="posts-section-post-image"
                src={eachPost.image}
                alt="user post"
              />
            </li>
          ))
        ) : (
          <div className="no-posts-container">
            <div className="camera-icon-container">
              <BiCamera className="camera-icon" />
            </div>

            <h1 className="no-posts-description">No Posts</h1>
          </div>
        )}
      </ul>
    </div>
  )
}

/* -----> Default Export <----- */
export default UserPostsSection
