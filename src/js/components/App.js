import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Popular from './Popular'
import Battle from './Battle'
import Results from './Results'
import Home from './Home'
import Nav from './Nav'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={function () {
              return <p>Not found</p>
            }} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
