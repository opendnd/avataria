"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@opendnd/core");
const genetica_1 = require("@opendnd/genetica");
const fs = require("fs");
const path = require("path");
const defaults_1 = require("./defaults");
const rootDir = path.join(__dirname, "..");
const assetsDir = path.join(rootDir, "assets");
class Avataria {
    constructor(opts = {}) {
        this.opts = opts;
        this.defaults = opts.defaults || defaults_1.default;
    }
    // validate the options
    validateOpts(opts = {}) {
        // generate random race
        if (opts.race === undefined) {
            opts.race = Object.values(this.defaults.races).sample();
        }
        this.race = opts.race;
        // generate random gender
        if (opts.gender === undefined) {
            opts.gender = Object.values(core_1.Genders).sample();
        }
        this.gender = opts.gender;
        this.opts = opts;
        return opts;
    }
    generateSkinColor(trait) {
        const { skinColors } = this.defaults;
        return skinColors[this.race.name.toLowerCase()][trait.toLowerCase()];
    }
    generateHairColor(trait) {
        const { hairColors } = this.defaults;
        return hairColors[this.race.name.toLowerCase()][trait.toLowerCase()];
    }
    generateEyeColor(trait) {
        const { eyeColors } = this.defaults;
        return eyeColors[this.race.name.toLowerCase()][trait.toLowerCase()];
    }
    generate(opts = {}) {
        const genOpts = this.validateOpts(Object.assign(this.opts, opts));
        // generate DNA
        const geneticaOpts = {
            gender: genOpts.gender,
            race: genOpts.race,
        };
        const DNA = genOpts.DNA || new genetica_1.default().generate(geneticaOpts);
        const { race, gender, traits } = DNA;
        this.race = race;
        this.gender = gender;
        // generate others
        const skinColor = traits[core_1.Categories.SkinColor].trait;
        const hairColor = traits[core_1.Categories.HairColor].trait;
        const eyeColor = traits[core_1.Categories.EyeColor].trait;
        const template = fs.readFileSync(path.join(assetsDir, `${race.name.toLowerCase()}-${gender}.svg`), "utf-8");
        const skinColorHex = this.generateSkinColor(skinColor);
        const hairColorHex = this.generateHairColor(hairColor);
        const eyeColorHex = this.generateEyeColor(eyeColor);
        let avatar = template;
        // dragonborn scales
        if (race.name === "Dragonborn") {
            // multi colored
            if (skinColor.includes("multi-colored")) {
                avatar = avatar.replace(/\{scale-opacity\}/g, "0.7");
                const colors = skinColor.match(/\(\w+\/\w+\)/g)[0].match(/\w+/g);
                const scaleColorHex = this.generateSkinColor(colors[0]);
                const bodyColorHex = this.generateSkinColor(colors[1]);
                avatar = avatar.replace(/\{skin-color\}/g, `#${bodyColorHex}`);
                avatar = avatar.replace(/\{scale-color\}/g, `#${scaleColorHex}`);
                // normal scales
            }
            else {
                avatar = avatar.replace(/\{scale-opacity\}/g, "0.05");
                avatar = avatar.replace(/\{skin-color\}/g, `#${skinColorHex}`);
                avatar = avatar.replace(/\{scale-color\}/g, "#cccccc");
            }
            // standard skin
        }
        else {
            avatar = avatar.replace(/\{skin-color\}/g, `#${skinColorHex}`);
        }
        // standard replace
        avatar = avatar.replace(/\{hair-color\}/g, `#${hairColorHex}`);
        avatar = avatar.replace(/\{eye-color\}/g, `#${eyeColorHex}`);
        return avatar;
    }
}
exports.default = Avataria;
//# sourceMappingURL=avataria.js.map