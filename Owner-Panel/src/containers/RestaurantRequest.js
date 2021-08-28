//restaurant request  front end


import React,{Component} from 'react'
import axios from 'axios'
import ErrorNotice from './ErrorNotice'
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';


import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CInputFile,
  CLabel,
  CSelect,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const mapStyles = {
  width: '100%',
  height: '100%'
};

export  class RestaurantRequest extends Component {
  constructor(props){
    super(props);
    const token=localStorage.getItem("auth-token");
    const tt=this.parseJwt(token)

    this.onChangeRestaurantName=this.onChangeRestaurantName.bind(this);
    this.onChangeAddress=this.onChangeAddress.bind(this);
    this.onChangeArea=this.onChangeArea.bind(this);
    this.onChangeLongitude=this.onChangeLongitude.bind(this);
    this.onChangeLatitude=this.onChangeLatitude.bind(this);
    this.onChangeOpeningTime=this.onChangeOpeningTime.bind(this);
    this.onChangeClosingTime=this.onChangeClosingTime.bind(this);
    this.onChangePhoneNumber=this.onChangePhoneNumber.bind(this);
    this.onChangePincode=this.onChangePincode.bind(this);
    this.onChangeRestaurantType=this.onChangeRestaurantType.bind(this);
    this.onChangeRestaurantImages=this.onChangeRestaurantImages.bind(this);
    this.onChangeMenuImages=this.onChangeMenuImages.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

    this.state={
      restaurantname:'',
      address:'',
      area:'',
      longitude:0,
      latitude:0,
      openingtime:'',
      closingtime:'',
      phonenumber:null,
      pincode:null,
      restauranttype:'Please Select',
      restaurantimages:'',
      menuimages:'',
      error:'',
      user:tt
    

      

    }
  }
 

  setError(e)
  {
    this.setState({
      error:e
    })
  }
  onChangeRestaurantName(e){
    this.setState({
      restaurantname:e.target.value
    })
  }

  onChangeAddress(e){
    this.setState({
      address:e.target.value
    })
  }

  onChangeArea(e){
    this.setState({
      area:e.target.value
    })
  }

  onChangeLongitude(e){
    this.setState({
      longitude:e
    })
  }

  onChangeLatitude(e){
    this.setState({
      latitude:e
    })
  }

  onChangeOpeningTime(e){
    this.setState({
      openingtime:e.target.value
    })
  }

  onChangeClosingTime(e){
    this.setState({
      closingtime:e.target.value
    })
  }

  onChangePhoneNumber(e){
    this.setState({
      phonenumber:e.target.value
    })
  }

  onChangePincode(e){
    this.setState({
      pincode:e.target.value
    })
  }

  onChangeRestaurantType(e){
    this.setState({
      restauranttype:e.target.value
    })
  }

  componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
        });
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: true, timeout: 20000},
);
 
  }

  onChangeRestaurantImages(e){
    this.setState({
      restaurantimages:[...this.state.restaurantimages,...e.target.files]

    })
  }
 
  onChangeMenuImages(e){
    this.setState({
      menuimages:[...this.state.menuimages,...e.target.files]

    })
  }

  async handleSubmit(e){
    e.preventDefault();   
     try{
      let formData = new FormData();
     
      for (const key of Object.keys(this.state.menuimages)) {
        formData.append('menuimages', this.state.menuimages[key])
      }
 
        formData.append('restaurantname',this.state.restaurantname);
        formData.append('address',this.state.address);
        formData.append('area',this.state.area);
        formData.append('longitude',this.state.longitude);
        formData.append('latitude',this.state.latitude);
        formData.append('openingtime',this.state.openingtime);
        formData.append('closingtime',this.state.closingtime);
        formData.append('phonenumber',this.state.phonenumber);
        formData.append('pincode',this.state.pincode);
        formData.append('restauranttype',this.state.restauranttype);
        formData.append('restaurantid',this.state.user.id);      
      for (const key of Object.keys(this.state.restaurantimages)) {
        formData.append('restaurantimages', this.state.restaurantimages[key])
      }

     
  
      await axios.post("http://localhost:8000/restaurantrequest/add", formData)
  

      window.location='/restaurantrequest'
     }catch(err){
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
        <CRow>
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Restaurant Request Form
              </CCardHeader>
              <CCardBody>
              {this.state.error && (
                <CAlert color="primary" >{this.state.error} </CAlert>
      )}
                <form  method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Restaurant Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Restauarant Name" placeholder="Restaurant Name"
                      value={this.state.restaurantname} 
                      onChange={this.onChangeRestaurantName}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea 
                        name="Address" 
                        id="textarea-input" 
                        rows="9"
                        placeholder="Address" 
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Area</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Area" placeholder="Area" 
                      value={this.state.area}
                      onChange={this.onChangeArea}
                      />
                    </CCol>
                  </CFormGroup>
          
                  <CFormGroup row>

                    <CCol md="3">
         
                      <CLabel htmlFor="text-input">Longitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Longitude"
                       placeholder="Longitude of the restaurant"
                       value={this.state.longitude}
                       onChange={this.onChangeLongitude}
                       />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Latitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Latitude" 
                      placeholder="Latitude of the Restaurant" 
                      value={this.state.latitude}
                      onChange={this.onChangeLatitude}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Opening Time</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
           
                      <CInput id="text-input" name="Opening Time" type="time"
                       placeholder="Opening Time" 
                       min="01:00" max="20:00"
                       
                       value={this.state.openingtime}
                      onChange={this.onChangeOpeningTime}
                       />
                     
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Closing Time</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Closing Time"
                       placeholder="Closing Time "
                       type="time"
                       value={this.state.closingtime}
                      onChange={this.onChangeClosingTime} />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Phone Numer</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Phone Number" 
                      placeholder="Phone Number"
                      value={this.state.phonenumber}
                      onChange={this.onChangePhoneNumber}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Pincode</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Pincode" 
                      placeholder="Pincode"
                      value={this.state.pincode}
                      onChange={this.onChangePincode}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Restaurant Images</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInputFile 
                        id="file-multiple-input" 
                        name="restaurantimages" 
                        multiple
                        custom
                        onChange={this.onChangeRestaurantImages}

                      />

                      <CLabel htmlFor="file-multiple-input" variant="custom-file">
                        Choose Files
                      </CLabel>
                    </CCol>
                    
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Menu Images</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInputFile 
                        id="file-multiple-input" 
                        name="menuimages" 
                        multiple
                        custom
                        onChange={this.onChangeMenuImages}

                      />

                      <CLabel htmlFor="file-multiple-input" variant="custom-file">
                        Choose Files
                      </CLabel>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Restaurant Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom name="select" id="select" 
                        value={this.state.restauranttype}
                        onChange={this.onChangeRestaurantType}
                      >
                        <option value="Please select">Please select</option>
                        <option value="online">Online</option>
                        <option value="dining">Dining</option>
                        <option value="both">Both</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
            

                       <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>


                </form>
              </CCardBody>
          
            </CCard>
          
          </CCol>
          </CRow>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'API_KEY'
})(RestaurantRequest);

