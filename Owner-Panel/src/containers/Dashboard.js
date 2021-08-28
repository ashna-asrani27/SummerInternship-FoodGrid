import React, { lazy ,Component} from 'react'
import { useHistory , Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios'

import {
  CWidgetDropdown,
  CRow,
  CCol,
} from '@coreui/react'




export default class Dashboard extends Component {
    constructor(props){
      super(props)
      const token=localStorage.getItem("auth-token");
      const tt=this.parseJwt(token)
      let loggedIn=true
      let user=0;
      if(token==null){
        loggedIn=false
      }
      else{
        user=tt.id
      }
      this.state={  
        loggedIn,
        restaurant:0,
        user,
      
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
    const responses = await axios.get('http://localhost:8000/restaurantrequest/count/'+this.state.user)
    const datas = await responses.data
    console.log("Cpounttttttttt"+this.state.restaurant)
    this.setState({
      restaurant: datas
    })

  }
  
  
render(){
  if(this.state.loggedIn===false){
    return <Redirect to="/login"/>
  }
  return (
    <>

     <CRow>
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header={this.state.restaurant}
          text="Total Restaurant"
          className="c-chart-wrapper mt-3 mx-3"
          style={{height:'100px'}}
        >         
        </CWidgetDropdown>
      </CCol>   
    </CRow>
     
    </>
  )
              }
}

