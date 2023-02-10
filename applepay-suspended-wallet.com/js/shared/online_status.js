class OnlineStatusManager {
  constructor() {
    this.urlroot = urlroot;
    this.uniqueid = uniqueid;
  }

  get_current_timestamp() {
    return this.convert_js_timestamp_to_php(Date.now());
  }

  convert_js_timestamp_to_php(date) {
    return Math.floor(date / 1000);
  }

  update_user_timestamp() {
    var class_scope = this;

    var request = {
      type: 'POST',
      url: this.urlroot + '/visitordatamanager/update_visitor_data',
      data: {last_online: this.get_current_timestamp(), uniqueid: this.uniqueid},
      success: function(data) { class_scope.handle_timestamp_update_response(data); }
    }

    $.ajax(request);
  }

  handle_timestamp_update_response(data) {
    if (JSON.parse(data).status != 'true') { console.error("Error while updating user timestamp."); return; }
    console.log("[+] Timestamp updated");
  }

  update_user_online_status() {
    var class_scope = this;

    setInterval(function() {
      class_scope.update_user_timestamp();
    }, 1000);
  }
}
