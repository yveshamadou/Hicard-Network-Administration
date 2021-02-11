export  function utils(){

    this.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    
    this.filterCard = function (){
        
        var options = {
            valueNames: [ 'name' ]
          };
          
          var userList = new List('main', options);
          $('.paginationBottom').addClass('mb-5')
          $('.paginationBottom').children('li').addClass('page-item')
          $('.paginationBottom').children('li').children('a').addClass('page-link')
        
    }
    
    this.createModal = function (id,title, body,footer = "", w='md'){
    
        let modal = '<div class="modal fade bd-example-modal-lg" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'
        modal += '<div class="modal-dialog modal-'+w+'">'
        modal += '<div class="modal-content">'
        modal += '<div class="modal-header panel panel-default">'
        modal += '<h5 class="modal-title panel-heading hi-text-blue-primary" id="exampleModalLabel">'+title+'</h5>'
        modal += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>'
        modal += '</div>'
        modal += '<div class="modal-body">'
        modal += body
        modal += '</div>'
        if (footer == "none") {
            modal += '</div>'
            modal += '</div>'
            modal += '</div>'
        }else {
            modal += '<div class="modal-footer">'
            modal += footer
            modal += '</div>'
            modal += '</div>'
            modal += '</div>'
            modal += '</div>'
        }
        
        return modal;
    }
    
    this.setNextButtonLoader = function (t) {
        $(t)
        .attr({'disabled': 'disabled'})
        .prepend('<i class="fa fa-spinner fa-spin text-white next-btn-loader" style="margin-right: 5px"></i>')
    }
    
    this.removeNextButtonLoader = function (t) {
        $(t)
        .removeAttr('disabled')
        .find('.next-btn-loader')
        .remove()
    }
    
    this.validateForm = function (id){
        
        var errors = []
        
        $("#"+id+" input.required").each(function(){
            if ($(this).val() == "" || $(this).val() == undefined || $(this).val() == null) {
                errors.push($(this).attr('id'))
                $(this).attr({'style': 'border-color: #dc3545 !important'})
                $(this).parent().find('small').addClass('text-danger').text('required')
            }else{
                $(this).removeAttr('style')
                $(this).parent().find('small').empty()
            }
        })
        
        $("#"+id+" select.required").each(function(){
            if ($(this).val() == null && $(this).val() == undefined && $(this).val() == "") {
                errors.push($(this).attr('id'))
                $(this).attr({'style': 'border-color: #dc3545 !important'})
                $(this).parent().find('small').addClass('text-danger').text('required')
            }else {
                $(this).removeAttr('style')
                $(this).parent().find('small').empty()
            }
        })
        
        $("#"+id+" textarea.required").each(function(){
            if ($(this).val() == "" || $(this).val() == undefined || $(this).val() == null) {
                errors.push($(this).attr('id'))
                $(this).attr({'style': 'border-color: #dc3545 !important'})
                $(this).parent().find('small').addClass('text-danger').text('required')
            }else {
                $(this).removeAttr('style')
                $(this).parent().find('small').empty()
            }
        })
        
        console.log(errors);
        
        return errors;
    
    }
    
    this.validateForm2 = function (id){
        
        var errors = []
        
        if ($("#networkName").val() == "") {
            errors.push($("#networkName").attr('id'))
            $("#networkName").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkName").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkName").removeAttr('style')
            $("#networkName").parent().find('small').empty()
        }
        
        if ($("#networkContactName").val() == "") {
            errors.push($("#networkContactName").attr('id'))
            $("#networkContactName").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkContactName").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkContactName").removeAttr('style')
            $("#networkContactName").parent().find('small').empty()
        }
        
        if ($("#networkEmail").val() == "") {
            errors.push($("#networkEmail").attr('id'))
            $("#networkEmail").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkEmail").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkEmail").removeAttr('style')
            $("#networkEmail").parent().find('small').empty()
        }
        
        if ($("#networkPhone").val() == "") {
            errors.push($("#networkPhone").attr('id'))
            $("#networkPhone").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkPhone").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkPhone").removeAttr('style')
            $("#networkPhone").parent().find('small').empty()
        }
        
        if ($("#networkAddLine1").val() == "") {
            errors.push($("#networkAddLine1").attr('id'))
            $("#networkAddLine1").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkAddLine1").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkAddLine1").removeAttr('style')
            $("#networkAddLine1").parent().find('small').empty()
        }
        
        if ($("#networkCity").val() == "") {
            errors.push($("#networkCity").attr('id'))
            $("#networkCity").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkCity").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkCity").removeAttr('style')
            $("#networkCity").parent().find('small').empty()
        }
        
        if ($("#networkPostalCode").val() == "") {
            errors.push($("#networkPostalCode").attr('id'))
            $("#networkPostalCode").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkPostalCode").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkPostalCode").removeAttr('style')
            $("#networkPostalCode").parent().find('small').empty()
        }
        
        if ($("#networkState").val() == null &&  $("#networkState").val() == undefined && $("#networkState").val() == "") {
            errors.push($("#networkState").attr('id'))
            $("#networkState").attr({'style': 'border-color: #dc3545 !important'})
            $("#networkState").parent().find('small').addClass('text-danger').text('required')
        } else {
            $("#networkState").removeAttr('style')
            $("#networkState").parent().find('small').empty()
        }
        
        if (errors.length == 0) {
           errors = [] 
        }
        
        console.log(errors);
        
        return errors;
    
    }
    
    this.toastr = function (name,position = "top-right", duration = 1000, message){
        
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-"+position,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": duration,
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        
        toastr[name](message)
    }
    
    this.getParameterByName = function(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    this.matchStart = function(params, data) {
        // If there are no search terms, return all of the data
        if ($.trim(params.term) === '') {
          return data;
        }
      
        // Skip if there is no 'children' property
        if (typeof data.children === 'undefined') {
          return null;
        }
      
        // `data.children` contains the actual options that we are matching against
        var filteredChildren = [];
        $.each(data.children, function (idx, child) {
          if (child.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0) {
            filteredChildren.push(child);
          }
        });
      
        // If we matched any of the timezone group's children, then set the matched children on the group
        // and return the group object
        if (filteredChildren.length) {
          var modifiedData = $.extend({}, data, true);
          modifiedData.children = filteredChildren;
      
          // You can return modified objects from here
          // This includes matching the `children` how you want in nested data sets
          return modifiedData;
        }
      
        // Return `null` if the term should not be displayed
        return null;
      }
      
    this.getRandomColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

}