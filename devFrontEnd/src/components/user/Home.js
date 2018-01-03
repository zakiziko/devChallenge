import React,{Component} from 'react';

class Home extends Component{
    constructor(){
        super();
        this.state={
            FacebookAuthUrl:'http://localhost:3000/users'
        }
    }
    render(){
        return(
            
            <div className="jumbotron">
                <h1 className="display-3">Hello, world!</h1>
                <p className="lead">This is a simple MERN Stack test application With Facebook Authontification</p>
                <hr className="my-4"/>
                <p className="lead">
                <a href={this.state.FacebookAuthUrl}  className="btn btn-primary">login with facebook</a>
                </p>
            </div>
        )
    }
}
export default Home;