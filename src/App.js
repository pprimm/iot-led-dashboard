import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Line} from 'rc-progress'
import {connect} from 'cerebral/react'
import {state, props, signal} from 'cerebral/tags'

const ProgressBar = connect({
  value: state`devices.${props`topic`}.${props`vName`}`
},
  ({title, value, barColor}) => (
    <div className='Item-container'>
      <div className='Item-title'>{title}</div>
      <div className='Item-line'>
        <Line percent={value} strokeWidth={2} strokeColor={barColor} />
      </div>
      <div className='Item-value'>{value}%</div>
    </div>
  )
)

/** If we were going to grab the LED value here and create the observable
    that would update this component when either the value or topic changed
    we could do it like this:
      ledValue: state`devices.${state`display.${props`barIndex`}.topic`}`
    or use a computed value.
    */
const ledColors = ['#1abc9c', '#e67e22', '#2ecc71', '#3498db', '#9b59b6']
const potColors = ['#0f705d', '#a15412', '#1c7d44', '#1b6698', '#773e8e']

const BotItem = connect({
  label: state`display.items.${props`barIndex`}.label`,
  showPotValues: state`display.showPotValues`,
  topic: state`display.items.${props`barIndex`}.topic`
},
  ({barIndex, label, showPotValues, topic}) => (
    <div>
      <p>{label}</p>
      <ProgressBar
        title={'LED'}
        topic={topic}
        vName={'ledValue'}
        barColor={ledColors[barIndex % 5]}/>
      {
        showPotValues ? (
          <ProgressBar
            title={'POT'}
            topic={topic}
            vName={'potValue'}
            barColor={potColors[barIndex % 5]}/>
        ) : null
      }
      <hr />
    </div>
  )
)

const PotCheckBox = connect({
  showPotValues: state`display.showPotValues`,
  showPotSelected: signal`display.showPotSelected`
},
  ({label,showPotValues, showPotSelected}) => (
    <label>
      <input
        type="checkbox"
        value={label}
        checked={showPotValues}
        onChange={() => showPotSelected({})}
      />
    {label}
    </label>
  )
)

const App = connect({
  display: state`display.items.*`
},
  ({display}) => {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Realtime LED Dashboard</h2>
          <PotCheckBox label="Show Potentiometer Values" />
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
