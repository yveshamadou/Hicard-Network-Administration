import { Client } from './hiCardAPI.js';
import {utils} from '../helpers/utils.js'
import {setToken} from './http.js'
import {userNetwork} from './userNetwork.model.js'
import {facilityNetwork} from './facility.model.js'

new setToken ($.cookie("ACCESS_TOKEN"))
let helper = new utils()

export function providerNetwork(token, url) {
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
    
    this.getSpecialities = function (id){
        return new Promise((resolve, reject) => {
            this.client.specialties(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getProviderApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.createProviderApi = function (id,facilityID,body){
        return new Promise((resolve, reject) => {
            this.client.providers2(id,facilityID, body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.updateProviderApi = function (id,body){
        return new Promise((resolve, reject) => {
            this.client.facilities2(id,body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.deleteProviderApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities5(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.saveProviderModal = function (){
        $('#btn-save-provider-form').on('click', function(){
            helper.setNextButtonLoader($(this))
           if (helper.validateForm('form-create-provider').length > 0) {
            helper.removeNextButtonLoader($(this))
           } else {
                let networkGuid = $('#providerNetworkGuid').val();
                let facilityGuid = $('#providerFacilityGuid').val();
                let datas = {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "addressLine1": $('#providerAddLine1').val(),
                    "addressLine2": $('#providerAddLine2').val(),
                    "city": $('#providerCity').val(),
                    "country": $('#providerCountry').val(),
                    "emailAddress": $('#providerEmail').val(),
                    "firstName": $('#providerFirstName').val(),
                    "ipaName":  $('#providerFirstName').val() + $('#providerLastName').val(),
                    "name":  $('#providerFirstName').val() + $('#providerLastName').val(),
                    "lastName": $('#providerLastName').val(),
                    "medicalGroupName": $('#providerFacilityGuid').find('option[value="'+facilityGuid+'"]').text(),
                    "mobileNumber": $('#providerPhone').val(),
                    "npi":$('#providerNpi').val(),
                    "specialties": $('#providerSpeciality').val().toString(),
                    "state": $('#providerState').val(),
                    "subSpecialties": $('#providerFirstName').val(),
                    "tin": $('#providerTin').val()
                }
                
                
                let user = new providerNetwork(token, url)
                console.log(datas);
                user.createProviderApi(networkGuid,facilityGuid,datas).then((result) => {
                    
                    if (result.errors.length > 0) {
                        $('#form-create-provider div.errors').empty()
                        result.errors.forEach((value) => {
                            $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                        })
                    } else {
                        console.log(result.payload);
                        $('#modal-create-provider').modal('hide')
                        helper.toastr('success','top-full-width',1000, "Create "+datas.name+" with succesfull.")
                    }
                    helper.removeNextButtonLoader($(this))
                }).catch((err) => {
                    helper.removeNextButtonLoader($(this))
                    $('#form-create-provider').append('<p class="text-center alert-danger">erreur2</p>')
                })
                
           }
        })
        
    }
    
    this.showModalCreateProvider = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let body = '<form id="form-create-provider">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2" >Generale Informations</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerNetworkGuid" class="fs-small2 w-100 fw-medium">Network :'
            body += '<select id="providerNetworkGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerFacilityGuid" class="fs-small2 w-100 fw-medium">Facility :'
            body += '<select id="providerFacilityGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerFirstName" class="fs-small2 fw-medium w-100 font-weight-bold">First Name : '
            body += '<input type="text" id="providerFirstName" class="form-control required" placeholder="First Name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerLastName" class="fs-small2 fw-medium w-100 font-weight-bold">Last Name : '
            body += '<input type="text" id="providerLastName" class="form-control required" placeholder="Last Name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="providerTin" class="fs-small2 fw-medium w-100">TIN Number :'
            body += '<input type="text" id="providerTin" class="form-control required" placeholder="TIN Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="providerNpi" class="fs-small2 fw-medium w-100">NPI Number :'
            body += '<input type="text" id="providerNpi" class="form-control required" placeholder="NPI Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            
            body += '<div class="col-lg-4">'
            body += '<label for="providerEmail" class="fs-small2 fw-medium w-100">Email Address :'
            body += '<input type="text" id="providerEmail" class="form-control required" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-12">'
            body += '<label for="providerSpeciality" class="fs-small2 fw-medium w-100">Speciality :'
            body += '<select id="providerSpeciality" class="custom-select required" name="states[]" multiple="multiple"></select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-6"> '
            body += '<legend class="px-2 py-2">Contact & Address </legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerPhone" class="fs-small2 fw-medium w-100 ">Phone Number :'
            body += '<input type="text" id="providerPhone" class="form-control required" placeholder="Phone Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerAddLine1" class="fs-small2 w-100 fw-medium">Address Line 1 :'
            body += '<input type="text" id="providerAddLine1" class="form-control required" placeholder="Address Line 1"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
            body += '<input type="text" id="providerAddLine2" class="form-control" placeholder="Address Line 2">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            
            body += '<fieldset class="col-lg-6"> '
            body += '<legend class="px-2 py-2">Location </legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerCity" class="fs-small2 w-100 fw-medium">City :'
            body += '<input type="text" id="providerCity" class="form-control required" placeholder="City">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerPostalCode" class="fs-small2 w-100 fw-medium">Zip Code :'
            body += '<input type="text" id="providerPostalCode" class="form-control required" placeholder="Postal Code">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerCountry" class="fs-small2 w-100 fw-medium">Country :'
            body += '<input type="text" id="providerCountry" class="form-control required" placeholder="Country">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerState" class="fs-small2 w-100 fw-medium">State :'
            body += '<select id="providerState" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '</form>'
            
            let footer = '<button id="btn-save-provider-form"  class="btn btn-primary">Save</button>';
            
            $('body').append(helper.createModal('modal-create-provider', "Create a New Provider", body, footer , 'lg'));
            $('#modal-create-provider').modal('show')
            $('#modal-create-provider').on('hide.bs.modal', function (e) {
                setTimeout(function(){$('#modal-create-provider').remove()},1500)
            })
            let save = new providerNetwork($.cookie("ACCESS_TOKEN"),url)
            
            save.saveProviderModal()
            save.setState("providerState")
            save.setAllNetwork("providerNetworkGuid")
            save.setSpecialities('providerSpeciality')
            
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
    
    this.setSpecialities = function(id){
        $('#'+id).attr({'disabled':'disabled'})
        this.getSpecialities(this.activatortoken)
        .then((result) => {
            result.payload.forEach(data => {
                $('#'+id).append('<option value="'+data.id+'">'+data.name+'</option>')
            });
            $('#'+id).val('').change()
            $('#'+id).removeAttr('disabled')
            $('#'+id).select2({
                placeholder: 'Select an option',
                minimumInputLength: 2,
                multiple : true,
            });
        }).catch((err) => {
            console.log(err);
        })
    }
    
    this.setAllNetwork = function(id){
        $('#'+id).attr({'disabled':'disabled'})
        $('#providerFacilityGuid').attr({'disabled':'disabled'})
        
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
                    this.setAllFacility('providerFacilityGuid', result.payload.id)
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
                if (result.errors.length > 0) {
                    $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
                } else {
                    if (result.payload.length > 0) {
                        $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a network</option>')
                        result.payload.forEach(data => {
                            $('#'+id).append('<option value="'+data.id+'">'+data.name+'</option>')
                        });
                        $('#'+id).val('').change()
                        $('#'+id).removeAttr('disabled')
                        $('#'+id).change(function(){
                            let guid = $(this).val()
                            let provider = new providerNetwork(token, url)
                            provider.setAllFacility('providerFacilityGuid', guid)
                        })
                    }else{
                        $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Not Facility Found</option>')
                    }
                }
                
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    
    this.setAllFacility = function(id, NetworkID){
        $('#'+id).attr({'disabled':'disabled'})
        
        let facility = new facilityNetwork(token, url)
        facility.getFacilityApi(NetworkID)
        .then((result) => {
            $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a network</option>')
            result.payload.forEach(data => {
                $('#'+id).append('<option value="'+data.id+'">'+data.name+'</option>')
            });
            $('#'+id).val('').change()
            $('#'+id).removeAttr('disabled')
        }).catch((err) => {
            console.log(err);
        })
    }
    
    
    

}