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
    this.onChangeGender=this.onChangeGender.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onChangeFname=this.onChangeFname.bind(this);
    this.onChangeLname=this.onChangeLname.bind(this);
    this.onChangeAddress=this.onChangeAddress.bind(this);
    this.onChangePhoneNumber=this.onChangePhoneNumber.bind(this);
    this.onChangeDOB=this.onChangeDOB.bind(this);
    this.onChangeGender=this.onChangeGender.bind(this);
    this.onChangeEmail=this.onChangeEmail.bind(this);
    
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
        dob: new Date(),
        user: tt.id
    }
}
onChangeGender(e){
  this.setState({
    gender:e.target.value
  })
  console.log("Value"+this.state.gender)
}


onChangeFname(e){
  this.setState({
    fname:e.target.value
  })
  console.log("Value"+this.state.fname)
}
onChangeLname(e){
  this.setState({
    lname:e.target.value
  })
  console.log("Value"+this.state.lname)
}
onChangeAddress(e){
  this.setState({
    address:e.target.value
  })
  console.log("Value"+this.state.address)
}

onChangePhoneNumber(e){
  this.setState({
    phonenumber:e.target.value
  })
  console.log("Value"+this.state.phonenumber)
}

onChangeEmail(e){
  this.setState({
    email:e.target.value
  })
  console.log("Value"+this.state.email)
}

onChangeDOB(date){
  this.setState({
    dob: date
  })

}

handleChange(e)
{
  e.preventDefault();
  
  e.preventDefault();
  try{
   const users={
     fname: this.state.fname,
     lname: this.state.lname,
     address: this.state.address,
     phonenumber: this.state.phonenumber,
     gender: this.state.gender,
     email: this.state.email,
     dob:this.state.dob,
     password:this.state.password
  
   }
   console.log('users:::',users);
   
   console.log("DOBsB"+this.state.dob)

   alert("helllo")
   console.log('inside id:::',this.props.match.params.id);

    axios.post("http://localhost:8000/signup/"+this.props.match.params.id,users)

   //window.location='/';
   alert('Details submitted');
   window.location = '/viewprofile';

  }catch(err){
    console.log(err.response.data.msg)
   
  }

}

        componentDidMount() {
        axios.get('http://localhost:8000/signup/view/' + this.state.user)
            .then(response => {
                console.log("Jnjzn" + response.data.dob)

                this.setState({
                    fname: response.data.fname,
                    lname: response.data.lname,
                    address: response.data.address,
                    phonenumber: response.data.phonenumber,
                    email: response.data.email,
                    gender: response.data.gender,
                    dob:response.data.dob,
                    // dob: Moment(response.data.dob).format('MM/DD/YYYY'),
                    password: response.data.password
                })  
           
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    onSubmit(e)
    {
      e.preventDefault();
    }


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
            <form action="#" onSubmit={this.handleChange}>
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
            <span className="details">Gender</span>
            <input type="radio" name="gender" id="dot-1"
          checked={this.state.gender === "male"} 
          onChange={this.onChangeGender} value="male"
            />   
            <input type="radio" name="gender" id="dot-2"
         checked={this.state.gender === "female"} 
         onChange={this.onChangeGender} value="female"
            />
            <div className="category">
            <label for="dot-1">
            <span className="dot one" ></span>
            <span className="gender">Male</span>
          </label>
          <label for="dot-2">
            <span className="dot two" ></span>
            <span className="gender">Female</span>
          </label>
          </div>        
          </div>
                <div className="btn">
             
               <input type="submit" value="Edit Profile" className="btn"/>
      
              </div>
              
              </div>
             
            
            </form>
          </div>
        </div>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>
            
            {/* <TheFooter/>  */}
          </div>
    
    
        )
      }
    }