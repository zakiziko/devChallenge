import React,{Component} from 'react';
import UserService from '../../services/UseService';

class Topics extends Component{
    constructor(){
        super();
        this.state={
            topics:[]
        }
    }
    componentWillMount(){
        if(UserService.isActive()){
            UserService.getAllTopicss().then(res=>{
                this.setState({topics:res});
            })
        }else{
            this.props.history.push('/')
        }
    }


    upVote(topicId){
        var user = JSON.parse(sessionStorage.getItem('user'));
        UserService.upVoteTopic(topicId,user).then(res=>{
            alert(res.message);
        })
        window.location.reload();

    }

    addComment(e,topicId){
        e.preventDefault();
        var user = JSON.parse(sessionStorage.getItem('user'));
        var comment = {
            onTopic : topicId,
            content : this.refs[topicId].value,
            creator : user._id
        }
        UserService.addComment(comment).then(res=>{
            alert(res);
        })
        window.location.reload();
    }
    change(event){
        if(event.target.value==="2"){
            var ordrTopics = [];
            UserService.getAllTopicss().then(res=>{
                ordrTopics= UserService.sortTopic(res);
                this.setState({topics:ordrTopics});
            });
        }else{
            window.location.reload();
        }
    }
    render(){
        const topicItems = this.state.topics.map((topic, i)=>{
            var dateTime = topic.creationDate.slice(0,10);
            return(
                <div className="col-md-4" key={i}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{topic.name}</h4>
                            <p className="card-text">
                            {topic.description}
                            <small className="form-text text-muted">writer: {topic.creator.name} </small>
                            <small className="form-text text-muted">{dateTime}</small>
                            <i className="fa fa-comments-o">{topic.comments.length}</i> comments
                            </p>                
                            <hr className="my-4"/>
                            <div className="input-group">
                                <input type="text" className="form-control" id ="Comment" ref = {topic._id} placeholder="write a comment ..."/>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary" type="submit" onClick={(e)=>this.addComment(e,topic._id)} >
                                    <i className="fa fa-comment-o"></i></button>
                                </span>
                            </div>
                            <hr className="my-4"/>
                            <button type="submit" onClick={(e)=>this.upVote(topic._id)} className="btn btn-info btn-sm">
                            {topic.upVote.length}<i className="fa fa-thumbs-o-up"></i>
                            </button>upvotes
                        </div>
                    </div>
                    <br/>
                </div>
            )
        })
        return(
            <div>
                <div className="row">
                <div className="col-md-8"> <h1>Topics</h1></div>
                    <div className="col-md-3">
                    <label>Sorting</label>
                        <select className="custom-select" onChange={(e)=>this.change(e)}>
                            <option value="1">most recent</option>
                            <option value="2">most rated</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div className="row">
                    {topicItems}
                </div>
            </div>
        )
    }
}
export default Topics;