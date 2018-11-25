"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// grab a random element
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
};
exports.default = {};
//# sourceMappingURL=extensions.js.map