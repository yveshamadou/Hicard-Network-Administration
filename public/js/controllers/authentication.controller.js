import { Client } from '../models/hiCardAPI.js';
import { authentication } from '../models/authentication.model.js';
import {setToken} from '../models/http.js'

//new setToken ($.cookie("ACCESS_TOKEN"))

let auth = new authentication($.cookie("ACCESS_TOKEN"))

$(document).ready(function(){
    $('.search-icon-header').remove()
    $('.notification-icon-header').remove()
    $('.my-account-link-header').remove()
    auth.goTo()
    
})