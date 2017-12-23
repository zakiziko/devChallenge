import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import UserService from '../../services/UseService';

class Navbar extends Component{
    logOut(){
        sessionStorage.clear();
        window.location.href="/";
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/" className="navbar-brand">Topics</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        {!UserService.isActive() ?  <NavLink to="/" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>
                         : null}
                        </li> 
                        <li className="nav-item">
                            <NavLink to ="/profile" className="nav-link">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to ="/topic" className="nav-link">Topics</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                    {UserService.isActive() ? <a onClick={this.logOut} className="btn btn-secondary">
                       <i className="fa fa-sign-out">logout</i>
                    </a>
                         : null}
                     </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar;