import {React, useEffect, Component} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import axios from 'axios'
import {
CImg,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CInputFile,
  CCollapse,
  CNav,
  CNavItem,
  CNavLink,
  CInputGroup,
  CFormGroup,
  CLabel,
  CSelect
} from '@coreui/react'


// import { DocsLink } from 'src/reusable'

// import Userdata from '../../users/UsersData'

// const [details, setDetails] = useState([])
// const [items, setItems] = useState(usersData)

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const fieldss = ['restaurantimages','delete']
export default class OfferList extends Component {
  constructor(props) {
  
    super(props);
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    this.deleteOffer = this.deleteOffer.bind(this)
    this.onChangeRestaurantImages=this.onChangeRestaurantImages.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

    this.state = {
      restaurantname:'',
      restaurantimages:[],
      resimage:'',
      user:tt.id,
      res:0
    };
  }
  parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

  async componentDidMount()
  {
    const responses = await axios.get('http://localhost:8000/restaurantrequest/edit/'+this.props.match.params.id)
    const datas = await responses.data
    this.setState({
      restaurantname: datas.restaurantname,
      restaurantimages:datas.restaurantimages
    })

      this.state.restaurantimages.map(result => {
                   console.log(result)
      })        
  }

  onChangeRestaurantImages(e){
    this.setState({
      resimage:[...this.state.resimage,...e.target.files]
  
    })
  }

  handleSubmit(e){
    e.preventDefault();

try{
    let formData = new FormData();
   
    for (const key of Object.keys(this.state.resimage)) {
      formData.append('restaurantimages', this.state.resimage[key])
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
     axios.post("http://localhost:8000/restaurantrequest/updateresimage/"+this.props.match.params.id, formData)

    console.log(formData);
    alert('Details submitted');
    window.location = '/restaurant/viewresimage/'+this.props.match.params.id;
   
    
}catch(err){
  console.log("View Error")
}
 
  }


  deleteOffer(id,name) {
    try{ 
      const image={
        imagename:name
     }
    
      axios.post('http://localhost:8000/restaurantrequest/deleteresimage/'+id,image)
        .then(response => { console.log(response.data)});
        window.location = '/restaurant/viewresimage/'+this.props.match.params.id;
  
      }
    catch(err){
      console.log(err)
    }
  }
  
  editOffer(id) {
   window.location = '/items/edititems/'+id;
  }
  render() {
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                View Restaurant Image
            </CCardHeader>
            <CCardBody>
              <form  method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>

          <CFormGroup>
          <CLabel htmlFor="prependedInput"><b>{this.state.restaurantname}</b></CLabel>

          </CFormGroup>
          <CFormGroup row>
          <CCol md="2">
          <CLabel>Restaurant Images</CLabel>
          </CCol>
          <CCol xs="6" md="4">
          <CInputFile 
          id="file-multiple-input" 
          name="resimage" 
          multiple
          custom
          onChange={this.onChangeRestaurantImages}

          />
          {/* <input className="form-control form-control-lg mb-3" type="file" multiple name="restauranti" onChange={this.onImgChange} /> */}

          <CLabel htmlFor="file-multiple-input" variant="custom-file">
          Choose Files
          </CLabel>


          </CCol>
          <CCol  xs="6" md="4">
          <CButton type="submit" size="sm" color="success"> Submit</CButton>
          </CCol>
          </CFormGroup>
          </form>
            <CFormGroup>
                      <CLabel htmlFor="prependedInput"><b>{this.state.restaurantname}</b></CLabel>
                      
                    </CFormGroup>
           <CDataTable
            items={this.state.restaurantimages}
            fields={fieldss}
            dark
            hover
            striped
            bordered
            size="sm"
            itemsPerPage={10}
            pagination
            scopedSlots = {{
                'restaurantimages':
                (key) =>(
                  <td>
                    {console.log("key"+key)}
                    <CImg style={{height:'100px',width:'100px'}}
                    src={key}
                
                    alt={key}
                      /> 
          
                      
                  </td>
                  
                ),
                'delete':
                (key) =>(
                  <td>
                    {console.log("key"+key)}
                    <td>
                          <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>this.deleteOffer(this.props.match.params.id,key) }
                        
                        >
                         Delete {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
                    </td>
          
                      
                  </td>
                  
                )
              }}
           />
          
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
     
        
     </>
     )
    }
}
