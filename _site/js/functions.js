'use strict';

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else if (this.name.indexOf('[]') !== -1) {
            o[this.name] = [this.value];
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
