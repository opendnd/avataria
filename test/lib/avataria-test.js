/* eslint-disable */
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const binDir = path.join(rootDir, 'bin');
const tmpDir = path.join(rootDir, 'tmp');
const spawn = require('child_process').spawn;
let avataria;
let filepath;

describe('avataria', () => {
  describe('bin', () => {
    before((done) => {
      const options = [
        '--race', 'dragonborn', 
        '--gender', 'male',
        '--output', './tmp',
      ];
      avataria = spawn(path.join(binDir, 'avataria'), options);
      avataria.stdout.on('data', (data) => {
        const output = `${data}`;
        filepath = output.replace('Saving avatar to ', '').replace('...', '').replace('tmp/', '');
      });
      avataria.on('close', () => {
        done();
      });
    });

    it('creates an avatar', () => {
      expect(filepath.length).to.be.above(1);
    });
  });

  describe('module', () => {
    before(() => {
      const Avataria = require(path.join(libDir, 'avataria'));
      avataria = new Avataria();
    });

    it('creates an avatar', () => {
      const avatar = avataria.generate({})
      expect(avatar.length).to.be.above(1);
    });
  });
});