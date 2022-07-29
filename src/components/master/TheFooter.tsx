import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">Copyright</a>
        <span className="ml-1">&copy; 2020 Acqueon.</span>        
      </div>
      <div className="mfs-auto">
        <span className="mr-1">All rights reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
