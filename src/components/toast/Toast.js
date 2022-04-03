import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Toast.css'

/**
 * @function Toast
 * @param {object} props 
 * @returns {jsx}
 */
const Toast = ( props ) => {

  const { toastList, position, autoDelete, autoDeleteTime } = props

  const [list, setList] = useState(toastList)

  useEffect(() => {       // load toastlist into 'list' state
    setList(toastList)    // id,title,description,backgroundColor,icon (for each clicked)
  }, [toastList, list])

  console.log(toastList, list)
  
  useEffect(() => {                         // if autoDelete true & there's a notifcation, then we'll delete
    const interval = setInterval(() => {   // the first one in the list (until all have been removed)
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id)
      }
    }, autoDeleteTime)
    return () => {
      clearInterval(interval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastList, autoDelete, list, autoDeleteTime])

  /**
   * Remove chosen toast from list & toastlList thus from the screen
   * @function deleteToast
   * @param {number} id of toast selected by user
   */
  const deleteToast = (id) => {
    const listItemIndex = list.findIndex(e => e.id === id)
    // const toastListItem = toastList.findIndex(e => e.id === id)
    list.splice(listItemIndex, 1)
    // toastList.splice(toastListItem, 1)
    console.log(toastList, list)
    setList([...list])
  }

  return (
    <>
      <div className={`notification-container ${position}`}>

        {list.map((toast, i) => 

          <div key={i}
            className={`notification toast ${position}`}
            style={{ backgroundColor: toast.backgroundColor }}>
               
            <button onClick={() => deleteToast(toast.id)}>X</button>

            <div className="notification-image">
              <img src={toast.icon} alt="" />
            </div>

            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>

          </div>
        )}
      </div>
    </>
  )
}

export default Toast

// proptypes

Toast.defaultProps = {
  position: 'top-right'
}

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number
}
