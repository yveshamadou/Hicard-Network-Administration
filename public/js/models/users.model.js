import { Client } from './hiCardAPI.js';
import { Client2 } from './AsmSecurityAPI.js';
import {utils} from '../helpers/utils.js'
import {setToken} from './http.js'
import {userNetwork} from './userNetwork.model.js'

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
                    let networkGuid = $('#usersNetworkGuid').val();
                    //helper.toastr('success','top-full-width',1000, "Create user "+datas.name+" with succesfull.")
                    $('#form-create-users').attr({'method':'post', 'action':'/create_users'}).append('<input type="hidden" id="currentUrl" name="currentUrl" value="'+window.location.href+'" class="form-control" >').submit()
                    
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
            body += '<legend class="px-2 py-2">Generale Informations</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-12">'
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
            body += '<input type="text" id="usersFirstName" name="usersFirstName" class="form-control required" >  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersLastName" class="fs-small2 fw-medium w-100 font-weight-bold">Last Name : '
            body += '<input type="text" id="usersLastName" name="usersLastName" class="form-control required" >  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersEmail" class="fs-small2 fw-medium w-100">Email Address :'
            body += '<input type="text" id="usersEmail" name="usersEmail" class="form-control required" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="usersGender" class="fs-small2 w-100 fw-medium">Gender :'
            body += '<select id="usersGender" name="usersGender" class="custom-select required">'
            body += '<option value="" selected disabled>Choose a gender</option>'
            body += '<option value="M" >Male</option>'
            body += '<option value="F" >Female</option>'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2">Associate To Network</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-12">'
            body += '<label for="usersNetworkGuid" class="fs-small2 w-100 fw-medium">Network :'
            body += '<select id="usersNetworkGuid" name="usersNetworkGuid" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '</form>'
            
            let footer = '<button id="btn-save-users-form"  class="btn btn-primary">Save</button>';
            
            $('body').append(helper.createModal('modal-create-users', "Create a New Users", body, footer , 'lg'));
            $('#modal-create-users').modal('show')
            
            $('#modal-create-users').on('hide.bs.modal', function (e) {
                setTimeout(function(){
                    $('#modal-create-users').remove()
                },1000)
            })
            let save = new usersNetwork($.cookie("ACCESS_TOKEN"),url, url2)
            
            save.saveUsersModal('create')
            save.setAllNetwork("usersNetworkGuid")
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
        if (helper.getParameterByName('id')) {
            network.getNetworkApi(helper.getParameterByName('id'))
            .then((result) => {
                if (result.errors.length > 0) {
                    $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
                } else {
                    $('#'+id).empty()
                    $('#'+id).append('<option value="'+result.payload.id+'">'+result.payload.name+'</option>')
                    $('#'+id).val(result.payload.id).change() 
                }
                $('#'+id).parent().find('.select-loader-network').remove()
                $('#'+id).removeAttr('disabled')
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
    
    
    
    

}