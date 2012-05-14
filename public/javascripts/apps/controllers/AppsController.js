var Class = require('shipyard/class/Class');
var Observable = require('shipyard/class/Observable');
var dom = require('shipyard/dom');

var api = require('../api');
var AppsList = require('../views/AppsList');

module.exports = new Class({

  Extends: Observable,

  initialize: function AppsController(data) {
    this.parent(data);
    var controller = this;

    this.list = new AppsList({
      onAppSelect: function(itemView) {
        controller._onAppSelect(itemView);
      }
    });
    this.list.attach('dashboard');
    this.getApps();
  },

  getApps: function getApps() {
    var controller = this;
    var pending = api.getInstalled();
    pending.addListener('success', function(results) {
      results.forEach(function(r) {
        controller.list.addItem(r);
      });

      if (!controller.list.isEmpty()) {
        dom.$('help').setStyle('display', 'none');
      }
    });
  },

  _onAppSelect: function _onAppSelect(appView) {
    var appObject = appView.get('content').appObject;
    if (appObject) {
      appObject.launch();
    }
  }

});
