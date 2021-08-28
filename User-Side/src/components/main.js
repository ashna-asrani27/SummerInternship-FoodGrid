import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export class main extends Component {

    constructor(props) {
  
        super(props);

        this.state = {
          RestaurantRequest:[],
          Menuitem:[],
        };
      }

      async componentDidMount()
      {
        const responses = await axios.get('http://localhost:8000/restaurantrequest/')
        const datas = await responses.data
        console.log("Hejj"+datas)
        this.setState({
          RestaurantRequest: datas,
        //   restaurantname:this.state.RestaurantRequest[0].restaurantname
        })
        const response = await axios.get('http://localhost:8000/item/')
        const data = await response.data
        console.log("Hejj"+data)
        this.setState({
          Menuitem: data,
        //   restaurantname:this.state.RestaurantRequest[0].restaurantname
        })
        this.state.Menuitem.map( result => {
          console.log("Ji"+result.itemname);
      })
      
      }
    render() {
        const restaurant = this.state.RestaurantRequest.map(restaurant => (
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <div className="all-meal">
        <div className="top">
        <a href="meal_detail.html"><div className="bg-gradient"></div></a>
        <div className="top-img">
        <img src={restaurant.restaurantimages[0]} style={{width:'380x',height:'200px'}} alt=""/>
        </div>
     
        <div className="top-text">
        <div className="resheading"><h4><a href="meal_detail.html">{restaurant.restaurantname}</a></h4></div>
        <div className="ressub-heading">
        <h5><a href="restaurant_detail.html">{restaurant.restaurantname}</a></h5>
        
        </div>
        </div>
        </div>
        <div className="bottom">
        <div className="bottom-text">
        <div className="delivery"><i className="fas fa-shopping-cart"></i>Restaurant Type : {restaurant.restauranttype}</div>
        <div className="time"><i className="far fa-clock"></i>Opening Time : {restaurant.openingtime}</div>
        <div className="time"><i className="far fa-clock"></i>Closing Time : {restaurant.closingtime}</div>
    
        </div>
        </div>
        </div>
        </div>
        ));

        const item = this.state.Menuitem.map(item => (
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
            <div className="all-meal">
            <div className="top">
            <div className="bg-gradient"></div>
            <div className="top-img">
            <img src={item.itemimage} style={{width:'380x',height:'200px'}} alt=""/>
            </div>
          
            <div className="top-text">
            <div className="heading"><h4>{item.itemname}</h4></div>
            <div className="sub-heading">
            <h5>{item.itemname}</h5>
            
            </div>
            </div>
            </div>
            <div className="bottom">
            <div className="bottom-text">
            <div className="time"><i class="fas fa-rupee-sign"></i>Price : {item.price}</div>
           
            </div>
            </div>
            </div>
            </div>
        ));
        return (
            <div>
                
            <section className="block-preview">
<div className="cover-banner" style={{backgroundImage:'url("assets/images/homepage/banner.jpg")'}}></div>
<div className="container" >
<div className="row">
<div className="col-lg-8 col-md-6 col-sm-12">
<div className="left-text-b">
<h1 className="title">Choose, Order and Checkout</h1>
<h6 className="exeption">Specify your address to suggest you the fast delivery</h6>
<p>Get our services from 24 hours.</p>
<Link className="bnr-btn btn-link" to="/restaurantall">Go To Meal</Link>
</div>
</div>
</div>
</div>
</section>




<section className="how-to-work">
<div className="container">
<div className="row">
<div className="col-md-4 col-sm-12 col-xs-12">
<div className="work-item">
<div className="work-img">
<img src="assets/images/homepage/how-to-work/img_1.svg" alt=""/>
</div>
<div className="work-text">
<h4>Choose Your Area Restaurant</h4>
<p>Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.</p>
</div>
</div>
</div><div className="col-md-4 col-sm-12 col-xs-12">
<div className="work-item">
<div className="work-img">
<img src="assets/images/homepage/how-to-work/img_2.svg" alt=""/>
</div>
<div className="work-text">
<h4>Choose Food</h4>
<p>Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.</p>
</div>
</div>
</div>
<div className="col-md-4 col-sm-12 col-xs-12">
<div className="work-item">
<div className="work-img">
<img src="assets/images/homepage/how-to-work/img_3.svg" alt=""/>
</div>
<div className="work-text">
<h4>Delivery</h4>
<p>Donec et tellus sed lorem condimentum maximus. Sed tempor, leo tempus condimentum.</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="order-food-online">
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="new-heading">
<h1> Order Food Online</h1>
</div>
</div>
</div>
<div className="row">
{restaurant}
</div>
<div className="meal-btn">
<Link to='/restaurantall'className="m-btn btn-link">Show All</Link>
</div>
</div>
</section>

<section className="order-food-online">
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="new-heading">
<h1> Food Items</h1>
</div>
</div>
</div>
<div className="row">
{item}
</div>
<div className="meal-btn">

</div>
</div>
</section>


<section className="offer-banners">
<div className="container">
<div className="row">
<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<div className="banner">
<div className="ads-banner" style={{backgroundImage: 'url("assets/images/homepage/offer-banners/banner-1.jpg")'}}></div>
<div className="banner-items">
<div className="bnnr-text">
<h2>Order Food Online</h2>
<p>Use code to get 50% off upto $5<br/> on your next order.</p>
</div>
<div className="offer-button">
<Link to="/restaurantall" className="of-btn btn-link">Order Now</Link>
</div>
</div>
</div>
</div>
<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
<div className="banner">
<div className="ads-banner" style={{backgroundImage: 'url("assets/images/homepage/offer-banners/banner-2.jpg")'}}></div>
<div className="banner-items">
<div className="bnnr-text">
<h2>Membership<span><i className="fas fa-long-arrow-alt-right"></i></span>Open Now</h2>
<p>Memberships are now open for<br/> purchases.</p>
</div>
<div className="offer-button">
<Link to="/membership"className="of-btn btn-link">Join Now</Link>
</div>
</div>
</div>
</div>
</div>
</div>
</section>


<section className="pocket-block-preview">

</section>

            </div>
        )
    }
}

export default main
