const program = require('commander');
const fs = require('fs');
const path = require('path');
const Genetica = require('genetica');
const scolors = require('colors/safe');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const dataDir = path.join(rootDir, 'data');
const Avataria = require(path.join(libDir, 'avataria'));
const pinfo = require(path.join(rootDir, 'package.json'));
const avataria = new Avataria();

// program basics
program
  .version(pinfo.version, '-v, --version')
  .description(pinfo.description)
  .option('-r, --race <type>', 'specify which race to generate')
  .option('-g, --gender <type>', 'specify which gender to generate')
  .option('-i, --input <dna>', 'input genetica DNA')
  .option('-o, --output <dir>', 'output to the specified directory')
  .parse(process.argv);

// set the options
const { gender, race } = program;
const opts = {
  gender,
  race,
};

// setup avatar
let avatar;

// load genetica data
if (program.input) {
  const DNA = Genetica.load(program.input);
  avatar = avataria.generate({
    DNA,
  });
} else {
  avatar = avataria.generate(opts);
}

// generate the avatar
const logo = fs.readFileSync(path.join(dataDir, 'logo.txt'), { encoding: 'utf-8' });
let output = `${scolors.white(logo)}\n${scolors.white('-----------------------------------------------')}\n`;
output += `${avatar}\n`;

// save
if (program.output) {
  const id = new Date().getTime();
  const filepath = path.join(program.output, `avataria-${id}.svg`);
  process.stdout.write(`Saving avatar to ${filepath}...\n`);
  fs.writeFileSync(filepath, avatar);
} else {
  process.stdout.write(output);
}
