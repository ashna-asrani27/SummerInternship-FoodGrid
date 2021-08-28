import {React, Component} from 'react'


import axios from 'axios'
import {
CImg,
CInputFile,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CFormGroup,
  CLabel,
} from '@coreui/react'




const fieldss = ['menuimages','delete']
export default class OfferList extends Component {
  constructor(props) {
  
    super(props);
    const token=localStorage.getItem("auth-token");
      
    const tt=this.parseJwt(token)
    this.deleteOffer = this.deleteOffer.bind(this)
    this.onChangeMenuImages=this.onChangeMenuImages.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);


    this.state = {
      restaurantname:'',
      menuimages:[],
      menuimagess:'',
      user:tt.id,
      res:0
    };
  }
  parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

onChangeMenuImages(e){
  this.setState({
    menuimagess:[...this.state.menuimagess,...e.target.files]

  })
  console.log("This "+this.state.menuimagess)
}

  async componentDidMount()
  {
    const responses = await axios.get('http://localhost:8000/restaurantrequest/edit/'+this.props.match.params.id)
    const datas = await responses.data
    console.log("id"+datas._id)
    this.setState({
      restaurantname: datas.restaurantname,
      menuimages:datas.menuimages,
        
    })
  }



 handleSubmit(e){
    e.preventDefault();

try{
    console.log("Hello"+this.state.menuimagess)
    let formData = new FormData();
   
    for (const key of Object.keys(this.state.menuimagess)) {
      formData.append('menuimages', this.state.menuimagess[key])
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
     axios.post("http://localhost:8000/restaurantrequest/updatemenuimage/"+this.props.match.params.id, formData)

    console.log(formData);
    //window.location='/';
    alert('Details submitted');
    window.location = '/restaurant/viewmenuimage/'+this.props.match.params.id;
   
    
}catch(err){
  console.log("View Error"+err.response.data.msg)
}
 
  }

  deleteOffer(id,name) {
    try{ 
    const image={
      imagename:name
   }
  
    axios.post('http://localhost:8000/restaurantrequest/deleteimage/'+id,image)
      .then(response => { console.log(response.data)});
      window.location = '/restaurant/viewmenuimage/'+this.props.match.params.id;

    }
  catch(err){
    console.log(err)
  }
  
  }
  
  editOffer(id) {
   window.location = '/items/edititems/'+id;
  }
  render() {
  return (
    <>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
                View Menu Image
            </CCardHeader>
            <CCardBody>
            <form  method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={this.handleSubmit}>

                       <CFormGroup>
                      <CLabel htmlFor="prependedInput"><b>{this.state.restaurantname}</b></CLabel>
                      
                    </CFormGroup>
                    <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Menu Images</CLabel>
                    </CCol>
                    <CCol xs="6" md="4">
                      <CInputFile 
                        id="file-multiple-input" 
                        name="menuimagess" 
                        multiple
                        custom
                        // value={this.state.restaurantimages}
                        onChange={this.onChangeMenuImages}

                      />
                      {/* <input className="form-control form-control-lg mb-3" type="file" multiple name="restauranti" onChange={this.onImgChange} /> */}

                      <CLabel htmlFor="file-multiple-input" variant="custom-file">
                        Choose Files
                      </CLabel>
                     
                       
                    </CCol>
                    <CCol  xs="6" md="4">
                      <CButton type="submit" size="sm" color="success"> Submit</CButton>
                    </CCol>
                  </CFormGroup>
                  </form>
           <CDataTable
            items={this.state.menuimages}
            fields={fieldss}
            dark
            hover
            striped
            bordered
            size="sm"
            itemsPerPage={10}
            pagination
            scopedSlots = {{
                'menuimages':
                (key) =>(
                  <td>
                  
                    <CImg style={{height:'100px',width:'100px'}}
                    src={key}
                
                    alt={key}
                      /> 
          
                      
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
                          onClick={()=>this.deleteOffer(this.props.match.params.id,key) }
                        
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
