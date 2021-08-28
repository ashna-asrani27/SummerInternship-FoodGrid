import React ,{Component}from 'react'
import axios from "axios"
import DatePicker from 'react-datepicker';
import ErrorNotice from 'src/containers/ErrorNotice'
import { useHistory, Link ,Redirect} from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  // CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  // CDropdownItem,
  // CDropdownMenu,
  // CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  // CFormText,
  // CValidFeedback,
  // CInvalidFeedback,
  CTextarea,
  CInput,
  // CInputFile,
  // CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  // CInputGroupPrepend,
  // CDropdown,
  CInputGroupText,
  CLabel,
  // CSelect,
  CRow,
  // CSwitch
} from '@coreui/react'
import { render } from 'enzyme/build';
// import CIcon from '@coreui/icons-react'
// import { DocsLink } from 'src/reusable'

export default class ViewProfile extends Component {
    constructor(props){
        super(props);
        // collapsed:true;
        // showElements:true;
        const token=localStorage.getItem("auth-token");
          
        const tt=this.parseJwt(token)
        console.log("Whay"+tt.id)
    
    
     
        // this.handleSubmit=this.handleSubmit.bind(this);
    
        this.state={
          fname:'',
          lname:'',
          address:'',
          phonenumber:0,
          dob:new Date(),
          gender:'',
          email:'',
          showElements:true,
          collapsed:true,
          user:tt.id
          
        }
        console.log("Hello")
        console.log("React "+this.state.user)
      }
     
      componentDidMount(){
        axios.get('http://localhost:8000/owner/view/'+this.state.user)
        .then(response => {
          console.log("Jnjzn"+response.data)
  
          this.setState({
            fname: response.data.fname,
            lname: response.data.lname,
            address: response.data.address,
            phonenumber: response.data.phonenumber,
            email: response.data.email,
            gender: response.data.gender,
            dob:response.data.dob
          })   
          console.log("Date"+this.state.dob)
        })
        .catch(function (error) {
          console.log(error);
        })
      }

      parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
  
// const dob=new Date();


render(){
  return (
    <>
  
        <div className="align-items-center">
      <CContainer>
              <CRow  className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CFade timeout={300} in={this.state.showElements} unmountOnExit={true}>
            <CCard>
           
              <CCardHeader>
                <center>
                Food Grid
                </center>
           
            
              </CCardHeader>
              <CCollapse show={this.state.collapsed} timeout={1000}>
                <CCardBody>
                
                  <CForm className="form-horizontal">
                    <CFormGroup row className="my-0">
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="firstname">First Name</CLabel>
                    <CInput type="text" id="firstname" placeholder="Enter your First Name"
                     value={this.state.fname}
                     disabled={true}
                    
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="lastname">Last Name</CLabel>
                    <CInput type="text" id="lastname" placeholder="Enter your Last Name" 
                      value={this.state.lname}
                      disabled={true}
                    />
                  </CFormGroup>
                    </CCol>
                      {/* <CLabel htmlFor="prependedInput">First Name</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                         
                          <CInput id="prependedInput" size="16" type="text"
                           value={membershipname}
                           onChange={(e) => setMembershipName(e.target.value)}  />
                        </CInputGroup>
                        {/* <p className="help-block">Here's some help text</p> */}
                      {/* </div> */}
                    </CFormGroup>
                    <CFormGroup row className="my-0">
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="email">Email</CLabel>
                    <CInput type="email" id="email" placeholder="Enter your Email" 
                     value={this.state.email}
                     disabled={true}
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="number">Phone Number</CLabel>
                    <CInput type="text" id="number" placeholder="Enter your city" 
                     value={this.state.phonenumber}
                     disabled={true}
                    />
                  </CFormGroup>
                    </CCol>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="address">Address</CLabel>
                    <CInput type="text" id="address" placeholder="Enter your address" 
                     value={this.state.address}
                     disabled={true}
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="city">Gender</CLabel>
                    <CInputGroup>
                        <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="gender" value="male"  
                      checked={this.state.gender === "male"} 
                      disabled={true}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Male</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="gender" value="female" 
                        checked={this.state.gender === "female"} 
                        disabled={true}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Female</CLabel>
                    </CFormGroup>
                        </CInputGroup>
                        
                  </CFormGroup>
                    </CCol>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                 
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="city">DOB</CLabel>
                    <CInputGroup>
                        <CInput type="date" id="date-input" name="date-input"  selected={this.state.dob}
                             disabled={true}
                        //  selected={dob} onChange={dob => setDOB(dob)}
                        />
                        {}                       

                         {/* <DatePicker className="datepicker"
            selected={dob} onChange={dob => setDOB(dob)}/> */}
                        </CInputGroup>
                  </CFormGroup>
                    </CCol>
                      </CFormGroup>

                      <CFormGroup>
                    <CCol>
                    <CFormGroup>
                      <center>
                      <CButton type="submit" color="success" to={"/edit/profile"}>Edit</CButton>
                  {/* <Link to={"/edit/profile"}  style={{backgroundColor:'green',padding:'12px',color:'black', borderRadius:'5px'}}>Edit</Link> */}
                    </center>
                  </CFormGroup>
                    </CCol>
                      </CFormGroup>
                 
                  
                      
                    
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
      </CContainer>
      </div>
    </>
  )
        }
}


