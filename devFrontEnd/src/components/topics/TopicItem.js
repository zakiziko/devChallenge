import React,{Component} from 'react';
import UserService from '../../services/UseService';


class TopicItem extends Component{
    constructor(props){
        super(props);
    }
    addComment(e,topicId){
        e.preventDefault();
        var user = JSON.parse(sessionStorage.getItem('user'));
        if(this.refs[topicId].value===''){
            alert('You can not post an empty comment!!');
        }else{
            var comment = {
                onTopic : topicId,
                content : this.refs[topicId].value,
                creator : user._id
            }
            this.refs[topicId].value = '';
            this.props.AddComment(comment);
        }
    }
    render(){
        const dateTime = this.props.topic.creationDate.slice(0,10);
        return(
            <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{this.props.topic.name}</h4>
                    <p className="card-text">
                    {this.props.topic.description}
                    <small className="form-text text-muted">writer: {this.props.topic.creator.name} </small>
                    <small className="form-text text-muted">{dateTime}</small>
                    <i className="fa fa-comments-o">{this.props.topic.comments.length}</i> comments
                    </p>                
                    <hr className="my-4"/>
                    <div className="input-group">
                        <input type="text" className="form-control" id ="Comment" ref = {this.props.topic._id} placeholder="write a comment ..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit" onClick={(e)=>this.addComment(e,this.props.topic._id)} >
                            <i className="fa fa-comment-o"></i></button>
                        </span>
                    </div>
                    <hr className="my-4"/>
                    <button type="submit" onClick={(e)=>this.props.upVote(this.props.topic._id)} className="btn btn-info btn-sm">
                    {this.props.topic.upVote.length}<i className="fa fa-thumbs-o-up"></i>
                    </button>upvotes
                </div>
            </div>
            <br/>
        </div>
        )
    }
}
export default TopicItem;