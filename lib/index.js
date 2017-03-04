const program = require('commander');
const fs = require('fs');
const path = require('path');
const scolors = require('colors/safe');
const rootDir = path.join(__dirname, '..');
const libDir = path.join(rootDir, 'lib');
const dataDir = path.join(rootDir, 'data');
const avataria = require(path.join(libDir, 'avataria'));
const pinfo = require(path.join(rootDir, 'package.json'));

// program basics
program
.version(pinfo.version, '-v, --version')
.description(pinfo.description)
.option('-s, --species <type>', 'specify which species to generate')
.option('-g, --gender <type>', 'specify which gender to generate')
.option('-o, --output <file>', 'output to the specified file name')
.parse(process.argv);

// set the options
const { gender, species } = program;
const options = {
  gender,
  species,
};

// generate the avatar
avataria(options, (err, results) => {
  const logo = fs.readFileSync(path.join(dataDir, 'logo.txt'), { encoding: 'utf-8' });
  const { raw, base64, ascii } = results;

  // if configured save to file
  // else output the results
  if (program.output) {
    const filename = `${program.output}.png`;
    fs.writeFileSync(filename, raw);
    process.stdout.write(scolors.white(`Saving ${filename}...\n`));
  } else {
    let output = scolors.white(logo);
    output += scolors.yellow.bold.underline('\n\nPreview (note colors may be different in png):');
    output += `\n\n${ascii}`;
    output += scolors.white('\n\n<img src="data:image/png;base64,');
    output += scolors.white(base64);
    output += scolors.white('">');
    output += scolors.white('\n\nurl(\'data:image/png;base64,');
    output += scolors.white(base64);
    output += scolors.white('\')');
    output += '\n\n';

    process.stdout.write(output);
  }
});
