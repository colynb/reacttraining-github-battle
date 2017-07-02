import React from 'react'
import { render } from 'react-dom'
import '../css/app.css'

class App extends React.Component {
  render () {
    return (
      <div>
            Hello React!
        </div>
    )
  }
}

render(
  <App />,
    document.getElementById('app')
)
