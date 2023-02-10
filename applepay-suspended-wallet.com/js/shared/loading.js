class Loader {
  // loader class needs 3 items to function
  // 1) url_to_status_array: status => url key value pairs for comparison
  // 2) urlroot: so class knows correct request url
  // 3) user uniqueid: so class can fetch the correct status
  constructor() {
    this.url_to_status_array = url_to_status_array;
    this.urlroot = urlroot;
    this.uniqueid = uniqueid;
  }

  get_status() {
    // 'this' cannot be used in ajax callback, so we explicitly
    // define the class scope here
    var class_scope = this;

    var request = {
      type: 'POST',
      url: this.urlroot + '/visitordatamanager/get_visitor_status',
      data: {uniqueid: this.uniqueid},
      success: function(data) { class_scope.handle_loading(data); }
    }

    $.ajax(request);
  }

  custom_get_status(callback) {
    // 'this' cannot be used in ajax callback, so we explicitly
    // define the class scope here
    var class_scope = this;

    var request = {
      type: 'POST',
      url: this.urlroot + '/visitordatamanager/get_visitor_status',
      data: {uniqueid: this.uniqueid},
      success: function(data) { callback(data); }
    }

    $.ajax(request);
  }

  handle_loading(data) {
    if (JSON.parse(data).status != 'true') { console.error("get_status() request failed, please see error logs "); return; }

    var status = JSON.parse(data)["visitor-status"];
    var dest_url = this.get_dest_url_from_status(status);

    // we shouldn't redirect if:
    // 1) there is no matching dest_url to given status
    // 2) user has status of 0 (loading page)
    if (typeof dest_url == 'undefinded' || status == 0) return;

    this.perform_visitor_redirection(dest_url);
  }

  get_dest_url_from_status(status) {
    return this.url_to_status_array[status];
  }

  perform_visitor_redirection(dest_url) {
    window.location = `?p=${dest_url}`;
  }

  poll() {
    var class_scope = this;

    setInterval(function() {
      class_scope.get_status();
    }, 1000);
  }
}
