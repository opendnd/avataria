"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@opendnd/core");
const defaults_1 = require("./defaults");
const { genderOptions, races, } = defaults_1.default;
exports.sanitizeWizardOpts = (opts) => {
    if (!genderOptions.includes(opts.gender)) {
        opts.gender = undefined;
    }
    if (opts.gender) {
        opts.gender = core_1.Genders[opts.gender];
    }
    if (opts.race) {
        Object.values(races).forEach((race) => {
            if (race.name === opts.race) {
                opts.race = race;
            }
        });
    }
    // remove empty opts
    Object.keys(opts).forEach((key) => {
        if (opts[key] === "") {
            opts[key] = undefined;
        }
    });
    return opts;
};
//# sourceMappingURL=common.js.map