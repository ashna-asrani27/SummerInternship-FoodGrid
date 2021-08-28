import React from 'react' 
import TheContent from './TheContent'
import TheFooter from './TheFooter'
import TheHeader from './TheHeader'

const TheLayout = (props) => {
  return (
        <div>       
          <TheHeader/>
          {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
         
          
          <TheContent/> 
          <TheFooter/>
        </div>
 
    
  )
}

export default TheLayout
