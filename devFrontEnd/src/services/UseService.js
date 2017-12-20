/**
 * @author Zakaria El Messoudi
 * @description this file will contien all our database interaction functions
 */

import axios from 'axios'

var UserService = {
    getUserDetails : function(token){
        return axios.get('http://localhost:3000/users/auth/facebook/callback'+token)
        .then(res=>{
            var user = {};
            user = res.data.user;
            sessionStorage.setItem('user',JSON.stringify(user));
            return user;
        }).catch(err=> {return "err"});
    },

    isActive : function(){
        var result = false;
        if(sessionStorage.getItem('user')!=null){
            result = true;
        }
        return result;
    },
    getUserTopics : function(id){
        return axios.get('http://localhost:3000/topics/creatorTopics/'+id)
    },

   
    addTopic : function(topic){
        return axios.request({
            method : "POST",
            url:"http://localhost:3000/topics/add",
            data : topic
        }).then(res=>{
            return res.data
        }).catch(err=>{return err});
    },

    getAllTopicss : function(){
        return axios.get('http://localhost:3000/topics/all').then(res=>{
            return res.data;
        })
    },
    upVoteTopic : function(id,data){
        return axios.request({
            method : 'PUT',
            url:'http://localhost:3000/topics/upVote/'+id,
            data : data
        }).then(res=>{
            return res.data
        }).catch(err=>{return err});
    },

    addComment : function(comment){
        return axios.request({
            method : "POST",
            url:"http://localhost:3000/comments/add",
            data : comment
        }).then(res=>{
            return res.data
        }).catch(err=>{return err});
    },

    sortTopic : function(topics){
        topics.sort(function(a,b){
            return  b.upVote.length - a.upVote.length;
        })
        return topics;
    }
}
export default UserService;