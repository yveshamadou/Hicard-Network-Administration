import { Client } from './hiCardAPI.js';
import { Client2 } from './AsmSecurityAPI.js';
import {utils} from '../helpers/utils.js'
import {setToken} from './http.js'
import {userNetwork} from './userNetwork.model.js'
import { facilityNetwork } from './facility.model.js';
import { providerNetwork } from './provider.model.js';

new setToken ($.cookie("ACCESS_TOKEN"))
let helper = new utils()

export function usersNetwork(token, url, url2) {
    this.client = new Client(url)
    this.security = new Client2(url2)
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
    
    
    this.getUsersApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.users2(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getAllFacilitiesByUserID = function (id){
        return new Promise((resolve, reject) => {
            this.client.users(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getAllUsersSecurityModule = function (){
        return new Promise((resolve, reject) => {
            this.security.users().then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.createUsersSecurityModule = function (body){
        return new Promise((resolve, reject) => {
            this.security.newApplicationUser(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.updateUsersSecurityModule = function (body){
        return new Promise((resolve, reject) => {
            this.security.updateUserAttributes(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.assosciateUsersToNetwork = function (id,networkID,body){
        return new Promise((resolve, reject) => {
            this.client.networks(id,networkID,body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.createUsersApi = function (id,body){
        return new Promise((resolve, reject) => {
            this.client.medicalnetworkusers(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.updateUsersApi = function (id,body){
        return new Promise((resolve, reject) => {
            this.client.facilities2(id,body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.deleteUsersApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities5(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.saveUsersModal = function (name){
        if (name == "create") {
            $('#btn-save-users-form').on('click', function(){
                helper.setNextButtonLoader($(this))
                $('#form-create-users div.errors').empty()
               if (helper.validateForm('form-create-users').length > 0) {
                helper.removeNextButtonLoader($(this))
               } else {
                    let datas = {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "emailAddress": $('#usersEmail').val(),
                        "firstName": $('#usersFirstName').val(),
                        "lastName": $('#usersLastName').val(),
                        "userId": $('#usersGuid').val(),
                        "networkRecordGuid": $('#usersNetworkGuid').val(),
                        "role": $('#usersRoles').val(),
                        "name": $('#usersFirstName').val() + $('#usersLastName').val()
                    }
                    let url = url2+'/api/security/getUserId/'
                    let networkGuid = $('#usersNetworkGuid').val();
                    let facilityGuid = $('#usersFacilityGuid').val();
                    //console.log(networkGuid);
                    $.ajax({
                        url: url+helper.parseJwt($.cookie('ACCESS_TOKEN')).client_id+'/'+$('#usersEmail').val(),
                        type: "GET",
                        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+$.cookie("ACCESS_TOKEN"));},
                    })
                    .done(function(data) {
                       if (data.payload != "00000000-0000-0000-0000-000000000000") {
                        $('#form-create-users').attr({'method':'POST', 'action':'/create_users'})
                        .append('<input type="hidden" id="currentUrl" name="currentUrl" value="'+window.location.href+'" class="form-control" >')
                        .append('<input type="hidden" id="usersGuid" name="usersGuid" value="'+data.payload+'" class="form-control" >')
                        .append('<input type="hidden"  name="usersNetworkGuid" value="'+networkGuid+'" class="form-control" >')
                        .submit()
                       } else {
                        $('#form-create-users').attr({'method':'POST', 'action':'/create_users'})
                        .append('<input type="hidden" id="currentUrl" name="currentUrl" value="'+window.location.href+'" class="form-control" >')
                        .append('<input type="hidden"  name="usersNetworkGuid" value="'+networkGuid+'" class="form-control" >')
                        .submit()
                       }
                    })
                    .fail(function() {
                        alert( "error" );
                    })
                    .always(function() {
                    
                    });
                    
                    //helper.toastr('success','top-full-width',1000, "Create user "+datas.name+" with succesfull.")
                    /* $('#form-create-users').attr({'method':'POST', 'action':'/create_users'})
                    .append('<input type="hidden" id="currentUrl" name="currentUrl" value="'+window.location.href+'" class="form-control" >')
                    .submit() */
                    
               }
            })
        } else {
            $('#btn-update-users-form').on('click', function(){
                helper.setNextButtonLoader($(this))
                $('#form-update-users div.errors').empty()
               if (helper.validateForm('form-create-users').length > 0) {
                helper.removeNextButtonLoader($(this))
               } else {
                    let datas = {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "emailAddress": $('#usersEmail').val(),
                        "firstName": $('#usersFirstName').val(),
                        "lastName": $('#usersLastName').val(),
                        "userId": $('#usersGuid').val(),
                        "networkRecordGuid": $('#usersNetworkGuid').val(),
                        "role": $('#usersRoles').val(),
                        "name": $('#usersFirstName').val() + $('#usersLastName').val()
                    }
                    let networkGuid = $('#usersNetworkGuid').val();
                    let user = new usersNetwork(token, url, url2)
                    console.log(datas);
                    user.createUsersApi(networkGuid,datas).then((result) => {
                        if (result.errors.length > 0) {
                            $('#form-update-users div.errors').empty()
                            helper.removeNextButtonLoader($(this))
                            result.errors.forEach((value) => {
                                $('#form-update-users div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                            })
                        } else {
                            let assoc = {
                                "role": datas.role
                            }
                            user.assosciateUsersToNetwork(result.payload,datas.networkRecordGuid, assoc).then((data) => {
                                if (data.errors.length > 0) {
                                    $('#form-update-users div.errors').empty()
                                    data.errors.forEach((val) => {
                                        $('#form-update-users div.errors').append('<p class="text-center text-danger">'+val.description+'</p>')
                                    })
                                }else{
                                    helper.toastr('success','top-full-width',1000, "Create user "+datas.name+" with succesfull.")
                                    $('#form-update-users').attr({'method':'post', 'action':'/update_users'}).append('<input type="hidden" id="currentUrl" name="currentUrl" value="'+window.location.href+'" class="form-control" >').submit()
                                    $('#modal-create-users').modal('dispose')
                                }
                            }).catch((err) => {
                                helper.removeNextButtonLoader($(this))
                                $('#form-update-users').append('<p class="text-center alert-danger">Associate</p>')
                            })
                            helper.removeNextButtonLoader($(this))
                            
                        }
                    }).catch((err) => {
                        helper.removeNextButtonLoader($(this))
                        $('#form-update-users').append('<p class="text-center alert-danger">Connecion error</p>')
                    })
                    
               }
            })
        }
        
        
    }
    
    this.showModalCreateUsers = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let body = '<form id="form-create-users">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2">General Informations</legend>'
            body += '<div class="row">'
            
            if (helper.parseJwt($.cookie('ACCESS_TOKEN')).hc_na_role == "SystemAdministrator") {
                body += '<div class="col-lg-12">'
                body += '<label for="usersRoles" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Role :'
                body += '<select id="usersRoles" name="usersRoles" class="custom-select required">'
                body += '<option value="" selected disabled>Choose a role</option>'
                body += '<option value="SystemAdministrator" >HiCard System Administrator</option>'
                body += '<option value="NetworkAdministrator" >Contract Administrator</option>'
                body += '<option value="FacilityAdministrator" >Facility Administrator</option>'
                body += '<option value="User" >User</option>'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
            }else if (helper.parseJwt($.cookie('ACCESS_TOKEN')).hc_na_role == "NetworkAdministrator"){
                body += '<div class="col-lg-12">'
                body += '<label for="usersRoles" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Role :'
                body += '<select id="usersRoles" name="usersRoles" class="custom-select required">'
                body += '<option value="" selected disabled>Choose a role</option>' 
                body += '<option value="NetworkAdministrator" >Contract Administrator</option>'
                body += '<option value="FacilityAdministrator" >Facility Administrator</option>'
                body += '<option value="User" >User</option>'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
            } else {
                body += '<div class="col-lg-12">'
                body += '<label for="usersRoles" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Role :'
                body += '<select id="usersRoles" name="usersRoles" class="custom-select required">'
                body += '<option value="" selected disabled>Choose a role</option>'
                body += '<option value="FacilityAdministrator" >Facility Administrator</option>'
                body += '<option value="User" >User</option>'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
            }
            
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersFirstName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>First Name : '
            body += '<input type="text" id="usersFirstName" name="usersFirstName" class="form-control required" >  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersLastName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Last Name : '
            body += '<input type="text" id="usersLastName" name="usersLastName" class="form-control required" >  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersEmail" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>Email Address :'
            body += '<input type="text" id="usersEmail" name="usersEmail" class="form-control required" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersPhone" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Phone Number :'
            body += '<input type="text" id="usersPhone" name="usersPhone" class="form-control required" placeholder="Phone Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2">Associate To Contract</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-12">'
            body += '<label for="usersNetworkGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Contract :'
            body += '<select id="usersNetworkGuid"  class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            if (helper.getParameterByName('F')) {
                body += '<div class="d-flex"> '
                body += '<fieldset class="col-lg-12 mb-3"> '
                body += '<legend class="px-2 py-2">Associate To Facility</legend>'
                body += '<div class="row">'
                
                body += '<div class="col-lg-12">'
                body += '<label for="usersFacilityGuid" class="fs-small2 w-100 fw-medium">Facility :'
                body += '<select id="usersFacilityGuid" name="usersFacilityGuid" class="custom-select required">'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
                
                body += '</div>'
                body += '</fieldset>'
                body += '</div>'
            }else{
            
                body += '<div class="d-flex"> '
                body += '<fieldset class="col-lg-12 mb-3"> '
                body += '<legend class="px-2 py-2">Associate To Facility</legend>'
                body += '<div class="row">'
                
                body += '<div class="col-lg-12">'
                body += '<label for="chooseUsersFacility" class="fs-small2 w-100 fw-medium">Do you want to associate this user with a facility ?'
                body += '<select id="chooseUsersFacility" class="custom-select required">'
                body += '<option value="" selected>Choose</option>'
                body += '<option value="Yes" >Yes</option>'
                body += '<option value="No" >No</option>'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
                
                body += '<div class="col-lg-12">'
                body += '<div id="yesUsersFacilityAnswer"></div>'
                body += '</div>'
                
                body += '</div>'
                body += '</fieldset>'
                body += '</div>'
            
            }
            
            body += '</form>'
            
            let footer = '<button id="btn-save-users-form"  class="btn btn-primary">Save</button>';
            
            $('body').append(helper.createModal('modal-create-users', "Create a New User", body, footer , 'lg'));
            $('#modal-create-users').modal('show')
            
            $('#modal-create-users').on('hide.bs.modal', function (e) {
                setTimeout(function(){
                    $('#modal-create-users').remove()
                },1000)
            })
            let save = new usersNetwork($.cookie("ACCESS_TOKEN"),url, url2)
            
            save.saveUsersModal('create')
            save.setAllNetwork("usersNetworkGuid")
            let provider = new providerNetwork(token, url)
            if (helper.getParameterByName('F')) {
                provider.setAllFacility('usersFacilityGuid', helper.getParameterByName('F'))
            }
            
            $('#chooseUsersFacility').on('change', function(){
                let t = $(this)
                if (t.val() == "Yes") {
                    let f = '';
                    f += '<label for="usersFacilityGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Facility :'
                    f += '<select id="usersFacilityGuid" name="usersFacilityGuid" class="custom-select required">'
                    f += '</select>'
                    f += '<small class="form-text"></small></label>'
                    $('div#yesUsersFacilityAnswer').empty().append(f)
                    provider.setAllFacility('usersFacilityGuid', $('#usersNetworkGuid').val())
                } else if (t.val() == "No") {
                    $('div#yesUsersFacilityAnswer').empty()
                }else {
                    console.log(t.val());
                }
            })
        });
        
        
        
        
    }
    
    this.showModalUpdateUsers = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let body = '<form id="form-update-users">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2">Generale Informations</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-12">'
            body += '<label for="usersNetworkGuid" class="fs-small2 w-100 fw-medium">Network :'
            body += '<select id="usersNetworkGuid" name="usersNetworkGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersGuid" class="fs-small2 w-100 fw-medium">User :'
            body += '<select id="usersGuid" name="usersGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersRoles" class="fs-small2 w-100 fw-medium">Role :'
            body += '<select id="usersRoles" name="usersRoles" class="custom-select required">'
            body += '<option value="" selected disabled>Choose a role</option>'
            body += '<option value="SystemAdministrator" >System Administrator</option>'
            body += '<option value="NetworkAdministrator" >Network Administrator</option>'
            body += '<option value="FacilityAdministrator" >Facility Administrator</option>'
            body += '<option value="User" >User</option>'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersFirstName" class="fs-small2 fw-medium w-100 font-weight-bold">First Name : '
            body += '<input type="text" id="usersFirstName" class="form-control required" >  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersLastName" class="fs-small2 fw-medium w-100 font-weight-bold">Last Name : '
            body += '<input type="text" id="usersLastName" class="form-control required" >  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersEmail" class="fs-small2 fw-medium w-100">Email Address :'
            body += '<input type="text" id="usersEmail" class="form-control required" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersPhone" class="fs-small2 fw-medium w-100 ">Phone Number :'
            body += '<input type="text" id="usersPhone" class="form-control required" placeholder="Phone Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '</form>'
            
            let footer = '<button id="btn-update-users-form"  class="btn btn-primary">Save</button>';
            
            $('body').append(helper.createModal('modal-update-users', "Update user", body, footer , 'lg'));
            $('#modal-update-users').modal('show')
            
            $('#modal-update-users').on('hide.bs.modal', function (e) {
                $("#form-update-users input").each(function(){
                    $(this).val('')
                })
                
                $("#form-update-users select").each(function(){
                    $(this).val('').change()
                })
                
                $("#form-update-users textarea").each(function(){
                    $(this).val('')
                })
            })
            let save = new usersNetwork($.cookie("ACCESS_TOKEN"),url, url2)
            
            save.saveUsersModal('update')
            save.setAllNetwork("usersNetworkGuid")
            //save.setAllUsers('usersGuid')
        });
        
        
        
        
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
                $('#'+id).change(function(){
                    let guid = $(this).val()
                    let provider = new providerNetwork(token, url)
                    provider.setAllFacility('usersFacilityGuid', guid)
                })
            }).catch((err) => {
                console.log(err);
                $('#'+id).parent().find('.select-loader-network').remove()
                $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<p class="text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</p>')
            })
            
        }
        else if (helper.getParameterByName('F')){
        
            new Promise((resolve, reject) => {
                this.client.medicalfacilities3(helper.getParameterByName('F'))
                .then((res) => {
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
                            $('#'+id).change(function(){
                                let guid = $(this).val()
                                let provider = new providerNetwork(token, url)
                                provider.setAllFacility('usersFacilityGuid', guid)
                            })
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
                $('#'+id).change(function(){
                    let guid = $(this).val()
                    let provider = new providerNetwork(token, url)
                    provider.setAllFacility('usersFacilityGuid', guid)
                })
            }).catch((err) => {
                console.log(err);
                $('#'+id).parent().find('.select-loader-network').remove()
            })
        }
        
        
    }
    
    this.setAllUsers = function(id){
        $('#'+id).attr({'disabled':'disabled'}).parent().prepend('<i class="fa fa-spinner fa-spin select-loader-users"></i>')
        this.getAllUsersSecurityModule()
        .then((result) => {
            if (result.errors.length > 0) {
                $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
            } else {
                $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a user</option>')
                result.payload.forEach(data => {
                    $('#'+id).append('<option value="'+data.userGuid+'">'+data.userName+'</option>')
                });
                $('#'+id).val('').change() 
                $('#'+id).removeAttr('disabled')
               
            }
            $('#'+id).parent().find('.select-loader-users').remove()
            $('#'+id).change(function(){
                if ($(this).val() != "") {
                    let at = $(this).attr('id')
                    let email = $('#'+at).find('option[value='+$(this).val()+']').text()
                    $('#usersEmail').empty().val(email)
                }
                
            }) 
        }).catch((err) => {
            console.log(err);
            $('#'+id).parent().find('.select-loader-users').remove()
            $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<p class="text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</p>')
        })
        
        
    }
    
    this.showModalDetailsUserInfo = function(name){
        new Promise((resolve, reject) => {
            this.client.medicalnetworkusers2()
        })
        let body = `
            <div class="px-4 pb-4">
                <div class="row pt-3 mx-auto">
                    <div class="col-lg-6 pl-0 mb-2">
                        <div class="px-0 border-0">
                            <div class="row">
                                <div class="col-lg-4">
                                    <img src="/images/avatar.png" class="d-none d-sm-block rounded-circle" alt="Image description">
                                    <img src="/images/avatar.png" class="d-block d-sm-none rounded-circle" alt="Image description">
                                </div>
                                <div class="col-lg-8">
                                    <div class="pt-4">
                                        <div class="card-title p-0 mb-1">
                                            <h2 class="font-weight-bold mb-1">John Doe</h2>
                                        </div>
                                        <small>Burnville <i class="fas fa-circle fa-sm text-sm text-success mx-2"></i> MN</small>
                                        <small>john.doe@gmail.com</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 pr-lg-0 mb-2">
                        <div class="card border-0 pt-4 bg-white">
                            <div class="card-title p-0 mb-1">
                                <span class="hi-text-blue-primary">Roles :</span>
                            </div>
                            <small>
                                Admin
                            </small>
                        </div>
                    </div>
                    <div class="col-lg-6  pl-0 mt-2">
                        <div class="card border-0 pt-2">
                            <div class="card-title border-bottom mb-3">
                                <span class="">Personal Informations</span>
                            </div>
                            <div class="d-flex justify-content-start mb-2">
                                <span class="font-weight-bold hi-text-blue-primary mr-2">NPI :</span>
                                <small class="font-weight-lighter pt-1">HHHH</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 pl-0 mt-2">
                        <div class="card border-0 pt-2">
                            <div class="card-title border-bottom mb-4">
                                <span class="">Address</span>
                            </div>
                            
                            <div class="d-flex justify-content-start mb-2">
                                <span class="font-weight-bold hi-text-blue-primary mr-2">Address Line 1 :</span>
                                <small class="font-weight-lighter pt-1">1254 </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        //let footer = '<button id="btn-save-users-form"  class="btn btn-primary">Save</button>';
            
        //$('body').append(helper.createModal('dej', "Create a New User", body, "none" , 'lg'));
        //$('#dej').modal('show');
        
        $('#dej').on('hide.bs.modal', function (e) {
            setTimeout(function(){
                $('#dej').remove()
            },500)
        })
        
    }
    
    
    
    

}