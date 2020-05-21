import React from 'react'
import ReactDOM from 'react-dom'

function Name(props) {
  return <h1>name:{props.name}</h1>
}

function Age(props) {
  return <h1>Age:{props.age}</h1>
}

function App() {
  return (
    <div>
      <Name name="米老鼠" />
      <Age age="10岁" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
