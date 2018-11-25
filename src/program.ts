import * as fs from "fs";
import * as path from "path";

import { IDNA } from "@opendnd/core";
import Genetica from "@opendnd/genetica";
import Avataria, { IAvatariaOpts } from "./avataria";
import { sanitizeWizardOpts } from "./common";

const program = require("commander"); // tslint:disable-line
const scolors = require("colors/safe"); // tslint:disable-line
const rootDir = path.join(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const pinfo = require(path.join(rootDir, "package.json"));  // tslint:disable-line
const avataria = new Avataria();

// program basics
program
  .version(pinfo.version, "-v, --version")
  .description(pinfo.description)
  .option("-r, --race <type>", "specify which race to generate")
  .option("-g, --gender <type>", "specify which gender to generate")
  .option("-i, --input <dna>", "input genetica DNA")
  .option("-o, --output <dir>", "output to the specified directory")
  .parse(process.argv);

// set the options
const { gender, race } = program;

let opts: IAvatariaOpts = {
  gender,
  race,
};

opts = sanitizeWizardOpts(opts);

// setup avatar
let avatar;

// load genetica data
if (program.input) {
  const DNA: IDNA = Genetica.load(program.input);
  avatar = avataria.generate({
    DNA,
  });
} else {
  avatar = avataria.generate(opts);
}

// generate the avatar
const logo = fs.readFileSync(path.join(dataDir, "logo.txt"), { encoding: "utf-8" });
let output = `${scolors.white(logo)}\n${scolors.white("-----------------------------------------------")}\n`;
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
