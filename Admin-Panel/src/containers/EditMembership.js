import React ,{Component}from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'


export default class AddOffer extends Component {
  constructor(props){
    super(props);
  


    this.onChangeMembershipName=this.onChangeMembershipName.bind(this);
    this.onChangeMembershipPrice=this.onChangeMembershipPrice.bind(this);
    this.onChangeMembershipDes=this.onChangeMembershipDes.bind(this);
   
    this.handleSubmit=this.handleSubmit.bind(this);

    this.state={
    
      membershipname:'',
      membershipprice:0,
      membershipdes:'',      
    }
    console.log("Hello")

  }
 

  
  onChangeMembershipName(e){
    this.setState({
      membershipname:e.target.value
    })
  }
  onChangeMembershipPrice(e){
    this.setState({
      membershipprice:e.target.value
    })
  }
 
  onChangeMembershipDes(e){
    this.setState({
      membershipdes:e.target.value
    })
  }

  componentDidMount()
  {
    console.log("Id "+this.props.match.params.id)
    axios.get('http://localhost:8000/membership/edit/'+this.props.match.params.id)
      .then(response => {
        console.log("Jnjzn"+response.data)

        this.setState({
            membershipname: response.data.membershipname,
            membershipprice: response.data.membershipprice,
            membershipdes: response.data.membershipdes
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
 
  }
  

  async handleSubmit(e){
    e.preventDefault();
    //console.log("hi onsubmit"+this.state.menuimages)
     try{
      const membership={
        membershipname:this.state.membershipname,
        membershipprice:this.state.membershipprice,
        membershipdes:this.state.membershipdes,
      

      }
      await axios.post("http://localhost:8000/membership/update/"+this.props.match.params.id, membership)
  
  
      //window.location='/';
      console.log('membership:::',membership);
      window.location = '/ViewMembership';

     }catch(err){
       console.log(err.response.data.msg)
      err.response.data.msg && this.setError(err.response.data.msg);
     }
  }
  
  render(){
  return (
    <>
     
      <CRow>
        <CCol xs="12">
        
            <CCard>
              <CCardHeader className="headtxt">
                Edit Membership
               
              </CCardHeader>
              
                <CCardBody>
                
                  <CForm className="form-horizontal" onSubmit={this.handleSubmit}>
           
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Membership Name</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">           
                          <CInput id="prependedInput" size="16" type="text"
                           value={this.state.membershipname}
                           onChange={this.onChangeMembershipName} 
                          />
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    
                    <CFormGroup>
                      <CLabel htmlFor="appendedPrependedInput">Membership Price</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInput id="appendedPrependedInput" size="16" type="text"
                           value={this.state.membershipprice}
                           onChange={this.onChangeMembershipPrice} 
                          />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInput">Membership Description</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CTextarea id="appendedInput" size="16" type="text" 
                           value={this.state.membershipdes}
                           onChange={this.onChangeMembershipDes} 
                          />
                          
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                   
            
                    <div className="form-actions">
                      <CButton type="submit" color="primary">Submit</CButton>
               
                    </div>
                  </CForm>
                </CCardBody>
      
            </CCard>
      
        </CCol>
      </CRow>
    </>
  )
}
}