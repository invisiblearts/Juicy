'use strict';

function Log() {
    var Console = console;

    return {
        info : info,
        debug : debug,
        warn : warn,
        error : error
    };
    //////////////

    function info(msg) {
        Console.log(msg);
    }

    function debug(msg) {
        Console.debug(msg);
    }

    function warn(msg) {
        Console.warn(msg);
    }

    function error(msg) {
        Console.error(msg);
    }

}

module.exports = Log();
