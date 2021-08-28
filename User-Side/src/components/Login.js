import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import ErrorNotice from './ErrorNotice';
import logo from "../images/logo.png";


export class Login extends Component {
    constructor(props){
        super(props);
        const token=localStorage.getItem("auth-token");
        console.log("Dashboard Token "+token)
        let loggedIn=true;
        if(token==null)
        {
          loggedIn=false;
        } 
    
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
         const loginRes = await axios.post( "http://localhost:8000/signup/login/",loginUser)
      
         
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
          err.response.data.msg && this.setError(err.response.data.msg);    }
      };
    render() {
      if(this.state.loggedIn){
        return <Redirect to="/"/>
      }
        return (
            <div>

<section className="login_register">
<div className="container">
<div className="row justify-content-center">
<div className="col-lg-6 col-md-6 col-12">

<div className="login-container">
<div className="row">
<div className="col-lg-12 col-md-12 col-12">
{this.state.error && (
        <ErrorNotice message={this.state.error} clearError={() => this.setError(undefined)} />
      )}
<form onSubmit={this.handleSubmit}>
<div className="login-form">
<div className="login-logo">
<Link to="/restaurant"><img src={logo} style={{height:'100px',width:'140px'}}alt=""/></Link>
</div>

<div className="form-group">
<input type="text" className="video-form" id="emailphonenumber" placeholder="Type Email or Phone Number"  onChange={this.onChangeEmail}/>
</div>
<div className="form-group">
<input type="password" className="video-form" id="yourPassword" placeholder="Password"   onChange={this.onChangePassword}/>
</div>
<button type="submit" className="login-btn btn-link">Login Now</button>
<div className="forgot-password">
<p>Don’t have an account? <Link to='/register'>Sign Up</Link></p>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
            </div>
        )
    }
}

export default Login
