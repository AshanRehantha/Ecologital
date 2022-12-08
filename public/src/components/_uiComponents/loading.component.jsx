import React from 'react'

const LoadingComponent = (props) => {
  return (
    <React.Fragment>
      {props.isloading ? 
        <div className='loaderWaper'>
          <div className='loading'>

          </div>
        </div>
     : null}
    </React.Fragment>
  )
}

export default LoadingComponent