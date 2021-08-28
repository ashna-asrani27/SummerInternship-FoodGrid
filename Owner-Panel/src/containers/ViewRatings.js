import {React, useEffect, Component} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";

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

const fieldss = ['rating','review','delete']
export default class OfferList extends Component {
  constructor(props) {
  
    super(props);
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    console.log("Whay"+tt.id)
    this.onChangeRestaurant=this.onChangeRestaurant.bind(this);
    this.deleteRating = this.deleteRating.bind(this)
    this.state = {
      ratings: [],
      RestaurantRequest:[],
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
async onChangeRestaurant(e){
  console.log("Inside "+e.target.value)

  await this.setState({
    res:e.target.value
  })
  console.log("Inside "+this.state.res)
  this.UpdateRes();
}
  async componentDidMount()
  {
    const responses = await axios.get('http://localhost:8000/restaurantrequest/'+this.state.user)
    const datas = await responses.data
    this.setState({
      RestaurantRequest: datas
    })
    this.state.RestaurantRequest.map( result => {
      console.log("Ji"+result);
  })
  }


  async UpdateRes()
  {
    try{
      console.log("IUD"+this.state.res)
    
      const response = await axios.get('http://localhost:8000/ratings/view/'+this.state.res)
      const data = await response.data
      console.log('dtaa:::',data);
      this.setState({
        ratings: data
      })
    }catch(err){
      this.setState({
        ratings: []
      })
      alert(err.response.data.msg)
    }
  
  }
  deleteRating(id) {
    axios.delete('http://localhost:8000/ratings/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      offer: this.state.ratings.filter(el => el._id !== id)
    })
  }
  
  
  render() {
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader  className="headtxt">
                View Ratings
            </CCardHeader>
            <CCardBody>
            <CFormGroup>
                      <CLabel htmlFor="prependedInput">Restaurant</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">  

                        <CSelect custom name="select" id="select" onChange={this.onChangeRestaurant}>
                        <option value={0} >Please Select</option>
                          {
                              this.state.RestaurantRequest.map( result => {
                               return <option  key={result._id} value={result._id}>{result.restaurantname}</option>
                    })
                    }
                    </CSelect>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
            <CDataTable
              items={this.state.ratings}
              fields={fieldss}
              key={this.state.ratings._id}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
               
                  'delete':
                  (key) =>(
                    <td>
                          <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="btntxt"
                          onClick={()=>this.deleteRating(key._id) }
                        
                        >
                         Delete {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
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
