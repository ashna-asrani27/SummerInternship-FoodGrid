import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class SuccessfullMembership extends Component {
    render() {
        return (
            <div>

            <section className="login_register">
            <div className="container">
            <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-12">
            
            <div className="login-container">
            <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
         
            <form onSubmit={this.handleSubmit}>
            <div className="login-form">
            <div className="login-logo">
            <Link to="/restaurant"><img src="assets/images/login-register/logo.svg" alt=""/></Link>
            </div>
            
            <div className="form-group">
            <input type="text" className="video-form" id="emailphonenumber" placeholder="Type Email or Phone Number"  onChange={this.onChangeEmail}/>
            </div>
            <div className="form-group">
            <input type="password" className="video-form" id="yourPassword" placeholder="Password"   onChange={this.onChangePassword}/>
            </div>
            <button type="submit" className="login-btn btn-link">Login Now</button>
            <div className="forgot-password">
            <a href="#">Forgot Password?</a>
            <p>Don’t have an account? <a href="signup.html">Sign Up</a></p>
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
