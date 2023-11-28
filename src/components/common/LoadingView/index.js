/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */

/* -----> Third Party Packages <----- */
import Loader from 'react-loader-spinner' // Loader

/* -----> import styles <----- */
import './index.css' // CSS File

/* -----> Creating Components <----- */

// Functional Component
const LoadingView = () => {
  console.log('LoadingView Component')

  // Return JSX
  return (
    <div className="loading-view-component" testid="loader">
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

/* -----> Default Export <----- */
export default LoadingView
