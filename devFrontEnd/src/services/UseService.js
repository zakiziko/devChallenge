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
    }
}
export default UserService;