import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export class Restaurant extends Component {
    constructor(props) {
  
        super(props);

        this.state = {
          RestaurantRequest:[],
          restaurantname:'sd',
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
        this.state.RestaurantRequest.map( result => {
          console.log("Ji"+result.restaurantname);
          console.log(this.state.RestaurantRequest[0].restaurantname);
      console.log("JBdjs=>>"+this.state.restaurantname)
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
        <div className="resheading"><h4><Link to={"/restaurants/"+restaurant._id}>{restaurant.restaurantname}</Link></h4></div>
        <div className="sub-heading">
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

        return (
            <div>
              <section className="order-food-online">
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="new-heading">
<h1> Restaurant</h1>
</div>
</div>
</div>
<div className="row">
{restaurant}
</div>
<div className="meal-btn">
</div>
</div>
</section>
            <section className="pocket-block-preview">

          </section>
            </div>
        )
    }
}

export default Restaurant
