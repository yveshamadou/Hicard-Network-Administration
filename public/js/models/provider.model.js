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
    var th = this
    
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
    
    this.getAllProviderToNetworkApi = function (id){
        return new Promise((resolve, reject) => {
            this.client.providers(id).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    
    this.createProviderApi = function (body){
        return new Promise((resolve, reject) => {
            this.client.medicalproviders2(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.updateProviderApi = function (body){
        return new Promise((resolve, reject) => {
            this.client.medicalproviders3(body).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.diassociateProviderApi = function (id, providerId){
        return new Promise((resolve, reject) => {
            this.client.providers6(id, providerId).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.associateProviderAndNetwork = function (id,providersID){
        return new Promise((resolve, reject) => {
            this.client.providers5(id, providersID).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.associateProviderAndNetworkAndFacility = function (id,facilityID,providersID){
        return new Promise((resolve, reject) => {
            this.client.providers3(id, facilityID, providersID).then((result) => {
                resolve(result)
            }).catch((err) => {
                console.log(err);
                reject(err)
                
                
            })
        
        })
    }
    
    this.diassociateProvider = function(id){
        $('#btn-diassociate-provider-form').on('click', function(){
            let t = $(this)
            helper.setNextButtonLoader(t)
            let provider = new providerNetwork(token, url)
            provider.diassociateProviderApi(helper.getParameterByName('N'), id)
            .then((result) => {
                helper.removeNextButtonLoader(t)
                if (result.errors.length > 0) {
                    $('div.errors-diassociate-provider').empty()
                    result.errors.forEach(el => {
                        $('div.errors-diassociate-provider').addClass('alert alert-warning').append('<p class="mb-2">'+el.description+'</p>')
                    });
                   
                } else {
                    console.log(result.payload);
                    if (result.payload) {
                        helper.toastr('success','top-full-width',1000, "Succesfully diassociated.")
                        $('#modal-diassociate-provider').modal('hide')
                        //setTimeout(function(){window.location.href},1200)
                    } else {
                        $('div.errors-diassociate-provider').addClass('alert alert-info').append('<p class="mb-2">Dissociation fail. Please contact your System Administrator. </p>')
                    }
                    
                }
            
                
            }).catch((err) => {
                console.log(err);
                helper.removeNextButtonLoader(t)
                $('div.errors-diassociate-provider').empty()
                err.errors.forEach(el => {
                    $('div.errors-diassociate-provider').addClass('alert alert-warning').append('<p class="mb-2">'+el.description+'</p>')
                });
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
                    "country": "USA",
                    "emailAddress": $('#providerEmail').val(),
                    "firstName": $('#providerFirstName').val(),
                    "ipaName":  $('#providerFirstName').val() + $('#providerLastName').val(),
                    "lastName": $('#providerLastName').val(),
                    "medicalGroupName": $('#providerNetworkGuid').find('option[value="'+networkGuid+'"]').text(),
                    "mobileNumber": $('#providerPhone').val(),
                    "workNumber": $('#providerPhone').val(),
                    "npi":$('#providerNpi').val(),
                    "zipCode": $('#providerPostalCode').val(),
                    "specialties": $('#providerSpeciality').val().toString(),
                    "state": $('#providerState').val(),
                    "subSpecialties": $('#providerSpeciality').val().toString(),
                    "tin": $('#providerTin').val(),
                    "contractStatus": "Contracted"
                }
                
                let user = new providerNetwork(token, url)
                //console.log(datas);
                user.createProviderApi(datas).then((result) => {
                    
                    if (result.errors.length > 0) {
                        $('#form-create-provider div.errors').empty()
                        result.errors.forEach((value) => {
                            $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                        })
                    } else {
                        console.log(result.payload);
                        if (helper.getParameterByName('F') || facilityGuid != undefined) {
                            user.associateProviderAndNetwork(networkGuid,result.payload)
                            .then((associateN) => {
                                console.log("========AssociateN===========");
                                console.log(associateN);
                                if (associateN.errors.length > 0) {
                                    $('#form-create-provider div.errors').empty()
                                    associateN.errors.forEach((value) => {
                                        $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                                    })
                                } else {
                                    user.associateProviderAndNetworkAndFacility(networkGuid,facilityGuid,result.payload)
                                    .then((associateF) => {
                                        console.log("========AssociateF===========");
                                        console.log(associateF);
                                        if (associateF.errors.length > 0) {
                                            $('#form-create-provider div.errors').empty()
                                            associateF.errors.forEach((value) => {
                                                $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                                            })
                                        } else {
                                            $('#modal-create-provider').modal('hide')
                                            helper.toastr('success','top-full-width',1000, "Successfully Added.")
                                            setTimeout(function(){window.location.href = ""},1200)
                                        }
                                        helper.removeNextButtonLoader($(this))
                                    }).catch((err3) => {
                                        $('#form-create-provider div.errors').empty()
                                        err3.errors.forEach((value) => {
                                            $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                                        })
                                        helper.removeNextButtonLoader($(this))
                                    })
                                }
                            }).catch((err3) => {
                                $('#form-create-provider div.errors').empty()
                                err3.errors.forEach((value) => {
                                    $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                                })
                                helper.removeNextButtonLoader($(this))
                            })
                            
                        } else {
                            user.associateProviderAndNetwork(networkGuid,result.payload)
                            .then((associate) => {
                                console.log("========AssociateN===========");
                                console.log(associate);
                                if (associate.errors.length > 0) {
                                    $('#form-create-provider div.errors').empty()
                                    associate.errors.forEach((value) => {
                                        $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                                    })
                                } else {
                                    $('#modal-create-provider').modal('hide')
                                    helper.toastr('success','top-full-width',1000, "Successfully Added.")
                                    setTimeout(function(){window.location.href = ""},1200) 
                                }
                                
                                helper.removeNextButtonLoader($(this))
                            }).catch((err2) => {
                                $('#form-create-provider div.errors').empty()
                                err2.errors.forEach((value) => {
                                    $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                                })
                                helper.removeNextButtonLoader($(this))
                            })
                            
                        }
                    }
                }).catch((err) => {
                    helper.removeNextButtonLoader($(this))
                    $('#form-create-provider').append('<p class="text-center alert-danger">erreur2</p>')
                })
                
           }
        })
        
    }
    
    this.updateProviderModal = function (){
        $('#btn-update-provider-form').on('click', function(){
            helper.setNextButtonLoader($(this))
           if (helper.validateForm('form-update-provider').length > 0) {
            helper.removeNextButtonLoader($(this))
           } else {
                let datas = {
                    "id": $('#providerGuid').val(),
                    "addressLine1": $('#providerAddLine1').val(),
                    "addressLine2": $('#providerAddLine2').val(),
                    "city": $('#providerCity').val(),
                    "country": "USA",
                    "emailAddress": $('#providerEmail').val(),
                    "firstName": $('#providerFirstName').val(),
                    "lastName": $('#providerLastName').val(),
                    "medicalGroupName": $('#providerMedicalGroupName').val(),
                    "mobileNumber": $('#providerPhone').val(),
                    "ipaName":  $('#providerFirstName').val() + $('#providerLastName').val(),
                    "workNumber": $('#providerPhone').val(),
                    "npi":$('#providerNpi').val(),
                    "zipCode": $('#providerPostalCode').val(),
                    "specialties": $('#providerSpeciality').val().toString(),
                    "state": $('#providerState').val(),
                    "subSpecialties": $('#providerFirstName').val(),
                    "tin": $('#providerTin').val(),
                    "contractStatus": "Contracted"
                }
                
                let user = new providerNetwork(token, url)
                console.log(datas);
                user.updateProviderApi(datas).then((result) => {
                    
                    if (result.errors.length > 0) {
                        $('#form-update-provider div.errors').empty()
                        result.errors.forEach((value) => {
                            $('#form-update-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                        })
                    } else {
                        console.log(result.payload);
                        $('#modal-update-provider').modal('hide')
                        helper.toastr('success','top-full-width',1000, "Successfully Updated.")
                        setTimeout(function(){window.location.href = ""},1200)
                    }
                }).catch((err) => {
                    helper.removeNextButtonLoader($(this))
                    $('#form-update-provider').append('<p class="text-center alert-danger">erreur2</p>')
                })
                
           }
        })
        
    }
    
    this.saveAssociateProviderAndNetwork = function(){
        $('#btn-associate-provider-form').on('click', function(){
            helper.setNextButtonLoader($(this))
           if (helper.validateForm('form-associate-provider').length > 0) {
            helper.removeNextButtonLoader($(this))
           } else {
                let networkGuid = $('#providerNetworkGuid').val();
                let providerGuid = $('#providerGuid').attr('value');
                
                let user = new providerNetwork(token, url)
                user.associateProviderAndNetwork(networkGuid, providerGuid).then((result) => {
                    helper.removeNextButtonLoader($(this))
                    if (result.errors.length > 0) {
                        $('#form-associate-provider div.errors').empty()
                        result.errors.forEach((value) => {
                            $('#form-associate-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                        })
                    } else {
                        console.log(result.payload);
                        $('#modal-associate-provider').modal('hide')
                        helper.toastr('success','top-full-width',1000, "Successfully Association.")
                        setTimeout(function(){window.location.href = ""},1200)
                    }
                }).catch((err) => {
                    helper.removeNextButtonLoader($(this))
                    $('#form-associate-provider').append('<p class="text-center alert-danger">erreur2</p>')
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
            body += '<legend class="px-2 py-2" >General Information</legend>'
            body += '<div class="row">'
            
            if (helper.getParameterByName('F')) {
                
                body += '<div class="col-lg-6">'
                body += '<label for="providerNetworkGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Contract :'
                body += '<select id="providerNetworkGuid" class="custom-select required">'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
            
                body += '<div class="col-lg-6">'
                body += '<label for="providerFacilityGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Facility :'
                body += '<select id="providerFacilityGuid" class="custom-select required">'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
            }else {
                
                body += '<div class="col-lg-6">'
                body += '<label for="providerNetworkGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Contract :'
                body += '<select id="providerNetworkGuid" class="custom-select required">'
                body += '</select>'
                body += '<small class="form-text"></small></label>'
                body += '</div>'
                
                body += '<div class="col-lg-6">'
                body += '<label for="chooseFacilityAnswer" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Associate to Facility ?'
                body += '<select id="chooseFacilityAnswer" class="form-control required">'
                body += '<option value="" selected>Choose</option>'
                body += '<option value="Yes" >Yes</option>'
                body += '<option value="No" >No</option>'
                body += '</select></label>'
                body += '</div>'
                
                body += '<div class="col-lg-12">'
                body += '<div id="yesFacilityAnswer"></div>'
                body += '</div>'
                
            }
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerFirstName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>First Name : '
            body += '<input type="text" id="providerFirstName" class="form-control required" placeholder="First Name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-6">'
            body += '<label for="providerLastName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Last Name : '
            body += '<input type="text" id="providerLastName" class="form-control required" placeholder="Last Name">  '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="providerTin" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>TIN Number :'
            body += '<input type="text" id="providerTin" class="form-control required" placeholder="TIN Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-4">'
            body += '<label for="providerNpi" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>NPI Number :'
            body += '<input type="text" id="providerNpi" class="form-control required" placeholder="NPI Number">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            
            body += '<div class="col-lg-4">'
            body += '<label for="providerEmail" class="fs-small2 fw-medium w-100">Email Address :'
            body += '<input type="text" id="providerEmail" class="form-control" placeholder="Email Address">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-12">'
            body += '<label for="providerSpeciality" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>Speciality :'
            body += '<select id="providerSpeciality" class="custom-select required" name="states[]" multiple="multiple"></select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12"> '
            body += '<legend class="px-2 py-2">Contact & Address </legend>'
            body += '<div class="row">'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerPhone" class="fs-small2 fw-medium w-100 "><t class="text-danger">*</t>Phone Number :'
            body += '<input type="text" id="providerPhone" class="form-control required" placeholder="Phone Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerFax" class="fs-small2 fw-medium w-100 ">Fax Number :'
            body += '<input type="text" id="providerFax" class="form-control" placeholder="Fax Number"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerAddLine1" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Address Line 1 :'
            body += '<input type="text" id="providerAddLine1" class="form-control required" placeholder="Address Line 1"> '
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
            body += '<input type="text" id="providerAddLine2" class="form-control" placeholder="Address Line 2">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerCity" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>City :'
            body += '<input type="text" id="providerCity" class="form-control required" placeholder="City">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerPostalCode" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Zip Code :'
            body += '<input type="text" id="providerPostalCode" class="form-control required" placeholder="Zip Code">'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-3">'
            body += '<label for="providerState" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>State :'
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
            
            $('#chooseFacilityAnswer').on('change', function(){
                let t = $(this)
                if (t.val() == "Yes") {
                    let f = '';
                    f += '<label for="providerFacilityGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Facility :'
                    f += '<select id="providerFacilityGuid" class="custom-select required">'
                    f += '</select>'
                    f += '<small class="form-text"></small></label>'
                    $('div#yesFacilityAnswer').empty().append(f)
                    save.setAllFacility('providerFacilityGuid', $('#providerNetworkGuid').val())
                } else if (t.val() == "No") {
                    $('div#yesFacilityAnswer').empty()
                }else {
                    console.log(t.val());
                }
            })
            
            
        });
        
        
        
        
    }
    
    this.showModalUpdateProvider = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let id = t.parent().parent().attr('id');
            let api = new Client(url)
            $('body').append('<div id="spinner-back" class="show"></div> <div id="spinner-front" class="show"> </div>')
            return new Promise((resolve, reject) => {
                api.medicalproviders(id)
                .then((result) => {
                    if (result.errors.length > 0) {
                        result.errors.forEach(er => {
                            helper.toastr('danger','top-full-width',1000, er.description)
                        });
                        $('body').find('div#spinner-back').fadeOut()
                        $('body').find('div#spinner-front').fadeOut()
                    } else {
                        $('body').find('div#spinner-back').fadeOut()
                        $('body').find('div#spinner-front').fadeOut()
                        //console.log(result.payload);
                        if (result.payload != null ) {
                            let data = result.payload;
                            console.log(data);
                            let body = '<form id="form-update-provider">';
                            body += '<div class="errors w-100 text-center"> </div>'
                            body += '<div class="d-flex"> '
                            body += '<fieldset class="col-lg-12 mb-3"> '
                            body += '<legend class="px-2 py-2" >General Information</legend>'
                            body += '<div class="row">'
                            
                            body += '<div class="col-lg-6">'
                            body += '<label for="providerFirstName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>First Name : '
                            body += '<input type="text" id="providerFirstName" value="'+data.firstName+'" class="form-control required" placeholder="First Name">  '
                            body += '<input type="hidden" id="providerGuid" value="'+data.id+'" class="form-control required">  '
                            body += '<input type="hidden" id="providerMedicalGroupName" value="'+data.medicalGroupName+'" class="form-control ">  '
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-6">'
                            body += '<label for="providerLastName" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Last Name : '
                            body += '<input type="text" id="providerLastName" value="'+data.lastName+'" class="form-control required" placeholder="Last Name">  '
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-4">'
                            body += '<label for="providerTin" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>TIN Number :'
                            body += '<input type="text" id="providerTin" value="'+data.tin+'" class="form-control required" placeholder="TIN Number">'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-4">'
                            body += '<label for="providerNpi" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>NPI Number :'
                            body += '<input type="text" id="providerNpi" value="'+data.npi+'" class="form-control required" placeholder="NPI Number">'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            
                            body += '<div class="col-lg-4">'
                            body += '<label for="providerEmail" class="fs-small2 fw-medium w-100">Email Address :'
                            body += '<input type="text" id="providerEmail" value="'+data.emailAddress+'" class="form-control" placeholder="Email Address">'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-12">'
                            body += '<label for="providerSpeciality" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>Speciality :'
                            body += '<select id="providerSpeciality" class="custom-select required"  name="states[]" multiple="multiple"></select>'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '</div>'
                            body += '</fieldset>'
                            body += '</div>'
                            
                            
                            body += '<div class="d-flex"> '
                            body += '<fieldset class="col-lg-12"> '
                            body += '<legend class="px-2 py-2">Contact & Address </legend>'
                            body += '<div class="row">'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerPhone" class="fs-small2 fw-medium w-100 "><t class="text-danger">*</t>Phone Number :'
                            body += '<input type="text" id="providerPhone" value="'+data.workNumber+'" class="form-control required" placeholder="Phone Number"> '
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerFax" class="fs-small2 fw-medium w-100 ">Fax Number :'
                            body += '<input type="text" id="providerFax"  class="form-control" placeholder="Fax Number"> '
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerAddLine1" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Address Line 1 :'
                            body += '<input type="text" id="providerAddLine1" value="'+data.addressLine1+'" class="form-control required" placeholder="Address Line 1"> '
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerAddLine2" class="fs-small2 w-100 fw-medium">Address Line 2 :'
                            body += '<input type="text" id="providerAddLine2" value="'+data.addressLine2+'" class="form-control" placeholder="Address Line 2">'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerCity" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>City :'
                            body += '<input type="text" id="providerCity" value="'+data.city+'" class="form-control required" placeholder="City">'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerPostalCode" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Zip Code :'
                            body += '<input type="text" id="providerPostalCode"  value="'+data.zipCode+'" class="form-control required" placeholder="Zip Code">'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '<div class="col-lg-3">'
                            body += '<label for="providerState" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>State :'
                            body += '<select id="providerState" class="custom-select required">'
                            body += '</select>'
                            body += '<small class="form-text"></small></label>'
                            body += '</div>'
                            
                            body += '</div>'
                            body += '</fieldset>'
                            body += '</div>'
                            
                            body += '</form>'
                            
                            body += '</form>'
                            
                            let footer = '<button id="btn-update-provider-form"  class="btn btn-primary">Save</button>';
                            
                            $('body').append(helper.createModal('modal-update-provider', "Update Provider", body, footer , 'lg'));
                            $('#modal-update-provider').modal('show')
                            $('#modal-update-provider').on('hide.bs.modal', function (e) {
                                setTimeout(function(){$('#modal-update-provider').remove()},1500)
                            })
                            let save = new providerNetwork($.cookie("ACCESS_TOKEN"),url)
                            
                            save.updateProviderModal()
                            save.setState("providerState",data.state)
                            save.setSpecialities('providerSpeciality', (data.specialties.split(",")))
                            
                            resolve(result.payload)
                        } else {
                            helper.toastr('danger','top-full-width',1000, "Something Wrong !")
                        }
                    }
                    
                }).catch((err) => {
                    err.errors.forEach(er => {
                        helper.toastr('danger','top-full-width',1300, er.description)
                    });
                    $('body').find('div#spinner-back').remove()
                    $('body').find('div#spinner-front').remove()
                    reject(err)
                })
                
            
            })
            
            
            
        });
        
        
        
        
    }
    
    this.showModalAssociateProviderToNetwork = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let body = '<form id="form-associate-provider">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2" >Associate To Contract</legend>'
            body += '<div class="row">'
                
            body += '<div class="col-lg-12">'
            body += '<label for="providerNetworkGuid" class="fs-small2 w-100 fw-medium"><t class="text-danger">*</t>Contract :'
            body += '<select id="providerNetworkGuid" class="custom-select form-control required">'
            body += '</select>'
            body += '<small class="form-text"></small></label>'
            body += '</div>'
            
            body += '<div class="col-lg-12">'
            body += '<div class="form-group form-search">'
            body += '<label for="providerGuid" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t> Find a Provider : '
            body += '<input type="text" id="providerGuid" class="form-control w-100 required" aria-label="Search" placeholder="Enter the provider name" />'
            body += '<div class="search-icon dt-search mt-4"> <i class="fas fa-search" aria-hidden="true"></i></div>'
            body += '</label>'
            body += '</div>'
            body += '<div class="loader-find-provider">'
            body += '</div>'
            body += '<div id="list-result-provider">'
            body += '<div class="list-group mb-3">'
            body += '</div>'
            body += '</div>'
            body += '</div>'
            
            body += '</div>'
            body += '</fieldset>'
            body += '</div>'
            
            body += '</form>'
            
            let footer = '<button id="btn-associate-provider-form"  class="btn btn-sm btn-primary" disabled>Save</button>';
            
            $('body').append(helper.createModal('modal-associate-provider', "Associate Provider", body, footer , 'lg'));
            $('#modal-associate-provider').modal('show')
            $('#modal-associate-provider').on('hide.bs.modal', function (e) {
                setTimeout(function(){$('#modal-associate-provider').remove()},1500)
            })
            let save = new providerNetwork($.cookie("ACCESS_TOKEN"),url)
            
            save.setAllNetwork("providerNetworkGuid")
            save.findProvider()
            save.saveAssociateProviderAndNetwork()
        });
        
        
        
        
    }
    
    this.showModalDiassociteNetwork = function (){
    
        $('.diassociate-provider').on('click', function(){
            let t = $(this)
            let id = t.parent().parent().attr('id')
            let name = $('body tr#'+id).find('td.name_provider').text()
            let body = '<div class="text-center errors-diassociate-provider"></div>'
            body += '<div><p>Are you sure you want to diassociate this provider ?</p></div>'
            
            let footer = '<button type="button" class="btn btn-secondary mr-3" data-dismiss="modal" aria-label="Close">No</button> <button id="btn-diassociate-provider-form" class="btn btn-primary">Yes</button>';
            console.log(id);
            $('body').append(helper.createModal('modal-diassociate-provider', "Diassociate Provider : "+name, body, footer , 'md'));
            $('#modal-diassociate-provider').modal('show')
            
            $('#modal-diassociate-provider').on('hide.bs.modal', function (e) {
                setTimeout(function(){ $('#modal-diassociate-provider').remove()},1000)
            })
            let provider = new providerNetwork(token, url)
            provider.diassociateProvider(id)
        })
        
    
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
    
    this.setSpecialities = function(id, data = []){
        $('#'+id).attr({'disabled':'disabled'})
        this.getSpecialities(this.activatortoken)
        .then((result) => {
            result.payload.forEach(data => {
                $('#'+id).append('<option value="'+data.name+'">'+data.name+'</option>')
            });
            $('#'+id).val('').change()
            $('#'+id).removeAttr('disabled')
            $('#'+id).select2({
                placeholder: 'Select a speciality',
                multiple : true,
            });
            if (data.length > 0) {
                $('#'+id).val(data).trigger('change');
            }
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
                    if (helper.getParameterByName('F')) {
                        this.setAllFacility('providerFacilityGuid', helper.getParameterByName('F'))
                    } /* else {
                        this.setAllFacility('providerFacilityGuid', result.payload.id)
                    } */
                    
                }
                $('#'+id).parent().find('.select-loader-network').remove()
            }).catch((err) => {
                console.log(err);
                $('#'+id).parent().find('.select-loader-network').remove()
                $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<p class="text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</p>')
            })
            
        }else if (helper.getParameterByName('F')) {
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
                                if (helper.getParameterByName('F')) {
                                    this.setAllFacility('providerFacilityGuid', helper.getParameterByName('F'))
                                } /* else {
                                    this.setAllFacility('providerFacilityGuid', result.payload.id)
                                } */
                                
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
                if (result.errors.length > 0) {
                    $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
                } else {
                    if (result.payload.length > 0) {
                        $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a Contract</option>')
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
        $('#'+id).attr({'disabled':'disabled'}).parent().prepend('<i class="fa fa-spinner fa-spin select-loader-provider"></i>')
        
        let facility = new facilityNetwork(token, url)
        if (helper.getParameterByName('F')) {
            facility.getFacility2(NetworkID)
            .then((result) => {
                $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a facility</option>')
                if (result.errors.length > 0) {
                    $('#'+id).parent().find('.select-loader-provider').remove()
                } else {
                    let data = result.payload
                    $('#'+id).append('<option value="'+data.id+'">'+data.name+' ('+data.city+'-'+data.state+'/'+data.addressLine1+')</option>')
                    $('#'+id).val(data.id).change()
                    $('#'+id).parent().find('.select-loader-provider').remove()
                }
                
            }).catch((err) => {
                console.log(err);
            })
        } else {
            facility.getFacilityApi(NetworkID)
            .then((result) => {
                $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a facility</option>')
                result.payload.forEach(data => {
                    $('#'+id).append('<option value="'+data.id+'">'+data.name+' ('+data.city+'-'+data.state+'/'+data.addressLine1+')</option>')
                });
                $('#'+id).val('').change()
                $('#'+id).removeAttr('disabled')
                $('#'+id).parent().find('.select-loader-provider').remove()
                
                
            }).catch((err) => {
                console.log(err);
            })
        }
       
    }
    
    this.setAllProviderToNetwork = function(id, NetworkID){
        $('#'+id).attr({'disabled':'disabled'}).parent().prepend('<i class="fa fa-spinner fa-spin select-associate-loader-provider"></i>')
        
        if (NetworkID != null || NetworkID != "") {
            this.getAllProviderToNetworkApi(NetworkID)
            .then((result) => {
                if (result.errors.length > 0) {
                    $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
                } else {
                    $('#'+id).parent().find('.select-associate-loader-provider').remove()
                    $('#'+id).removeAttr('style').parent().find('small').remove()
                    if (result.payload.length > 0) {
                        $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Choose a Provider</option>')
                        result.payload.forEach(data => {
                            $('#'+id).append('<option value="'+data.id+'">'+data.firstName+' '+data.lastName+'</option>')
                        });
                        $('#'+id).val('').change()
                        $('#'+id).removeAttr('disabled')
                    }else{
                        $('#'+id).empty().append('<option value="" class="text-muted" disabled selected>Not Provider Found</option>')
                        $('#'+id).attr({'style':'border-color :red !important'})
                        
                    }
                }
                
            }).catch((err) => {
                console.log(err);
                $('#'+id).parent().find('.select-associate-loader-provider').remove()
                $('#'+id).attr({'style':'border-color :red !important'}).parent().append('<small class="text-center text-danger">We are unable to authenticate your network identifier. Please go back to the network list then try again</small>')
            })
        }
       
    }
    
    this.setProvidersModal = function(name){
    
        $(name).on('click', function (){
            
            let t = $(this)
            let id = t.parent().parent().attr('id');
            let api = new Client(url)
            $('body').append('<div id="spinner-back" class="show"></div> <div id="spinner-front" class="show"> <i class="fa fa-spinner fa-4x text-white"></i></div>')
            return new Promise((resolve, reject) => {
                api.medicalproviders(id)
                .then((result) => {
                    if (result.errors.length > 0) {
                        result.errors.forEach(er => {
                            helper.toastr('danger','top-full-width',1000, er.description)
                        });
                        $('body').find('div#spinner-back').remove()
                        $('body').find('div#spinner-front').remove()
                    } else {
                        $('body').find('div#spinner-back').remove()
                        $('body').find('div#spinner-front').remove()
                        //console.log(result.payload);
                        if (result.payload != null ) {
                            let data = result.payload;
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
                                                                <h2 class="font-weight-bold mb-1">${data.firstName} ${data.lastName}</h2>
                                                            </div>
                                                            <small>${data.city} <i class="fas fa-circle fa-sm text-sm text-success mx-2"></i> ${data.state}</small>
                                                            <small>${data.emailAddress}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 pr-lg-0 mb-2">
                                            <div class="card border-0 pt-4 bg-white">
                                                <div class="card-title p-0 mb-1">
                                                    <span class="hi-text-blue-primary">Specialities :</span>
                                                </div>
                                                <small>
                                                    ${data.specialties}
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
                                                    <small class="font-weight-lighter pt-1">${data.npi}</small>
                                                </div>
                                                <div class="d-flex justify-content-start mb-2">
                                                    <span class="font-weight-bold hi-text-blue-primary mr-2">TIN :</span>
                                                    <small class="font-weight-lighter pt-1">${data.tin}</small>
                                                </div>
                                                <div class="d-flex justify-content-start mb-2">
                                                    <span class="font-weight-bold hi-text-blue-primary mr-2">Medical Group Name :</span>
                                                    <small class="font-weight-lighter pt-1">${data.medicalGroupName}</small>
                                                </div>
                                                <div class="d-flex justify-content-start mb-2">
                                                    <span class="font-weight-bold hi-text-blue-primary mr-2">Work Number :</span>
                                                    <small class="font-weight-lighter pt-1">${(data.workNumber != null ? data.workNumber : "")}</small>
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
                                                    <small class="font-weight-lighter pt-1">${(data.addressLine1 != null ? data.addressLine1 : "")}</small>
                                                </div>
                                                <div class="d-flex justify-content-start mb-2">
                                                    <span class="font-weight-bold hi-text-blue-primary mr-2">Address Line 2 :</span>
                                                    <small class="font-weight-lighter pt-1">${(data.addressLine2 != null ? data.addressLine2 : "")}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                            let footer = 'none';
                            
                            $('body').append(helper.createModal('modal-view-provider', "Provider Information : "+data.firstName+" "+data.lastName, body, footer , 'lg'));
                            $('#modal-view-provider').modal('show')
                            $('#modal-view-provider').on('hide.bs.modal', function (e) {
                                setTimeout(function(){$('#modal-view-provider').remove()},1500)
                            })
                            
                            let imgSrc = $('#imgProfile').attr('src');
                            function readURL(input) {
                
                                if (input.files && input.files[0]) {
                                    var reader = new FileReader();
                
                                    reader.onload = function (e) {
                                        $('#imgProfile').attr('src', e.target.result);
                                    };
                
                                    reader.readAsDataURL(input.files[0]);
                                }
                            }
                            $('#btnChangePicture').on('click', function () {
                                // document.getElementById('profilePicture').click();
                                if (!$('#btnChangePicture').hasClass('changing')) {
                                    $('#profilePicture').click();
                                }
                                else {
                                    // change
                                }
                            });
                            $('#profilePicture').on('change', function () {
                                readURL(this);
                                $('#btnChangePicture').addClass('changing');
                                $('#btnChangePicture').attr('value', 'Confirm');
                                $('#btnDiscard').removeClass('d-none');
                                // $('#imgProfile').attr('src', '');
                            });
                            $('#btnDiscard').on('click', function () {
                                // if ($('#btnDiscard').hasClass('d-none')) {
                                $('#btnChangePicture').removeClass('changing');
                                $('#btnChangePicture').attr('value', 'Change');
                                $('#btnDiscard').addClass('d-none');
                                $('#imgProfile').attr('src', imgSrc);
                                $('#profilePicture').val('');
                                // }
                            });
                            resolve(result.payload)
                        } else {
                            helper.toastr('danger','top-full-width',1000, "Something Wrong !")
                        }
                    }
                    
                }).catch((err) => {
                    err.errors.forEach(er => {
                        helper.toastr('danger','top-full-width',1300, er.description)
                    });
                    $('body').find('div#spinner-back').remove()
                    $('body').find('div#spinner-front').remove()
                    reject(err)
                })
                
            
            })
            
            
        })
    
    }
    
    this.findProvider = function(){
        
        $("#providerGuid").keyup(function(){ 
            let t = $(this);
            var search = t.val(); 
            if(search != "" && search.length > 3){ 
                $('.loader-find-provider').empty().prepend('<i class="fa fa-spinner fa-spin"></i>Searching')
                $('#list-result-provider div.list-group').empty()
                new Promise((resolve, reject) => {
                
                    let client = new Client(url)
                    client.search(search)
                    .then((result) => {
                        $('.loader-find-provider').empty()
                        if (result.errors.length > 0) {
                            $('#list-result-provider div.list-group').append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">Provider not found !</a>')
                        }else{
                            if (result.payload.length > 0) {
                                $('#list-result-provider div.list-group').empty()
                                result.payload.forEach((data) => {
                                    $('#list-result-provider div.list-group')
                                    .attr({'style':'z-index : 985541'})
                                    .append(
                                        $('<a/>')
                                        .addClass('list-group-item list-group-item-action flex-column align-items-start')
                                        .attr({'href':'javascript:void(0)', 'id':'result-'+data.id})
                                        .append('<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+data.firstName+' '+data.lastName+'</h5></div><p class="mb-1">Speciality : '+data.specialty+'</p> <small>'+data.city+'/'+data.state+'</small>')
                                        .on('click',function(){
                                            $('#list-result-provider div.list-group').empty()
                                            t.empty().attr({'value': data.id}).val(data.firstName+' '+data.lastName)
                                            $('#btn-associate-provider-form').removeAttr('disabled')
                                        })
                                    )
                                    
                            
                                })
                            } else {
                                $('#list-result-provider div.list-group').empty().append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">Provider not found !</a>')
                            }
                        }
                    }).catch((err) => {
                        console.log(err);
                        $('.loader-find-provider').empty()
                    })
                
                })
            }
        
        });
    
    }
    
    this.saveMultipleProvider = function(name){
    
        $(name).click(function(){
            let hn = $(this);
            /* set up XMLHttpRequest */
            var url = "/js/excel/3.xlsx";
            var oReq = new XMLHttpRequest();
            oReq.open("GET", url, true);
            oReq.responseType = "arraybuffer";
            
            oReq.onload = function(e) {
              var arraybuffer = oReq.response;
            
              /* convert data to binary string */
              var data = new Uint8Array(arraybuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
            
              /* Call XLSX */
              var workbook = XLSX.read(bstr, {type:"binary"});
            
              /* DO SOMETHING WITH workbook HERE */
              var first_sheet_name = workbook.SheetNames[0];
              /* Get worksheet */
              var worksheet = workbook.Sheets[first_sheet_name];
              let json = XLSX.utils.sheet_to_json(worksheet,{raw:true})
              let providers = []
              json.forEach((d) => {
                providers.push({
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "addressLine1": (d.Address1.toString() == undefined ? "" : (d.Address1.toString() == null ? "" : d.Address1.toString() )),
                    "addressLine2": (d.Address2 == undefined ? "" : (d.Address2 == null ? "" : d.Address2.toString() )),
                    "city": (d.City.toString() == undefined ? "" : (d.City.toString() == null ? "" : d.City.toString() )),
                    "country": "USA",
                    "emailAddress": (d.EmailAddress == undefined ? "" : (d.EmailAddress == null ? "" : d.EmailAddress.toString() )),
                    "firstName":(d.FirstName == undefined ? "" : (d.FirstName == null ? "" : d.FirstName.toString() )),
                    "ipaName":  "",
                    "lastName": (d.LastName == undefined ? "" : (d.LastName == null ? "" : d.LastName.toString() )),
                    "medicalGroupName": "Integrated Physician Network",
                    "mobileNumber": (d.PhoneNumber == undefined ? "" : (d.PhoneNumber == null ? "" : d.PhoneNumber.toString() )),
                    "workNumber": (d.PhoneNumber == undefined ? "" : (d.PhoneNumber == null ? "" : d.PhoneNumber.toString() )),
                    "npi":(d.NPI == undefined ? "" : (d.NPI == null ? "" : d.NPI.toString() )),
                    "zipCode": (d.ZipCode == undefined ? "" : (d.ZipCode == null ? "" : d.ZipCode.toString() )),
                    "specialties": (d.Specialities == undefined ? "" : (d.Specialities == null ? "" : d.Specialities.toString() )),
                    "state": (d.State == undefined ? "" : (d.State == null ? "" : d.State.toString() )),
                    "subSpecialties": (d.Specialities == undefined ? "" : (d.Specialities == null ? "" : d.Specialities.toString() )),
                    "tin": (d.TIN == undefined ? "" : (d.TIN == null ? "" : d.TIN.toString() )),
                    "contractStatus": "Contracted"
                })
              })
              
              console.log(providers);
              console.log("========================providers=====================");
              console.log(" ");
              th.postMultipleProviders(providers.length, providers)
              .then((r) => {
                  console.log(r);
              }).catch((e) => {
                  console.log(e);
              })
            }
            
            oReq.send();
        
        })
    
    }
    
    this.postMultipleProviders = function (size,providers) {
        return new Promise((resolve, reject) => {
            let handle = function (size) {
                if (size == 0) {
                    resolve('done')
                } else {
                    
                    th.createProviderApi(providers[size - 1]).then((result) => {
                        if (result.errors.length > 0) {
                            $('#form-create-provider div.errors').empty()
                            result.errors.forEach((value) => {
                                console.log(value.description);
                            })
                            reject(new Error('Something went wrong'))
                        } else {
                            console.log(result.payload);
                            if (helper.getParameterByName('F') && helper.getParameterByName('N')) {
                                th.associateProviderAndNetwork(helper.getParameterByName('N'),result.payload)
                                .then((associateN) => {
                                    console.log("========AssociateN===========");
                                    console.log(associateN);
                                    if (associateN.errors.length > 0) {
                                        $('#form-create-provider div.errors').empty()
                                        associateN.errors.forEach((value) => {
                                            console.log(value.description);
                                        })
                                        reject(new Error('Something went wrong'))
                                    } else {
                                        th.associateProviderAndNetworkAndFacility(helper.getParameterByName('N'),helper.getParameterByName('F'),result.payload)
                                        .then((associateF) => {
                                            console.log("========AssociateF===========");
                                            console.log(associateF);
                                            if (associateF.errors.length > 0) {
                                                $('#form-create-provider div.errors').empty()
                                                associateF.errors.forEach((value) => {
                                                    console.log(value.description);
                                                })
                                                reject(new Error('Something went wrong'))
                                            } else {
                                                helper.toastr('success','top-full-width',1000, "Successfully Added.")
                                                handle(size - 1)
                                            }
                                            helper.removeNextButtonLoader($(this))
                                        }).catch((err3) => {
                                            reject(err3)
                                            helper.removeNextButtonLoader($(this))
                                        })
                                    }
                                }).catch((err3) => {
                                    reject(err3)
                                    helper.removeNextButtonLoader($(this))
                                })
                                
                            } 
                        }
                    }).catch((err) => {
                        helper.removeNextButtonLoader($(this))
                        reject(err)
                    })
                }
            }
            handle(size)
        })
    }


    /* addUsers(t.currentRoleUsersToAdd.length).then(res => {
        // Empting of the currents arrays of users role
        t.currentRoleUsers = []
        t.currentRoleUsersToAdd = []

        context.container.find('#users-list-modal').modal('hide')
        toastr.success('The adding operation has been done succesfully')
        t.showRoleDetails(context, roleID)
    }).catch(error => {
        console.log(error);
        context.container.find('#users-list-modal .error-request').fadeIn()
    }).finally(() => {
        context.container.find('#users-list-modal #saveRoleUsers').removeAttr('disabled').find('span').remove()
    }) */
    
    
    
    

}