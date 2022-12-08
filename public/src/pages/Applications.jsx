import React from 'react'
import LeftNavBar from '../components/_uiComponents/nav/LeftNavBar'
import ApplicationRouter from '../routes/Application.router'

const Applications = (props) => {
  return (
    <React.Fragment>
        <div className='wrapper'>
          <div className='top-nav-bar'>
            <h2>Ecologital Assignment</h2>
          </div>
          <LeftNavBar/>
          <div className='component-wrapper'>
              <ApplicationRouter {...props}/>
          </div>
        </div>
    </React.Fragment>
  )
}

export default Applications