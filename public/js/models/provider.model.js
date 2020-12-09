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
    
    this.getAllProvider = function (id){
        return new Promise((resolve, reject) => {
            this.client.medicalproviders3().then((result) => {
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
                    "specialties": $('#providerSpeciality').val().toString(),
                    "state": $('#providerState').val(),
                    "subSpecialties": $('#providerFirstName').val(),
                    "tin": $('#providerTin').val()
                }
                
                let user = new providerNetwork(token, url)
                console.log(datas);
                user.createProviderApi(datas).then((result) => {
                    
                    if (result.errors.length > 0) {
                        $('#form-create-provider div.errors').empty()
                        result.errors.forEach((value) => {
                            $('#form-create-provider div.errors').append('<p class="text-center text-danger">'+value.description+'</p>')
                        })
                    } else {
                        console.log(result.payload);
                        if (helper.getParameterByName('F') || facilityGuid != undefined) {
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
                body += '<label for="chooseFacilityAnswer" class="fs-small2 fw-medium w-100 font-weight-bold"><t class="text-danger">*</t>Do you want to associate it with a Facility ?'
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
            body += '<label for="providerEmail" class="fs-small2 fw-medium w-100"><t class="text-danger">*</t>Email Address :'
            body += '<input type="text" id="providerEmail" class="form-control required" placeholder="Email Address">'
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
    
    this.showModalAssociateProviderToNetwork = function (name){
        $(name).on('click', function(e){
            e.preventDefault()
            let t = $(this)
            let body = '<form id="form-associate-provider">';
            body += '<div class="errors w-100 text-center"> </div>'
            
            body += '<div class="d-flex"> '
            body += '<fieldset class="col-lg-12 mb-3"> '
            body += '<legend class="px-2 py-2" >Associate To Network</legend>'
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
            
            let footer = '<button type="button" class="btn btn-secondary mr-3" data-dismiss="modal" aria-label="Close">Non</button> <button id="btn-diassociate-provider-form" class="btn btn-primary">Yes</button>';
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
                placeholder: 'Select a speciality',
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
                    $('#'+id).append('<option value="'+data.id+'">'+data.name+'</option>')
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
                    $('#'+id).append('<option value="'+data.id+'">'+data.name+'</option>')
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
                        console.log(result.payload);
                        if (result.payload != null ) {
                            let data = result.payload;
                            let body = '<div class="card border-0">'
                            body += '<div class="card-body">'
                            
                            body += '<div class="card-title mb-4"><div class="d-flex justify-content-start"><div class="image-container"> <img src="http://placehold.it/150x150" id="imgProfile" style="width: 80px; height: 80px" class="img-thumbnail" /><div class="middle"> <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" /> <input type="file" style="display: none;" id="profilePicture" name="file" /></div></div><div class="userData ml-3 my-2"><h2 class="d-block" style="font-size: 1.5rem; font-weight: bold"><a href="javascript:void(0);">'+data.firstName+' '+data.lastName+'</a></h2><h6 class="d-block">Speciality : '+data.specialties+'</h6></div><div class="ml-auto"> <input type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" /></div></div></div>'
                            
                            body += '<div class="row">'
                            body += '<div class="col-12">'
                            
                            body += '<ul class="nav nav-tabs mb-4" id="myTab" role="tablist">'
                            body += '<li class="nav-item"> <a class="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a></li>'
                            body += '</ul>'
                            
                            body += '<div class="tab-content ml-1" id="myTabContent">'
                            
                            body += '<div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">'
                            body += '<div class="row">'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">First Name : </label> '+data.firstName+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">Last Name : </label> '+data.lastName+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">NPI Number : </label> '+data.npi+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">TIN Number : </label> '+data.tin+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">Email Address : </label> '+data.emailAddress+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">Mobile Number : </label> '+data.mobileNumber+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">Work Number : </label> '+data.workNumber+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">Address Line 1 : </label> '+data.addressLine1+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">Address Line 2 : </label> '+data.addressLine2+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">City : </label> '+data.city+'</div>'
                            body += '<div class="col-lg-6"><label style="font-weight:bold;">State : </label> '+data.state+'</div>'
                            body += '</div>'
                            body += '</div>'
                            
                            
                            body += '</div>'
                            
                            body += '</div>'
                            body += '</div>'
                            body += '</div>'
                            body += '</div>'
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
    
    
    

}