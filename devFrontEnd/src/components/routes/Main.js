import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from '../user/Home'; 
import Profile from '../user/Profile';
import Topics from '../topics/Topics'; 

const Main = ()=>(
  <main>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/topic" component={Topics}/>
    </Switch>
  </main>
)

export default Main;