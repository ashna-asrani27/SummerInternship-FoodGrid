import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
import '../css/imagestyle.css'
import axios from 'axios'
export class header extends Component {
    constructor(props){
        super(props);
        const token=localStorage.getItem("auth-token");
      console.log("Dashboard Token "+token)
      const tt=this.parseJwt(token)
    
      let loggedIn=true;
      let user;
      if(token==null){
        loggedIn=false
        user=0;
      }
      else{
        user=tt.id;
        console.log("ttfane,"+tt.id)
      } 
         this.state={
            loggedIn,
            user,
            User:[]
         }
    }
    async componentDidMount()
    {
        if(this.state.user===null)
        {

        }
        else{
      const responses = await axios.get('http://localhost:8000/signup/'+this.state.user)
      const datas = await responses.data
 console.log("Data"+datas)
      this.setState({
        User: datas
      })
    }
    }

    parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    submit (){
      localStorage.removeItem("auth-token");
      window.location='/login';
   }
    render() {
  
        
        return (
            <div>
                 <header id="header" className="default">
            <div className="menu">
            <div className="container">
            <div className="row">
            <div className="col-md-2 col-sm-12 col-xs-12">
            <div className="menu-left text-center text-md-left">
            <div className="logo-box">
            <a href="index.html"><img src={logo} alt=""  width="80px" height="60px"/></a>
            </div>
            </div>
            </div>
            <div className="col-md-10 col-sm-12 col-xs-12">
            <div className="menu-items">
            <nav className="navbar navbar-expand-lg navbar-light bg-light menu-right">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto nav-text">
             <li className="acls nav-item">
            <a className="nav-link" href="index.html">Home </a>
            </li>
            <li className="acls nav-item">
            <Link className="nav-link" to="/restaurantall">Restaurants</Link>
            </li>
            <li className="acls nav-item">
            <Link className="nav-link" to="/membership">Membership</Link>
            </li>
            {(this.state.loggedIn===true)?
        
      <li className="acls nav-item dropdown">
      <a className="nav-link dropdown-toggle-no-caret" href="#" id="megaDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{textTransform:'uppercase'}}> {this.state.User.fname} <i className="fas fa-caret-down"></i></a>
      <div className="dropdown-menu mega-menu dropdown-menu-right">
      <div className="row">
    
      <div className="col-md">
        <Link  className="dropdown-item" to='/viewprofile'>My Profie</Link>
      <Link className="dropdown-item" to="/order"> My Order</Link>
      <Link className="dropdown-item" to="/addtocart"> Add to cart</Link>
     <Link onClick={this.submit} className="dropdown-item">Logout</Link>
      </div>
      </div>
      </div>
      </li>
       
       :    



          <li className="acls nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li> 
    
}
            
          
            </ul>
            </div>
            </nav>
            <div className="icons-set">
            <ul className="list-inline">
            <li className="acls partner-btn">
            <a href="partner_with_us.html" className="b-btn btn-link">Become a Partner</a>
            </li>
            </ul>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </header>
            </div>
        )
    }
}

export default header
