import { Client } from './hiCardAPI.js';
import {utils} from '../helpers/utils.js'
import {setToken} from './http.js'
import {facilityNetwork} from './facility.model.js'
import {usersNetwork} from './users.model.js'
import { providerNetwork } from './provider.model.js';

new setToken ($.cookie("ACCESS_TOKEN"))
let helper = new utils()

export function userNetwork(token, url) {
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
    
    this.getNetworkByUser = function (){
        
        let id = helper.parseJwt(this.token).nameid
        
        return new Promise((resolve, reject) => {
        
            this.client.networks2(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                $('#main').show().empty().append('<p class="text-center alert-warning">Something Wrong. Please <a href="/logout" class="btn btn-sm btn-outline-primary">go back</a> to login page </p>')
                $('div.loader-full').remove()
                reject(err)
                
                
            })
        
        })
    
    }
    
    this.getAllNetworkApi = function (){
        return new Promise((resolve, reject) => {
            this.client.medicalnetworks().then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getAllFacilityByNetworkGuid = function (id){
        return new Promise((resolve, reject) => {
            this.client.facilities(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getAllProvidersByNetworkGuid = function (id){
        return new Promise((resolve, reject) => {
            this.client.providers(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getUsersByNetworkGuid = function (id){
        return new Promise((resolve, reject) => {
            this.client.users(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.getNetworkApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.medicalnetworks4(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
            })
        
        })
    }
    
    this.createNetworkApi = function (body){
        return new Promise((resolve, reject) => {
            this.client.medicalnetworks2(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.updateNetworkApi = function (body){
        return new Promise((resolve, reject) => {
            this.client.medicalnetworks3(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.deleteNetworkApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.medicalnetworks5(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.saveNetworkModal = function (name){
        if (name == "update") {
            $('#btn-update-network-form').on('click', function(){
                helper.setNextButtonLoader($(this))
               if (helper.validateForm('form-update-network').length > 0) {
                helper.removeNextButtonLoader($(this))
               } else {
                   let datas = {
                        "id": $('#updateNetworkGuid').val(),
                        "accountNumber": "000000000000",
                        "addressLine1": $('#networkAddLine1').val(),
                        "addressLine2": $('#networkAddLine2').val(),
                        "city": $('#networkCity').val(),
                        "contactName": $('#networkContactName').val(),
                        "description": $('#networkDescription').val(),
                        "emailAddress": $('#networkEmail').val(),
                        "faxNumber": $('#networkFax').val(),
                        "mainPhoneNumber": $('#networkPhone').val(),
                        "name": $('#networkName').val(),
                        "postalCode": $('#networkPostalCode').val(),
                        "state": $('#networkState').val()
                    }
                    let user = new userNetwork(token, url)
                    
                    user.updateNetworkApi(datas).then((result) => {
                        if (result.errors.length > 0) {
                            $('#form-update-network div.errors').empty()
                            result.errors.forEach((value) => {
                                $('#form-update-network div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                            })
                        } else {
                            helper.toastr('success','top-full-width',1000, "Update "+datas.name+" with succesfull.")
                            $('#modal-update-network').modal('hide')
                            setTimeout(function(){window.location.href = ""},1500)
                        }
                        helper.removeNextButtonLoader($(this))
                    }).catch((err) => {
                        helper.removeNextButtonLoader($(this))
                        console.log(err);
                        $('#form-update-network').append('<p class="text-center alert-danger">erreur2</p>')
                    })
                    
               }
            })
        } else {
            $('#btn-save-network-form').on('click', function(){
                helper.setNextButtonLoader($(this))
               if (helper.validateForm('form-create-network').length > 0) {
                helper.removeNextButtonLoader($(this))
               } else {
                   let datas = {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "accountNumber": "000000000000",
                        "addressLine1": $('#networkAddLine1').val(),
                        "addressLine2": $('#networkAddLine2').val(),
                        "city": $('#networkCity').val(),
                        "contactName": $('#networkContactName').val(),
                        "description": $('#networkDescription').val(),
                        "emailAddress": $('#networkEmail').val(),
                        "faxNumber": $('#networkFax').val(),
                        "mainPhoneNumber": $('#networkPhone').val(),
                        "name": $('#networkName').val(),
                        "postalCode": $('#networkPostalCode').val(),
                        "state": $('#networkState').val()
                    }
                    let user = new userNetwork(token, url)
                    
                    user.createNetworkApi(datas).then((result) => {
                        
                        if (result.errors.length > 0) {
                            $('#form-create-network div.errors').empty()
                            result.errors.forEach((value) => {
                                $('#form-create-network div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                            })
                        } else {
                            console.log(result.payload);
                            $('#modal-create-network').modal('hide')
                            helper.toastr('success','top-full-width',1000, "Create "+datas.name+" with succesfull.")
                            user.showAllNetwork()
                        }
                        helper.removeNextButtonLoader($(this))
                    }).catch((err) => {
                        helper.removeNextButtonLoader($(this))
                        $('#form-create-network').append('<p class="text-center alert-danger">erreur2</p>')
                    })
                    
               }
            })
        }
       
        
    }
    
    this.showNetworkByUserID = function(){
        this.getNetworkByUser().then((result) => {
            if (result.errors.length > 0) {
                $('#network-content').html("<p class='text-center alert-warning'> Not Found</p>")
            } else {
                $('#network-content').empty()
                if (result.payload.length > 0) {
                    
                    result.payload.forEach((network,i) => {
                        $('#network-content').append(
                            $('<div/>')
                            .addClass('media-main bg-white col-lg-3 col-md-3 col-sm-5  col-12 p-3 mx-4 mb-3 shadow-sm')
                            .attr({'style':'border-radius: 5px'})
                            .append(
                                $('<div/>')
                                .addClass('media py-3')
                                .append(
                                    '<img class="rounded mx-auto d-block img circle" src="/images/hospital2.png" alt="images"height="100" width="100" style="object-fit: cover;border-radius: 50%!important"><div class="media-body ml-3 mt-3"><div class="mb-2 fs-small2 fw-medium name">'+network.name+'</div><p class="fs-small fw-medium text-color-gray">'+network.description+'<p></div>'
                                )
                            )
                            .append(
                                $('<div/>')
                                .append(
                                    '<div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Mail address :</div><div class="fs-small w-100 text-color-gray">'+network.emailAddress+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Address Line 1 :</div><div class="fs-small w-100 text-color-gray">'+network.addressLine1+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">City :</div><div class="fs-small w-100 text-color-gray">'+network.city+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Phone Number :</div><div class="fs-small w-100 text-color-gray">'+network.mainPhoneNumber+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Fax Number :</div><div class="fs-small w-100 text-color-gray">'+network.faxNumber+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Postal Code :</div><div class="fs-small w-100 text-color-gray">'+network.postalCode+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">State :</div><div class="fs-small w-100 text-color-gray">'+network.state+'</div></div>'
                                )
                            )
                            .append(
                                $('<div/>')
                                .addClass('py-3')
                                .append(
                                    '<a href="/user_network_details?N='+network.id+'" class="btn btn-outline-primary w-100" role="button">More view</a>'
                                )
                            )
                        )
                    });
                    
                    
                    $('div.loader-full').remove()
                    $('#main').show()
                    helper.filterCard()
                } else {
                    $('div.loader-full').hide()
                    $('#main').show().find('div#network-content').empty().html("<p class='text-center container text-info fs-normal fw-normal'> <i class='fas fa-info-circle fa-lg mr-2'></i> Not Found</p>")
                }
            }
        }).catch((err) => {
            $('#main').show().empty().append('<p class="text-center alert-warning">Something Wrong. Please <a href="/logout" class="btn btn-sm btn-outline-primary">go back</a> to login page</p>')
            $('div.loader-full').remove()
            console.log(err);
        })
    }
    
    this.showAllNetwork = function(){
        $('div.loader-full').show()
        $('#main').hide()
        this.getAllNetworkApi().then((result) => {
            if (result.errors.length > 0) {
                $('#network-content').html("<p class='text-center alert-warning'> Not Found</p>")
            } else {
                $('#network-content').empty()
                if (result.payload.length > 0) {
                    
                    result.payload.forEach((network,i) => {
                        $('#network-content').append(
                            $('<div/>')
                            .addClass('col-lg-3 col-md-3 col-sm-5  col-12 mb-3 ')
                            .append(
                                $('<div/>')
                                .addClass('bg-white shadow-sm p-3')
                                .attr({'style':'border-radius: 5px'})
                                .append(
                                    $('<div/>')
                                    .addClass('media py-3')
                                    .append(
                                        '<img class="rounded mx-auto d-block img circle" src="/images/hospital2.png" alt="images"height="100" width="100" style="object-fit: cover;border-radius: 50%!important"><div class="media-body ml-3 mt-3"><div class="mb-2 fs-small2 fw-medium name">'+network.name+'</div><p class="fs-small fw-medium text-color-gray">'+network.description+'<p></div>'
                                    )
                                )
                                .append(
                                    $('<div/>')
                                    .append(
                                        '<div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Mail address :</div><div class="fs-small w-100 text-color-gray">'+network.emailAddress+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Address Line 1 :</div><div class="fs-small w-100 text-color-gray">'+network.addressLine1+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">City :</div><div class="fs-small w-100 text-color-gray">'+network.city+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Phone Number :</div><div class="fs-small w-100 text-color-gray">'+network.mainPhoneNumber+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Fax Number :</div><div class="fs-small w-100 text-color-gray">'+network.faxNumber+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">Postal Code :</div><div class="fs-small w-100 text-color-gray">'+network.postalCode+'</div></div><div class="d-flex p-1"><div class="fs-small w-100 fw-normal">State :</div><div class="fs-small w-100 text-color-gray">'+network.state+'</div></div>'
                                    )
                                )
                                .append(
                                    $('<div/>')
                                    .addClass('py-3')
                                    .append(
                                        '<a href="/user_network_details?N='+network.id+'" class="btn btn-outline-primary w-100" role="button">More view</a>'
                                    )
                                )
                            )
                            
                        )
                    });
                    
                    
                    /* $('#network-content').append(
                        '<div class="media-main bg-white col-lg-3 col-md-3 col-sm-5 col-12 p-3 mb-3 border shadow-sm create-network" style="border-radius: 5px; cursor:pointer;"><div class="symbol p-3"><div class="rounded m-auto fw-light fs-big " style="width: 100px; height: 100px;border: 2.5px dashed #005EA3"><div class="bg-pink plusSymbole" role="plusSymbole"></div></div><div class="text-primary mt-3 text-center">Add a new network</div></div></div>'
                    ) */
                    $('div.loader-full').hide()
                    $('#main').show()
                    helper.filterCard()
                } else {
                    $('div.loader-full').hide()
                    $('#main').show().find('div#network-content').empty().html("<p class='text-center container text-info fs-normal fw-normal'> <i class='fas fa-info-circle fa-lg mr-2'></i> Not Found</p>")
                }
            }
        }).catch((err) => {
            $('div.loader-full').hide()
            $('#main').show().empty().append('<p class="text-center alert-warning">Something Wrong. Please <a href="/logout" class="btn btn-sm btn-outline-primary">go back</a> to login page</p>')
            console.log(err);
        })
    }
    
    
    this.showModalCreateNetwork = function (){
        $('.create-network').on('click', function(e){
            e.preventDefault()
            let body = '<form id="form-create-network">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2">General Information</legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-6">'
            body += '<label for="networkName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Name : '
            body += '<input type="text" id="networkName" class="form-control required" placeholder="Enter contract name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="networkContactName" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>Contact Name :'
            body += '<input type="text" id="networkContactName" class="form-control required" placeholder="Contact Name">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="networkEmail" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>Email Address :'
            body += '<input type="text" id="networkEmail" class="form-control required" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="networkDescription" class="fs-small2 fw-medium w-100">Description :'
            body += '<textarea class="form-control" id="networkDescription" rows="2"></textarea>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="networkPhone" class="fs-small2 fw-medium w-100 "><t class="text-danger">*</t>Phone Number :'
            body += '<input type="text" id="networkPhone" class="form-control required" placeholder="Phone Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="networkFax" class="fs-small2 w-100 fw-medium">Fax Number :'
            body += '<input type="text" id="networkFax" class="form-control" placeholder="Fax Number"> '
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
            body += '<label for="networkAddLine1" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Address Line 1 :'
            body += '<input type="text" id="networkAddLine1" class="form-control required" placeholder="Address Line 1"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="networkAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
            body += '<input type="text" id="networkAddLine2" class="form-control" placeholder="Address Line 2">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="networkAddLine3" class="fs-small2 w-100 fw-medium">Address Line 3 :'
            body += '<input type="text" id="networkAddLine3" class="form-control" placeholder="Address Line 3">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="networkCity" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>City :'
            body += '<input type="text" id="networkCity" class="form-control required" placeholder="City">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="networkState" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>State :'
            body += '<select id="networkState" class="custom-select required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="networkPostalCode" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Zip Code :'
            body += '<input type="text" id="networkPostalCode" class="form-control required" placeholder="Zip Code">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
           
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '</form>'
            
            let footer = '<button id="btn-save-network-form"  class="btn btn-primary">Save</button>';
            
            $('body').append(helper.createModal('modal-create-network', "Create a Contract", body, footer , 'lg'));
            $('#modal-create-network').modal('show')
            
            $('#modal-create-network').on('hide.bs.modal', function (e) {
                setTimeout(function(){$('#modal-create-network').remove()},1000)
            })
            
            th.saveNetworkModal('create')
            th.setState("networkState", "")
        });
        
        
        
        
    }
    
    this.showModalUpdateNetwork = function (){
        $('.update-network').on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let id = t.parent().parent().attr('data-id')
            helper.setNextButtonLoader(t)
            th.getNetworkApi(id).then((result) => {
                if (result.errors.length > 0) {
                    
                } else {
                    let data = result.payload
                    let body = '<form id="form-update-network">';
                    body += '<div class="errors w-100 text-center"> </div>'
                    
                    body += '<div class="d-flex"> '
                    body += '<fieldset class="col-lg-12 mb-3"> '
                    body += '<legend class="px-2 py-2">Generale Informations</legend>'
                    body += '<div class="row">'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="networkName" class="fs-small2 fw-medium w-100 font-weight-bold">Name : '
                    body += '<input type="text" id="networkName" class="form-control required" value="'+data.name+'" placeholder="Enter network name">  '
                    body += '<input type="hidden" id="updateNetworkGuid" class="form-control" value="'+data.id+'">  '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="networkContactName" class="fs-small2 fw-medium w-100">Contact Name :'
                    body += '<input type="text" id="networkContactName" class="form-control required" value="'+data.contactName+'" placeholder="Contact Name">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="networkEmail" class="fs-small2 fw-medium w-100">Email Address :'
                    body += '<input type="text" id="networkEmail" class="form-control required" value="'+data.emailAddress+'" placeholder="Email Address">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="networkDescription" class="fs-small2 fw-medium w-100">Description :'
                    body += '<textarea class="form-control" value="'+data.description+'" id="networkDescription" rows="2">'+data.description+'</textarea>'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="networkPhone" class="fs-small2 fw-medium w-100 ">Phone Number :'
                    body += '<input type="text" id="networkPhone" value="'+data.mainPhoneNumber+'" class="form-control required" placeholder="Phone Number"> '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-6">'
                    body += '<label for="networkFax" class="fs-small2 w-100 fw-medium">Fax Number :'
                    body += '<input type="text" id="networkFax" value="'+data.faxNumber+'" class="form-control" placeholder="Fax Number"> '
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
                    body += '<label for="networkAddLine1" class="fs-small2 w-100 fw-medium">Address Line 1 :'
                    body += '<input type="text" id="networkAddLine1" value="'+data.addressLine1+'" class="form-control required" placeholder="Address Line 1"> '
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="networkAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
                    body += '<input type="text" id="networkAddLine2" value="'+data.addressLine2+'" class="form-control" placeholder="Address Line 2">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="networkAddLine3" class="fs-small2 w-100 fw-medium">Address Line 3 :'
                    body += '<input type="text" id="networkAddLine3" value="'+data.addressLine2+'" class="form-control" placeholder="Address Line 3">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="networkCity" class="fs-small2 w-100 fw-medium">City :'
                    body += '<input type="text" id="networkCity" value="'+data.city+'" class="form-control required" placeholder="City">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="networkPostalCode" class="fs-small2 w-100 fw-medium">Postal Code :'
                    body += '<input type="text" id="networkPostalCode" value="'+data.postalCode+'" class="form-control required" placeholder="Postal Code">'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '<div class="col-lg-4">'
                    body += '<label for="networkState" class="fs-small2 w-100 fw-medium">State :'
                    body += '<select id="networkState" class="custom-select required">'
                    body += '</select>'
                    body += '<small class="form-text"></small></label>'
                    body += '</div>'
                    
                    body += '</div>'
                    body += '</fieldset>'
                    body += '</div>'
                    
                    body += '</form>'
                    
                    let footer = '<button id="btn-update-network-form"  class="btn btn-primary">Save</button>';
                    
                    $('body').append(helper.createModal('modal-update-network', "Create a Update Network", body, footer , 'lg'));
                    $('#modal-update-network').modal('show')
                    
                    $('#modal-update-network').on('hide.bs.modal', function (e) {
                        setTimeout(function(){ $('#modal-update-network').remove()},1000)
                    })
                    
                    
                    th.saveNetworkModal('update')
                    th.setState("networkState", data.state)
                    
                }
                helper.removeNextButtonLoader(t)
            }).catch((err) => {
                
            })
            
        });
        
        
        
        
    }
    
    this.showModalDeleteNetwork = function (){
    
        $('.lock-network-btn').on('click', function(){
            let t = $(this)
            let id = t.parent().parent().attr('data-id')
            let name = $('body').find('div.info-data').first().text()
            let body = '<div class="alert-danger text-center errors-lock-network"></div>'
            body += '<div><p>Are you sure you want to lock this contract ?</p></div>'
            
            let footer = '<button type="button" class="btn btn-secondary mr-3" data-dismiss="modal" aria-label="Close">Non</button> <button id="btn-lock-network-form" class="btn btn-primary">Yes</button>';
            
            $('body').append(helper.createModal('modal-lock-network', "Lock Contract : "+name, body, footer , 'md'));
            $('#modal-lock-network').modal('show')
            
            $('#modal-lock-network').on('hide.bs.modal', function (e) {
                setTimeout(function(){ $('#modal-lock-network').remove()},1000)
            })
            let network = new userNetwork(token, url)
            network.lockNetwork(id)
        })
        
    
    }
    
    this.lockNetwork = function(id){
        $('button#btn-lock-network-form').on('click', function(){
            let t = $(this)
            helper.setNextButtonLoader(t)
            let network = new userNetwork(token, url)
            network.deleteNetworkApi(id)
            .then((result) => {
                helper.removeNextButtonLoader(t)
                if (result.errors.length > 0) {
                    $('div.errors-lock-network').empty()
                    result.errors.forEach(el => {
                        $('div.errors-lock-network').addClass('alert alert-warning').append('<p class="mb-2">'+el.description+'</p>')
                    });
                   
                } else {
                    console.log(result.payload);
                    helper.toastr('success','top-full-width',1000, "Succesfully locked.")
                    $('#modal-lock-network').modal('hide')
                    setTimeout(function(){window.location.href = "/"},1200)
                }
            
                
            }).catch((err) => {
                console.log(err);
                helper.removeNextButtonLoader(t)
            })
        })
        
    
    }
    
    this.setState = function(id, current = ""){
        $('#'+id).attr({'disabled':'disabled'}).parent().prepend('<i class="fa fa-spinner fa-spin select-loader-state"></i>')
        th.getState(this.activatortoken)
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
    
    this.setNetworkCard = function(idName){
        let id = helper.getParameterByName('N')
       if (id != null && id != undefined && id != '') {
        $('#'+idName).empty().append('<div class="loader-network-info text-center col-lg-12"> <skeleton-box lines="4"></skeleton-box></div>')
        this.getNetworkApi(id).then((result) => {
            if (result.errors.length > 0) {
                $('#'+idName)
                .find('.loader-network-info').remove()
                .append('<p class="text-center text-danger"> eee </p>')
            } else {
                let data = result.payload
                $('.name-network').empty().text(data.name)
                let content = '<div class="col-md-2"><div class="img text-center"> <img src="./images/hospital2.png" class=" img-circle img-fluid" height="50px" alt="no-image"></div></div>'
        
                content += '<div class="col-md-3 col-sm-6 flex-sm-column mt-2">'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Contract Name :</div><div class="col px-1 info-data">'+data.name+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Contact Name :</div><div class="col px-1 info-data">'+data.contactName+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Email :</div><div class="col px-1 info-data">'+data.emailAddress+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Phone Number:</div><div class="col px-1 info-data">'+data.mainPhoneNumber+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Fax Number:</div><div class="col px-1 info-data">'+data.faxNumber+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Description :</div><div class="col px-1 info-data">'+data.description+'</div></div>'
                content += '</div>'
                
                content += '<div class="col-md-3 col-sm-6 flex-sm-column mt-2">'
                content += '<div class="d-flex"><div class="col px-1 info-basic">City :</div><div class="col px-1 info-data">'+data.city+'</div></div>'
                content += '<div class="d-flex"><div class="col px-1 info-basic">Zip Code :</div><div class="col px-1 info-data">'+data.postalCode+'</div></div>'
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
                content += '<div class="mt-2"> <a href="javascript:void(0)" class="p-1 btn btn-outline-primary w-100 fs-small update-network" ><i class="fas fa-edit"></i> Edit</a></div>'
                content += '<div class="mt-2"> <a href="javascript:void(0)" class="p-1 btn btn-outline-primary w-100 fs-small lock-network-btn"><i class="fas fa-lock"></i> Lock</a></div>'
                content += '</div>'
                content += '</div>'
                
                content += '</div>'
                content += '</div>'
                
                $('#'+idName).empty().append(content)
                this.showModalUpdateNetwork()
                this.showModalDeleteNetwork()
                this.setAllFacilityByNetworkID(data.id)
                this.setUsersByNetworkID(data.id)
                this.setAllProvidersByNetworkID(data.id)
            }
        }).catch((err) => {
            console.log(err);
            $('#main').empty().append('<div class="main container"><div class="text-center text-danger">the identifier of this contract is not correct. Please return to the previous page.<p><a href="/">Go Back</a></p></div></div>')
        })
       } else {
           $('#main').empty().append('<div class="main container"><div class="text-center text-danger">the identifier of this contract is not correct. Please return to the previous page.<p><a href="/">Go Back</a></p></div></div>')
       }
    }
    
    this.setAllFacilityByNetworkID = function(id){
        $('#tbody-facilities-list').empty().prepend('<tr class="loader-facility-tbody"><td colspan="8" class="text-center"><skeleton-box lines="1"></skeleton-box></i></td></tr>')
        this.getAllFacilityByNetworkGuid(id).then((result) => {
            if (result.errors.length > 0) {
                $('#tbody-facilities-list')
                .empty()
                .append('<tr><td colspan="8"><p class="text-center">No facility found !</p></td></tr>')
            } else {
                if (result.payload.length > 0) {
                    $('#tbody-facilities-list')
                    .empty()
                    result.payload.forEach(data => {
                        $('#tbody-facilities-list')
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
                                <td class="name-tab border-0">${data.name}</td>
                                <td class="text-tab border-0">${data.emailAddress}</td>
                                <td class="text-tab border-0">${data.addressLine1}</td>
                                <td class="city-tab border-0">
                                    <div class="media">
                                        <div class="media-body">
                                            <div class="media-title">${data.city}/${data.state}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="eye-tab border-0 text-right" >
                                    <a href="/user_facility_details?N=${helper.getParameterByName('N')}&F=${data.id}" class="view-facility mr-4">
                                        <i class="fas fa-eye"></i> View
                                    </a>
                                </td>
                            `)
                        )
                    });
                    $('#table-facilities-list').DataTable();
                } else {
                    $('#tbody-facilities-list')
                    .empty()
                    .append('<tr><td colspan="7"><p class="text-center">No facility found !</p></td></tr>')
                }
            }
        }).catch((err) => {
            console.log(err);
            $('#tbody-facilities-list')
            .empty()
            .append('<tr><td colspan="7"><p class="text-center">Something Wrong!</p></td></tr>')
        })
    }
    
    this.setAllProvidersByNetworkID = function(id){
        $('#tbody-providers-list').empty().prepend('<tr class="loader-providers-tbody"><td colspan="8" class="text-center"><skeleton-box lines="1"></skeleton-box></i></td></tr>')
        this.getAllProvidersByNetworkGuid(id).then((result) => {
            if (result.errors.length > 0) {
                $('#tbody-providers-list')
                .empty()
                .append('<tr><td colspan="8"><p class="text-center">No provider found !</p></td></tr>')
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
                    provider.setProvidersModal('.view-provider')
                    provider.showModalUpdateProvider('.edit-provider')
                    provider.showModalDiassociteNetwork()
                    $('#table-providers-list').DataTable();
                } else {
                    $('#tbody-providers-list')
                    .empty()
                    .append('<tr><td colspan="7"><p class="text-center">No provider found !</p></td></tr>')
                }
                
            }
        }).catch((err) => {
            console.log(err.errors);
            $('#tbody-providers-list')
            .empty()
            .append('<tr><td colspan="7"><p class="text-center">Something Wrong!</p></td></tr>')
        })
    }
    
    this.setUsersByNetworkID = function(id){    
    
        $('#tbody-users-list').empty().prepend('<tr class="loader-users-tbody"><td colspan="8" class="text-center"><skeleton-box lines="1"></skeleton-box></i></td></tr>')
        this.getUsersByNetworkGuid(id).then((result) => {
            if (result.errors.length > 0) {
                $('#tbody-users-list')
                .empty()
                .append('<tr><td colspan="8"><p class="text-center">Something Wrong!</p></td></tr>')
            } else {
                $('#tbody-users-list').empty()
                if (result.payload.length > 0) {
                    result.payload.forEach(data => {
                        $('#tbody-users-list')
                        .append(
                            $('<tr/>')
                            .attr({'id':data.id, 'style':(data.isActive == true ? "" : "color : #dc3545!important")})
                            .append(
                                $('<th/>')
                                .addClass('border-0')
                                .html('<div class="m-auto img-rounded"> <img src="./images/experience.png" class="img-fluid" alt="no-image"></div>')
                            )
                            .append(`
                                <td class=" border-0 ${(data.isActive == true ? "name-tab" : "")}">${data.name}  ${(data.isActive == true ? '<i class="far fa-check-circle fa-lg text-success"></i>':'<i class="fas fa-user-lock text-danger"></i>')}</td>
                                <td class="${(data.isActive == true ? "text-tab" : "")} border-0">${data.emailAddress}</td>
                                <td class="${(data.isActive == true ? "text-tab" : "")} border-0">${data.role}</td>
                                <td class="${(data.isActive == true ? "eye-tab" : "")} border-0 text-right">
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
                    //<a href="javascript:void(0)" class="edit-users ml-4 text-success"><i class="fas fa-edit"></i> Edit </a> || <a href="javascript:void(0)" class="lock-user"><i class="fas fa-trash-alt"></i> Lock</a>
                    this.showModalDetailsUserInfo('view-user');
                    let user = new usersNetwork(token, url, "")
                    user.disableUserModal('lock-user');
                    user.activeUserModal('unlock-user');
                    $('#table-users-list').DataTable();
                }else{
                    $('#tbody-users-list')
                    .append('<tr><td colspan="6"><p class="text-center">No user found !</p></td></tr>')
                }
            }
        }).catch((err) => {
            console.log(err);
            $('#tbody-users-list').empty()
            .append('<tr><td colspan="6"><p class="text-center">Something Wrong!</p></td></tr>')
        })
        
    }
    
    this.showModalDetailsUserInfo = function(name){
        $('.'+name).click(function(){
            let t = $(this)
            let id = t.parent().parent().attr('id')
            console.log(id);
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
                        $('body').append(helper.createModal('view-user-modal', "User information : "+data.name, body, "none" , 'lg'));
                        $('#view-user-modal').modal('show');
                        
                        $('#view-user-modal').on('hide.bs.modal', function (e) {
                            setTimeout(function(){
                                $('#view-user-modal').remove()
                            },500)
                        })
                        
                        /* $('button.edit-user-modal').click(function(){
                            
                                    <div class="col-lg-12 pl-0 mb-2 float-right">
                                        <button class="btn btn-sm float-right btn-outline-primary pr-2 edit-user-modal"><i class="fas fa-edit mr-1"></i> Edit</button>
                                    </div>
                            let thi = $(this);
                            
                            let body = "TEST";
                            let footer = "Button";
                            
                            $('body').append(helper.createModal('edit-user-modal', "User information : ", body, footer , 'md'));
                            $('#edit-user-modal').modal('show');
                            $('#edit-user-modal').attr({'style':'background: #00000082; z-index: 9999999 !important'})
                        }) */
                        
                    }
                }).catch((err) => {
                    
                })
            })
        })
        
        
    }
    
    
    
    

}
