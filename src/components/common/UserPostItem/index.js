/* -----> Third Party Packages <----- */
import {Link} from 'react-router-dom' // routing Components

/* -----> React Icons <----- */
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const UserPostItem = props => {
  console.log('PostItem Component')

  // props Object destructuring
  const {eachPost, onLikeIcon} = props
  const {
    postId,
    userId,
    userName,
    profilePic,
    postDetails,
    likesCount,
    comments,
    createdAt,
    message,
  } = eachPost

  const isLiked = message === 'Post has been liked' // this is from postLikeApi
  // Methods
  const onClickLikeButton = () => {
    const isLikedUpdate = false
    onLikeIcon(postId, isLikedUpdate)
  }

  const onClickDislikeButton = () => {
    const isLikedUpdate = true
    onLikeIcon(postId, isLikedUpdate)
  }

  // Component Parts
  const renderProfilePicContainer = () => (
    <div className="profile-pic-container">
      <img
        className="post-item-profile-pic"
        src={profilePic}
        alt="post author profile"
      />
    </div>
  )

  const renderUserName = () => (
    <Link to={`/users/${userId}`} className="post-username-link">
      <h1 className="userName-heading">{userName}</h1>
    </Link>
  )

  const renderPostImageContainer = () => (
    <div className="post-image-container">
      <img className="post-image" src={postDetails.imageUrl} alt="post" />
    </div>
  )

  const renderHeartCommentShareIconsContainer = () => (
    <div className="heart-comment-share-icons-container">
      {isLiked ? (
        <button type="button" className="like-button">
          <FcLike
            testid="unLikeIcon"
            onClick={onClickLikeButton}
            className="icon"
          />
        </button>
      ) : (
        <button type="button" className="like-button">
          <BsHeart
            testid="likeIcon"
            onClick={onClickDislikeButton}
            className="icon"
          />
        </button>
      )}
      <BiShareAlt className="icon" />
      <FaRegComment className="icon" />
    </div>
  )

  const renderLikesCount = () => (
    <p className="like-count">{`${likesCount} likes`}</p>
  )

  const renderPostCaption = () => (
    <p className="post-caption">{postDetails.caption}</p>
  )

  const renderCommentsContainer = () => (
    <div>
      {comments.map(each => (
        <p className="comment" key={each.commentUserId}>
          <span className="comment-user">{each.userName}</span>
          {` ${each.comment}`}
        </p>
      ))}
    </div>
  )

  const renderCreatedAt = () => <p className="created-time">{createdAt}</p>

  // Return JSX
  return (
    <li className="post-item-component">
      <div className="profilePic-userName-section">
        {renderProfilePicContainer()}
        {renderUserName()}
      </div>
      <div className="post-image-section">{renderPostImageContainer()}</div>
      <div className="icons-caption-likes-comments-createAt-section">
        {renderHeartCommentShareIconsContainer()}
        {renderLikesCount()}
        {renderPostCaption()}
        {renderCommentsContainer()}
        {renderCreatedAt()}
      </div>
    </li>
  )
}

/* -----> Default Props <----- */
// defaultProps is a property in React Component used to set default values for the props.
UserPostItem.defaultProps = {
  postId: 'f25d77f0-602e-41d1-971e-4b8cf54709eb',
  userId: 'Varun_Aadithya',
  userName: 'Varun Aadithya',
  profilePic:
    'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/users/instagram-mini-project-user-1-img.png',
  postDetails: {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/instagram-mini-project/posts/instagram-mini-project-post-1-img.png',
    caption: 'Another day, another sunrise',
  },
  likesCount: 7,
  comments: [
    {
      userName: 'Prabuddha Dasgupta',
      userId: 'Prabuddha_Dasgupta',
      comment: 'Lightning is incredible.',
    },
  ],
  createdAt: '4 Hours Ago',
}

/* -----> Default Export <----- */
export default UserPostItem
