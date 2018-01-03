/**
 * @author Zakaria El Messoudi
 * @description this module contein all functions that we gonna use on our components
 */

import axios from 'axios'

var UserService = {
    /**
     * @function getUserDetails 
     * @param {String} token 
     * @returns {json}
     * @description is given us back user info email,name,id;
     */
    getUserDetails : function(token){
        return axios.get('http://localhost:3000/users/auth'+token)
        .then(res=>{
            var user = {};
            user = res.data.user;
            sessionStorage.setItem('user',JSON.stringify(user));
            return user;
        }).catch(err=> {return "err"});
    },

    /**
     * @function
     * @return {boolean} 
     * @description this function will return true or false depend on user data stored in sessionStorage 
     */
    isActive : function(){
        var result = false;
        if(sessionStorage.getItem('user')!=null){
            result = true;
        }
        return result;
    },
    
    /**
     * @function addingTopic
     * @param {json} topic object
     * @return {json} 
     * @description this function send the topic from front to backend and return the message getting from backEnd
     */
    addTopic : function(topic){
        return axios.request({
            method : "POST",
            url:"http://localhost:3000/topics",
            data : topic
        }).then(res=>{
            return res
        }).catch(err=>{return err});
    },

    /**
     * @return {json}
     * @description this function return all topics getting them from back end
     */
    getAllTopicss : function(){
        return axios.get('http://localhost:3000/topics').then(res=>{
            return res.data;
        })
    },
    /**
     * @param {String} id the id of the topic to update
     * @param {json} data the user 
     * @description this function update the upVote list of a topic and return 
     * either a updated list of topics or a boolean false
     */
    upVoteTopic : function(id,data){
        return axios.request({
            method : 'PUT',
            url:'http://localhost:3000/topics/'+id,
            data : data
        }).then(res=>{
            if(res.data.state){
                return this.getAllTopicss();
            }else{
                return res.data.state
            }
        }).catch(err=>{return err});
    },

    /**
     * @param {json} comment a comment 
     * @description this function update the comments list of a topic and return 
     * either a list of updated topics or  err message catched from the callback
    */
    addComment : function(comment){
        return axios.request({
            method : "POST",
            url:"http://localhost:3000/comments",
            data : comment
        }).then(res=>{
            //return res.data
            return this.getAllTopicss()
        }).catch(err=>{return err});
    },

    /**
     * @param {Array} topics
     * @return {Array} 
     * @description this function take an array of topics as a param and sorte 
     * this list based on upVote attibut of topics 
     */
    sortTopic : function(topics){
        topics.sort(function(a,b){
            return  b.upVote.length - a.upVote.length;
        })
        return topics;
    }
}
export default UserService;