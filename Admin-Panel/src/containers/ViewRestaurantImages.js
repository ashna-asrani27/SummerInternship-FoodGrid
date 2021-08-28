import React,{Component} from 'react'
// const RestaurantRequests=import('.containers/ViewRestaurantRequests');
import "../scss/style.scss";
import RestaurantImage from './RestaurantImage';

import axios from 'axios'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CCollapse
  } from '@coreui/react'

export default class ViewRestaurantImages extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
        
            restaurantrequests:[]
            // restaurantname:'',
            // restaurantimages:[]
            // restaurantId:''
        };

    }
    componentDidMount()
    {
        // if(this.props.detail.restaurantimages && this.props.detail.restaurantimages.length>0)
        // {
        //     this.props.detail.restaurantimages && this.props.detail.restaurantimages.map(item=>{
        //         restaurantimages.push({
        //             restaurantimages[0]:`http://localhost:5000/restaurantrequest/${item}`,
        //             restaurantimages[1]:`http://localhost:5000/restaurantrequest/${item}`,

        //         })
        //     })
        // }
        // this.setState({restaurantimages:restaurantimages})
        console.log('id:'+this.props.match.params.id);
        axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
            .then(response=>{
                this.setState({restaurantrequests:response.data})
                // this.setState({
                //     restaurantname:response.data.restaurantname,
                //     restaurantimages:response.data.restaurantimages
                // })

                // console.log('data:',this.state.restaurantimages);

            })
            .catch((error)=>{
                console.log(error)
            })

            
    }

    render(){
        return(
           
            //  {this.state.restaurantrequests.restaurantname}
            <CRow>
                <CCol>
                <CCard>
                    <CCardHeader>
                        {/* View Restaurant Images */}
                        {/* <br/> */}
                        <br/>
                          {/* {this.state.restaurantname} */}
                         <h1 className="h1">{this.state.restaurantrequests.restaurantname}</h1> 


                    </CCardHeader>
                    <CCardBody>

                      {/* {/* {this.state.restaurantrequests.restaurantname} */}
                  {/* {
                      this.state.restaurantrequests.restaurantimages.map(det => (
                        <img src={det} height="200px" width="200px" /> 
                       )) 
                  } */}
                    {/* <RestaurantImage restaurantimages={this.state.restaurantimages}/> */}
                    <RestaurantImage restaurantrequests={this.state.restaurantrequests}/>

                     {/* <img src= {this.state.restaurantimages[1]} /> */}
                      {/* {this.state.restaurantrequests.restaurantname} */}
                      
                    </CCardBody>
                    </CCard>
                </CCol>
             </CRow>
          
        );
    }
 

}
