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



const fieldss = ['membershipname','membershipprice', 'membershipdes','update','delete']
export default class OfferList extends Component {
  constructor(props) {
  
    super(props);
      
   
    this.deleteMembersip = this.deleteMembersip.bind(this);
    // this.editMembership=this.editMembership.bind(this);
    this.state = {
      memberships: [],
      
      res:0
    };
  }
 

  async componentDidMount()
  {
    const responses = await axios.get('http://localhost:8000/membership/')
    const datas = await responses.data
    this.setState({
      memberships: datas
    })
    
  }


 
  deleteMembersip(id) {
    axios.delete('http://localhost:8000/membership/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      memberships: this.state.memberships.filter(el => el._id !== id)
    })
  }
  
  editMembership(id) {
      console.log('hii'+id);
      window.location = '/edit/membership/'+id;  }
  render() {
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="headtxt">
                View MemberShip
            </CCardHeader>
            <CCardBody>
         
            <CDataTable
              items={this.state.memberships}
              fields={fieldss}
              key={this.state.memberships._id}
              dark
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'update':
                  (key) =>(
                    <td>
                       <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="btntxt"
                          onClick={()=>this.editMembership(key._id) }
                        
                        >
                         Edit {/* {details.includes(index) ? 'Hide' : 'Show'} */}
                        </CButton>
                        
                    </td>
                  ),
                  'delete':
                  (key) =>(
                    <td>
                          <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="btntxt"
                          onClick={()=>this.deleteMembersip(key._id) }
                        
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
