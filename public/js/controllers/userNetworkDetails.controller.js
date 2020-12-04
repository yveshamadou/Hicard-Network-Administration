import { userNetwork } from '../models/userNetwork.model.js';
import { facilityNetwork } from '../models/facility.model.js';
import { providerNetwork } from '../models/provider.model.js';
import { usersNetwork } from '../models/users.model.js';

let network = new userNetwork($.cookie("ACCESS_TOKEN"), baseUrl)
let facility = new facilityNetwork($.cookie("ACCESS_TOKEN"), baseUrl)
let provider = new providerNetwork($.cookie("ACCESS_TOKEN"), baseUrl)
let users = new usersNetwork($.cookie("ACCESS_TOKEN"), baseUrl, url2)

let load = function (){
    if (RX == "super") {
        facility.showModalCreateFacility('.add-facility-btn')
        provider.showModalCreateProvider('.add-provider-btn')
    }else{
        facility.showModalCreateFacility('.add-facility-btn')
        provider.showModalCreateProvider('.add-provider-btn')
        users.showModalCreateUsers('.add-user-btn')
    }
    network.setNetworkCard('info-network-card')
    users.showModalCreateUsers('.add-user-btn')
    
    
}

$(document).ready(function(){
    
    load()
    
})