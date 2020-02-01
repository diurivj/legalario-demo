import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import SelectFiles from './components/SelectFiles'
import ReadFiles from './components/ReadFiles'
import VerifyId from './components/VerifyId'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/verify-id" component={VerifyId} />
        <Route exact path="/read-files" component={ReadFiles} />
        <Route exact path="/select-files" component={SelectFiles} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
