import React ,{Component}from 'react'
import axios from "axios"
import ErrorNotice from 'src/containers/ErrorNotice'
import { useHistory } from "react-router-dom";
import {
  CImg,
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

    this.onChangeItemName=this.onChangeItemName.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    this.onChangeDescription=this.onChangeDescription.bind(this);
    this.onChangeMenuItemImages=this.onChangeMenuItemImages.bind(this);

    this.onChangeRestaurant=this.onChangeRestaurant.bind(this);

    this.handleSubmit=this.handleSubmit.bind(this);

    this.state={
      RestaurantRequest: [],
      itemname:'',
      price:0,
      description:'',
      error:'',
      user:tt.id,
      itemimage:'',
      res:0
      
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
  onChangeItemName(e){
    this.setState({
      itemname:e.target.value
    })
  }
  onChangeMenuItemImages(e){
    this.setState({
      itemimage:e.target.files[0]
    })
   
  }
  onChangePrice(e){
    this.setState({
      price:e.target.value
    })
  }

  onChangeDescription(e){
    this.setState({
      description:e.target.value
    })
  }

  onChangeRestaurant(e){
    this.setState({
      res:e.target.value
    })
  }

  async componentDidMount()
  {
 console.log("Hello "+ this.state.user)
    
    const response = await axios.get('http://localhost:8000/restaurantrequest/'+this.state.user)
    const data = await response.data
    this.setState({
      RestaurantRequest: data
    })
    this.state.RestaurantRequest.map( result => {
      console.log("Ji"+result.status);
  })
 
  }

  async handleSubmit(e){
    e.preventDefault();
    console.log("hi onsubmit"+this.state.itemimage)
     try{
        let formData =new FormData()
        console.log("Image "+ this.state.itemimage)
        formData.append('itemname',this.state.itemname);
        formData.append('price',this.state.price);
        formData.append('description',this.state.description);
        // for (const key of Object.keys(this.state.itemimage)) {
        //   formData.append('itemimage', this.state.itemimage[key])
        // }
        formData.append('itemimage',this.state.itemimage);

        formData.append('res',this.state.res);
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }

      await axios.post("http://localhost:8000/item/add", formData)
  
  
      //window.location='/';
      alert('Details submitted');
      window.location = '/items/viewitems';

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
                Add Item
               
              </CCardHeader>
              
                <CCardBody>
                {this.state.error && (
        <ErrorNotice message={this.state.error} clearError={() => this.setError(undefined)} />
      )}
                  <CForm className="form-horizontal" onSubmit={this.handleSubmit}>
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
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Item Name</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">           
                          <CInput id="prependedInput" size="16" type="text"
                           value={this.state.itemname}
                           onChange={this.onChangeItemName} 
                          />
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInput">Item Discription</CLabel>
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
                      <CLabel htmlFor="appendedPrependedInput">Item price</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInput id="appendedPrependedInput" size="16" type="text"
                           value={this.state.price}
                           onChange={this.onChangePrice} 
                          />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInput">Item Image</CLabel>
                      <div className="controls">
                        <CInputGroup>
                        <CInputFile 
                        id="file" 
                        name="itemimage" 
                        
                        custom
                        //value={this.state.restaurantimages}
                        onChange={this.onChangeMenuItemImages}

                      />
                      {/* <input className="form-control form-control-lg mb-3" type="file" multiple name="restauranti" onChange={this.onImgChange} /> */}

                      <CLabel htmlFor="file" variant="custom-file">
                        Choose Files
                      </CLabel>
  
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