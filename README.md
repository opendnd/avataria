# Avataria

[![NPM](https://nodei.co/npm/avataria.png?downloads=true&stars=true)](https://nodei.co/npm/avataria/)

This is a tool for randomly generating avatars for use in character sheets.

## Installation

You will need [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed. Then do:

`npm install -g avataria`

## Generate an Avatar

`avataria`

Once you have installed avataria you can generate an avatar by simply running the following:

## Options

### race

`avataria --race human`

Currently there are 9 race available:

#### Dragonborn
![dragonborn-male](doc/dragonborn-male.svg)![dragonborn-female](doc/dragonborn-female.svg)

#### Dwarf
![dwarf-male](doc/dwarf-male.svg)![dwarf-female](doc/dwarf-female.svg)

#### Elf
![elf-male](doc/elf-male.svg)![elf-female](doc/elf-female.svg)

#### Gnome
![gnome-male](doc/gnome-male.svg)![gnome-female](doc/gnome-female.svg)

#### Half-Elf
![half-elf-male](doc/half-elf-male.svg)![half-elf-female](doc/half-elf-female.svg)

#### Half-Orc
![half-orc-male](doc/half-orc-male.svg)![half-orc-female](doc/half-orc-female.svg)

#### Halfling
![halfling-male](doc/halfling-male.svg)![halfling-female](doc/halfling-female.svg)

#### Human
![human-male](doc/human-male.svg)![human-female](doc/human-female.svg)

#### Tiefling
![tiefling-male](doc/tiefling-male.svg)![tiefling-female](doc/tiefling-female.svg)

### Gender

`avataria --gender male`

You can specify a gender by setting either `male` or `female`

## Module Usage

```javascript
const Avataria = require('avataria');

// specify options, none are required
const opts = {
  race: 'Human',
  gender: 'male',
};

// call the method
const avataria = new Avataria();
const avatar = avataria.generate(opts);
```

### Options

- __Race__: defaults to random, you can set the race to any available
- __Gender__: defaults to random, you can set the gender to either __male__ or __female__

## License

[MIT](https://github.com/opendnd/avataria/blob/master/LICENSE)