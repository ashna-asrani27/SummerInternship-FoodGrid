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

const getBadge = status => {
  console.log(status)
  switch (status) {
    case true: return 'success'
    case false: return 'secondary'
    default: return 'primary'
  }
}

const fieldss = ['fname','lname','address','phonenumber','email','gender','status', 'delete']
export default class RestaurantRequests extends Component {
  constructor(props) {
    super(props);

    

    this.state = {
      owners: [],
      status:true,
      count:0,

      
      // restaurantimages:[]

    };
    // this.uploadMutipleFiles=this.uploadMutipleFiles.bind(this)
    this.deleteOwnerRequest=this.deleteOwnerRequest.bind(this);
    this.StatusRequest=this.StatusRequest.bind(this);
   
  }
  componentDidMount()
  {
    axios.get('http://localhost:8000/owners/')
    .then(response => {
      this.setState({ owners: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
   
   
  }
  componentDidUpdate(){
    axios.get('http://localhost:8000/owners/')
    .then(response => {
      this.setState({ owners: response.data })
    })
 
    .catch((error) => {
      console.log(error);
    })
  }


  deleteOwnerRequest(id) {
   
    axios.delete('http://localhost:8000/owners/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      owners: this.state.owners.filter(el => el._id !== id)
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
        axios.post('http://localhost:8000/owners/'+id+'/'+status)
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
                View Owners
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={this.state.owners}
              fields={fieldss}
              key={this.state.owners._id}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                
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
                          {item.status ? 'Activate' : 'Deactivate'}
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
                          onClick={()=>this.deleteOwnerRequest(key._id) }
                        
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

