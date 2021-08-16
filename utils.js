export function Post(opt) {
  this.init(opt);
  this.format(opt);
}
Post.prototype = {
  construct: "Post",
  init: function(opt) {
    this.url = opt.url || "";
    this.data = opt.data || {};
    this.method = "POST";
    this.async = true;
    this.success = opt.success || function() {};
  },
  format: function() {
    var data = this.data;
    var params = [];
    for (var key in data) {
      params.push(key + "=" + data[key]);
    }
    this.postData = params.join("&");
    this.xhr();
  },
  xhr: function() {
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.open(this.method, this.url, this.async);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=utf-8"
    );
    xhr.send(that.postData);
    xhr.onreadystatechange = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        that.success(xhr.response);
      }
    }.bind(this);
  }
};