import React, { lazy, Component } from 'react'
import axios from 'axios'
import "../scss/style.scss";

// import RestaurantImages from './RestaurantImages'
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
// import {
//   CBadge,
//   CButton,
//   CButtonGroup,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CCol,
//   CProgress,
//   CRow,
//   CCallout
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import MainChartExample from '../charts/MainChartExample.js'
// import RestaurantImages from './containers/RestaurantImages.js'

// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))
const getBadge = status => {
  console.log(status)
  switch (status) {
    case true: return 'success'
    case false: return 'secondary'
    default: return 'primary'
  }
}

const fieldss = ['restaurantname','address','area','longitude','latitude','openingtime','closingtime', 'phonenumber','pincode','restauranttype','restaurantimages','menuimages','status', 'delete']
export default class RestaurantRequests extends Component {
  constructor(props) {
    super(props);

    this.handleRestaurantImages=this.handleRestaurantImages.bind(this);
    this.handleMenuImages=this.handleMenuImages.bind(this);

    this.state = {
      restaurantrequests: [],
      status:true,
      count:0,

      
      // restaurantimages:[]

    };
    // this.uploadMutipleFiles=this.uploadMutipleFiles.bind(this)
   
  }
  componentDidMount()
  {
    axios.get('http://localhost:8000/restaurantrequest/')
    .then(response => {
      this.setState({ restaurantrequests: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
   
   
  }
  componentDidUpdate(){
    axios.get('http://localhost:8000/restaurantrequest/')
    .then(response => {
      this.setState({ restaurantrequests: response.data })
    })
 
    .catch((error) => {
      console.log(error);
    })
  }


  deleteRestaurantRequest(id) {
   
    axios.delete('http://localhost:8000/restaurantrequest/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      restaurantrequests: this.state.restaurantrequests.filter(el => el._id !== id)
    })
  }

  // uploadMutipleFiles(e)
  // {
  //   // this.fileObj.bind(e.target.files)
  //   // for(let i=0;i<this.fileObj[0].length;i++)
  //   // {
  //   //   this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
  //   // }
  //   // this.setState({
  //   //   file:this.fileArray
  //   // })

  //   let images = [];

  //   for (let i = 0; i < e.target.files.length; i++) {
  //     images.push(URL.createObjectURL(e.target.files[i]))
  //  }
  //  this.setState({
   
  //   restaurantimages: images
  // });
  // }
  // getFiles() {
  //   return axios.get("/files");
  // }

  handleRestaurantImages(id)
  {
    // console.log('hi image1',restaurantimages[0]);
    // <img src={restaurantimages[0]} />
    this.props.history.push('/RestaurantImages/'+id)
  }
  handleMenuImages(id)
  {
    this.props.history.push('/MenuImages/'+id)
  }
  StatusRequest(id,status) {
        console.log("Flag "+status)
        if(status===true)
        {
           status=false
        }
        else if(status===false)
        {
          
            status=true
            console.log('set to true');
        }
        axios.post('http://localhost:8000/restaurantrequest/'+id+'/'+status)
        .then(response => { this.setState({ status: response.data })});
                                  
        // console.log("Inside1 "+this.state.status)
      
  
  }
 

  render() {
   // let button=this.state.customers.status;
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="headtxt">
                View Restaurant Requests
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={this.state.restaurantrequests}
              fields={fieldss}
              key={this.state.restaurantrequests._id}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'restaurantimages':
                (item)=>(
                  <td>
                      {/* <div>
                          { */}
                            
                              {/* //  item.restaurantimages.map(det =>(
                                  
                                  // <img src={require.context('det',true)}  height="150px" width="150px" /> */}
                                  {/* // <img src={require( `${ det}` )}  height="150px" width="150px" /> */}
                                  {/* <img src={item.restaurantimages[0]}  height="150px" width="150px" />
                                  <br/><br/>
                                  <img src={item.restaurantimages[1]}  height="150px" width="150px" />
                                   */}

                                {/* // )) */}
                          {/* } */}
                
                        {/* <div>
                          {
                            
                               item.restaurantimages.map(det =>(
                                  
                                  // <img src={require.context('det',true)}  height="150px" width="150px" />
                                  // <img src={require( `${ det}` )}  height="150px" width="150px" />
                                  <img src={det}  height="150px" width="150px" />
                                  

                                ))
                          } */}
                       
                        {/* </div> */}
                        {/* <img src={item.restaurantimages} alt="" /> */}


                        <CButton 
                        color="primary"
                        variant="outline"
                        shape="ghost"
                        size="sm"
                        className="btntxt"
                        onClick={()=>this.handleRestaurantImages(item._id)} >
                          View Images
                        </CButton>
                   </td>
                ), 
                'menuimages':
                  (item)=>(
                    <td>
                    <CButton 
                        color="primary"
                        variant="outline"
                        shape="ghost"
                        size="sm"
                        className="btntxt"
                        onClick={()=>this.handleMenuImages(item._id)}>
                        View Images
                      </CButton>
                    </td>
                  ),
                'status':
                  (item)=>(
                    <td>
                   
                          <CButton
                          color={item.status ? 'success' : 'danger'}
                          variant="outline"
                          shape="ghost"
                          size="sm"
                          className="btntxt"
                          onClick={()=>this.StatusRequest(item._id,item.status) }
                        >
                          {item.status ? 'Accept' : 'Decline'}
                       </CButton>   
                    </td>
                  ),
                'delete':
                  (key)=>{
                    return (
                      <td className="py-2">
                         <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="btntxt"
                          onClick={()=>this.deleteRestaurantRequest(key._id) }
                        
                        >
                         Delete {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
                      </td>
                      )
                    }
            //     'details':
            //         (item, index)=>{
            //           return (
            //           <CCollapse >
            //             <CCardBody>
            //               <h4>
            //                 {item.username}
            //               </h4>
            //               <p className="text-muted">User since: {item.registered}</p>
            //               <CButton size="sm" color="info">
            //                 User Settings
            //               </CButton>
            //               <CButton size="sm" color="danger" className="ml-1">
            //                 Delete
            //               </CButton>
            //             </CCardBody>
            //           </CCollapse>
            //         )
            //       }
            }}
            
             />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
       {/* <CRow>
//         <CCol xs="12" lg="6">
//           <CCard>
//             <CCardHeader>
//               Simple Table
//               <DocsLink name="CModal"/>
//             </CCardHeader>
//             <CCardBody>
//             <CDataTable
//               items={usersData}
//               fields={fields}
//               itemsPerPage={5}
//               pagination
//               scopedSlots = {{
//                 'status':
//                   (item)=>(
//                     <td>
//                       <CBadge color={getBadge(item.status)}>
//                         {item.status}
//                       </CBadge>
//                     </td>
//                   )

//               }}
//             />
//             </CCardBody>
//           </CCard>
//         </CCol>

//         <CCol xs="12" lg="6">
//           <CCard>
//             <CCardHeader>
//               Striped Table
//             </CCardHeader>
//             <CCardBody>
//             <CDataTable
//               items={usersData}
//               fields={fields}
//               striped
//               itemsPerPage={5}
//               pagination
//               scopedSlots = {{
//                 'status':
//                   (item)=>(
//                     <td>
//                       <CBadge color={getBadge(item.status)}>
//                         {item.status}
//                       </CBadge>
//                     </td>
//                   )

//               }}
//             />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>

//       <CRow>

//         <CCol xs="12" lg="6">
//           <CCard>
//             <CCardHeader>
//               Condensed Table
//             </CCardHeader>
//             <CCardBody>
//             <CDataTable
//               items={usersData}
//               fields={fields}
//               size="sm"
//               itemsPerPage={5}
//               pagination
//               scopedSlots = {{
//                 'status':
//                   (item)=>(
//                     <td>
//                       <CBadge color={getBadge(item.status)}>
//                         {item.status}
//                       </CBadge>
//                     </td>
//                   )

//               }}
//             />
//             </CCardBody>
//           </CCard>
//         </CCol>

//         <CCol xs="12" lg="6">
//           <CCard>
//             <CCardHeader>
//               Bordered Table
//             </CCardHeader>
//             <CCardBody>
//             <CDataTable
//               items={usersData}
//               fields={fields}
//               bordered
//               itemsPerPage={5}
//               pagination
//               scopedSlots = {{
//                 'status':
//                   (item)=>(
//                     <td>
//                       <CBadge color={getBadge(item.status)}>
//                         {item.status}
//                       </CBadge>
//                     </td>
//                   )

//               }}
//             />
//             </CCardBody>
//           </CCard>
//         </CCol>

//       </CRow>

//       <CRow>
//         <CCol>
//           <CCard>
//             <CCardHeader>
//               Combined All Table
//             </CCardHeader>
//             <CCardBody>
//             <CDataTable
//               items={usersData}
//               fields={fields}
//               hover
//               striped
//               bordered
//               size="sm"
//               itemsPerPage={10}
//               pagination
//               scopedSlots = {{
//                 'status':
//                   (item)=>(
//                     <td>
//                       <CBadge color={getBadge(item.status)}>
//                         {item.status}
//                       </CBadge>
//                     </td>
//                   )
//               }}
//             />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow> */}
        
     </>
//   )
//   }
// }
  )}}

