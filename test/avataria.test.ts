import { expect } from 'chai';
import Avataria from "../src/avataria";

let avataria;

describe('avataria', () => {
  describe('module', () => {
    before(() => {
      avataria = new Avataria();
    });

    it('creates an avatar', () => {
      const avatar = avataria.generate({})
      expect(avatar.length).to.be.above(1);
    });
  });
});