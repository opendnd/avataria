const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '..', '..');
const libDir = path.join(rootDir, 'lib');
const binDir = path.join(rootDir, 'bin');
const spawn = require('child_process').spawn;
let avataria;

describe('avataria', () => {
  describe('bin', () => {
    before((done) => {
      const options = [
        '--species', 'dragonborn', 
        '--gender', 'male',
        '--output', 'test',
      ];
      avataria = spawn(path.join(binDir, 'avataria'), options);
      avataria.on('close', () => {
        done();
      });
    });

    it('creates an avatar', () => {
      const filepath = path.join(rootDir, 'test.png');
      const result = fs.existsSync(filepath);
      
      // expectation
      expect(result).to.eq(true);

      // cleanup
      fs.unlinkSync(filepath);
    });
  });

  describe('module', () => {
    before(() => {
      avataria = require(path.join(libDir, 'avataria'));
    });

    it('creates an avatar', (done) => {
      avataria({}, (err, results) => {
        expect(results.ascii.length).to.be.above(1);
        expect(results.base64.length).to.be.above(1);
        done();
      });
    });
  });
});