import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import FormComponent from '../scripts/FormComponent'

class App extends Component {
  render() {
    return (
      <div className="app">
        <FormComponent />
      </div>
    )
  }
}

export default hot(module)(App)