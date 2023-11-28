// FailureView

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const FailureView = props => {
  console.log('FailureView Component')

  // Props Object Destructuring
  const {tryAgainAPICall} = props

  // Methods
  const onTryAgainButton = () => {
    tryAgainAPICall()
  }

  // Return JSX
  return (
    <div className="failure-view-component">
      <img
        className="something-went-wrong-image"
        src="https://res.cloudinary.com/dd863dehd/image/upload/v1691850882/Insta%20Share/Desktop/Home/some-times-went-wrong_m3ipbe.png"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-button"
        type="button"
        onClick={onTryAgainButton}
      >
        Try again
      </button>
    </div>
  )
}

/* -----> Default Export <----- */
export default FailureView
