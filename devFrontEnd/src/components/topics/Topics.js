import React,{Component} from 'react';
import UserService from '../../services/UseService';
import TopicItem from './TopicItem';

class Topics extends Component{
    constructor(){
        super();
        this.state={
            topics:[],
            current_page : 1,
            perPage : 50,
            showNextButton : true,
            showBackButton : false,
            order:1,
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
    change(event){
        var targetValue=event.target.value;
        UserService.getAllTopicss().then(res=>{
            if(targetValue === "2"){    
                UserService.sortTopic(res);
                this.setState({topics:res,order:2});
            }else{
                this.setState({topics:res});
            }      
        });
    }
    next(){
        var moreTopic = this.state.topics.length-(this.state.current_page*this.state.perPage);
        if(moreTopic<=0){
            this.setState({showNextButton:false,showBackButton:true});
        }else{
            var curentPage = this.state.current_page;
            curentPage++;
            this.setState({current_page:curentPage,showBackButton:true});
        }
    }
    back(){
        var curentPage = this.state.current_page;
        curentPage--;
        if(curentPage>=1){
            this.setState({current_page:curentPage,showNextButton:true});
        }else{
            this.setState({showNextButton:true,showBackButton:false});
        }
    }
    addComment(comment){
        UserService.addComment(comment).then(res=>{
            if(this.state.order===1){
                this.setState({topics:res});
            }else{
                UserService.sortTopic(res);
                this.setState({topics:res});
            }
        })
    }
    upVote(topicId){
        var user = JSON.parse(sessionStorage.getItem('user'));
        UserService.upVoteTopic(topicId,user).then(res=>{
           if(!res){
               alert("You already UpVote this Topic");
           }else{
            if(this.state.order===1){
                this.setState({topics:res});
            }else{
                UserService.sortTopic(res);
                this.setState({topics:res});
            }
           }
        })
      //  window.location.reload();

    }
    render(){
        var offset = this.state.current_page*this.state.perPage;
        var starset = (this.state.current_page-1)*this.state.perPage;
        const topicItems = this.state.topics.map((topic, i)=>{
            if(i>=starset && i<offset){
                return(
                    <TopicItem key = {i} topic={topic} AddComment={this.addComment.bind(this)} 
                    upVote={this.upVote.bind(this)}/>
                 )
            }
        })
        return(
            <div>
                <div className="row">
                    <div className="col-md-8"> 
                        <h1>Topics</h1>
                        {this.state.showBackButton ? 
                        <button className="btn btn-outline-secondary btn-sm" style={{marginRight: 1 + 'em'}} onClick={this.back.bind(this)}>
                            <i className="fa fa-chevron-left"></i>  back
                        </button>:null
                        }
                       {this.state.showNextButton ? 
                       <button className="btn btn-outline-info btn-sm" onClick={this.next.bind(this)}>
                        next  <i className="fa fa-chevron-right"></i>
                       </button>:null
                            
                        }
                    </div>
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