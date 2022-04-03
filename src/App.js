import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'
// import components
import Toast from './components/toast/Toast'
import Button from './components/button/Button'
// import icons
import checkIcon from './assets/check.svg'
import errorIcon from './assets/error.svg'
import infoIcon from './assets/info.svg'
import warningIcon from './assets/warning.svg'

// style list for buttons
const BUTTON_PROPS = [
    {
      id: 1,
      type: 'success',
      className: 'success',
      label: 'Success'
    },
    {
      id: 2,
      type: 'danger',
      className: 'danger',
      label: 'Danger'
    },
    {
      id: 3,
      type: 'info',
      className: 'info',
      label: 'Info'
    },
    {
      id: 4,
      type: 'warning',
      className: 'warning',
      label: 'Warning'
    },
  ]


const App = () => {

  const [list, setList] = useState([])
  const [position, setPosition] = useState()

  /**
   * update the toast position based on the option selected by the user
   * @function selectPosition
   * @param {string} the position className to be passed to toast component
   */
  const selectPosition = ( event ) => {
    setPosition(event.target.value)
    setList([])
  }

  /**
   * set the toast type  to show based on the button clicked
   * @function showToast
   * @param {string} type (warning, info etc..)
   */
  const showToast = ( type ) => {

    let toastProperties = null
    // randomly generates IDs for each toast notification used for delete functionality
    const id = Math.floor((Math.random() * 100) + 1)
    
    switch(type) {
      case 'success':
          toastProperties = {
              id,
              title: 'Success',
              description: 'This is a success toast component',
              backgroundColor: '#5cb85c',
              icon: checkIcon
          }
          break;
      case 'danger':
          toastProperties = {
              id,
              title: 'Danger',
              description: 'This is an error toast component',
              backgroundColor: '#d9534f',
              icon: errorIcon
          }
          break;
      case 'info':
          toastProperties = {
              id,
              title: 'Info',
              description: 'This is an info toast component',
              backgroundColor: '#5bc0de',
              icon: infoIcon
          }
          break;
      case 'warning':
          toastProperties = {
              id,
              title: 'Warning',
              description: 'This is a warning toast component',
              backgroundColor: '#f0ad4e',
              icon: warningIcon
          }
          break;
      default:
          setList([])
    }
    setList([...list, toastProperties])
  }

  return (
    <div className="app">
      <div className="app-header">

        <p>React Toast Component</p>

        <div className="toast-buttons">

          {BUTTON_PROPS.map(e => 
              <Button 
                key={e.id}
                className={e.className}
                label={e.label}
                handleClick={() => showToast(e.type)}
              />
          )}
        </div>

        <div className="select">
          <select
            defaultValue="default"
            name="position"
            value={position}
            onChange={selectPosition}
            className="position-select"
            >
            <option value="default" disabled >Select Position</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>

        <Toast 
          toastList={list}
          position={position}
          // autoDelete={true}
          autoDeleteTime={3000}
        />

      </div>
    </div>
  )
}

export default App

// proptypes

Toast.propTypes = {
  showToast: PropTypes.string,
}

