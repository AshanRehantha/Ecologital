import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from './Login';
import CreateNewUser from './Forms/CreateNewUser';
import ForgetPassword from './Forms/ForgetPassword';
import PasswordReset from './Forms/PasswordReset';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../components/_uiComponents/loading.component';

const AuthWrapper = (props) => {
  const { loading } = useSelector((state) => {
    return {
      loading: state.loading,
    };
  });
  return (
    <React.Fragment>
      <Container className={""} fluid={"true"}>
        <Row className={"wrapper"}>
            <Col xs={"12"} lg={"6"} md={"6"}>
            </Col>
            <Col xs={"12"} lg={"6"} md={"6"}>
                {props.location.pathname == "/" ? 
                (<Login {...props} />) 
                : 
                props.location.pathname == "/create-new-user" ?
                  <CreateNewUser {...props}/>
                :
                props.location.pathname == "/password-reset" ?
                  <PasswordReset {...props}/>
                :
                <ForgetPassword {...props} />  
                }

            </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default AuthWrapper