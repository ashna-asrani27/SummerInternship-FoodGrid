import "../css/registrationstyle.css";
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link , Redirect} from 'react-router-dom';
import logo from "../images/logo.png";
import ErrorNotice from './ErrorNotice';



export default class CreateRegistration extends Component {
  constructor(props) {
    super(props);
    const token=localStorage.getItem("auth-token");
    console.log("Dashboard Token "+token)
    let loggedIn=true;
    if(token==null)
    {
      loggedIn=false;
    } 
    this.onChangeFname = this.onChangeFname.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDOB = this.onChangeDOB.bind(this);
    this.onSiteChanged = this.onSiteChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fname: '',
      lname: '',
      address: '',
      phonenumber: 0,
      email: '',
      password: '',
      status:true,
      gender:'male',
      dob: new Date(),
      loggedIn,
      error:''
    }
  }

  setError(e)
      {
        this.setState({
          error:e
        })
      }

  onChangeFname(e) {
    this.setState({
      fname: e.target.value
    })
  }

  onChangeLname(e) {
    this.setState({
      lname: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }


  onChangePhoneNumber(e) {
    this.setState({
      phonenumber: e.target.value
    })
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onChangeDOB(date) {
    this.setState({
      dob: date
    })
  }
  onSiteChanged(e) {
    this.setState({
      gender: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();
try{
    const UserData = {
      
      fname: this.state.fname,
      lname: this.state.lname,
      address: this.state.address,
      phonenumber:this.state.phonenumber,
      email: this.state.email,
      password: this.state.password,
      status:this.state.status,
      gender:this.state.gender,
      dob: this.state.dob,
    }

    

   await axios.post('http://localhost:8000/signup/register', UserData)

      console.log(UserData);
      
      
}catch (err) {
    err.response.data.msg && this.setError(err.response.data.msg); 
}
  }

  render() {
    if(this.state.loggedIn){
        return <Redirect to="/"/>
      }
    return (
     
      <div className="rescontainer">

      <div className="title"><center><Link to="/restaurant"><img src={logo} style={{height:'100px',width:'140px'}}alt=""/></Link>
</center></div>
      <div className="subtitle"><center>Sign Up for Customer</center></div>
      {this.state.error && (
        <ErrorNotice message={this.state.error} clearError={() => this.setError(undefined)} />
      )}
      <div className="content">
        <form action="#" onSubmit={this.onSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input type="text" placeholder="Enter your First name" 
              value={this.state.fname}
              onChange={this.onChangeFname} 
              />
            </div>
            <div className="input-box">
              <span className="details">Last name</span>
              <input type="text" placeholder="Enter your Last name" 
              value={this.state.lname}
              onChange={this.onChangeLname}
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter your email" 
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input type="text" placeholder="Enter your number" 
              value={this.state.phonenumber}
              onChange={this.onChangePhoneNumber}
              />
            </div>
            <div className="input-box">
              <span className="details">Address</span>
              <input type="text" placeholder="Enter your address" 
              value={this.state.address}
              onChange={this.onChangeAddress}
              />
            </div>
            <div className="input-box">
              <span className="details">Date of Birth</span>
              <DatePicker className="datepicker"
              selected={this.state.dob}
              maxDate={new Date()}
              onChange={this.onChangeDOB}
            />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input type="password" placeholder="Enter your password" 
              value={this.state.password}
              onChange={this.onChangePassword}
              />
            </div>
            <div className="input-box">
              <span className="details">Gender</span>
              <input type="radio" name="gender" id="dot-1"
            
              />   
              <input type="radio" name="gender" id="dot-2"
           
              />
              <div className="category">
              <label for="dot-1">
              <span className="dot one" checked={this.state.gender === "male"} 
              onChange={this.onSiteChanged} value="male"></span>
              <span className="gender">Male</span>
            </label>
            <label for="dot-2">
              <span className="dot two" checked={this.state.gender === "female"} 
              onChange={this.onSiteChanged} value="female"></span>
              <span className="gender">Female</span>
            </label>
            </div>        
            </div>
          </div>
         
          <div className="button">
            <input type="submit" classname="login-btn" value="Register"  
            style={{    width: '100%',
                        height: '50px',
                        marginTop: '10px',}}/>
          </div>
          <div className="loginredirect">
            <center><label>Already have an account?
              <Link to="/login">Sign In</Link>
            </label></center>
          </div>
        </form>
      </div>
    </div>
    )
  }
}