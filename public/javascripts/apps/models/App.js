var Class = require('shipyard/class/Class'),
    Observable = require('shipyard/class/Observable');

module.exports = new Class({

    Extends: Observable,

    toString: function() {
        return '<App>';
    }

});
