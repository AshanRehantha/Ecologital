import React, { Fragment } from 'react'
import { Button } from 'react-bootstrap'

export const UiButton_login = (props) => {
  return (
    <Fragment>
      <div className='d-grid gap-2'>
        <Button
          variant={props.variant}
          disabled={props.disabled}
          size={'lg'}
          onClick={props.onClick}
          type={props.type}
          id={props.id}
          className={props.variant == "primary" ? "butn butn__primary" : "butn__primary"}
        >
          {props.text}
        </Button>
      </div>
    </Fragment>
  )
}

export const UiNavButton = (props) => {
  return (
    <Fragment>
        <Button
          className={props.active ? 'nav-click-button nav-click-button__active' :  'nav-click-button'}
          onClick={props.onClick}
          name={props.name}
        >
          {props.text}
        </Button>
    </Fragment>
  )
}

export const UiPrimaryButton = (props) => {
  return (
    <Fragment>
      <div className='d-grid gap-2 butn'>
        <Button
          variant={props.variant}
          disabled={props.disabled}
          size={''}
          onClick={props.onClick}
          type={props.type}
          id={props.id}
          className={props.variant == "primary" ? "butn butn__primary" : "butn__primary"}
        >
          {props.text}
        </Button>
      </div>
    </Fragment>
  )
}

