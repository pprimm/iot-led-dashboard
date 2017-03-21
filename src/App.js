import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Line} from 'rc-progress'
import {connect} from 'cerebral/react'
import {compute} from 'cerebral'
import {state, props} from 'cerebral/tags'

const computedDeviceID = compute((get) => get(state`display.${props`barIndex`}.topic`))

const colors = ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e67e22']
const getColor = (index) => colors[index % 5]

const BotItem = connect({
  label: state`display.${props`barIndex`}.label`,
  value: state`devices.${computedDeviceID}`
},
  ({barIndex, label, key, value}) => {
    return (
      <div>
        <p>{label} - {value}%</p>
        <div className='Led-container'>
          <div className='Led-title'>LED</div>
          <div className='Led-line'>
            <Line percent={value} strokeWidth={2} strokeColor={getColor(barIndex)}/>
          </div>
        </div>
        <hr />
      </div>
    )
  }
)

const App = connect({
  display: state`display.*`
},
  ({display, mounted}) => {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Realtime LED Dashboard</h2>
        </div>
        <div className='App-content'>
          {
            display.map((i) => <BotItem barIndex={i} key={`bar${i}`} />)
          }
        </div>
      </div>
    )
  }
)

export default App
