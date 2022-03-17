import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import './App.css'
import { Item } from './Item'

import { obj } from './object'

const App = () => {

  const [isActive, setActive] = useState(false)

  const filtredArr = []
  if (isActive) {
    filtredArr.push(...obj.filter((item) => item.isActive))
  } else {
    filtredArr.push(...obj)
  }

  const keysArr = Object.keys(filtredArr)

  const handleFilter = () => {
    setActive(!isActive)
  }

  return (
    <div className='app'>
      <h1>Раскрывающиеся объекты с фильтром</h1>
      <button 
        className={classNames({
          'filter-disable': !isActive,
          'filter-active': isActive,
          })}
        onClick={handleFilter}
      >
        Фильтр isActive - {isActive ? 'active' : 'disable' }
      </button>
      <h2>total: {filtredArr.length}</h2>
      {keysArr.map(value => {
        if(typeof filtredArr[value] === 'object' && typeof filtredArr[value] !== null) {
          return <Item key={value} obj={filtredArr[value]} header={`${filtredArr[value]['id']} - ${filtredArr[value]['name']}`}/>
        } else {
          return (
            <Item 
              key={value}
              children={`${value}: ${filtredArr[value]}`}
            />
          )
        }
      })}
    </div>
  )
}

export default App;
