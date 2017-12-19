import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from '../user/Home'; 
import Profile from '../user/Profile'; 

const Main = ()=>(
  <main>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/profile" component={Profile}/>
    </Switch>
  </main>
)

export default Main;