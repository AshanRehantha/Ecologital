import React, { useEffect, useState } from 'react';
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";

export const UiInputs = (props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    props.username(inputValue);
  },[inputValue]);

  return (
    <FormGroup>
        <FormControl
            size='lg'
            type={props.type}
            placeholder={props.placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            maxLength={props.maxLength}
            className={"form-control"}
        />
    </FormGroup>
  )
}

export const UiInputsPassword = (props) => {
    const [inputValuePassword, setInputValuePassword] = useState("");
    useEffect(() => {
        props.password(inputValuePassword);
      },[inputValuePassword])
    return (
        <FormGroup>
            <FormControl
                size='lg'
                type={props.type}
                placeholder={props.placeholder}
                onChange={(e) => setInputValuePassword(e.target.value)}
                value={inputValuePassword}
                maxLength={props.maxLength}
                className={"form-control"}
            />
        </FormGroup>
      )
}

export const UiCustomInputs = (props) => {
  return (
    <FormGroup>
      <FormControl
          size='lg'
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onchange}
          maxLength={props.maxLength}
          className={"form-control"}
          value={props.value}
      />
    </FormGroup>
  )
}

export const UiFormsInputs = (props) => {
  return (
    <FormGroup>
      <FormControl
        size=''
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onchange}
        maxLength={props.maxLength}
        className={"form-control ui-inputs-with-radus"}
        value={props.value}
      />
    </FormGroup>
  )
}
