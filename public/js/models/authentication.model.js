import {utils} from '../helpers/utils.js'
let helper = new utils()

export function authentication(token) {

    this.token = helper.getParameterByName('id_token');
    
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
        
        if (helper.parseJwt(this.token).hc_na_role != '') {
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
                $('div.main').append('<p class="text-center text-danger">We are sorry to inform you that your ability does not allow you to access this application. You would be disconnected in a few seconds.</p><p class="text-center text-danger">Please contact an administrator for more information, Hicard thanks you for the consideration.</p>')
                setTimeout(
                    function(){ 
                        window.location.href = "/logout" 
                    }, 
                10000);
            }
        }else{
            $('div.main').find('.loader').hide()
            $('div.main').append('<p class="text-center text-danger">We are sorry to inform you that your ability does not allow you to access this application. You would be disconnected in a few seconds.</p><p class="text-center text-danger">Please contact an administrator for more information, Hicard thanks you for the consideration.</p>')
            setTimeout(
                function(){ 
                    window.location.href = "/logout" 
                }, 
            10000);
        }
    
        
    }
    
    
    
    
    

}