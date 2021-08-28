import React ,{useState, useContext, Component}from 'react'
import { useHistory , Redirect} from "react-router-dom"; 
import axios from "axios";
import ErrorNotice from './ErrorNotice';
// import {userContext} from "../../../containers/userContext";
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

export default class Login extends Component {

  constructor(props){
    super(props);
    const token=localStorage.getItem("auth-token");
  console.log("Dashboard Token "+token)
  let loggedIn=true;
  if(token==null)
  {
    loggedIn=false;
  } 
    // collapsed:true;
    // showElements:true;

    this.onChangeEmail=this.onChangeEmail.bind(this);

    this.onChangePassword=this.onChangePassword.bind(this);
    
    this.handleSubmit=this.handleSubmit.bind(this);

    this.state={
      email:'',
      password:'',
      error:'',
      loggedIn
    }
  }
  

  setError(e)
  {
    this.setState({
      error:e
    })
  }
  onChangeEmail(e){
    this.setState({
      email:e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      password:e.target.value
    })
  }
  // const history = useHistory();
  // const { setUserData } = useContext(userContext);

  async handleSubmit(e){
    e.preventDefault();
    try {
    
      const loginUser = { email:this.state.email, password:this.state.password };
     const loginRes = await axios.post(
        "http://localhost:8000/owner/login",
        loginUser)
  
      if(loginRes.data.user){
        console.log("Inside "+loginRes.data.token)
        localStorage.setItem("auth-token", loginRes.data.token);
        this.setState({
          loggedIn:true
        })
      }
 

      console.log(loginRes.data.token+" L");
      // if(loggedIn){
      
      //   console.log("Dashboard Token f "+loginRes.data.token);
    //     history.push('/');

      
      console.log("hello");
    } catch (err) {
      
      err.response.data.msg && this.setError(err.response.data.msg); 
      console.log("Hello"+this.state.error)
    }
  };
  
  render(){
    if(this.state.loggedIn){
      return <Redirect to="/"/>
    }
  return (
  
       <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                {this.state.error && (
                <CAlert color="primary" >{this.state.error} </CAlert>
                 )}
                  <CForm className="form-horizontal" onSubmit={this.handleSubmit}>
                    <h1>Food Grid</h1>
                    <p className="text-muted">Sign In to your business account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="username" 
                        onChange={this.onChangeEmail}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" 
                       onChange={this.onChangePassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="success" className="px-4" style={{color:"green",backgroundColor:"white" }}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                     
                      </CCol>
                    </CRow>
                  
                  </CForm>
                  <CRow>
                     
                      <CCol xs="6" className="text-right" style={{marginLeft:'100px'}}>
                      Don't have an account ?
                     <Link to="/register">Sign Up</Link>
                      </CCol>
                    </CRow>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
            }
}

