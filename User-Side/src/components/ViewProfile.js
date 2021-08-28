import "../css/registrationstyle.css";
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
import Moment from 'moment'


export default class signup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit=this.onSubmit.bind(this);
    const token = localStorage.getItem("auth-token");

    const tt = this.parseJwt(token)
    console.log("Whay" + tt.id)
    this.state = {
        fname: '',
        lname: '',
        address: '',
        phonenumber: 0,
        email: '',
        password: '',
        status: true,
        gender: 'male',
        dob: new Date().toLocaleString(),
        user: tt.id
    }
}

componentDidMount() {
        axios.get('http://localhost:8000/signup/view/' + this.state.user)
            .then(response => {
                console.log("Jnjzn" + response.data)

                this.setState({
                    fname: response.data.fname,
                    lname: response.data.lname,
                    address: response.data.address,
                    phonenumber: response.data.phonenumber,
                    email: response.data.email,
                    gender: response.data.gender,
                    dob: Moment(response.data.dob).format('DD-MM-YYYY'),
                })
                console.log("Date" + this.state.dob)
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    onSubmit(e)
    {
      e.preventDefault();
    }
    //   getDate() {
    //     var date = new Date().toDateString();
    //     this.setState({ dob:date });
    //   };

parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

   

    render() {
        return (
          <div>
            {/* <TheHeader/> */}
        
          <section className="title-bar">
          <div className="container">
          <div className="row">
          <div className="col-md-6">
          <div className="left-title-text">
          <h3>My Profile</h3>
          </div>
          </div>
          <div className="col-md-6">
          <div className="right-title-text">
          <ul>
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">My Profile</li>
          </ul>
          </div>
          </div>
          </div>
          </div>
          </section>
         
         
         
    
         
          <div className="containerr">
       
          <div className="title"><center><label>Food Grid</label></center></div>
          {/* <div className="subtitle"><center>Sign Up for Customer</center></div> */}
          <div className="content">
            <form action="#" >
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input type="text" placeholder="Enter your First name" 
                  value={this.state.fname} disabled={true}
                 
                  />
                </div>
                <div className="input-box">
                  <span className="details">Last name</span>
                  <input type="text" placeholder="Enter your Last name" 
                  value={this.state.lname} disabled={true}
                
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="text" placeholder="Enter your email" 
                  value={this.state.email} disabled={true}
                  
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input type="text" placeholder="Enter your number" 
                  value={this.state.phonenumber} disabled={true}
                 
                  />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input type="text" placeholder="Enter your address" 
                  value={this.state.address} disabled={true}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Date of Birth</span>
                  <input type="text" placeholder="Enter your address" 
                  value={this.state.dob} disabled={true}
                  />
                </div>
         
                <div className="input-box">
                  <span className="details">Gender</span>
                  <input type="text" name="gender" id="dot-1" value={this.state.gender} disabled={true}
                
                  />   
                 
                 
                </div>
                <div className="btn">
               <Link to={'/EditProfile/'+this.state.user}> 
               {/* <button  onClick={e => {
                      e.preventDefault();
                    }}>Edit Pro</button> */}
               <input type="submit" value="Edit Profile" className="btn"/>
               </Link>
              </div>
              
              </div>
             
            
            </form>
          </div>
        </div>
        {/* </section> */}
            {/* <section className="login_register">
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-12">
            <h1>Register Now</h1>
            <div className="login-container">
            <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
            <form>
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
             
          
            <button type="submit" className="login-btn btn-link">Register Now</button>
            <div className="forgot-password">
            <p>If you have an account?<a href="signin.html"><span> - Login Now</span></a></p>
            </div>
        
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </section> */}
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            
            {/* <TheFooter/>  */}
          </div>
    
    
        )
      }
    }