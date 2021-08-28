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
          AddtoCart:[],
          itemname:'',
          itemprice:0,
          itemimage:'',
          loggedIn,
          user,
          email:"",
          name:"",

       
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
            const response = await axios.get('http://localhost:8000/signup/'+this.state.user)
            const data = await response.data
            console.log("Hejj"+data)
            this.setState({
              email: data.email,
              name:data.fname+""+data.lname
           
            })

            
      const responses = await axios.get('http://localhost:8000/addtocart/find/'+this.props.match.params.id)
      const datas = await responses.data
      console.log("Hejj"+datas.item.itemname)
      this.setState({
          AddtoCart: datas,
          itemimage:datas.item.itemimage,
          itemname:datas.item.itemname,
          itemprice:datas.item.price

      })
        }
      }
      
      parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
   async onSubmit(e,itemname,price,image){

     
        const userid=this.state.user;
        const email=this.state.email;
        const name=this.state.name;
        const resid=this.state.AddtoCart.restaurantid;
        const itemid=this.state.AddtoCart.itemid;

          if(this.state.loggedIn===false)
          {
              window.location='/login';
          }
          else{
            const amount={
              price:price
            }
            axios.post('http://localhost:8000/foodorder/order',amount).then((info)=>{
              console.log(info)
              var options = {
                "key": "rzp_test_e783iBejxmOjXy", // Enter the Key ID generated from the Dashboard
                "name": "Food Grid",
                "description": "Order Food",
                "image": logo,
                "order_id": info.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                // "callback_url": "http://localhost:3000/viewmembership",
                handler:function(response){
                     
                        try{
                        const order={
                          price:price,
                          razorpay_order_id :response.razorpay_order_id,
                          userid:userid,
                          itemid:itemid,
                          restaurantid:resid,
                          email:email,
                          name:name,
                          razorpay_payment_id:response.razorpay_payment_id,
                          itemname:itemname,
                          image:image,
                        }
                        axios.post('http://localhost:8000/foodorder/add', order)
                        .then(response=>console.log(response.data))

                    

                    }catch(err)
                    {
                     
                    }
                   
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
    render() {

        return (
            <div>
                <section class="title-bar">
<div class="container">
<div class="row">
<div class="col-md-6">
<div class="left-title-text">
<h3>Checkout</h3>
</div>
</div>
<div class="col-md-6">
<div class="right-title-text">
<ul>
<li class="breadcrumb-item"><a href="index.html">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">Checkout</li>
</ul>
</div>
</div>
</div>
</div>
</section>


<section class="all-partners">
<div class="container">
<div class="row">
<div class="col-lg-12 col-md-12">
<div class="my-checkout">
<div class="table-responsive">
<table class="table  table-bordered">
<thead>
<tr>
<td class="td-heading">Meal</td>

<td class="td-heading">Price</td>

</tr>
</thead>
<tbody>
<tr>
<td>
<div class="checkout-thumb">
<img src={this.state.itemimage} class="img-responsive" alt="thumb" title="thumb"/>

</div>
<div class="name">
<a href="meal_detail.html"><h4>{this.state.itemname}</h4></a>
<a href="restaurant_detail.html"><p>{this.state.AddtoCart.restaurantname}</p></a>

</div>
</td>
<td class="td-content">{this.state.itemprice}</td>
</tr>
</tbody>
<tbody>
<tr>
<td colspan="4">
<h3 class="text-right">Total <ins>{this.state.itemprice}.00</ins></h3>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div class="your-order">
<h4>Your Order</h4>
<div class="order-d">
<div class="item-dt-left">
<span>{this.state.itemname}</span>

</div>
<div class="item-dt-right">
<p>{this.state.itemprice}</p>
</div>
</div>


<div class="order-d">
<div class="item-dt-left">
<span>Taxes</span>
</div>
<div class="item-dt-right">
<p>0</p>
</div>
</div>
<div class="order-d">
<div class="item-dt-left">
<span>Delivery Charges</span>
</div>
<div class="item-dt-right">
<p>Free</p>
</div>
</div>

<div class="total-bill">
<div class="total-bill-text">
<h5>Total</h5>
</div>
<div class="total-bill-payment">
<p>{this.state.itemprice}.00</p>
</div>
</div>
</div>
<div class="checkout-btn">
<button type="submit" class="chkout-btn btn-link" onClick={(e)=>this.onSubmit(e,this.state.itemname,this.state.itemprice,this.state.itemimage)}>Checkout Now</button>
</div>
</div>

</div>
</div>
</section>
            </div>
        )
    }
}

export default Checkout
