import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export class AddToCart extends Component {
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



        this.state = {
          AddtoCart:[],
          loggedIn,
          user,
       
       
        };
        console.log("USerID"+this.state.user)
      }
   

    
      async componentDidMount()
      {
          if(this.state.loggedIn===false)
          {
                  window.location='/login'
          }
          else{
              
        const responses = await axios.get('http://localhost:8000/addtocart/'+this.state.user)
        const datas = await responses.data
        console.log("Hejj"+datas)
        this.setState({
            AddtoCart: datas,
        })
    }
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
             
<section class="title-bar">
<div class="container">
<div class="row">
<div class="col-md-6">
<div class="left-title-text">
<h3>Add To Cart</h3>
</div>
</div>
<div class="col-md-6">
<div class="right-title-text">
<ul>
<li class="breadcrumb-item"><a href="index.html">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Add To Cart</li>
</ul>
</div>
</div>
</div>
</div>
</section>


<section class="upcoming-events">
<div class="container">
<div class="row">
    {this.state.AddtoCart.map(result=>
    (
        

        <div class="col-lg-6 col-md-6 col-12">
<div class="main-event">
<div class="event-picy">
    
<img src={result.item.itemimage} style={{height:"181px",width:"231px"}} alt=""/>

</div>
<div class="event-dt">
<h4>{result.item.itemname} </h4>
<div class="event-time" style={{marginBottom:"20px"}}>Price :{result.item.price} </div>
<div class="description-dt">
<p>Restaurant name:-{result.restaurantname}</p>
</div>


<div class="description-dt">
<Link class="view-btn btn-link"  to={"/checkout/"+result._id}> Proceed Checkout</Link>
</div>
</div>
</div>
</div>
    ))
}

</div>

</div>
</section>

            </div>
        )
    }
}

export default AddToCart
