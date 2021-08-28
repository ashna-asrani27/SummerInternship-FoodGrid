import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Razorpay from 'razorpay'
import logo from "../images/logo.png";

export class Membership extends Component {

    constructor(props) {
  
        super(props);
        const token=localStorage.getItem("auth-token");
        console.log("Dashboard Token "+token)
        const tt=this.parseJwt(token)
        this.onSubmit=this.onSubmit.bind(this);

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
          Membership:[],
          loggedIn,
          user,
          ismembership:false,
          email:"",
          name:"",


        };
        console.log("USerID"+this.state.user)
      }

        onSubmit(e,price,membershipname){

         
          const userid=this.state.user;
          const email=this.state.email;
          const name=this.state.name;

            if(this.state.loggedIn===false)
            {
                window.location='/login';
            }
            else{
              const amount={
                price:price
              }
              axios.post('http://localhost:8000/membership/order',amount).then((info)=>{
                console.log(info)
                var options = {
                  "key": "rzp_test_e783iBejxmOjXy", // Enter the Key ID generated from the Dashboard
                  "name": "Food Grid",
                  "description": "Membership",
                  "image": logo,
                  "order_id": info.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                  // "callback_url": "http://localhost:3000/viewmembership",
                  handler:function(response){
                       
                          
                          const order={
                            price:price,
                            razorpay_order_id :response.razorpay_order_id,
                            userid:userid,
                            email:email,
                            name:name,
                            razorpay_payment_id:response.razorpay_payment_id,
                            membershipname:membershipname
                          }
                          axios.post('http://localhost:8000/memberuser/add', order)
                          .then(response=>console.log(response.data))
                  },
                  "theme": {
                      "color": "#3399cc"
                  }
                };
              
                const rzp = new window.Razorpay(options);
                rzp.open();
                  e.preventDefault();
              
              })
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
      
        const responses = await axios.get('http://localhost:8000/membership/')
        const datas = await responses.data
        console.log("Hejj"+datas)
        this.setState({
          Membership: datas,
       
        })
        const response = await axios.get('http://localhost:8000/signup/'+this.state.user)
        const data = await response.data
        console.log("Hejj"+data)
        this.setState({
          email: data.email,
          name:data.fname+""+data.lname
       
        })
        if(this.state.user!==0)
        {
          const responses = await axios.get('http://localhost:8000/memberuser/'+this.state.user)
          const datas = await responses.data
          
         if(datas)
         {
          this.setState({
            ismembership: true,
         
          })
         }
        
        }
        console.log("Membership"+this.state.Membership)

        
    }
    render() {
        return (
            <div>
              <section class="title-bar">
<div class="container">
<div class="row">
<div class="col-md-6">
<div class="left-title-text">
<h3>Join with us</h3>
</div>
</div>
<div class="col-md-6">
<div class="right-title-text">
<ul>
<li class="breadcrumb-item"><a href="index.html">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Join with us</li>
</ul>
</div>
</div>
</div>
</div>
</section>


<section class="how-to-orders">
<div class="container">
<div class="row">
<div class="col-md-12">
<div class="new-heading">
<h1>{(this.state.ismembership)?"Already Have An MemberShip":"Join As Now"}</h1>
</div>
</div>
</div>
<div class="order-steps">
<div class="row justify-content-md-center">
    {this.state.Membership.map( result=>(
        <div class="col-lg-4 col-md-6 col-12" >
        <div class="for-restaurant" style={{backgroundImage:'url("../assets/images/homepage/banner.jpg")'}}>
        <img src="../assets/images/partner-with-us/icon-1.svg" alt=""/>
        <h4>{result.membershipname}</h4>
        <p>₹{result.membershipprice}</p>
        <p>{result.membershipdes}</p>
        <button class="partner-btn1 btn-link" onClick={(e)=>this.onSubmit(e,result.membershipprice,result.membershipname)} disabled={(this.state.ismembership)?true:false}>Join</button>
        </div>
        </div>
    )

    )}

</div>
</div>

</div>
</section>




            </div>
        )
    }
}

export default Membership
