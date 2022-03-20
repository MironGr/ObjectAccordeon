import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import './App.css'
import { Item } from './Item'

import { obj as origin } from './object'
import { getFormattedArr } from './helpers'


const App = () => {
  // глубокая копия исходного массива
  const obj = JSON.parse(JSON.stringify(origin))
  
  const [isActive, setActive] = useState(false)
  const [filtredArr, setFiltredArr] = useState()
  
  useEffect(() => {
    if (isActive) {
      setFiltredArr(obj.filter((item) => item.isActive))
    } else {
      setFiltredArr(obj)
    }
  }, [isActive])
  
  const formattedArr = []
  filtredArr && formattedArr.push(...getFormattedArr(filtredArr))

  const keysArr = formattedArr && Object.keys(formattedArr)

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
      <h2>total: {formattedArr?.length}</h2>
      {keysArr?.map(value => {
        if(typeof formattedArr[value] === 'object' && typeof formattedArr[value] !== null) {
          return <Item key={value} obj={formattedArr[value]} header={`${formattedArr[value]['id']} - ${formattedArr[value]['name']}`}/>
        } else {
          return (
            <Item 
              key={value}
              children={`${value}: ${formattedArr[value]}`}
            />
          )
        }
      })}
    </div>
  )
}

export default App;
