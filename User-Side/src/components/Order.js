import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Razorpay from 'razorpay'
import logo from "../images/logo.png";

export class Checkout extends Component {

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
          MyOrder:[],
  
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
       

    
      const responses = await axios.get('http://localhost:8000/foodorder/'+this.state.user)
      const datas = await responses.data
     
      this.setState({
          MyOrder: datas,
      })
        }
        this.state.MyOrder.map(result=>{
            console.log(result.price)
            })
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
<h3>Order</h3>
</div>
</div>
<div class="col-md-6">
<div class="right-title-text">
<ul>
<li class="breadcrumb-item"><a href="index.html">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Order</li>
</ul>
</div>
</div>
</div>
</div>
</section>


<section class="upcoming-events">
<div class="container">
<div class="row">
    {this.state.MyOrder.map(result=>
    (
        

        <div class="col-lg-6 col-md-6 col-12">
<div class="main-event">
<div class="event-picy">
<img src={result.image} style={{height:"181px",width:"231px"}} alt=""/>

</div>
<div class="event-dt">
<h4>{result.itemname} </h4>
<div class="event-time" style={{marginBottom:"20px"}}>Price :{result.price} </div>
<div class="description-dt">
<p>PayemntID:-{result.razorpay_payment_id}</p>
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

export default Checkout
