import React, {Component,  useEffect, useState} from 'react'
import ImageGallery from 'react-image-gallery'
import '../css/imagestyle.css'

// export default class RestaurantImage extends Component
// {
//     constructor(props)
//     {
//         super(props);
//         this.state={
//             restaurantimages:[]
//         }
//     }
//     componentDidMount()
//     {
        
//         if(this.props.restaurantrequests.restaurantimages && this.props.restaurantrequests.restaurantimages.length>0)
//         {
//             // if(this.props.restaurantrequests)
//             //  {
//                 let images=[];

//                 this.props.restaurantrequests.restaurantimages && this.props.restaurantrequests.restaurantimages.map(item=>{
//                     images.push({
//                         original: item,
//                         thumbnail:item
    
//                     })
//                 }
//                 )
//                 this.setState({restaurantimages:images});

//             // }
           
//         }
//     }
//     componentDidUpdate(prevProps){
//         // if(prevProps.restaurantimages!==this.props.restaurantimages)
//         // {
//             if(!this.props.restaurantrequests.restaurantimages && !this.props.restaurantrequests.restaurantimages.length>0)
//             {
//             let images=[];

//             this.props.restaurantrequests.restaurantimages && this.props.restaurantrequests.restaurantimages.map(item=>{
//                 images.push({
//                     original: item,
//                     thumbnail:item

//                 })
//             }
//             )
//             this.setState({restaurantimages:images});
//         }
//         // }
//     }
//     // useEffect(() => {
//     //     let images=[];

//     //     this.props.restaurantrequests.restaurantimages && this.props.restaurantrequests.restaurantimages.map(item=>{
//     //         images.push({
//     //             original: item,
//     //             thumbnail:item

//     //         })
//     //     })
//     //    setrestaurantimages(images)
//     // }, [])

//     render(){
//         return(
//             <div>
//                  <ImageGallery items={this.state.restaurantimages} />
                
//             </div>
//         )
//     }
// }


function RestaurantImage(props) {
    const [RestaurantImages, setRestaurantImages] = useState([])

    useEffect(() => {
        if(props.restaurantrequests.restaurantimages && props.restaurantrequests.restaurantimages.length>0)
        {

        
          //         if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

                props.restaurantrequests.restaurantimages && props.restaurantrequests.restaurantimages.map(item=>{
                images.push({
                    original: item,
                  thumbnail:item
                })
            })
            setRestaurantImages(images)
        }
        
    }, [props.restaurantrequests])

    return (
        <div>
            <ImageGallery items={RestaurantImages}  additionalClass="image"/>
        </div>
    )
}

export default RestaurantImage