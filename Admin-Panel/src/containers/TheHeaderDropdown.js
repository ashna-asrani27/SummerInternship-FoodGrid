import React ,{Component} from 'react'
import axios from 'axios'
import{Redirect} from "react-router-dom"; 
import {
  CBadge,
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
export default class TheHeaderDropdown extends Component {
  constructor(props){
    super(props)
    const token=localStorage.getItem("auth-token");
    console.log("Token "+token)
    const tt=this.parseJwt(token);
    let loggedIn=true
    let user=0;
    if(token==null){
      loggedIn=false
    }
    else{
      user=tt.id
    }
    this.state={
      loggedIn,
      owner:'',
      user
    }
  }
  parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

 async  componentDidMount(){
    const response = await axios.get('http://localhost:8000/owner/'+this.state.user)
    const data = await response.data
    console.log("Owner "+data)
    this.setState({
      owner: data
    })
  }

  
  submit (){
     localStorage.removeItem("auth-token");
     window.location='/login';
  }
  render(){
    if(this.state.loggedIn===false){
      return <Redirect to="/login"/>
    }
    
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-5"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'/avatars/9.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Welcome</strong>
        </CDropdownItem>
        
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          <CButton onClick={this.submit}>Logout</CButton>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
  }
}


