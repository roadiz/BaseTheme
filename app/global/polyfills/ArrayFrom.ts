// Fix IE
if (!Array.from) {
    Array.from = function (object) {
        'use strict'
        return [].slice.call(object)
    }
}
