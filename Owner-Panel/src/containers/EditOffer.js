import React ,{Component}from 'react'
import axios from "axios"
import ErrorNotice from 'src/containers/ErrorNotice'

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
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

export default class AddOffer extends Component {
  constructor(props){
    super(props);
    // collapsed:true;
    // showElements:true;
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    console.log("Whay"+tt.id)

    this.onChangeOfferName=this.onChangeOfferName.bind(this);
    this.onChangeDiscount=this.onChangeDiscount.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

    this.state={
      offername:'',
      discount:0,
      description:'',
      error:'',
      
    }
    console.log("Hello")
    console.log("React "+this.state.user)
  }
 

  setError(e)
  {
    this.setState({
      error:e
    })
  }
  onChangeOfferName(e){
    this.setState({
      offername:e.target.value
    })
  }
 
  onChangeDiscount(e){
    this.setState({
      discount:e.target.value
    })
  }

  onChangeDescription(e){
    this.setState({
      description:e.target.value
    })
  }

   componentDidMount()
  {
    console.log("Id "+this.props.match.params.id)
    axios.get('http://localhost:8000/offer/edit/'+this.props.match.params.id)
      .then(response => {
        console.log("Jnjzn"+response.data)

        this.setState({
          offername: response.data.offername,
          description: response.data.description,
          discount: response.data.discount
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
      const offer={
        offername:this.state.offername,
        discount:this.state.discount,
        description:this.state.description,
     


      }
      await axios.post("http://localhost:8000/offer/update/"+this.props.match.params.id, offer)
  
  
      //window.location='/';
      alert('Details submitted');
      window.location = '/offers/view-offers';

     }catch(err){
       console.log(err.response.data.msg)
      err.response.data.msg && this.setError(err.response.data.msg);
     }
  }
  parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
  render(){
  return (
    <>
     
      <CRow>
        <CCol xs="12">
        
            <CCard>
              <CCardHeader>
                Add Offers
               
              </CCardHeader>
              
                <CCardBody>
                {this.state.error && (
        <ErrorNotice message={this.state.error} clearError={() => this.setError(undefined)} />
      )}
                  <CForm className="form-horizontal" onSubmit={this.handleSubmit}>
           
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Offer Name</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">           
                          <CInput id="prependedInput" size="16" type="text"
                           value={this.state.offername}
                           onChange={this.onChangeOfferName} 
                          />
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInput">Offer Discription</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CTextarea id="appendedInput" size="16" type="text" 
                           value={this.state.description}
                           onChange={this.onChangeDescription} 
                          />
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedPrependedInput">Offer Discount</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInput id="appendedPrependedInput" size="16" type="text"
                           value={this.state.discount}
                           onChange={this.onChangeDiscount} 
                          />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
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