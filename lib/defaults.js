/* eslint-disable */
// extend array
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const genders = ['male', 'female'];
const races = ['dragonborn', 'dwarf', 'elf', 'gnome', 'half-elf', 'half-orc', 'halfing', 'human', 'tiefling'];

const generateHairColors = () => {
  return {
    'black': '201D1D',
    'silver': 'CCCBC8',
    'red': 'D06A60',
    'golden': 'E3A44B',
    'blue': '296BBD',
    'green': '3E8C2E',
    'brass': '8A6721',
    'white': 'F7F7F7',
    'copper': 'C28471',
    'bronze': 'AE5910',
    'blonde': 'DDC25D',
    'wheat': 'D7B166',
    'titian-haired': '972D26',
    'auburn': 'CE5404',
    'brunette': '784A2B',
    'brown': '884112',
    'snow-white': 'F7F7F7',
    'steel gray': 'CECED7',
    'sable': '98650E',
    'midnight': '10174F',
    'inky black': '000000',
    'ebony': '1F1300',
    'raven': '1C2627',
    'jet black': '000000',
    'blue-black': '092E74',
    'moss green': '286333',
    'multi-colored': '3D167A',
    'violet': '3D167A',
    'platinum': 'E8E3D1',
    'bleached': 'F3F2C7',
    'fair-haired': 'F6E0B0',
    'flaxen': 'E1DFC0',
    'sandy blonde': 'E1DFC0',
    'honey': 'FFD907',
    'butterscotch': 'FFD907',
    'strawberry blonde': 'F5CC1A',
    'toffee brown': '6F3700',
    'ginger': 'F06D16',
    'tawny brown': 'BB680D',
    'caramel': 'BB680D',
    'nut brown': '884112',
    'brown sugar': '884112',
    'ash brown': '664834',
    'coffee brown': '2C1201',
    'chocolate brown': '884112',
    'charcoal gray': '363636',
    'silver gray': 'CCCBC8',
    'salt and pepper': 'CCCBC8',
    'lime green': '86F54A',
  };
};

const generateSkinColors = () => {
  return {
    'porcelain': 'FFFAF4',
    'fair': 'FBECE3',
    'peach': 'F2D3C3',
    'olive': 'E5B296',
    'honey': 'CB9365',
    'amber': 'B37536',
    'hazelnut': '834D15',
    'ebony': '573007',
    'carob': '452403',
  };
};

const hairColors = {
  'dragonborn': generateHairColors(),
  'dwarf': generateHairColors(),
  'elf': generateHairColors(),
  'gnome': generateHairColors(),
  'half-elf': generateHairColors(),
  'half-orc': generateHairColors(),
  'halfling': generateHairColors(),
  'human': generateHairColors(),
  'tiefling': generateHairColors(),
};

const skinColors = {
  'dragonborn': {
    'white': 'F4F3ED',
    'red': '600000',
    'green': '1B3B1A',
    'blue': '0D2163',
    'black': '1E201F',
    'copper': 'C28471',
    'brass': '8A6721',
    'bronze': 'AE5910',
    'silver': 'D3D3D3',
    'gold': 'FFB800',
  },
  'dwarf': generateSkinColors(),
  'elf': generateSkinColors(),
  'gnome': generateSkinColors(),
  'half-elf': generateSkinColors(),
  'half-orc': {
    'silver': 'D3D3D3',
    'green': '709B5C',
    'brown': '8D7362',
    'red': 'B05C5C',
    'violet': '997AA3',
    'blue': '616E9D',
    'deep blue': '404863',
    'black': '222222',
  },
  'halfling': generateSkinColors(),
  'human': generateSkinColors(),
  'tiefling': {
    'silver': 'D3D3D3',
    'green': '709B5C',
    'brown': '8D7362',
    'red': 'B05C5C',
    'violet': '997AA3',
    'blue': '616E9D',
    'deep blue': '404863',
    'black': '222222',
  },
};

module.exports = {
  genders,
  races,
  hairColors,
  skinColors,
};