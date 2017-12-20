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
    addTopic(e){
        e.preventDefault();
        var user =JSON.parse(sessionStorage.getItem('user'));
        var topic = {
            name : this.refs.Name.value,
            description : this.refs.description.value,
            creator : user._id
        }
        UserService.addTopic(topic).then(res=>{
            window.location.reload()
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
                    <h4>Create Topic</h4>
                    <form onSubmit={(e)=>this.addTopic(e)}>
                        <div className="form-group col-md-4">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" aria-describedby="emailHelp" ref="Name"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label>description</label>
                            <input type="text" className="form-control" name="description" ref="description"/>
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={(e)=>this.addTopic(e)}>Save</button>
                    </form>
                </div>

            )
        }

    }
}
export default Profile;