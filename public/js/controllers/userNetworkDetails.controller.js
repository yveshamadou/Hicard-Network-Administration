import { userNetwork } from '../models/userNetwork.model.js';
import { facilityNetwork } from '../models/facility.model.js';
import { providerNetwork } from '../models/provider.model.js';

let network = new userNetwork($.cookie("ACCESS_TOKEN"), baseUrl)
let facility = new facilityNetwork($.cookie("ACCESS_TOKEN"), baseUrl)
let provider = new providerNetwork($.cookie("ACCESS_TOKEN"), baseUrl)

let load = function (){
    if (RX == "super") {
        facility.showModalCreateFacility('.add-facility-btn')
        provider.showModalCreateProvider('.add-provider-btn')
    }else{
        facility.showModalCreateFacility('.add-facility-btn')
        provider.showModalCreateProvider('.add-provider-btn')
    }
    network.setNetworkCard('info-network-card')
    
    
}

$(document).ready(function(){
    
    load()
    
})