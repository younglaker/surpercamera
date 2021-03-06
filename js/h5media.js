// Generated by CoffeeScript 1.6.3
(function() {
  var mediaObj;

  window.H5media = function(selector) {
    return new mediaObj(selector);
  };

  mediaObj = function(selector) {
    this.selector = selector;
    this.stream = null;
    this.currSpeach = null;
    this.selector.addEvent = function(ev_type, fn, bool) {
      var addEvent;
      addEvent = document.addEventListener ? this.addEventListener(ev_type, fn, bool) : this.attachEvent("on" + ev_type, fn);
      return this;
    };
    return this;
  };

  mediaObj.prototype = {
    hasGetUserMedia: function() {
      return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigatoroGetUserMedia || navigator.msieGetUserMedia || false;
    },
    openVideo: function() {
      var th;
      th = this;
      if (this.hasGetUserMedia(this.selector)) {
        navigator.getUserMedia = this.hasGetUserMedia(this.selector);
        navigator.getUserMedia({
          video: true
        }, function(mediaStream) {
          th.selector.src = (window.URL || window.webkitURL).createObjectURL(mediaStream);
          th.stream = mediaStream;
          return th;
        }, function(error) {
          return error;
        });
      } else {
        return false;
      }
      return true;
    },
    pauseVideo: function() {
      this.selector.pause();
      return this.stream.stop();
    },
    resumeVideo: function() {
      return this.openVideo();
    },
    closeVideo: function() {
      this.pauseVideo();
      return this.selector.src = "";
    },
    shotTo: function(img) {
      var canvas, ctx;
      console.dir(this.selector);
      canvas = document.querySelector("#screenshot-canvas");
      ctx = canvas.getContext('2d');
      canvas.width = this.selector.width;
      canvas.height = this.selector.height;
      ctx.drawImage(this.selector, 0, 0, this.selector.width, this.selector.height);
      return img.src = canvas.toDataURL();
    },
    speach: function() {
      return this.selector.addEvent("webkitspeechchange", function(event) {
        return this.currSpeach = event.results[0].utterance;
      });
    }
  };

}).call(this);
