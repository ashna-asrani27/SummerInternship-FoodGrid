import React from 'react'
import { CFooter, CLabel } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
       <CLabel>FoodGrid</CLabel>
        <span className="ml-1">&copy; 2021.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
       <CLabel> Food Grid</CLabel>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
