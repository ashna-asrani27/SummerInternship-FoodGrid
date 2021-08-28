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
  CNavLink
} from '@coreui/react'


// import { DocsLink } from 'src/reusable'

// import Userdata from '../../users/UsersData'

// const [details, setDetails] = useState([])
// const [items, setItems] = useState(usersData)

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    default: return 'primary'
  }
}

const fieldss = ['restaurantname','address', 'restaurantimage','menuimage','status','edit','activate']
export default class RequestList extends Component {
  constructor(props) {
  
    super(props);
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    console.log("Whay"+tt.id)

    this.deleteRequest = this.deleteRequest.bind(this)
    this.state = {
      RestaurantRequest: [],
      user:tt.id
    }
  }
  parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
// 
  async componentDidMount()
  {
 
    
    const response = await axios.get('http://localhost:8000/restaurantrequest/'+this.state.user)
    const data = await response.data
    this.setState({
      RestaurantRequest: data
    })
    // console.log(this.state.RestaurantRequest)
    this.state.RestaurantRequest.map( result => {
      console.log("Ji"+result.status);
  }) 
  }

  async componentDidUpdate(){
    const response = await axios.get('http://localhost:8000/restaurantrequest/'+this.state.user)
    const data = await response.data
    this.setState({
      RestaurantRequest: data
    })
    // console.log(this.state.RestaurantRequest)

  }
  deleteRequest(id) {
    axios.delete('http://localhost:8000/restaurantrequest/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      RestaurantRequest: this.state.RestaurantRequest.filter(el => el._id !== id)
    })
  }r
  
  editRequest(id) {
   window.location = '/edit/restaurant/'+id;
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
    axios.post('http://localhost:8000/restaurantrequest/activate/'+id+'/'+status)
    .then(response => { this.setState({ status: response.data })});
                              
    // console.log("Inside1 "+this.state.status)
  

}
  
  RestaurantImage(id) {
    window.location = '/restaurant/viewresimage/'+id;
   } 
   
   MenuImage(id){
    window.location = '/restaurant/viewmenuimage/'+id;

   }

  render() {
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                View RestaurantRequest
            </CCardHeader>
            <CCardBody>
           
            <CDataTable
              items={this.state.RestaurantRequest}
              fields={fieldss}
              key={this.state.RestaurantRequest._id}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (key) =>(
                    <td>
                       <CButton
                          color={getBadge(key.status)}
                          variant="outline"
                          shape="square"
                          size="sm"
                          disabled={true} 
                        >
                         {key.status ? 'Active' : 'Deactive'}
                        </CButton>
                        
                    </td>
                  ),
                 'edit':
                  (key) =>(
                    <td>
                          <CButton
                          color="primary" 
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>this.editRequest(key._id) }
                          disabled={key.status ? false : true }
                        >
                         Edit {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
                    </td>
                  ),
                  'restaurantimage':
                  (key) =>(
                    <td>
                          <CButton
                          color="danger" 
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>this.RestaurantImage(key._id) }
                          disabled={key.status ? false : true }
                        >
                         Show {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
                    </td>
                  ),    
                  'menuimage':
                  (key) =>(
                    <td>
                          <CButton
                          color="primary" 
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>this.MenuImage(key._id) }
                          disabled={key.status ? false : true }
                        >
                         Show {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
                    </td>
                  ),
                  'activate':
                  (key) =>(
                    <td>
                       <CButton
                           color={key.activate ? 'success' : 'danger'}
                          variant="outline"
                          shape="square"
                          size="sm"
                          disabled={key.status ? false : true }
                          onClick={()=>this.StatusRequest(key._id,key.activate) }
                        >
                         {key.activate ? 'Active' : 'Deactive'}
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
