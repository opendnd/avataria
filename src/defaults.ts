/* eslint-disable */
import {
  Genders,
  ILinkRace,
  IRace,
  SRD,
} from "@opendnd/core";
import * as fs from "fs";
import * as path from "path";

export interface IColorDictionary {
  [trait: string]: string;
}

export interface IRacesColorDictionary {
  [race: string]: IColorDictionary;
}

export interface IAvatariaDefaults {
  hairColors: IRacesColorDictionary;
  skinColors: IRacesColorDictionary;
  eyeColors: IRacesColorDictionary;

  races: {
    [uuid: string]: ILinkRace,
  };

  raceOptions?: string[];

  racesDict: {
    [uuid: string]: IRace,
  };

  genderOptions?: string[];
}

const {
  races,
  racesDict,
} = SRD;

const home = process.env.HOME || process.env.USERPROFILE;
const userPath = path.join(home, ".dnd", "avataria", "defaults.js");
let defaults: IAvatariaDefaults;

// TODO: move this into the race files
const generateHairColors = () => {
  return {
    "black": "201D1D",
    "silver": "CCCBC8",
    "red": "D06A60",
    "golden": "E3A44B",
    "blue": "296BBD",
    "green": "3E8C2E",
    "brass": "8A6721",
    "white": "F7F7F7",
    "copper": "C28471",
    "bronze": "AE5910",
    "blonde": "DDC25D",
    "wheat": "D7B166",
    "titian-haired": "972D26",
    "auburn": "CE5404",
    "brunette": "784A2B",
    "brown": "884112",
    "snow-white": "F7F7F7",
    "steel gray": "CECED7",
    "sable": "98650E",
    "midnight": "10174F",
    "inky black": "000000",
    "ebony": "1F1300",
    "raven": "1C2627",
    "jet black": "000000",
    "blue-black": "092E74",
    "moss green": "286333",
    "multi-colored": "3D167A",
    "violet": "3D167A",
    "platinum": "E8E3D1",
    "bleached": "F3F2C7",
    "fair-haired": "F6E0B0",
    "flaxen": "E1DFC0",
    "sandy blonde": "E1DFC0",
    "honey": "FFD907",
    "butterscotch": "FFD907",
    "strawberry blonde": "F5CC1A",
    "toffee brown": "6F3700",
    "ginger": "F06D16",
    "tawny brown": "BB680D",
    "caramel": "BB680D",
    "nut brown": "884112",
    "brown sugar": "884112",
    "ash brown": "664834",
    "coffee brown": "2C1201",
    "chocolate brown": "884112",
    "charcoal gray": "363636",
    "silver gray": "CCCBC8",
    "salt and pepper": "CCCBC8",
    "lime green": "86F54A",
  };
};

const generatEyeColors = () => {
  return {
    "emerald": "71CA8E",
    "black": "373737",
    "silver": "AAAAAA",
    "blue": "94ABFF",
    "green": "AEEDA9",
    "red": "DB4242",
    "golden": "F5C768",
    "white": "F5F5F5",
    "violet": "F74DFF",
    "auburn": "A04B22",
    "ruby red": "BE0303",
    "moss green": "335338",
    "multi-colored": "",
    "honey": "5C2F8A",
    "hazel": "635A2D",
    "midnight": "060606",
    "sky blue": "68BFFF",
    "sunny blue": "68BFFF",
    "ice blue": "68BFFF",
    "arctic blue": "68BFFF",
    "glacial blue": "68BFFF",
    "crystal blue": "68BFFF",
    "cerulean": "68E3FF",
    "azure": "68E3FF",
    "lake blue": "2C928B",
    "aquamarine": "2C928B",
    "turquoise": "2C928B",
    "dove gray": "DFDFDF",
    "olive": "4A602C",
    "leaf green": "4A602C",
    "cyan": "54F1CB",
    "magenta": "FF2BE5",
    "chestnut": "734420",
    "cocoa brown": "734420",
    "mocha": "734420",
    "onyx": "060606",
    "dark": "060606",
    "tawny": "734420",
    "topaz": "207246",
    "raven": "060606",
    "cornflower blue": "444556",
    "steel blue": "444556",
    "electric blue": "444556",
    "slate blue": "444556",
    "slate gray": "444556",
    "storm blue": "444556",
    "fog gray": "444556",
    "ember red": "E84030",
    "fiery red": "E84030",
    "chocolate brown": "734420",
    "coffee brown": "734420",
    "mahogany": "734420",
    "coal": "060606",
    "brandy": "734420",
    "whiskey": "734420",
    "bronze": "AE5910",
    "copper": "C28471",
    "brass": "8A6721",
    "obsidian": "060606",
    "chrome": "D3D3D3",
    "pewter": "D3D3D3",
    "smoky gray": "D3D3D3",
    "amber": "734420",
    "cognac": "734420",
    "denim blue": "404863",
    "storm gray": "5D5D5D",
    "silver gray": "5D5D5D",
    "platinum": "5D5D5D",
    "ash gray": "5D5D5D",
    "concrete gray": "5D5D5D",
    "shark gray": "5D5D5D",
    "gunmetal gray": "5D5D5D",
    "sepia": "AE893B",
    "sienna brown": "AE893B",
    "mink brown": "734420",
  };
};

const generateSkinColors = () => {
  return {
    porcelain: "FFFAF4",
    fair: "FBECE3",
    peach: "F2D3C3",
    olive: "E5B296",
    honey: "CB9365",
    amber: "B37536",
    hazelnut: "834D15",
    ebony: "573007",
    carob: "452403",
  };
};

const hairColors = {
  "dragonborn": generateHairColors(),
  "dwarf": generateHairColors(),
  "elf": generateHairColors(),
  "gnome": generateHairColors(),
  "half-elf": generateHairColors(),
  "half-orc": generateHairColors(),
  "halfling": generateHairColors(),
  "human": generateHairColors(),
  "tiefling": generateHairColors(),
};

const skinColors = {
  "dragonborn": {
    white: "ffffff",
    red: "600000",
    green: "1B3B1A",
    blue: "0D2163",
    black: "1E201F",
    copper: "C28471",
    brass: "8A6721",
    bronze: "AE5910",
    silver: "D7D7D7",
    gold: "FFB800",
  },
  "dwarf": generateSkinColors(),
  "elf": generateSkinColors(),
  "gnome": generateSkinColors(),
  "half-elf": generateSkinColors(),
  "half-orc": {
    "silver": "D7D7D7",
    "green": "709B5C",
    "brown": "8D7362",
    "red": "B05C5C",
    "violet": "997AA3",
    "blue": "616E9D",
    "deep blue": "404863",
    "black": "222222",
  },
  "halfling": generateSkinColors(),
  "human": generateSkinColors(),
  "tiefling": {
    "silver": "D7D7D7",
    "green": "709B5C",
    "brown": "8D7362",
    "red": "B05C5C",
    "violet": "997AA3",
    "blue": "616E9D",
    "deep blue": "404863",
    "black": "222222",
  },
};

const eyeColors = {
  "dragonborn": generatEyeColors(),
  "dwarf": generatEyeColors(),
  "elf": generatEyeColors(),
  "gnome": generatEyeColors(),
  "half-elf": generatEyeColors(),
  "half-orc": generatEyeColors(),
  "halfling": generatEyeColors(),
  "human": generatEyeColors(),
  "tiefling": generatEyeColors(),
};

// get from the user path
if (fs.existsSync(userPath)) {
  defaults = JSON.parse(fs.readFileSync(userPath, "utf-8"));
} else {
  defaults = {
    hairColors,
    skinColors,
    eyeColors,
    races,
    racesDict,
  };
}

defaults.raceOptions = Object.values(races).map((race) => {
  return race.name;
});

defaults.genderOptions = Object.keys(Genders);

export default defaults;
