import React from 'react'
import './cssAlert.css'

const Alert = (props) => {
return (
        <>
          <div className="alert-container"><strong>{props.alert.type} : </strong>{props.alert.message}</div>
        </>
  )
}

export default Alert