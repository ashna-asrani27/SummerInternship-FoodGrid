import React ,{useState, useContext}from 'react'
import Axios from "axios"
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
  CAlert
  // CSwitch
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [address, setAddress] = useState();
  const [phonenumber, setPhoneNumber] = useState();

  const [dob, setDOB] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
//  const [passwordCheck, setPasswordCheck] = useState();
 // const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const history = useHistory();

// const dob=new Date();
console.log(dob)
  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { fname,lname,address,phonenumber,dob,gender,email, password };
      console.log(newUser)
      await Axios.post("http://localhost:8000/owner/add", newUser);
      const loginRes = await Axios.post("http://localhost:8000/owner/login", {
        email,
        password,
      });
     
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err)
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
  
        <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
              <CRow  className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>
                <center>
                Food Grid
                </center>
           
            
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                {error && (
              <CAlert color="primary" >{error} </CAlert>
               )}
                  <CForm className="form-horizontal" onSubmit={submit}>
                    <CFormGroup row className="my-0">
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="firstname">First Name</CLabel>
                    <CInput type="text" id="firstname" placeholder="Enter your First Name"
                     value={fname}
                     onChange={(e) => setFname(e.target.value)}
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="lastname">Last Name</CLabel>
                    <CInput type="text" id="lastname" placeholder="Enter your Last Name" 
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </CFormGroup>
                    </CCol>
                    </CFormGroup>
                    <CFormGroup row className="my-0">
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="email">Email</CLabel>
                    <CInput type="email" id="email" placeholder="Enter your Email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="number">Phone Number</CLabel>
                    <CInput type="text" id="number" placeholder="Enter your city" 
                     value={phonenumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </CFormGroup>
                    </CCol>
                      </CFormGroup>
                      <CFormGroup row className="my-0">
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="address">Address</CLabel>
                    <CInput type="text" id="address" placeholder="Enter your address" 
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="city">Gender</CLabel>
                    <CInputGroup>
                        <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="gender" value="male"  
                      checked={gender === "male"} 
                      onChange={(e) => setGender(e.target.value)} 
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Male</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="gender" value="female" 
                        checked={gender === "female"} 
                        onChange={(e) => setGender(e.target.value)} 
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
                    <CLabel htmlFor="password">Password</CLabel>
                    <CInput id="password" placeholder="Enter your Password" type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  </CFormGroup>
                    </CCol>
                    <CCol xs="6">
                    <CFormGroup>
                    <CLabel htmlFor="city">DOB</CLabel>
                    <CInputGroup>
                        <CInput type="date" id="date-input" name="date-input" 
                        //  selected={dob} onChange={dob => setDOB(dob)}
                        />
                                                 {console.log("DOB"+dob)}

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
                    <CButton type="submit" color="success">Register</CButton>
                    </center>
                  </CFormGroup>
                    </CCol>
                      </CFormGroup>
                      <CFormGroup>
                    <CCol>
                    <CFormGroup>
                      <center>
                        Have an account?
                    <Link to={"/login"}>Login</Link>
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

export default BasicForms
