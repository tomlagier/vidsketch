/* jshint node:true */

'use strict';

/** The root LayoutView that contains all of the top-level app regions */

var Marionette = require('backbone-shim').Marionette,
  Step1Template = require('templates/Step1Template.html');

module.exports = Marionette.ItemView.extend({
  template: Step1Template,

  ui: {
    record: '.record',
    previewVideo: '#previewvideo',
    stop: '.stop',
    mic: '.mic',
    micIcon: '.micIcon',
    toolTip: '.tooltipped'
  },

  events: {
    'click @ui.record': 'recordVideo',
    'click @ui.stop': 'stopVideo',
    'click @ui.mic': 'activateAudio',
    'click @ui.audio': 'recordAudio',
  },

  onShow: function() {
    this.ui.toolTip.tooltip({delay: 50});
  },

  recordVideo: function () {
    this.trigger('record');
    this.ui.record.hide();
    this.ui.stop.show();
    this.ui.mic.hide();
  },

  stopVideo: function () {
    this.trigger('stop');
  },

  activateAudio: function () {
    // var $mic = $('.mic');
    // $micIcon = $('.mic i');
    // this.ui.mic.click(function() {
    this.trigger('audio');
    if (this.ui.mic.hasClass('active')) {
      this.ui.mic.removeClass('red active').addClass('green');
      this.ui.micIcon.removeClass('mdi-av-mic').addClass('mdi-av-mic-off');
    } else {
      this.ui.mic.addClass('active red').removeClass('green');
      this.ui.micIcon.removeClass('mdi-av-mic-off').addClass('mdi-av-mic');
    }
    // });
  },

  setVideoSrc: function (src) {
    var video = this.ui.previewVideo[0];
    video.src = src;
    video.play();
  },

  setAudioSrc: function (src) {
    var audio = this.ui.audioEl[0];
    audio.src = src;
    audio.play();
  }
});