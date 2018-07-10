const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const libDir = path.join(rootDir, 'lib');
const defaults = require(path.join(libDir, 'defaults'));
const Genetica = require('genetica');

class Avataria {
  constructor(opts = {}) {
    this.defaults = opts.defaults || defaults;
    this.genetica = new Genetica();
  }

  generateSkinColor(race, trait) {
    const { skinColors } = this.defaults;
    return skinColors[race.toLowerCase()][trait.toLowerCase()];
  }

  generateHairColor(race, trait) {
    const { hairColors } = this.defaults;
    return hairColors[race.toLowerCase()][trait.toLowerCase()];
  }

  generateEyeColor(race, trait) {
    const { eyeColors } = this.defaults;
    return eyeColors[race.toLowerCase()][trait.toLowerCase()];
  }

  generate(opts = {}) {
    const DNA = opts.DNA || this.genetica.generate(opts);
    const { race, gender, traits } = DNA;
    const skinColor = traits['skin-color'].trait;
    const hairColor = traits['hair-color'].trait;
    const eyeColor = traits['eye-color'].trait;
    const multi = (skinColor.includes('multi-colored')) ? '-multi' : '';
    const template = fs.readFileSync(path.join(assetsDir, `${race}-${gender}${multi}.svg`), 'utf-8');
    const skinColorHex = this.generateSkinColor(race, skinColor);
    const hairColorHex = this.generateHairColor(race, hairColor);
    const eyeColorHex = this.generateEyeColor(race, eyeColor);
    let avatar = template;

    // if multi-colored
    if (multi.length > 0) {
      const colors = skinColor.match(/\(\w+\/\w+\)/g)[0].match(/\w+/g);
      const skinColorHexA = this.generateSkinColor(race, colors[0]);
      const skinColorHexB = this.generateSkinColor(race, colors[1]);

      avatar = avatar.replace(/\{skin-color-a\}/g, `#${skinColorHexA}`);
      avatar = avatar.replace(/\{skin-color-b\}/g, `#${skinColorHexB}`);
    }

    // standard replace
    avatar = avatar.replace(/\{skin-color\}/g, `#${skinColorHex}`);
    avatar = avatar.replace(/\{hair-color\}/g, `#${hairColorHex}`);
    avatar = avatar.replace(/\{eye-color\}/g, `#${eyeColorHex}`);

    return avatar;
  }
}

module.exports = Avataria;
