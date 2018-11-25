import {
  Categories,
  Genders,
  IDNA,
  ILinkRace,
  IRace,
} from "@opendnd/core";
import Genetica, { IGeneticaOpts } from "@opendnd/genetica";
import * as fs from "fs";
import * as path from "path";

import defaults, { IAvatariaDefaults } from "./defaults";
const rootDir = path.join(__dirname, "..");
const assetsDir = path.join(rootDir, "assets");

export interface IAvatariaOpts {
  defaults?: IAvatariaDefaults;
  DNA?: IDNA;
  race?: ILinkRace;
  gender?: Genders;
}

class Avataria {
  public opts: IAvatariaOpts;
  public defaults: IAvatariaDefaults;
  public race: ILinkRace;
  public gender: Genders;

  constructor(opts: IAvatariaOpts = {}) {
    this.opts = opts;
    this.defaults = opts.defaults || defaults;
  }

  // validate the options
  public validateOpts(opts: IAvatariaOpts = {}) {
    // generate random race
    if (opts.race === undefined) { opts.race = Object.values(this.defaults.races).sample(); }
    this.race = opts.race;

    // generate random gender
    if (opts.gender === undefined) { opts.gender = Object.values(Genders).sample(); }
    this.gender = opts.gender;

    this.opts = opts;
    return opts;
  }

  public generateSkinColor(trait: string) {
    const { skinColors } = this.defaults;
    return skinColors[this.race.name.toLowerCase()][trait.toLowerCase()];
  }

  public generateHairColor(trait: string) {
    const { hairColors } = this.defaults;
    return hairColors[this.race.name.toLowerCase()][trait.toLowerCase()];
  }

  public generateEyeColor(trait: string) {
    const { eyeColors } = this.defaults;
    return eyeColors[this.race.name.toLowerCase()][trait.toLowerCase()];
  }

  public generate(opts: IAvatariaOpts = {}) {
    const genOpts: IAvatariaOpts = this.validateOpts(Object.assign(this.opts, opts));

    // generate DNA
    const geneticaOpts: IGeneticaOpts = {
      gender: genOpts.gender,
      race: genOpts.race,
    };
    const DNA: IDNA = genOpts.DNA || new Genetica().generate(geneticaOpts);
    const { race, gender, traits } = DNA;
    this.race = race;
    this.gender = gender;

    // generate others
    const skinColor = traits[Categories.SkinColor].trait;
    const hairColor = traits[Categories.HairColor].trait;
    const eyeColor = traits[Categories.EyeColor].trait;
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
      } else {
        avatar = avatar.replace(/\{scale-opacity\}/g, "0.05");
        avatar = avatar.replace(/\{skin-color\}/g, `#${skinColorHex}`);
        avatar = avatar.replace(/\{scale-color\}/g, "#cccccc");
      }
    // standard skin
    } else {
      avatar = avatar.replace(/\{skin-color\}/g, `#${skinColorHex}`);
    }

    // standard replace
    avatar = avatar.replace(/\{hair-color\}/g, `#${hairColorHex}`);
    avatar = avatar.replace(/\{eye-color\}/g, `#${eyeColorHex}`);

    return avatar;
  }
}

export default Avataria;
