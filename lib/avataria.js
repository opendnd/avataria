const path = require('path');
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const libDir = path.join(rootDir, 'lib');
const PNG = require('pngjs').PNG;
const scolors = require('colors/safe');
const translateColor = require(path.join(libDir, 'translate-color'));

// extend array
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// set species
const setSpecies = (inputValue = '') => {
  const input = inputValue.toLowerCase();
  const allSpecies = ['dragonborn', 'human'];
  let species = allSpecies.sample();

  // grab from the arg if it's valid
  if (allSpecies.indexOf(input) >= 0) {
    species = input;
  }

  return species;
};

// set gender
const setGender = (inputValue = '') => {
  let input = inputValue.toLowerCase();
  const allShortGenders = ['m', 'f'];
  const allGenders = ['male', 'female'];
  let gender = allGenders.sample();

  // set the long from the short if it's there
  if (allShortGenders.indexOf(input) >= 0) {
    input = allGenders[allShortGenders.indexOf(input)];
  }

  // grab from the arg if it's valid
  if (allGenders.indexOf(input) >= 0) {
    gender = input;
  }

  return gender;
};

// generate a png
const avataria = (options, callback) => {
  const species = setSpecies(options.species);
  const gender = setGender(options.gender);

  // prepare the
  const tpl = require(`${dataDir}/${species}-${gender}.json`);
  const colors = require(`${dataDir}/${species}-colors.json`);
  const size = options.size || 128;
  const block = '██';
  let ascii = '';

  // create the png
  const png = new PNG({
    width: size,
    height: size,
    filterType: -1,
  });

  // map
  const hair = options.hair || Object.keys(colors.hairs).sample();
  const skin = options.skin || Object.keys(colors.skins).sample();
  const eye = options.eye || Object.keys(colors.eyes).sample();
  const cmap = {
    0: 'cyan',
    W: 'white',
    B: 'black',
    M: 'red',
    H: hair,
    S: skin,
    E: eye,
  };

  // set the colors
  colors.H = colors.hairs[hair];
  colors.S = colors.skins[skin];
  colors.E = colors.eyes[eye];

  // build png
  for (let y = 0; y < png.height; y += 1) {
    for (let x = 0; x < png.width; x += 1) {
      const idx = ((png.width * y) + x) << 2;
      const px = Math.floor(x / (size / 10));
      const py = Math.floor(y / (size / 10));
      const row = tpl[py];
      const cell = row[px];
      const color = colors[cell];

      png.data[idx] = color[0];
      png.data[idx + 1] = color[1];
      png.data[idx + 2] = color[2];
      png.data[idx + 3] = color[3];
    }
  }

  // build ascii
  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const row = tpl[y];
      const cell = row[x];
      const color = translateColor(cell, cmap[cell]);

      if (typeof (scolors[color]) === 'function') {
        ascii += scolors[color](block);
      } else {
        ascii += scolors.cyan(block);
      }
    }

    ascii += '\n';
  }

  // add the colors to ascii
  const labelHair = scolors.bold.underline('Hair');
  ascii += scolors.white(`\n - ${labelHair} Color: `);
  ascii += scolors[translateColor('H', hair)].bgCyan.bold(hair);
  const labelEyes = scolors.bold.underline('Eyes');
  ascii += scolors.white(`\n - ${labelEyes} Color: `);
  ascii += scolors[translateColor('H', eye)].bgCyan.bold(eye);
  const labelSkin = scolors.bold.underline('Skin');
  ascii += scolors.white(`\n - ${labelSkin} Color: `);
  ascii += scolors[translateColor('S', skin)].bgCyan.bold(skin);

  // pack the png
  png.pack();
  const chunks = [];

  // push chunks
  png.on('data', (chunk) => {
    chunks.push(chunk);
  });

  // finish and output
  png.on('end', () => {
    const raw = Buffer.concat(chunks);
    const base64 = raw.toString('base64');
    callback(null, {
      raw,
      base64,
      ascii,
    });
  });
};

module.exports = avataria;
