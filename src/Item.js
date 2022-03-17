import { useState } from 'react'
import classNames from 'classnames'

import './App.css'

export const Item = ({obj, header, children}) => {
  const [isShow, setShow] = useState(false)

  const keysArr = obj && Object.keys(obj)

  const handlerClick = () => {
    setShow(!isShow)
  }
  
  return (
    <>
      {keysArr && <div className='item-root'>
        {header && 
          <div 
            className='item-accordeon'
            onClick={handlerClick}
          >
            {isShow ? '-' : '+'} {header}
          </div>}
        {keysArr?.map(value => {
          if(typeof obj[value] === 'object' && typeof obj[value] !== null) {
            console.log('obj[value] - ', obj[value])
            return <div className={classNames(
              {'item-accordeon-disable': !isShow}
            )}>
            <Item key={value} obj={obj[value]} header={value}/>
            </div>
          } else {
            return (
              <div className={classNames(
                {'item-accordeon-disable': !isShow}
              )}>
                <Item 
                  key={value}
                  children={`${value}: ${obj[value]}`}
                />
              </div>
            )
          }
        })}
      </div>
      }
      {children && 
        <div className='item'>
          {children}
        </div>}
    </>
  )
}