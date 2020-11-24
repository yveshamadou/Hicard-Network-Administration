import { Client } from './hiCardAPI.js';
import {utils} from '../helpers/utils.js'
import {setToken} from './http.js'
import {userNetwork} from './userNetwork.model.js'

new setToken ($.cookie("ACCESS_TOKEN"))
let helper = new utils()

export function facilityNetwork(token, url) {
    this.client = new Client(url)
    this.token = token;
    this.activatortoken = helper.parseJwt(this.token).activator_security_token;
    
    this.getState = function (id){
        return new Promise((resolve, reject) => {
            this.client.states(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getFacilityApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getAllFacilityApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities5(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.createFacilityApi = function (id,body){
        return new Promise((resolve, reject) => {
            this.client.facilities3(id,body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.updateFacilityApi = function (id,body){
        return new Promise((resolve, reject) => {
            this.client.facilities2(id,body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.deleteFacilityApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities5(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.saveFacilityModal = function (){
        $('#btn-save-facility-form').on('click', function(){
            helper.setNextButtonLoader($(this))
           if (helper.validateForm('form-create-facility').length > 0) {
            helper.removeNextButtonLoader($(this))
           } else {
                let datas = {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": $('#facilityName').val(),
                    "addressLine1": $('#facilityAddLine1').val(),
                    "addressLine2": $('#facilityAddLine2').val(),
                    "city": $('#facilityCity').val(),
                    "country": $('#facilityCountry').val(),
                    "emailAddress": $('#facilityEmail').val(),
                    "faxNumber": $('#facilityFax').val(),
                    "npiNumber": $('#facilityNpi').val(),
                    "tinNumber": $('#facilityTin').val(),
                    "phoneNumber": $('#facilityPhone').val(),
                    "state": $('#facilityState').val(),
                    "taxID": "string",
                    "zipCode": $('#facilityPostalCode').val()
                  }
                let networkGuid = $('#networkGuid').val();
                let user = new facilityNetwork(token, url)
                console.log(datas);
                user.createFacilityApi(networkGuid,datas).then((result) => {
                    
                    if (result.errors.length > 0) {
                        $('#form-create-facility div.errors').empty()
                        result.errors.forEach((value) => {
                            $('#form-create-facility div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                        })
                    } else {
                        console.log(result.payload);
                        $('#modal-create-facility').modal('hide')
                        helper.toastr('success','top-full-width',1000, "Create "+datas.name+" with succesfull.")
                    }
                    helper.removeNextButtonLoader($(this))
                }).catch((err) => {
                    helper.removeNextButtonLoader($(this))
                    $('#form-create-facility').append('<p class="text-center alert-danger">erreur2</p>')
                })
                
           }
        })
        
    }
    
    this.showModalCreateFacility = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let body = '<form id="form-create-facility">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2">Generale Informations</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-12">'
            body += '<label for="network" class="fs-small2 w-100 fw-medium">Network :'
            body += '<select id="networkGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityName" class="fs-small2 fw-medium w-100 font-weight-bold">Name : '
            body += '<input type="text" id="facilityName" class="form-control required" placeholder="Enter facility name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityTin" class="fs-small2 fw-medium w-100">TIN Number :'
            body += '<input type="text" id="facilityTin" class="form-control required" placeholder="TIN Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityNpi" class="fs-small2 fw-medium w-100">NPI Number :'
            body += '<input type="text" id="facilityNpi" class="form-control required" placeholder="NPI Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityEmail" class="fs-small2 fw-medium w-100">Email Address :'
            body += '<input type="text" id="facilityEmail" class="form-control required" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityPhone" class="fs-small2 fw-medium w-100 ">Phone Number :'
            body += '<input type="text" id="facilityPhone" class="form-control required" placeholder="Phone Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityFax" class="fs-small2 w-100 fw-medium">Fax Number :'
            body += '<input type="text" id="facilityFax" class="form-control" placeholder="Fax Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-6"> '
            body += '<legend class="px-2 py-2">Location </legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityCity" class="fs-small2 w-100 fw-medium">City :'
            body += '<input type="text" id="facilityCity" class="form-control required" placeholder="City">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityPostalCode" class="fs-small2 w-100 fw-medium">Zip Code :'
            body += '<input type="text" id="facilityPostalCode" class="form-control required" placeholder="Postal Code">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityCountry" class="fs-small2 w-100 fw-medium">Country :'
            body += '<input type="text" id="facilityCountry" class="form-control required" placeholder="Country">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityState" class="fs-small2 w-100 fw-medium">State :'
            body += '<select id="facilityState" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            
            body += '<fieldset class="col-lg-6"> '
            body += '<legend class="px-2 py-2">Address </legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityAddLine1" class="fs-small2 w-100 fw-medium">Address Line 1 :'
            body += '<input type="text" id="facilityAddLine1" class="form-control required" placeholder="Address Line 1"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
            body += '<input type="text" id="facilityAddLine2" class="form-control" placeholder="Address Line 2">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '</form>'
            
            let footer = '<button id="btn-save-facility-form"  class="btn btn-primary">Save</button>';
            
            $('body').append(helper.createModal('modal-create-facility', "Create a New Facility", body, footer , 'lg'));
            $('#modal-create-facility').modal('show')
            
            $('#modal-create-facility').on('hide.bs.modal', function (e) {
               setTimeout(function(){$('#modal-create-facility').remove()},1000)
            })
            let save = new facilityNetwork($.cookie("ACCESS_TOKEN"),url)
            
            save.saveFacilityModal()
            save.setState("facilityState")
            save.setAllNetwork("networkGuid")
        });
        
        
        
        
    }
    
    this.setState = function(id){
        $('#'+id).attr({'disabled':'disabled'})
        this.getState(this.activatortoken)
        .then((result) => {
            $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>State</option>')
            result.payload.forEach(data => {
                $('#'+id).append('<option value="'+data.abbreviation+'">'+data.name+'</option>')
            });
            $('#'+id).val('').change()
            $('#'+id).removeAttr('disabled')
        }).catch((err) => {
            console.log(err);
        })
    }
    
    this.setAllNetwork = function(id){
        $('#'+id).attr({'disabled':'disabled'}).parent().prepend('<i class="fa fa-spinner fa-spin select-loader-network"></i>')
        let network = new userNetwork(token, url)
        if (helper.getParameterByName('N')) {
            network.getNetworkApi(helper.getParameterByName('N'))
            .then((result) => {
                if (result.errors.length > 0) {
                    $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
                } else {
                    $('#'+id).empty()
                    $('#'+id).append('<option value="'+result.payload.id+'">'+result.payload.name+'</option>')
                    $('#'+id).val(result.payload.id).change() 
                }
                $('#'+id).parent().find('.select-loader-network').remove()
            }).catch((err) => {
                console.log(err);
                $('#'+id).parent().find('.select-loader-network').remove()
                $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<p class="text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</p>')
            })
            
        }else{
            network.getAllNetworkApi()
            .then((result) => {
                $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a network</option>')
                result.payload.forEach(data => {
                    $('#'+id).append('<option value="'+data.id+'">'+data.name+'</option>')
                });
                $('#'+id).parent().find('.select-loader-network').remove()
                $('#'+id).val('').change()
                $('#'+id).removeAttr('disabled')
            }).catch((err) => {
                console.log(err);
                $('#'+id).parent().find('.select-loader-network').remove()
            })
        }
        
        
    }
    
    

}