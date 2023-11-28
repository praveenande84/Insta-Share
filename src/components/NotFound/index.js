/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const NotFound = props => {
  console.log('NotFound Component')

  // Methods
  const onHomePageButton = () => {
    const {history} = props
    history.replace('/')
  }

  // Return JSX
  return (
    <div className="not-found-component">
      <div className="not-found-image-container">
        <img
          className="not-found-image"
          src="https://res.cloudinary.com/dd863dehd/image/upload/v1691583058/Insta%20Share/Desktop/NotFound/not-found_qnfonn.png"
          alt="page not found"
        />
      </div>
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found. <br />
        Please go back to the homepage.
      </p>
      <button
        className="home-page-button"
        type="button"
        onClick={onHomePageButton}
      >
        Home Page
      </button>
    </div>
  )
}

/* -----> Default Export <----- */
export default NotFound
