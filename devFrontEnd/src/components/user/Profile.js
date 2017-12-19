import React,{Component} from 'react';
import UserService from '../../services/UseService';

class Profile extends Component{
    constructor(){
        super();
        this.state={
            user : {},
            isActive:true
        } 
    }
    componentWillMount(){
        var user =JSON.parse(sessionStorage.getItem('user'));
        if(user!=null){
            this.setState({user : user});
            this.getactive();   
        }else{
            this.getUserData();        
        }
    }
    getactive(){
        var active = UserService.isActive();
        this.setState({isActive:active});
    }
    getUserData(){
        var token = this.props.location.search;
        UserService.getUserDetails(token).then(res=>{
            if(res==="err"){
                this.getactive();
            }else{
                this.setState({user:res});
            }
        });
    }
    render(){
        const isActive = this.state.isActive;
        if(!isActive){
            return(
                <h1>You Have To Sign In First</h1>
            )
        }else{
            return(
                <div>
                    <h1>Hello : {this.state.user.name}</h1>
                </div>
            )
        }

    }
}
export default Profile;