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
  // CCardFooter,
  // CAlert,
  // CCollapse,
  // CDropdownItem,
  // CDropdownMenu,
  // CDropdownToggle,
  // CFade,
  // CForm,
  // CFormText,
  // CValidFeedback,
  // CInvalidFeedback,
  // CInputCheckbox,
  // CInputRadio,
  // CInputGroup,
  // CInputGroupAppend,
  // CInputGroupPrepend,
  // CDropdown,
  // CInputGroupText,
  CFormGroup,
  CTextarea,
  CInput,
  CInputFile,
  CLabel,
  CSelect,
  CRow,
  // CSwitch
} from '@coreui/react'
// import TimePicker from './TimePicker'
import CIcon from '@coreui/icons-react'
// import { DocsLink } from 'src/reusable'
// import { react } from '@babel/types'



export default class RestaurantRequest extends Component {
  constructor(props){
    super(props);
    // collapsed:true;
    // showElements:true;
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    console.log("Whay"+tt.id)

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
      phonenumber:0,
      pincode:0,
      restauranttype:'Please Select',
      restaurantimages:[],
      menuimages:[],
      error:'',
      user:tt
    

      

    }
    console.log("Hellokk")
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
      longitude:e.target.value
    })
  }

  onChangeLatitude(e){
    this.setState({
      latitude:e.target.value
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

  componentDidMount() {
    console.log("ResId "+this.props.match.params.id)
    axios.get('http://localhost:8000/restaurantrequest/edit/'+this.props.match.params.id)
      .then(response => {
        console.log("Jnjzn"+response.data.restaurantname)

        this.setState({
          restaurantname:response.data.restaurantname,
      address:response.data.address,
      area:response.data.area,
      longitude:response.data.longitude,
      latitude:response.data.latitude,
      openingtime:response.data.openingtime,
      closingtime:response.data.closingtime,
      phonenumber:response.data.phonenumber,
      pincode:response.data.pincode,
      restauranttype:response.data.restauranttype,
      restaurantimages:response.data.restaurantimages,
      menuimages:response.data.menuimages

        })   
      })
      .catch(function (error) {
        console.log(error);
      })
 
  }


  tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    console.log("hello"+time.join (''))
    return time.join (''); // return adjusted time or original string
  }

  async handleSubmit(e){
    e.preventDefault();
    //console.log("hi onsubmit"+this.state.menuimages)
   
     try{
    //   let formData = new FormData();
    //   console.log("This "+this.state.restaurantimages)
     
    //   for (const key of Object.keys(this.state.menuimages)) {
    //     formData.append('menuimages', this.state.menuimages[key])
    //   }
    //  const otime =this.tConvert(this.state.openingtime)
    //  const ctime =this.tConvert(this.state.closingtime)

    //  alert("Time"+otime+" Close"+ctime)
    //     formData.append('restaurantname',this.state.restaurantname);
    //     formData.append('address',this.state.address);
    //     formData.append('area',this.state.area);
    //     formData.append('longitude',this.state.longitude);
    //     formData.append('latitude',this.state.latitude);
    //     formData.append('openingtime',this.state.openingtime);
    //     formData.append('closingtime',this.state.closingtime);
    //     formData.append('phonenumber',this.state.phonenumber);
    //     formData.append('pincode',this.state.pincode);
    //     formData.append('restauranttype',this.state.restauranttype);

    //     formData.append('restaurantid',this.state.user.id);
        
      
    //   for (const key of Object.keys(this.state.restaurantimages)) {
    //     formData.append('restaurantimages', this.state.restaurantimages[key])
    //   }

     
    //   for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    const restaurant={
      restaurantname:this.state.restaurantname,
      address:this.state.address,
      area:this.state.area,
        longitude:this.state.longitude,
         latitude:this.state.latitude,
         openingtime:this.state.openingtime,
         closingtime:this.state.closingtime,
         phonenumber:this.state.phonenumber,
         pincode:this.state.pincode,
         restauranttype:this.state.restauranttype


    }
      await axios.post("http://localhost:8000/restaurantrequest/update/"+this.props.match.params.id, restaurant)
  
      // console.log(formData);
      
      alert('Details submitted');
      window.location='/restaurantrequest';
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
  // const [collapsed, setCollapsed] = React.useState(true)
  // const [showElements, setShowElements] = React.useState(true)
  render(){

  
    return (
      // <>
        <CRow>
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Restaurant Request Form
                {/* <small> Elements</small> */}
              </CCardHeader>
              <CCardBody>
              {this.state.error && (
                // <CAlert color="primary" closeButton={() => this.setError(undefined )}>{this.state.error} </CAlert>
        <ErrorNotice message={this.state.error} clearError={() => this.setError(undefined)} />
      )}
                <form  method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Static</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <p className="form-control-static">Username</p>
                    </CCol>
                  </CFormGroup> */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Restaurant Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="Restauarant Name" placeholder="Restaurant Name"
                      value={this.state.restaurantname} 
                      onChange={this.onChangeRestaurantName}
                      />
                      {/* <CFormText>This is a help text</CFormText> */}
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
                      {/* <CFormText>This is a help text</CFormText> */}
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
                      {/* <CFormText>This is a help text</CFormText> */}
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
                      {/* <CFormText>This is a help text</CFormText> */}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Opening Time</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    {/* <DateTimePickerInput defaultValue={new Date()} /> */}
                    {/* <Timekeeper
		time={this.state.openingtime}
		// ...
	/> */}
                      <CInput id="text-input" name="Opening Time" type="time"
                       placeholder="Opening Time" 
                       min="01:00" max="20:00" showTimeSelect
                       timeFormat="HH:mm aa"
                       value={this.state.openingtime}
                      onChange={this.onChangeOpeningTime}
                       />
                         {/* <TimePicker
                         
                         value={this.state.openingtime}
                         /> */}
                      {/* <CFormText>This is a help text</CFormText> */}
                      {/* <TimePicker /> */}
                      {/* <CSelect custom name="select" id="select"
                        value={this.state.openingtime}
                        onChange={this.onChangeOpeningTime}
                      >
                        <option value="Please select">Please select</option>
                        <option value="online">Online</option>
                        <option value="dining">Dining</option>
                        <option value="both">Both</option>
                      </CSelect> */}

                      {/* <CSelect custom name="ccmonth" id="ccmonth">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </CSelect>
                    <CSelect custom name="ccmonth" id="ccmonth">
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                     
                    </CSelect> */}
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
                      {/* <CFormText>This is a help text</CFormText> */}
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
                      {/* <CFormText>This is a help text</CFormText> */}
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
                      {/* <CFormText>This is a help text</CFormText> */}
                    </CCol>
                  </CFormGroup>
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Email Input</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                      <CFormText className="help-block">Please enter your email</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="password-input">Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                      <CFormText className="help-block">Please enter a complex password</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Date Input</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="disabled-input">Disabled Input</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="disabled-input" name="disabled-input" placeholder="Disabled" disabled />
                    </CCol>
                  </CFormGroup> */}
                  
                    {/* <CFormGroup row>
                    <CLabel col md="3" htmlFor="file-input">
                      Restaurant Images
                      </CLabel>
                    <CCol xs="12" md="9">
                      <CInputFile id="file-input" name="restaurantimages"
                      value={this.state.RestaurantImage}
                      onChange={this.onChangeRestaurantImage}
                      />
                    </CCol>
                  </CFormGroup> */}

                 

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
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectLg">Select Large</CLabel>
                    </CCol>
                    <CCol xs="12" md="9" size="lg">
                      <CSelect custom size="lg" name="selectLg" id="selectLg">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="selectSm">Select Small</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom size="sm" name="selectSm" id="SelectLm">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                        <option value="4">Option #4</option>
                        <option value="5">Option #5</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="disabledSelect">Disabled Select</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect 
                        custom 
                        name="disabledSelect" 
                        id="disabledSelect" 
                        disabled 
                        autoComplete="name"
                      >
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol tag="label" sm="3" className="col-form-label">
                      Switch checkboxes
                    </CCol>
                    <CCol sm="9">
                      <CSwitch
                        className="mr-1"
                        color="primary"
                        defaultChecked
                      />
                      <CSwitch
                        className="mr-1"
                        color="success"
                        defaultChecked
                        variant="outline"
                      />
                      <CSwitch
                        className="mr-1"
                        color="warning"
                        defaultChecked
                        variant="opposite"
                      />
                      <CSwitch
                        className="mr-1"
                        color="danger"
                        defaultChecked
                        shape="pill"
                      />
                      <CSwitch
                        className="mr-1"
                        color="info"
                        defaultChecked
                        shape="pill"
                        variant="outline"
                      />
                      <CSwitch
                        className="mr-1"
                        color="dark"
                        defaultChecked
                        shape="pill"
                        variant="opposite"
                      />
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Radios</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="checkbox">
                        <CInputRadio className="form-check-input" id="radio1" name="radios" value="option1" />
                        <CLabel variant="checkbox" htmlFor="radio1">Option 1</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox">
                        <CInputRadio className="form-check-input" id="radio2" name="radios" value="option2" />
                        <CLabel variant="checkbox" htmlFor="radio2">Option 2</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox">
                        <CInputRadio className="form-check-input" id="radio3" name="radios" value="option3" />
                        <CLabel variant="checkbox" htmlFor="radio3">Option 3</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Inline Radios</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio1">One</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Two</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio3" name="inline-radios" value="option3" />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio3">Three</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="3"><CLabel>Checkboxes</CLabel></CCol>
                    <CCol md="9">
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox 
                          id="checkbox1" 
                          name="checkbox1" 
                          value="option1" 
                        />
                        <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Option 1</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                        <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">Option 2</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                        <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">Option 3</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Inline Checkboxes</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox 
                          custom 
                          id="inline-checkbox1" 
                          name="inline-checkbox1" 
                          value="option1" 
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">One</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Two</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Three</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CLabel col md="3" htmlFor="file-input">File input</CLabel>
                    <CCol xs="12" md="9">
                      <CInputFile id="file-input" name="file-input"/>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Multiple File input</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInputFile 
                        id="file-multiple-input" 
                        name="file-multiple-input" 
                        multiple
                        custom
                      />
                      <CLabel htmlFor="file-multiple-input" variant="custom-file">
                        Choose Files...
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col md={3}>Custom file input</CLabel>
                    <CCol xs="12" md="9">
                      <CInputFile custom id="custom-file-input"/>
                      <CLabel htmlFor="custom-file-input" variant="custom-file">
                        Choose file...
                      </CLabel>
                    </CCol>
                  </CFormGroup> */}
                     {/* <button type="submit" >Submit</button> */}

                       <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>


                </form>
              </CCardBody>
              {/* <CCardFooter> */}
                {/* <CButton type="submit" size="sm" color="success" > Submit</CButton> */}

                {/* <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton> */}
                {/* <CIcon name="cil-ban" /> */}
                {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <CButton type="reset" size="sm" color="danger"> Reset</CButton> */}
              {/* </CCardFooter> */}
            </CCard>
          
          </CCol>
          </CRow>
          // </>
    )
  }
}

// export default RequestForm


