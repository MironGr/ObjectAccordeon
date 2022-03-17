import React from 'react'

import './App.css'
import { Item } from './Item'

import { obj } from './object'

const App = () => {

  const keysArr = Object.keys(obj)

  return (
    <div className='app'>
      <h1>Раскрывающиеся объекты</h1>
      {keysArr.map(value => {
        if(typeof obj[value] === 'object' && typeof obj[value] !== null) {
          console.log('obj[value] - ', obj[value])
          return <Item key={value} obj={obj[value]} header={value}/>
        } else {
          return (
            <Item 
              key={value}
              children={`${value}: ${obj[value]}`}
            />
          )
        }
      })}
    </div>
  )
}

export default App;
