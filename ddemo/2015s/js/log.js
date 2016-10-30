g('log').className = "";
log = function (f) {
    log.step++;
    var now = (Date.now() - log.start) / 1000;
    var txt = '[' + log.step + '] - ' + now + ': ' + f + '<br>';
    g('log').innerHTML = txt + g('log').innerHTML;
    return console.log('[' + log.step + '] - ', now, arguments);
}
log.start = Date.now();
log.step = 0;