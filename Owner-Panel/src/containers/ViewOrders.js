import {React, useEffect, Component} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import '../scss/style.scss'
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

const fieldss = ['name','email', 'itemname','price','delete']
export default class OfferList extends Component {
  constructor(props) {
  
    super(props);
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    console.log("Whay"+tt.id)
    this.onChangeRestaurant=this.onChangeRestaurant.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this)
    this.state = {
      orders: [],
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
    
      const response = await axios.get('http://localhost:8000/order/view/'+this.state.res)
      const data = await response.data
      this.setState({
        orders: data
      })
    }catch(err){
      this.setState({
        orders: []
      })
      alert(err.response.data.msg)
    }
  
  }
  deleteOrder(id) {
    axios.delete('http://localhost:8000/order/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      orders: this.state.offer.filter(el => el._id !== id)
    })
  }
  
 
  render() {
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader >
                View Orders
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
              items={this.state.orders}
              fields={fieldss}
              key={this.state.orders._id}
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
                          onClick={()=>this.deleteOrder(key._id) }
                        
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
