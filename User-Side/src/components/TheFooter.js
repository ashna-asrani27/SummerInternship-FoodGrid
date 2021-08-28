import React, { Component } from 'react'
import logowhite from '../images/logowhite.png'
import '../css/imagestyle.css'
export class footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer">
<div>
<div className="container"> 
<div className="row">
<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
<div className="img-title">
<a href="index.html"><img src={logowhite} alt=""  width="80px" height="60px"/></a>
</div>
<p className="pcls"> At FoodGrid, we provide multiple restaurant options to the customers to choose the correct restaurant to order from or 
    dine-in according to their requirements. The membership feature will enable the customers to get great offers while placing an order online.
    We also provide a platform for the restaurants to create a profile to receive orders and reservation requests.
    </p>
</div>
<div className="col-md-3 col-sm-12 col-xs-12">
<div className="link-title">
<h4>About FoodGrid</h4>
<ul className="links">
<li><a href="about.html">Home</a></li>
<li><a href="#">Offers</a></li>
<li><a href="our_blog.html">Restaurants</a></li>
<li><a href="#">Membership</a></li>
<li><a href="contact.html">Contact</a></li>
<li><a href="#">Sign In</a></li>

</ul>
</div>
</div>
<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
<div className="link-title">
<h4>Business</h4>
<ul className="links">
<li><a href="add_restaurant.html">Add a Restaurant</a></li>
<li><a href="#">Buniess Order Guidelines</a></li>
<li><a href="#">Orders</a></li>
<li><a href="#">Book</a></li>
<li><a href="#">Trace</a></li>
<li><a href="#">Advertise</a></li>
</ul>
</div>
</div>
<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
<div className="link-title">
<h4>Partner With Us</h4>

<div className="social-btns">
<a href="#"><div className="social-btn soc-btn"><i className="fab fa-facebook-f"></i></div></a>
<a href="#"><div className="social-btn soc-btn"><i className="fab fa-twitter"></i></div></a>
<a href="#"><div className="social-btn soc-btn"><i className="fab fa-instagram"></i></div></a>
<a href="#"><div className="social-btn soc-btn"><i className="fab fa-linkedin-in"></i></div></a>
<a href="#"><div className="social-btn soc-btn"><i className="fab fa-youtube"></i></div></a>
</div>
</div>
</div>
</div>
</div>

<div className="copyright">
<div className="container">
<div className="row">
<div className="col-lg-12 col-md-12">
<div className="copyright-text">
<i className="far fa-copyright"></i>Copyright 2021 <a href="index.html">FoodGrid</a> . All Rights Reserved.
</div>
</div>
</div>
</div>
</div>
</div>
</footer>

            </div>
        )
    }
}

export default footer
