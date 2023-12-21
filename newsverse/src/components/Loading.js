import React from 'react'
import loadingIcon from './loadingIcon.svg'

function Loading()
{
      return (
        <div className="loading-container">
          <img className="loading-icon" src={loadingIcon} alt='Loading...'/>
        </div>
      );
}

export default Loading