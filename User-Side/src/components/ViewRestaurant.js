import React, { Component } from 'react'
import axios from 'axios'
import { Link , Redirect} from 'react-router-dom';
import '../css/imagestyle.css'
import RestaurantImage from './RestaurantImage';
import MenuImage from './MenuImage';
import ReactStars from "react-rating-stars-component";
import ErrorNotice from './ErrorNotice';

export class ViewRestaurant extends Component {
    constructor(props) {
  
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
        this.setTime=this.setTime.bind(this);
        this.setMember=this.setMember.bind(this);
        this.onSubmitReservation=this.onSubmitReservation.bind(this);
        this.ReviewSubmit=this.ReviewSubmit.bind(this);
        this.onChangeReview=this.onChangeReview.bind(this);
        this.onChangeRating=this.onChangeRating.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.AddToCart=this.AddToCart.bind(this);



        this.state = {
          RestaurantRequest:[],
          Ownername:[],
          image:[],
          Items:[],
          time:'',
          member:0,
          user,
          review:'',
          rating:0,
          Review:[],
          currentPage:1,
          restaurantsPerPage:5,
          RestaurantsList:[],
          ratingerror:'',
          reservationerror:''

        };
      }
      setRatingError(e){
        this.setState({
          ratingerror:e
        })
      }
      setReservationError(e){
        this.setState({
          reservationerror:e
        })
      }
      setTime(e){
        this.setState({
          time:e.target.value
        })
        console.log("HDB"+this.state.time)
      }

      setMember(e){
        this.setState({
          member:e.target.value
        })
        console.log("Member"+this.state.member)

      }
      onChangeRating(e){
        this.setState({
          rating:e
        })
    
      }

      onChangeReview(e){
        this.setState({
          review:e.target.value
        })
        console.log("Member"+this.state.review)
      }



      async onSubmitReservation(e)
      {
        if(this.state.user===0)
        {
        
          e.preventDefault();
         
        window.location='/login';
        // window.location='/login';
        // this.submit();
        }
        else{
          e.preventDefault();
    //console.log("hi onsubmit"+this.state.menuimages)
 
    try{

  
     const reservation={
       time:this.state.time,
       seats:this.state.member,
       user:this.state.user,
       restaurant:this.props.match.params.id,


     }
     console.log("offerrr"+reservation)
     await axios.post("http://localhost:8000/reservation/add", reservation)
 
 
   

    }catch(err){
      err.response.data.msg && this.setReservationError(err.response.data.msg);  
    
    }
  }
  }
//   submit (){
    
//     window.location='/login';
//  }

async AddToCart(e,item,id)
{
  if(this.state.user===0)
  {

    e.preventDefault();
   
  window.location='/login';
  
  }
  else{
  

  e.preventDefault();
//console.log("hi onsubmit"+this.state.menuimages)
const responses = await axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
const datas = await responses.data.restaurantname


try{


const checkout={
 userid:this.state.user,
 item:item,
 restaurantname:datas,
 restaurantid:this.props.match.params.id,
 itemid:id


}


await axios.post("http://localhost:8000/addtocart/add", checkout)
.then(res=>console.log(res.data))




 window.location='/addtocart'

}catch(err){
err.response.data.msg && this.setRatingError(err.response.data.msg);  

}
}

}
 handleLogout()
 {
   localStorage.removeItem("auth-token");
    window.location='/login';
 }
  async ReviewSubmit(e)
      {

        if(this.state.user===0)
        {
          e.preventDefault();
        window.location='/login';
        
        }
        else{

        e.preventDefault();
    try{

  
     const rating={
       rating:this.state.rating,
       review:this.state.review,
       user:this.state.user,
       restaurant:this.props.match.params.id,


     }
     console.log("offerrr"+rating)
     await axios.post("http://localhost:8000/rating/add", rating)
 
 
     //window.location='/';
   
       this.componentDidMount();

    }catch(err){
      err.response.data.msg && this.setRatingError(err.response.data.msg);  
    
    }
  }

 

  }
  
  parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
      async componentDidMount()
      {
      
        const responses = await axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
        const datas = await responses.data
        console.log("Hejj"+datas)
        this.setState({
          RestaurantRequest: datas,
          image:datas.restaurantimages
        //   restaurantname:this.state.RestaurantRequest[0].restaurantname
        })
        console.log("IDDDDDD"+this.state.RestaurantRequest.restaurantid)
        const response= await axios.get('http://localhost:8000/owner/'+this.state.RestaurantRequest.restaurantid)
        const data = await response.data
        console.log("Hejj"+data.restaurantimages)
        this.setState({
          Ownername: data,
          phonenumber:data.phonenumber
        //   restaurantname:this.state.RestaurantRequest[0].restaurantname
        })
        axios.get('http://localhost:8000/restaurantrequest/')
              .then(response=>{
                this.setState({RestaurantsList:response.data})
                console.log('data Restaurants----',this.state.RestaurantsList)
              })
              .catch((error)=>{
                console.log(error)
              })

        const responsess= await axios.get('http://localhost:8000/item/'+this.props.match.params.id)
        const datass = await responsess.data
        console.log("Hejj"+datass.restaurantimages)
        this.setState({
          Items: datass,
        //   restaurantname:this.state.RestaurantRequest[0].restaurantname
        })
      // console.log("jbj"+this.state.Items[0].itemname)

      const res = await axios.get('http://localhost:8000/rating/'+this.props.match.params.id)
      const value = await res.data
      console.log("Hejjdd"+value)
      this.setState({
        Review: value
      })
      console.log("reviewsssssssssss "+this.state.Review)
              //all restaurants
              

      }
    render() {
      const currentPage=this.state.currentPage;
      const restaurantsPerPage=this.state.restaurantsPerPage;
       const indexOfLastRestaurant=currentPage*restaurantsPerPage;
       const indexOfFirstRestaurant=indexOfLastRestaurant-restaurantsPerPage;
       const currentRestaturants=this.state.RestaurantsList.slice(indexOfFirstRestaurant,indexOfLastRestaurant);
      console.log('curRest::::::',this.state.RestaurantsList);
       console.log("idhskjsk"+this.state.user)
        const restaurant=this.state.RestaurantRequest;
        const owner =this.state.Ownername;
        console.log("Hellooooo"+restaurant.restaurantimages);
        const restaurantimages=this.state.image.map(image =>{
            <img src={image }style={{height:'500px',width:'700px'}} className="img-responsive" alt=""/>
        })

        const popularRestaurants=currentRestaturants.map(cur=>(
          <div className="popular-restaurants-items">
          <ul className="list-unstyled">
          <li>
          <a href="restaurant_detail.html"><img src={cur.restaurantimages[0]} className="img-responsive" alt="image" title="image"/></a>
          <div className="caption">
          <a href="restaurant_detail.html"><h4>{cur.restaurantname}</h4></a>
          <p>{cur.address}, {cur.area} </p>
          {/* <div className="star">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
          <span>4.5</span>
          </div> */}
          </div>
          </li>
          </ul>
          </div>
        ));

        const item = this.state.Items.map(item => (
    
          <div className="col-md-6 pm-right">
          <div className="meals-dt">
          <div className="meal-list">
          <ul className="list-unstyled">
          <li>
          <img src={item.itemimage} alt="image" title="image"/>
          <div className="pcls caption-meal">
          <a href="meal-detail.html"><h4>{item.itemname}</h4></a>
  
          {/* <div className="star">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="far fa-star"></i>
          <span>4.5</span>
          </div> */}
          <h6 className="pcls">{item.description}</h6>
          <p className="itemprice">₹{item.price}</p>
          {(this.state.RestaurantRequest.restauranttype==="dining")?<a className="btncls btn-link">Only Dining</a>:<button className="btncls btn-link" onClick={(e)=>this.AddToCart(e,item,item._id)}>Add to cart</button>}
          {/* <Link className="btncls btn-link" >Add to cart</Link> */}
  
          </div>
          </li>
          </ul>
          </div>
          </div>
          </div>
      ));

      

              const review = this.state.Review.map(item => (
    
                <div className="main-comments">
                <div className="rating-1">
                <h4> Rock Smith</h4><br/>
                </div>
                <div className="review-tags">
                <p>Review:-</p>
                <p>{item.review}</p>
                </div>
               
                <div className="review-tags">
                <p><ins>Rating :</ins>
                <ReactStars 
                  size= {25}
                  count={5}
                  color= "black"
                  activeColor= {(item.rating<=3)?"yellow":"green"}
                  value={item.rating}
                  edit={false}
                  emptyIcon={ <i className="far fa-star" />}
                  filledIcon={<i className="fa fa-star" />}
                  />
                  </p>
                </div>
                </div>
                    ));
                    
      
            
        return (
            <div>
                
<section className="title-bar">
<div className="container">
<div className="row">
<div className="col-md-6">
<div className="left-title-text">
<h3>Restaurant Detail View</h3>
</div>
</div>
<div className="col-md-6">
<div className="right-title-text">
<ul>
<li className="breadcrumb-item"><a href="index.html">Home</a></li>
<li className="breadcrumb-item"><a href="partners.html">Partners</a></li>
<li className="breadcrumb-item active" aria-current="page">Restaurant Detail View</li>
</ul>
</div>
</div>
</div>
</div>
</section>


<section className="all-partners">
<div className="container">
<div className="row">
<div className="col-lg-9 col-md-12">

<RestaurantImage restaurantrequests={this.state.RestaurantRequest}/>
<div className="profile-toolbar padding-b padding-t">
<div className="user-details">
<div className="user-picy">
<a href="user_profile_view.html"><img src="assets/images/recipe-details/user-dp.png" alt=""/></a>
</div>
<div className="name-location">
<a href="user_profile_view.html"><h4 style={{textTransform:'uppercase'}}>{owner.fname} {owner.lname} </h4></a>
<p>Owner</p>
</div>
</div>
<div className="right-side-btns">

<p className="right-btn-c btn-link" title="Call Us" style={{textTransform:"uppercase"}}><i className="fas fa-circle"></i>{restaurant.restauranttype}</p>
<p className="right-btn-c btn-link" title="Call Us" ><i className="fas fa-phone"></i>Call Us</p>
<p className="right-btn-c btn-link" title="Order Now">Order Now</p>
</div>
</div>
<div className="resto-dt">
<div className="resto-detail">
<div className="resto-picy">
<a href="restaurant_detail.html"><img src="assets/images/restaurant-detail/logo-10.jpg" alt=""/></a>
</div>
<div className="name-location">
<a href="restaurant_detail.html"><h1>{restaurant.restaurantname}</h1></a>
<p><span><i className="fas fa-map-marker-alt"></i></span>{restaurant.area}</p>
</div>
</div>

</div>

<div className="all-tabs">
<ul className="nav nav-tabs">
<li className="nav-item">
<a href="#overview" className="nav-link active" data-toggle="tab">Overview</a>
</li>
<li className="nav-item">
<a href="#menu" className="nav-link" data-toggle="tab">Menu</a>
</li>
<li className="nav-item">
<a href="#order-online" className="nav-link" data-toggle="tab">Order Online</a>
</li>
<li className="nav-item">
<a href="#reviews" className="nav-link" data-toggle="tab">Reviews</a>
</li>
<li className="nav-item">
  {(this.state.RestaurantRequest.restauranttype==="both" || this.state.RestaurantRequest.restauranttype==="dining" )?<a href="#book-a-table" className="nav-link" data-toggle="tab" 
>Book a Table</a>:<h1></h1>}

</li>

</ul>
<div className="tab-content">
<div className="tab-pane active" id="overview">
<div className="restaurants-detail-bg">
<h4>About Restaurant</h4>
<div className="overview-details">
<div className="container">
<div className="row">
<div className="col-md-6">
<div className="flex-dt">
<ul className="view-dt">
<li>Name</li>
<li>Owner</li>
<li>Phone Number</li>
<li>Restaurant Number</li>
<li>Email</li>
<li>Restaurant Type</li>

</ul>
<ul className="view-dt">
<li>:</li>
<li>:</li>
<li>:</li>
<li>:</li>
<li>:</li>
<li>:</li>
</ul>
<ul className="view-dt-1">
<li>{restaurant.restaurantname}</li>
<li style={{textTransform:'uppercase'}}>{owner.fname} {owner.lname}</li>
<li>+91 {owner.phonenumber}</li>
<li>+91 {restaurant.phonenumber}</li>
<li><a href="https://gambolthemes.net/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="b4e6d1c7c0d5c1c6d5dac0dad5d9d1f4d3d9d5ddd89ad7dbd9">{owner.email}</a></li>
<li style={{textTransform:'uppercase'}}>{restaurant.restauranttype}</li>
</ul>
</div>
</div>
<div className="col-md-6">
<div className="flex-dt">
<ul className="view-dt">
<li>Opening Hours</li>
<li>Closing Hours</li>
<li>Area</li>
<li>Location</li>
<li>Address</li>
<li>Pincode</li>

</ul>
<ul className="view-dt">
<li>:</li>
<li>:</li>
<li>:</li>
<li>:</li>
<li>:</li>
<li>:</li>

</ul>
<ul className="view-dt-1">
<li>{restaurant.openingtime}</li>
<li>{restaurant.closingtime}</li>
<li>{restaurant.area}</li>
<li><a href="#" className="dirCls direction">
<Link to={'/RestaurantMap/'+restaurant._id}>
  Get Direction
  </Link>
  </a></li>
<li>{restaurant.address}</li>
<li>{restaurant.pincode}</li>

</ul>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="ads-offer">
<div className="container">
<div className="row">
<div className="col-md-12" >
<div className="ads-offer-1" style={{backgroundImage: "url('assets/images/restaurant-detail/offer-bnnr-1.jpg')"}}></div>
<div className="offer-bnnr-items">
<h1>10% off </h1>
<p>on all orders get the code : 156CD85</p>
</div>
<div className="offer-order">
{/* <a href="#" className="offer-btn-1 btn-link" title="Order Now">Order Now </a> */}
</div>
</div>
</div>
</div>
</div>
</div>
<div className="tab-pane" id="menu">
<div className="restaurants-detail-bg m-bottom">
<h4>Restaurant Menu Card</h4>
<p style={{fontWeight:'500'}}>2 Images</p>
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="tabbable tabs-left">
<div className="tab-content">
    {/* {  this.state.image.map(image =>{
            <img src={image }style={{height:'500px',width:'700px'}} className="img-responsive" alt=""/>
        })} */}
                <MenuImage restaurantrequests={this.state.RestaurantRequest} />

</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="tab-pane" id="order-online">
<div className="restaurants-order-bg m-bottom">
<h4>Restaurant Order Online Meals</h4>

<div className="tab-content">
<div className="tab-pane active" id="breakfast">
<div className="all-meals-tab">
<div className="all-meal-dt">
<div className="row">

    {item}

</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="tab-pane" id="reviews">
<div className="comment-post">
{this.state.ratingerror && (
                // <CAlert color="primary" closeButton={() => this.setError(undefined )}>{this.state.error} </CAlert>
        <ErrorNotice message={this.state.ratingerror} clearError={() => this.setRatingError(undefined)} />
      )}
<div className="post-items">
<a href="my_dashboard.html">
<div className="img-dp">
<i className="fas fa-user"></i>
</div>
</a>
<div className="select-rating">
<h4>Restaurant Rating :</h4>
{/* <ul className="rating-stars">
<li><i className="fas fa-star"></i></li>
<li><i className="fas fa-star"></i></li>
<li><i className="fas fa-star"></i></li>
<li><i className="fas fa-star"></i></li>
<li><i className="fas fa-star"></i></li>
</ul> */}
</div>
<form onSubmit={this.ReviewSubmit}>
<textarea className="description-area" name="post" placeholder="Please describe the reason for your rating to help the restaurant (150 words)" onChange={this.onChangeReview}></textarea>
{/* <input type="text" className="rating-input" name="search" placeholder="Rating" onChange={this.onChangeRating}/> */}
<div className="rating-input">
<ReactStars 
size= {25}
count={5}
color= "black"
activeColor= "green"
value={0}
a11y = {true}
// isHalf: true,
emptyIcon={ <i className="far fa-star" />}
// halfIcon: <i className="fa fa-star-half-alt" />,
filledIcon={<i className="fa fa-star" />}
onChange= {this.onChangeRating}

/>
</div>
<input className="rating-btn btn-link" type="submit" value="Publish Review"/>
{/* <Link  > */}

{/* </Link> */}

</form>
</div>
</div>

{review}

<div className="spinner m-bottom">

</div>
</div>
<div className="tab-pane" id="book-a-table">
{this.state.reservationerror && (
                // <CAlert color="primary" closeButton={() => this.setError(undefined )}>{this.state.error} </CAlert>
        <ErrorNotice message={this.state.reservationerror} clearError={() => this.setReservationError(undefined)} />
      )}
<div className="restaurants-detail-bg m-bottom">
<h4 className="n-bottom">Book a Table</h4>
{(this.state.RestaurantRequest.restauranttype==="online")?<h1>Online Delivery Only</h1>:
<form className="book-table" onSubmit={this.onSubmitReservation}>
<div className="row">


<div className="col-lg-6 col-md-6 pm-right">
<div className="form-group">
<div className="checkbox-title">Members</div>
<div className="s-box">
<select className="" value={this.state.member}  onChange={this.setMember}>
<option value="0">Select Members</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10+</option>
</select>
</div>
</div>
</div>
<div className="col-lg-6 col-md-6 pm-left">
<div className="form-group">
<label for="telNumber">Time</label>
<input type="time" className="video-form" id="telNumber" placeholder="Phone Number"  
                      onChange={this.setTime}/>
</div>
</div>

<div className="col-lg-12 col-md-12">
<div className="btn-request">
<input type="submit" value="Request Booking"   className="btn-link"/>
</div>
</div>
</div>
</form>
}
</div>
</div>

</div>
</div>
</div>
<div className="col-lg-3 col-md-4">
<div className="show-map-result">
<a href="#">
<Link to={'/RestaurantMap/'+restaurant._id}>
  Get Direction
  </Link>
  </a>
</div>
<div className="popular-restaurants">
<h4>Popular Restaurents </h4>
{/* <div className="popular-restaurants-items">
<ul className="list-unstyled">
<li>
<a href="restaurant_detail.html"><img src="assets/images/partners/logo-1.jpg" className="img-responsive" alt="image" title="image"/></a>
<div className="caption">
<a href="restaurant_detail.html"><h4>Restaurant Name</h4></a>
<p>Sydney, Australia</p>
<div className="star">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="far fa-star"></i>
<span>4.5</span>
</div>
</div>
</li>
<li>
<a href="restaurant_detail.html"><img src="assets/images/partners/logo-2.jpg" className="img-responsive" alt="image" title="image"/></a>
<div className="caption">
<a href="restaurant_detail.html"><h4>Restaurant Name</h4></a>
<p>Sydney, Australia</p>
<div className="star">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="far fa-star"></i>
<span>4.5</span>
</div>
</div>
</li>
<li>
<a href="restaurant_detail.html"><img src="assets/images/partners/logo-3.jpg" className="img-responsive" alt="image" title="image"/></a>
<div className="caption">
<a href="restaurant_detail.html"><h4>Restaurant Name</h4></a>
<p>Sydney, Australia</p>
<div className="star">
 <i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="far fa-star"></i>
<span>4.5</span>
</div>
</div>
</li>
<li>
<a href="restaurant_detail.html"><img src="assets/images/partners/logo-4.jpg" className="img-responsive" alt="image" title="image"/></a>
<div className="caption">
<a href="restaurant_detail.html"><h4>Restaurant Name</h4></a>
<p>Sydney, Australia</p>
<div className="star">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="far fa-star"></i>
<span>4.5</span>
</div>
</div>
</li>
<li>
<a href="restaurant_detail.html"><img src="assets/images/partners/logo-5.jpg" className="img-responsive" alt="image" title="image"/></a>
<div className="caption">
<a href="restaurant_detail.html"><h4>Restaurant Name</h4></a>
<p>Sydney, Australia</p>
<div className="star">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="far fa-star"></i>
<span>4.5</span>
</div>
</div>
</li>
</ul>
</div> */}

{popularRestaurants}
</div>
{/* <div className="google-ads">
<a href="#"><img src="assets/images/partners/google-ad.jpg" alt="image" title="Google Ads"/></a>
</div> */}
</div>
</div>
</div>
</section>


            </div>
        )
    }
}

export default ViewRestaurant
