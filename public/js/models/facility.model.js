import { Client } from './hiCardAPI.js';
import {utils} from '../helpers/utils.js';
import {setToken} from './http.js';
import {userNetwork} from './userNetwork.model.js';
import {usersNetwork} from './users.model.js';
import { providerNetwork } from './provider.model.js';

new setToken ($.cookie("ACCESS_TOKEN"))
let helper = new utils()

export function facilityNetwork(token, url) {
    this.client = new Client(url)
    this.token = token;
    this.activatortoken = helper.parseJwt(this.token).activator_security_token;
    let th = this;
    
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
    
    this.getFacility2 = function (id){
        return new Promise((resolve, reject) => {
            this.client.medicalfacilities3(id,this.activatortoken).then((result) => {
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
    
    this.saveFacilityModal = function (value){
        
        if (value == "update") {
            $('#btn-update-facility-form').on('click', function(){
                helper.setNextButtonLoader($(this))
               if (helper.validateForm('form-update-facility').length > 0) {
                helper.removeNextButtonLoader($(this))
               } else {
                let datas = {
                    "id": $('#facilityGuid').val(),
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
                let networkGuid = $('select#networkGuid').val();
                let user = new facilityNetwork(token, url)
                    user.updateFacilityApi(networkGuid,datas).then((result) => {
                        if (result.errors.length > 0) {
                            $('#form-update-facility div.errors').empty()
                            result.errors.forEach((value) => {
                                $('#form-update-facility div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                            })
                        } else {
                            helper.toastr('success','top-full-width',1000, "Successfully Update")
                            $('#modal-update-facility').modal('hide')
                            setTimeout(function(){window.location.href = ""},1200)
                        }
                        helper.removeNextButtonLoader($(this))
                    }).catch((err) => {
                        helper.removeNextButtonLoader($(this))
                        console.log(err);
                        $('#form-update-facility').append('<p class="text-center alert-danger">erreur2</p>')
                    })
                    
               }
            })
        } else {
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
                    user.createFacilityApi(networkGuid,datas).then((result) => {
                        
                        if (result.errors.length > 0) {
                            $('#form-create-facility div.errors').empty()
                            result.errors.forEach((value) => {
                                $('#form-create-facility div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                            })
                        } else {
                            $('#modal-create-facility').modal('hide')
                            helper.toastr('success','top-full-width',1000, "Facility was Successfully Added.")
                            setTimeout(function(){window.location.href = ""},1200)
                        }
                        helper.removeNextButtonLoader($(this))
                    }).catch((err) => {
                        helper.removeNextButtonLoader($(this))
                        $('#form-create-facility').append('<p class="text-center alert-danger">erreur2</p>')
                    })
                    
               }
            })
        }
        
    }
    
    this.showFacilityByUserID = function(){
        let id_user = helper.parseJwt($.cookie("ACCESS_TOKEN")).nameid;
        
        this.getAllFacilityApi(id_user).then((result) => {
            if (result.errors.length > 0) {
                $('#facility-content').html("<p class='text-center alert-warning'> Not Found</p>")
            } else {
                $('#facility-content').empty()
                if (result.payload.length > 0) {
                    //console.log(result.payload);
                    result.payload.forEach((facility,i) => {
                        $('#facility-content').append(
                            $('<div/>')
                            .addClass('media-main bg-white col-lg-3 col-md-3 col-sm-5  col-12 p-3 mx-4 mb-3 shadow-sm')
                            .attr({'style':'border-radius: 5px'})
                            .append(
                                $('<div/>')
                                .addClass('media py-3')
                                .append(
                                    '<img class="rounded mx-auto d-block img circle" src="/images/hospital2.png" alt="images"height="100" width="100" style="object-fit: cover;border-radius: 50%!important"><div class="media-body ml-3 mt-3"><div class="mb-2 fs-small2 fw-medium name">'+facility.name+'</div><p class="fs-small fw-medium text-color-gray"><p></div>'
                                )
                            )
                            .append(
                                $('<div/>')
                                .append(
                                    '<div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Mail address :</div><div class="fs-small w-100 text-color-gray">'+facility.emailAddress+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Address Line 1 :</div><div class="fs-small w-100 text-color-gray">'+facility.addressLine1+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">City :</div><div class="fs-small w-100 text-color-gray">'+facility.city+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Phone Number :</div><div class="fs-small w-100 text-color-gray">'+facility.phoneNumber+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Fax Number :</div><div class="fs-small w-100 text-color-gray">'+facility.faxNumber+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Postal Code :</div><div class="fs-small w-100 text-color-gray">'+facility.zipCode+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">State :</div><div class="fs-small w-100 text-color-gray">'+facility.state+'</div></div>'
                                )
                            )
                            .append(
                                $('<div/>')
                                .addClass('py-3')
                                .append(
                                    '<a href="/user_facility_details?F='+facility.id+'" class="btn btn-outline-primary w-100" role="button">More view</a>'
                                )
                            )
                        )
                    });
                    
                    
                    $('div.loader-full').remove()
                    $('#main').show()
                    helper.filterCard()
                } else {
                    $('div.loader-full').hide()
                    $('#main').show().find('div#facility-content').empty().html("<p class='text-center container text-info fs-normal fw-normal'> <i class='fas fa-info-circle fa-lg mr-2'></i> Not Found</p>")
                }
            }
        }).catch((err) => {
            $('#main').show().empty().append('<p class="text-center alert-warning">Something Wrong. Please </p>')
            $('div.loader-full').remove()
            console.log(err);
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
            body += '<legend class="px-2 py-2">General Information</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-12">'
            body += '<label for="network" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Contract :'
            body += '<select id="networkGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Name : '
            body += '<input type="text" id="facilityName" class="form-control required" placeholder="Enter facility name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityTin" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>TIN Number :'
            body += '<input type="text" id="facilityTin" class="form-control required" placeholder="TIN Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityNpi" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>NPI Number :'
            body += '<input type="text" id="facilityNpi" class="form-control required" placeholder="NPI Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityEmail" class="fs-small2 fw-medium w-100">Email Address :'
            body += '<input type="text" id="facilityEmail" class="form-control" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="facilityPhone" class="fs-small2 fw-medium w-100 "><t class="text-danger">*</t>Phone Number :'
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
            body += '<fieldset class="col-lg-12"> '
            body += '<legend class="px-2 py-2">Address </legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-4">'
            body += '<label for="facilityAddLine1" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Address Line 1 :'
            body += '<input type="text" id="facilityAddLine1" class="form-control required" placeholder="Address Line 1"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="facilityAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
            body += '<input type="text" id="facilityAddLine2" class="form-control" placeholder="Address Line 2">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="facilityCity" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>City :'
            body += '<input type="text" id="facilityCity" class="form-control required" placeholder="City">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="facilityPostalCode" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Zip Code :'
            body += '<input type="text" id="facilityPostalCode" class="form-control required" placeholder="Zip Code">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="facilityCountry" class="fs-small2 w-100 fw-medium">Country :'
            body += '<input type="text" id="facilityCountry" class="form-control" placeholder="Country">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="facilityState" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>State :'
            body += '<select id="facilityState" class="custom-select required">'
            body += '</select>'
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
            
            save.saveFacilityModal('create')
            save.setState("facilityState")
            save.setAllNetwork("networkGuid")
        });
        
        
        
        
    }
    
    this.showModalUpdateFacility = function (){
        $('.update-facility').on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let id = t.parent().parent().attr('data-id')
            let save = new facilityNetwork($.cookie("ACCESS_TOKEN"),url)
            helper.setNextButtonLoader(t)
            console.log(id);
            save.getFacility2(id).then((result) => {
                console.log(result);
                if (result.errors.length > 0) {
                    console.log(result.errors);
                    helper.removeNextButtonLoader(t)
                } else {
                    let data = result.payload
                    let body = '<form id="form-update-facility">';
                    body += '<div class="errors w-100 text-center"> </div>'
                    
                    body += '<div class="d-flex"> '
                    body += '<fieldset class="col-lg-12 mb-3"> '
                    body += '<legend class="px-2 py-2">General Information</legend>'
                    body += '<div class="row">'
                    
                    body += '<div class="col-lg-12">'
                    body += '<label for="network" class="fs-small2 w-100 fw-medium">Network :'
                    body += '<select id="networkGuid" class="custom-select required">'
                    body += '</select>'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="facilityName" class="fs-small2 fw-medium w-100 font-weight-bold">Name : '
                    body += '<input type="text" id="facilityName" class="form-control required" value="'+data.name+'" placeholder="Enter facility name">  '
                    body += '<input type="hidden" id="facilityGuid" class="form-control required" value="'+data.id+'">  '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="facilityTin" class="fs-small2 fw-medium w-100">TIN Number :'
                    body += '<input type="text" id="facilityTin" class="form-control required" value="'+data.tinNumber+'" placeholder="TIN Number">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="facilityNpi" class="fs-small2 fw-medium w-100">NPI Number :'
                    body += '<input type="text" id="facilityNpi" class="form-control required" value="'+data.npiNumber+'" placeholder="NPI Number">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="facilityEmail" class="fs-small2 fw-medium w-100">Email Address :'
                    body += '<input type="text" id="facilityEmail" class="form-control required" value="'+data.emailAddress+'" placeholder="Email Address">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="facilityPhone" class="fs-small2 fw-medium w-100 ">Phone Number :'
                    body += '<input type="text" id="facilityPhone" class="form-control required" value="'+data.phoneNumber+'" placeholder="Phone Number"> '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="facilityFax" class="fs-small2 w-100 fw-medium">Fax Number :'
                    body += '<input type="text" id="facilityFax" class="form-control" value="'+data.faxNumber+'" placeholder="Fax Number"> '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '</div>'
                    body += '</fieldset>'
                    body += '</div>'
                    
                    
                    body += '<div class="d-flex"> '
                    body += '<fieldset class="col-lg-12"> '
                    body += '<legend class="px-2 py-2">Address </legend>'
                    body += '<div class="row">'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="facilityAddLine1" class="fs-small2 w-100 fw-medium">Address Line 1 :'
                    body += '<input type="text" id="facilityAddLine1" class="form-control required" value="'+data.addressLine1+'" placeholder="Address Line 1"> '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="facilityAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
                    body += '<input type="text" id="facilityAddLine2" class="form-control" value="'+data.addressLine2+'" placeholder="Address Line 2">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="facilityCity" class="fs-small2 w-100 fw-medium">City :'
                    body += '<input type="text" id="facilityCity" class="form-control required" value="'+data.city+'" placeholder="City">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="facilityPostalCode" class="fs-small2 w-100 fw-medium">Zip Code :'
                    body += '<input type="text" id="facilityPostalCode" class="form-control required" value="'+data.zipCode+'" placeholder="Postal Code">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="facilityCountry" class="fs-small2 w-100 fw-medium">Country :'
                    body += '<input type="text" id="facilityCountry" class="form-control required" value="'+data.country+'" placeholder="Country">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="facilityState" class="fs-small2 w-100 fw-medium">State :'
                    body += '<select id="facilityState" class="custom-select required">'
                    body += '</select>'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '</div>'
                    body += '</fieldset>'
                    body += '</div>'
                    
                    body += '</form>'
                    
                    let footer = '<button id="btn-update-facility-form"  class="btn btn-primary">Save</button>';
                    
                    $('body').append(helper.createModal('modal-update-facility', "Update Facility", body, footer , 'lg'));
                    $('#modal-update-facility').modal('show')
                    
                    $('#modal-update-facility').on('hide.bs.modal', function (e) {
                       setTimeout(function(){$('#modal-update-facility').remove()},1000)
                    })
                    let save = new facilityNetwork($.cookie("ACCESS_TOKEN"),url)
                    
                    save.saveFacilityModal('update')
                    save.setState("facilityState", data.state)
                    save.setAllNetwork("networkGuid")
                    helper.removeNextButtonLoader(t)
                }
            }).catch((err) => {
                console.log(err);
            })
            
        });
        
        
        
        
    }
    
    this.setState = function(id, current = ""){
        $('#'+id).attr({'disabled':'disabled'}).parent().prepend('<i class="fa fa-spinner fa-spin select-loader-state"></i>')
        this.getState(this.activatortoken)
        .then((result) => {
            $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>State</option>')
            result.payload.forEach(data => {
                $('#'+id).append('<option value="'+data.abbreviation+'">'+data.name+'</option>')
            });
            $('#'+id).val('').change()
            $('#'+id).removeAttr('disabled')
            if (current != "" || current != null || current != undefined) {
                $('#'+id).val(current).change()
            }
            $('#'+id).parent().find('.select-loader-state').remove()
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
            
        }else if (helper.getParameterByName('F')){
        
            new Promise((resolve, reject) => {
                this.client.medicalfacilities3(helper.getParameterByName('F'))
                .then((res) => {
                    console.log("polpioi");
                    
                    if (res.errors.length > 0) {
                        $('#tbody-providers-list')
                        .empty()
                        .append('<tr><td colspan="7"><p class="text-center">No provider found !</p></td></tr>')
                        console.log(res.errors);
                    } else {
                        let networkGuid = res.payload.medicalNetworkID
                        network.getNetworkApi(networkGuid)
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
                    }
                }).catch((err) => {
                    console.log(err);
                })
            
            });
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
    
    this.setFacilityCard = function(idName){
        let id = helper.getParameterByName('F')
       if (id != null && id != undefined && id != '') {
        $('#'+idName).empty().append('<div class="loader-network-info text-center col-lg-12"> <skeleton-box lines="5"></skeleton-box></div>')
        this.getFacility2(id).then((result) => {
            //console.log(result);
            if (result.errors.length > 0) {
                $('#'+idName)
                .find('.loader-network-info').remove()
                .append('<p class="text-center text-danger"> eee </p>')
                $('#main').empty().append('<div class="main container"><div class="text-center text-danger">the identifier of this facility is not correct. Please return to the previous page.<p><a href="/">Go Back</a></p></div></div>')
            } else {
                let data = result.payload
                $('.name-facility').empty().text(data.name)
                let content = '<div class="col-md-2"><div class="img text-center"> <img src="./images/hospital2.png" class=" img-circle img-fluid" height="50px" alt="no-image"></div></div>'
        
                content += '<div class="col-md-3 col-sm-6 flex-sm-column mt-2">'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Name :</div><div class="col px-1 info-data">'+data.name+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">NPI :</div><div class="col px-1 info-data">'+data.npiNumber+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Email :</div><div class="col px-1 info-data">'+data.emailAddress+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Phone Number:</div><div class="col px-1 info-data">'+data.phoneNumber+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Fax Number:</div><div class="col px-1 info-data">'+data.faxNumber+'</div></div>'
                content += '</div>'
                
                content += '<div class="col-md-3 col-sm-6 flex-sm-column mt-2">'
                content += '<div class="d-flex"><div class="col px-1 info-basic">City :</div><div class="col px-1 info-data">'+data.city+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Zip Code :</div><div class="col px-1 info-data">'+data.zipCode+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">State :</div><div class="col px-1 info-data">'+data.state+'</div></div>'
                content += '</div>'
                
                content += '<div class="col-md-4 flex-sm-column mt-2">'
                content += '<div class="row">'
                
                content += '<div class="col-8">'
                content += '<div class="d-flex flex-row"><div class=" info-basic">Address Line 1 :</div><div class="info-data">'+data.addressLine1+'</div></div>'
                content += '<div class="d-flex flex-row"><div class=" info-basic">Address Line 2 :</div><div class="info-data">'+data.addressLine2+'</div></div>'
                content += '</div>'
                
                content += '<div class="col-4">'
                content += '<div class="button-group" data-id="'+data.id+'">'
                content += '<div class="mt-2"> <a href="#" class="p-1 btn btn-outline-primary w-100 fs-small update-facility" ><i class="fas fa-edit"></i> Edit</a></div>'
                content += '<div class="mt-2"> <a href="#" class="p-1 btn btn-outline-primary w-100 fs-small lock-facility-btn"><i class="fas fa-lock"></i> Lock</a></div>'
                content += '</div>'
                content += '</div>'
                
                content += '</div>'
                content += '</div>'
                
                $('#'+idName).empty().append(content)
                this.showModalUpdateFacility()
                this.setProvidersByFacilityID(data.id)
                this.setUsersByFacilityID(data.id)
                this.setNetworkByfacilityID()
            }
        }).catch((err) => {
            console.log(err);
            $('#main').empty().append('<div class="main container"><div class="text-center text-danger">the identifier of this facility is not correct. Please return to the previous page.<p><a href="/">Go Back</a></p></div></div>')
        })
       } else {
           $('#main').empty().append('<div class="main container"><div class="text-center text-danger">the identifier of this facility is not correct. Please return to the previous page.<p><a href="/">Go Back</a></p></div></div>')
       }
    }
    
    this.setProvidersByFacilityID = function(id){
        $('#tbody-providers-list').empty().prepend('<tr class="loader-providers-tbody"><td colspan="8" class="text-center"><skeleton-box lines="1"></skeleton-box></i></td></tr>')
        if (helper.getParameterByName('N')) {
            let networkGuid = helper.getParameterByName('N')
            return new Promise((resolve, reject) => {
                this.client.providers2(networkGuid, id)
                .then((result) => {
                    if (result.errors.length > 0) {
                        $('#tbody-providers-list')
                        .empty()
                        .append('<tr><td colspan="7"><p class="text-center">No provider found !</p></td></tr>')
                        reject(result.errors)
                    } else {
                        if (result.payload.length > 0) {
                            $('#tbody-providers-list')
                            .empty()
                            result.payload.forEach(data => {
                                $('#tbody-providers-list')
                                .append(
                                    $('<tr/>')
                                    .attr({'id':data.id})
                                    .append(
                                        $('<th/>')
                                        .addClass("border-0")
                                        .attr({})
                                        .html('<div class="m-auto img-rounded"> <img src="./images/experience.png" class="img-fluid" alt="no-image"></div>')
                                    )
                                    .append(`
                                        <td class="name-tab border-0 name_provider">${data.firstName} ${data.lastName}</td>
                                        <td class="text-tab border-0">${data.emailAddress}</td>
                                        <td class="text-tab border-0">${data.addressLine1}</td>
                                        <td class="city-tab border-0">
                                            <div class="media">
                                                <div class="media-body">
                                                    <div class="media-title">${data.city}/${data.state}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="eye-tab border-0">
                                            <a href="javascript:void(0)" class="view-provider mr-4">
                                                <i class="fas fa-eye"></i> View
                                            </a> 
                                            <a href="javascript:void(0)" class="edit-provider mr-4 text-success">
                                                <i class="fas fa-edit"></i> Edit
                                            </a>
                                            <a href="javascript:void(0)" class="diassociate-provider">
                                                <i class="fas fa-unlock-alt"></i> Diassociate
                                            </a>
                                        </td>
                                    `)
                                )
                            });
                            let provider = new providerNetwork(token, url)
                            provider.setProvidersModal('.view-provider');
                            provider.showModalUpdateProvider('.edit-provider')
                            provider.showModalDiassociteNetwork()
                            $('#table-providers-list').DataTable();
                        } else {
                            $('#tbody-providers-list')
                            .empty()
                            .append('<tr><td colspan="6"><p class="text-center">No provider found !</p></td></tr>')
                        }
                        resolve(result)
                    }
                }).catch((err) => {
                    console.log(err);
                })
            
            });
           
        } else {
            new Promise((resolve, reject) => {
                this.client.medicalfacilities3(helper.getParameterByName('F'))
                .then((res) => {
                    console.log("polpioi");
                    
                    if (res.errors.length > 0) {
                        $('#tbody-providers-list')
                        .empty()
                        .append('<tr><td colspan="7"><p class="text-center">No provider found !</p></td></tr>')
                        console.log(res.errors);
                    } else {
                        let networkGuid = res.payload.medicalNetworkID
                        return new Promise((resolve, reject) => {
                            this.client.providers2(networkGuid, id)
                            .then((result) => {
                                if (result.errors.length > 0) {
                                    $('#tbody-providers-list')
                                    .empty()
                                    .append('<tr><td colspan="7"><p class="text-center">No provider found !</p></td></tr>')
                                    reject(result.errors)
                                } else {
                                    if (result.payload.length > 0) {
                                        $('#tbody-providers-list')
                                        .empty()
                                        result.payload.forEach(data => {
                                            $('#tbody-providers-list')
                                            .append(
                                                $('<tr/>')
                                                .attr({'id':data.id})
                                                .append(
                                                    $('<th/>')
                                                    .addClass("border-0")
                                                    .attr({})
                                                    .html('<div class="m-auto img-rounded"> <img src="./images/experience.png" class="img-fluid" alt="no-image"></div>')
                                                )
                                                .append(`
                                                    <td class="name-tab border-0 name_provider">${data.firstName} ${data.lastName}</td>
                                                    <td class="text-tab border-0">${data.emailAddress}</td>
                                                    <td class="text-tab border-0">${data.addressLine1}</td>
                                                    <td class="city-tab border-0">
                                                        <div class="media">
                                                            <div class="media-body">
                                                                <div class="media-title">${data.city}/${data.state}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="eye-tab border-0">
                                                        <a href="javascript:void(0)" class="view-provider mr-4">
                                                            <i class="fas fa-eye"></i> View
                                                        </a> 
                                                        <a href="javascript:void(0)" class="edit-provider mr-4 text-success">
                                                            <i class="fas fa-edit"></i> Edit
                                                        </a>
                                                        <a href="javascript:void(0)" class="diassociate-provider">
                                                            <i class="fas fa-unlock-alt"></i> Diassociate
                                                        </a>
                                                    </td>
                                                `)
                                            )
                                        });
                                        let provider = new providerNetwork(token, url)
                                        provider.setProvidersModal('.view-provider');
                                        provider.showModalUpdateProvider('.edit-provider')
                                        provider.showModalDiassociteNetwork()
                                        $('#table-providers-list').DataTable();
                                    } else {
                                        $('#tbody-providers-list')
                                        .empty()
                                        .append('<tr><td colspan="6"><p class="text-center">No provider found !</p></td></tr>')
                                    }
                                    resolve(result)
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                        
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                })
            
            });
        }
        
        
        
    }
    
    this.setUsersByFacilityID = function(id){
        $('#tbody-users-list').empty().prepend('<tr class="loader-users-tbody"><td colspan="8" class="text-center"><skeleton-box lines="1"></skeleton-box></i></td></tr>')
        if (helper.getParameterByName('N')) {
            let networkGuid = helper.getParameterByName('N')
            return new Promise((resolve, reject) => {
                this.client.users2(networkGuid, id)
                .then((result) => {
                    if (result.errors.length > 0) {
                        $('#tbody-users-list')
                        .empty()
                        .append('<tr><td colspan="6"><p class="text-center">Not users found !</p></td></tr>')
                        reject(result.errors)
                    } else {
                        $('#tbody-users-list')
                        .empty()
                        if (result.payload.length > 0) {
                            result.payload.forEach(data => {
                                $('#tbody-users-list')
                                .append(
                                    $('<tr/>')
                                    .attr({'id':data.id})
                                    .append(
                                        $('<th/>')
                                        .addClass("border-0")
                                        .html('<div class="m-auto img-rounded"> <img src="./images/experience.png" class="img-fluid" alt="no-image"></div>')
                                    )
                                    .append(`
                                        <td class="name-tab border-0">${data.name}</td>
                                        <td class="text-tab border-0">${data.emailAddress}</td>
                                        <td class="text-tab border-0">${data.role}</td>
                                        <td class="eye-tab border-0 text-right">
                                            <a href="javascript:void(0)" class="view-user mr-3">
                                                <i class="fas fa-eye"></i> View
                                            </a> 
                                            <a href="javascript:void(0)" class="unlock-user mr-3 text-success">
                                                <i class="fas fa-unlock-alt fa-w-14"></i> Unlock
                                            </a>
                                            <a href="javascript:void(0)" class="lock-user">
                                                <i class="fas fa-lock fa-w-14"></i> Lock
                                            </a>
                                        </td>
                                    `)
                                )
                            });
                            //<a href="javascript:void(0)" class=" ml-4 text-success"><i class="fas fa-edit"></i> Edit </a>
                            this.showModalDetailsUserInfo('view-user');
                            let user = new usersNetwork(token, url, "")
                            user.disableUserModal('lock-user');
                            user.activeUserModal('unlock-user');
                            $('#table-users-list').DataTable();
                        }else{
                            $('#tbody-users-list').empty()
                            .append('<tr><td colspan="5"><p class="text-center">Not users found !</p></td></tr>')
                        }
                        resolve(result.payload)
                    }
                }).catch((err) => {
                    console.log(err);
                    $('#tbody-users-list')
                        .empty()
                        .append('<tr><td colspan="5"><p class="text-center">Not users found !</p></td></tr>')
                })
            
            });
           
        } else {
            new Promise((resolve, reject) => {
                this.client.medicalfacilities3(helper.getParameterByName('F'))
                .then((res) => {
                    if (res.errors.length > 0) {
                        $('#tbody-users-list')
                        .empty()
                        .append('<tr><td colspan="7"><p class="text-center">No provider found !</p></td></tr>')
                        console.log(res.errors);
                    } else {
                        let networkGuid = res.payload.medicalNetworkID
                        return new Promise((resolve, reject) => {
                            this.client.users2(networkGuid, id)
                            .then((result) => {
                                if (result.errors.length > 0) {
                                    $('#tbody-users-list')
                                    .empty()
                                    .append('<tr><td colspan="6"><p class="text-center">Not users found !</p></td></tr>')
                                    reject(result.errors)
                                } else {
                                    $('#tbody-users-list')
                                    .empty()
                                    if (result.payload.length > 0) {
                                        result.payload.forEach(data => {
                                            $('#tbody-users-list')
                                            .append(
                                                $('<tr/>')
                                                .attr({'id':data.id})
                                                .append(
                                                    $('<th/>')
                                                    .addClass('border-0')
                                                    .html('<div class="m-auto img-rounded"> <img src="./images/experience.png" class="img-fluid" alt="no-image"></div>')
                                                )
                                                .append(`
                                                    <td class="name-tab border-0">${data.name}</td>
                                                    <td class="text-tab border-0">${data.emailAddress}</td>
                                                    <td class="text-tab border-0">${data.role}</td>
                                                    <td class="eye-tab border-0 text-right">
                                                        <a href="javascript:void(0)" class="view-user mr-3">
                                                            <i class="fas fa-eye"></i> View
                                                        </a> 
                                                        <a href="javascript:void(0)" class="unlock-user mr-3 text-success">
                                                            <i class="fas fa-unlock-alt fa-w-14"></i> Unlock
                                                        </a>
                                                        <a href="javascript:void(0)" class="lock-user">
                                                            <i class="fas fa-lock fa-w-14"></i> Lock
                                                        </a>
                                                    </td>
                                                `)
                                            )
                                        });
                                        this.showModalDetailsUserInfo('view-user');
                                        let user2 = new usersNetwork(token, url, "")
                                        user2.disableUserModal('lock-user');
                                        user2.activeUserModal('unlock-user');
                                        $('#table-users-list').DataTable();
                                    }else{
                                        $('#tbody-users-list').empty()
                                        .append('<tr><td colspan="5"><p class="text-center">Not users found !</p></td></tr>')
                                    }
                                    resolve(result.payload)
                                }
                            }).catch((err) => {
                                console.log(err);
                                $('#tbody-users-list')
                                    .empty()
                                    .append('<tr><td colspan="5"><p class="text-center">Not users found !</p></td></tr>')
                            })
                        
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                })
            
            });
        }
        
        
        
    }
    
    this.setNetworkByfacilityID = function(){
        if (helper.getParameterByName('N')) {
            $('#tbody-network-list').empty().prepend('<tr class="loader-network-tbody"><td colspan="8" class="text-center"><skeleton-box lines="1"></skeleton-box></i></td></tr>')
            let id = helper.getParameterByName('N')
            return new Promise((resolve, reject) => {
                this.client.medicalnetworks4(id)
                .then((result) => {
                    if (result.errors.length > 0) {
                        $('#tbody-network-list')
                        .empty()
                        .append('<tr><td colspan="6"><p class="text-center">Not users found !</p></td></tr>')
                        reject(result.errors)
                    } else {
                        $('#tbody-network-list')
                        .empty()
                        if (result.payload != null) {
                            let data = result.payload
                            $('#tbody-network-list')
                                .append(
                                    $('<tr/>')
                                    .attr({'id':data.id})
                                    .append('<th scope="row" class="fs-small" rowspan="2" width="100"><div class="img-profile" style="border-radius: 50%; background-color: '+helper.getRandomColor()+'; width: 100px; height: 100px"><div class="w-100 h-100 d-flex align-items-center text-center"><div class="text-white text-center w-100 mh-25" style="font-size: 2.5rem;">'+data.name.substring(0, 2).toUpperCase()+'</div></div></div></th>')
                                    .append('<th scope="row" class="fs-normal fw-normal" rowspan="2" style="width:150px;padding-top: 1.5rem !important">'+data.name+'<div class="text-color-gray pt-1">'+data.city+' /'+data.state+' </div></th>')
                                    .append('<th scope="row" class="fs-small" style="width:150px;padding-top: 1.6rem !important">Emaill Address :</th><td class="fs-small text-color-graylight" style="padding-top: 1.6rem !important">'+data.emailAddress+'</td>')
                                    .append('<td class="" width="280" style="vertical-align: middle!important" rowspan="2"><ul class="nav justify-content-end"><li class="nav-item p-3"> </li></ul></td>')
                                )
                                .append(
                                    $('<tr/>')
                                    .append('<th scope="row" class="fs-small" style="padding-top: 0rem !important">Address Line :</th><td class="fs-small text-color-graylight" style="padding-top: 0rem !important">'+data.addressLine1+'</td>')
                                )
                        }else{
                        
                        }
                        
                        resolve(result.payload)
                    }
                }).catch((err) => {
                    
                })
                
            })
        } else {
            new Promise((resolve, reject) => {
                this.client.medicalfacilities3(helper.getParameterByName('F'))
                .then((res) => {
                    if (res.errors.length > 0) {
                        $('#tbody-network-list')
                        .empty()
                        .append('<tr><td colspan="7"><p class="text-center">No network found !</p></td></tr>')
                        console.log(res.errors);
                    } else {
                        let id = res.payload.medicalNetworkID
                        return new Promise((resolve, reject) => {
                            this.client.medicalnetworks4(id)
                            .then((result) => {
                                if (result.errors.length > 0) {
                                    $('#tbody-network-list')
                                    .empty()
                                    .append('<tr><td colspan="6"><p class="text-center">Not users found !</p></td></tr>')
                                    reject(result.errors)
                                } else {
                                    $('#tbody-network-list')
                                    .empty()
                                    if (result.payload != null) {
                                        let data = result.payload
                                        $('#tbody-network-list')
                                            .append(
                                                $('<tr/>')
                                                .attr({'id':data.id})
                                                .append('<th scope="row" class="fs-small" rowspan="2" width="100"><div class="img-profile" style="border-radius: 50%; background-color: '+helper.getRandomColor()+'; width: 100px; height: 100px"><div class="w-100 h-100 d-flex align-items-center text-center"><div class="text-white text-center w-100 mh-25" style="font-size: 2.5rem;">'+data.name.substring(0, 2).toUpperCase()+'</div></div></div></th>')
                                                .append('<th scope="row" class="fs-normal fw-normal" rowspan="2" style="width:150px;padding-top: 1.5rem !important">'+data.name+'<div class="text-color-gray pt-1">'+data.city+' /'+data.state+' </div></th>')
                                                .append('<th scope="row" class="fs-small" style="width:150px;padding-top: 1.6rem !important">Emaill Address :</th><td class="fs-small text-color-graylight" style="padding-top: 1.6rem !important">'+data.emailAddress+'</td>')
                                                .append('<td class="" width="280" style="vertical-align: middle!important" rowspan="2"><ul class="nav justify-content-end"><li class="nav-item p-3"> </li></ul></td>')
                                            )
                                            .append(
                                                $('<tr/>')
                                                .append('<th scope="row" class="fs-small" style="padding-top: 0rem !important">Address Line :</th><td class="fs-small text-color-graylight" style="padding-top: 0rem !important">'+data.addressLine1+'</td>')
                                            )
                                    }else{
                                    
                                    }
                                    
                                    resolve(result.payload)
                                }
                            }).catch((err) => {
                                
                            })
                            
                        })
                    }
                }).catch((err) => {
                    console.log(err);
                })
            
            });
        }
    }
    
    this.showModalDetailsUserInfo = function(name){
        $('.'+name).click(function(){
            let t = $(this)
            let id = t.parent().parent().attr('id')
            //console.log(id);
            new Promise((resolve, reject) => {
                th.client.medicalnetworkusers3(id)
                .then((res) => {
                    if (res.errors.length > 0) {
                        console.log(res.errors);
                    } else {
                        let data = res.payload
                        console.log(data);
                        let body = `
                            <div class="px-4 pb-4">
                                <div class="row pt-3 mx-auto">
                                    <div class="col-lg-12 pl-0 mb-2">
                                        <div class="px-0 border-0">
                                            <div class="row">
                                                <div class="col-lg-3">
                                                    <img src="/images/avatar.png" class="d-none d-sm-block rounded-circle" alt="Image description">
                                                    <img src="/images/avatar.png" class="d-block d-sm-none rounded-circle" alt="Image description">
                                                </div>
                                                <div class="col-lg-9">
                                                    <div class="pt-4">
                                                        <div class="card-title p-0 mb-1">
                                                            <h2 class="font-weight-bold mb-1 ">Name : <small>${data.name}</small></h2> 
                                                        </div>
                                                        <div class="card-title p-0 mb-1">
                                                            <h2 class="font-weight-bold mb-1 mr-1">Email : <small>${data.emailAddress}</small></h2> 
                                                        </div>
                                                        <div class="card-title p-0 mb-1">
                                                            <h2 class="font-weight-bold mb-1 mr-1">Role : <small>${data.role}</small></h2> 
                                                        </div>
                                                        <div class="card-title p-0 mb-1">
                                                            <h2 class="font-weight-bold mb-1 mr-1">Status : <small>${(data.isActive == true ? '<r class="text-success">Active</r>' : '<r class="text-danger">Inactive</r>')}</small></h2> 
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        $('body').append(helper.createModal('view-user-modal', "Information user : "+data.name, body, "none" , 'lg'));
                        $('#view-user-modal').modal('show');
                        
                        $('#view-user-modal').on('hide.bs.modal', function (e) {
                            setTimeout(function(){
                                $('#view-user-modal').remove()
                            },500)
                        })
                        
                    }
                }).catch((err) => {
                    
                })
            })
        })
        
        
    }
    

}