$(function () {
    location.port === '8080' && $('<script src="http://localhost:8080/webpack-dev-server.js"></script>').appendTo('body');
});


var tss = require('../base_vue_webpack/tss.js');
var index = require('./js/index.js');

$(function () {
    var html = tss(index);
    $('body').append(html[0]);
    var css = '';

    $.each(html[1], function (k, v) {
        css += v;
    })
    $('head').append('<style>' + css + '</style>')
})