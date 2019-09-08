import Cookie from 'js-cookie';
import ApiService from '@/service/API-service';
export default {
    getUserInfo(state){
        if(!state.userInfo || !state.userInfo.name){
            if(Cookie.get('userInfo')){
                let userInfo = JSON.parse(Cookie.get('userInfo'));
                Object.assign(state.userInfo,userInfo);
            }
        }
        return state.userInfo;
    }
}
