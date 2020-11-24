import {utils} from '../helpers/utils.js'
let helper = new utils()
export function authentication(token) {

    this.token = token;
    
    this.getUserID = function (){
        let ID = helper.parseJwt(this.token)
        return ID.nameid
    }
    
    this.getUserName = function (){
        let Name = helper.parseJwt(this.token)
        return Name.Name
    }
    
    this.getHcRole= function (){
        let role = helper.parseJwt(this.token)
        return role.hc_na_role
    }
    
    this.goTo = function(){
        
        if (this.getHcRole() == "SystemAdministrator") {
            setTimeout(
                function(){ 
                    window.location.href = "/user_network" 
                }, 
            3000);
        } else if (this.getHcRole() == "NetworkAdministrator") {
            setTimeout(
                function(){ 
                    window.location.href = "/user_network" 
                }, 
            3000);
        } else if (this.getHcRole() == "FacilityAdministrator") {
            setTimeout(
                function(){ 
                    window.location.href = "/user_provider_details" 
                }, 
            3000);
        }else {
            $('div.main').find('.loader').hide()
            $('div.main').append('<p class="text-center alert-danger">Not Allowed</p>')
            setTimeout(
                function(){ 
                    window.location.href = "/logout" 
                }, 
            5000);
        }
    }
    
    
    
    
    

}