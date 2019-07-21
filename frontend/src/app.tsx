import * as React from 'react'
import * as ReactDOM from 'react-dom'

type PropsType = {
  name: string,
}

function Hello(props: PropsType) {
  return (
    <div>Hello World {props.name}</div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const appNode = document.getElementById('app')
  ReactDOM.render(<Hello name="example" />, appNode)
})