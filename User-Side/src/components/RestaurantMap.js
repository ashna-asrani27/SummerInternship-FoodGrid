// import Axios from 'axios';
// import React,{ Component } from 'react'
// import {GoogleMap,Marker,withGoogleMap,withScriptjs} from "react-google-maps";
// import axios from 'axios'
// import {withRouter} from 'react-router'
// import RestaurantMenu from './RestaurantMenu';
// import RestaurantNavbar from './RestaurantNavbar';
// import Restaurantcarousel from './Restaurantcarousel';

// export class Map extends Component{
//     constructor(props)
//     {
//         super(props);
//         this.state=
//          {
//             restaurants:this.props.match
//          };
        

//     }
//     componentDidMount() {
//       console.log('hi');
//         console.log('ID:-----m'+JSON.stringify(this.props));
//         axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
//         .then(response=>{
//           this.setState({restaurants:response.data})
//           console.log('data of rest map----',this.state.restaurants)
//         })
//         .catch((error)=>{
//           console.log(error)
//         })
//     }
//     // componentDidMount()
//     // {
//     //     console.log('id:'+this.props.location.state);
//     //     axios.get('http://localhost:8000/restaurantrequest/'+this.props.location.state)
//     //         .then(response=>{
//     //             this.setState({restaurantrequests:response.data})
//     //             // this.setState({
//     //             //     restaurantname:response.data.restaurantname,
//     //             //     restaurantimages:response.data.restaurantimages
//     //             // })

//     //             // console.log('data:',this.state.restaurantimages);

//     //         })
//     //         .catch((error)=>{
//     //             console.log(error)
//     //         })

            
//     // }
  
//     render(){
//       // const { state } = this.props.location
//         return(
         
  
//             <>
//             <GoogleMap defaultZoom={10}
//             defaultCenter={{lat:23.0284,lng:72.5591}}>
           
//            <Marker 
//             // key={this.state.restaurants._id}
//             position={{
//                 // lat:this.state.restaurants.latitude,
//                 // lng:this.state.restaurants.longitude
//                 lat:this.state.restaurants.latitude,
//                 lng:this.state.restaurants.longitude
                
//               }}
//             //   icon={{
//             //     url: `/skateboarding.svg`,
//             //     scaledSize: new window.google.maps.Size(25, 25)
//             //   }}  
//             />

//             </GoogleMap>
            
//             {/* {this.state.restaurants.map(
//                 restaurant=>(
//             <Marker 
//             key={restaurant._id}
//             position={{
//                 lat:restaurant.latitude,
//                 lng: restaurant.longitude
//               }}
//             //   icon={{
//             //     url: `/skateboarding.svg`,
//             //     scaledSize: new window.google.maps.Size(25, 25)
//             //   }}  
//             />
//                 ) )} */}
              
            
              
           
//             </>
//         )
//      } 
// }

// const WrappedMap=withScriptjs(withGoogleMap(Map));

// export default class RestaurantMap extends Component{
    
//     render(){
       
//         return(
//           <div>
//             <Restaurantcarousel/>
          
         
//             <div style={{ width: "100vw", height: "100vh" }}>
//                 <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
//                 =${
//                     process.env.REACT_APP_GOOGLE_MAPS_API_KEY
//                   }`}
//                 loadingElement={<div style={{ height: "100%" }} />}
//                 containerElement={<div style={{ height: "400px" }} />}
//                 mapElement={<div style={{ height: "100%" }} />}
                
                
//                 />
//             </div>

//             {/* <RestaurantMenu/> */}
//             </div>
//         )
//     }
// }



// // import Axios from 'axios';
// // import React,{ Component } from 'react'
// // import {GoogleMap,Marker,withGoogleMap,withScriptjs} from "react-google-maps";
// // import axios from 'axios'


// // export class Map extends Component{
// //     constructor(props)
// //     {
// //         super(props);
// //         // this.state=
// //         //  {
// //         //     restaurants:[]
// //         //  };
// //         console.log('map:'+this.props.restaurantrequests);
        

// //     }
// //     // componentDidMount() {
// //     //     console.log('ID:-----m'+this.props.match.params.id);
// //     //     axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
// //     //     .then(response=>{
// //     //       this.setState({restaurants:response.data})
// //     //       console.log('data----',this.state.restaurants)
// //     //     })
// //     //     .catch((error)=>{
// //     //       console.log(error)
// //     //     })
// //     // }
  
// //     render(){
// //         return(
// //             <>
// //             <GoogleMap defaultZoom={10}
// //             defaultCenter={{lat:23.0173,lng:72.5298}}>
           
// //            <Marker 
// //             key={this.props.restaurantrequests._id}
    
// //             position={{
// //                 lat:this.props.restaurantrequests.latitude,
// //                 lng:this.props.restaurantrequests.longitude
                
// //               }}
// //             //   icon={{
// //             //     url: `/skateboarding.svg`,
// //             //     scaledSize: new window.google.maps.Size(25, 25)
// //             //   }}  
// //             />

// //             </GoogleMap>
            
// //             {/* {this.state.restaurants.map(
// //                 restaurant=>(
// //             <Marker 
// //             key={restaurant._id}
// //             position={{
// //                 lat:restaurant.latitude,
// //                 lng: restaurant.longitude
// //               }}
// //             //   icon={{
// //             //     url: `/skateboarding.svg`,
// //             //     scaledSize: new window.google.maps.Size(25, 25)
// //             //   }}  
// //             />
// //                 ) )} */}
              
            
              
           
// //             </>
// //         )
// //      } 
// // }

// // const WrappedMap=withScriptjs(withGoogleMap(Map));

// // export default class RestaurantMap extends Component{
    
// //     render(){
       
// //         return(
// //             <div style={{ width: "100vw", height: "100vh" }}>
// //                 <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
// //                 =${
// //                     process.env.REACT_APP_GOOGLE_MAPS_API_KEY
// //                   }`}
// //                 loadingElement={<div style={{ height: "100%" }} />}
// //                 containerElement={<div style={{ height: "400px" }} />}
// //                 mapElement={<div style={{ height: "100%" }} />}
                
                
// //                 />
// //             </div>
// //         )
// //     }
// // }




// // // import Axios from 'axios';
// // // import React,{ Component } from 'react'
// // // import {Map,Marker,InfoWindow,GoogleApiWrapper} from "google-maps-react";
// // // import axios from 'axios'
// // // import Restaurantcarousel from './Restaurantcarousel';


// // // export class RestaurantMap extends Component{
   
// // //     // componentDidMount() {
// // //     //     console.log('ID:-----'+this.props.match.params.id);
// // //     //     axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
// // //     //     .then(response=>{
// // //     //       this.setState({restaurants:response.data})
// // //     //       console.log('data',this.state.restaurants)
// // //     //     })
// // //     //     .catch((error)=>{
// // //     //       console.log(error)
// // //     //     })
// // //     // }
// // //     render(){
// // //         return(
// // //            <div>

// // //          <h1>Map</h1>
// // //             <Map google={this.props.google} zoom={14}>
 
// // //         <Marker onClick={this.onMarkerClick}
// // //                 name={'Current location'} />
 
// // //       </Map>
// // //       </div>

              

// // //         )
// // //     }
        
// // // }
// // // export default GoogleApiWrapper({
// // //     apiKey: ("AIzaSyAqJ8GuFYE3lvauhHVmcPMR3XNkX0pEFa4")
// // //   })(RestaurantMap)


     


import React , { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import axios from "axios";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    // defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultCenter={{ lat:props.restaurants.latitude, lng:props.restaurants.longitude }}

  >
    {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}
    {props.isMarkerShown && <Marker position={{ lat:props.restaurants.latitude, lng:props.restaurants.longitude }} />}

  </GoogleMap>
))

export default class RestaurantMap extends Component
{
  constructor(props)
  {
    super(props);
    this.state=
    {
      restaurants:[]
    }
  }
  componentDidMount() {
            console.log('ID:-----m'+this.props.match.params.id);
            axios.get('http://localhost:8000/restaurantrequest/'+this.props.match.params.id)
            .then(response=>{
              this.setState({restaurants:response.data})
              console.log('data----',this.state.restaurants)
            })
            .catch((error)=>{
              console.log(error)
            })
    }
  render(){
    return(
      <MyMapComponent
      
      isMarkerShown
      restaurants={this.state.restaurants}
      // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
                =${process.env.REACT_APP_GOOGLE_MAPS_API_KEY  }`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    )
  }
}
