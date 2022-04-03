import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './Toast.css'
import { toastInRight } from '../../styles/keyframes'

const Container = styled.div`
  box-sizing: border-box;
  // cursor: pointer;
  font-size: 14px;
  position: fixed;
  z-index: 99999;
  // top: 12px; needed
	// right: 12px; needed
  // not needed
  // transition: transform .6s ease-in-out;
  // animation: ${toastInRight} .7s ;
  // animation: ${toastInRight} 1.5s ease-in-out;
`;

const CloseBtn = styled.button`
  text-shadow: 0 1px 0 #fff;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  float: right;
  font-size: 16px;
  font-weight: 700;
  opacity: 0.8;
  position: relative;
  right: -0.7em;
  top: -0.4em;
`;

const ToastBody = styled.div`

  // animation: ${toastInRight} .7s ; needed

	color: #fff;
	padding: 20px 15px 10px 10px;
  border-radius: 12px 3px 12px 3px;
  margin: 0 0 15px;
  max-height: 100px;
  opacity: 0.9;
  overflow: hidden;
  padding: 10px 15px;
  pointer-events: auto;
  position: relative;
  transition: 0.3s ease;
  width: 280px;
  &:hover {
    box-shadow: 0 0 5px #fff;
    opacity: 1;
  }
`;

const ToastImg = styled.img`
  float: left;
  height: 30px;
  margin-right: 15px;
  width: 30px;
`;

const Title =styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  // width: 300px;
  // height: 18px;
`;

const Message =styled.p`
  margin: 0;
  text-align: left;
  height: 18px;
  margin-left: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

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
      <Container className={`${position}`}>
        {list.map((toast, i) => 
          <ToastBody key={i}
            className={`${position}`}
            style={{ backgroundColor: toast.backgroundColor }}>
               
            <CloseBtn onClick={() => deleteToast(toast.id)}> X </CloseBtn>          
            <ToastImg src={toast.icon} alt="" />
            <Title>{toast.title}</Title>
            <Message>{toast.description}</Message>
           </ToastBody>
        )}
      </Container>
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
