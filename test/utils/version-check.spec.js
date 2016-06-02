import {expect} from 'chai';

import isVersionValid from '../../src/utils/version-checker';

describe('version-checker', () => {
  describe('`valid`', () => {
    it('should validate true if version is a valid version', () => {
      const result = isVersionValid('1.2.3', '0.0.0', '3.3.3');
      expect(result).to.be.true;
    });

    it('should validate false if version is an invalid string', () => {
      const resultA = isVersionValid('1.def.ghi', '0.0.0', '3.3.3');
      const resultB = isVersionValid('abc.2.ghi', '0.0.0', '3.3.3');
      const resultC = isVersionValid('abc.def.3', '0.0.0', '3.3.3');
      const resultD = isVersionValid('1.2.3.beta', '0.0.0', '3.3.3');
      expect(resultA).to.be.false;
      expect(resultB).to.be.false;
      expect(resultC).to.be.false;
      expect(resultD).to.be.true;
    });

    it('should validate false if version less than the min verson or greater than max version', () => {
      const resultA = isVersionValid('0.0.9', '1.0.0', '3.0.0');
      const resultB = isVersionValid('0.9.0', '1.0.0', '3.0.0');
      const resultC = isVersionValid('1.0.0', '1.0.0', '3.0.0');
      const resultD = isVersionValid('3.0.0', '1.0.0', '3.0.0');
      const resultE = isVersionValid('3.0.9', '1.0.0', '3.0.0');
      const resultF = isVersionValid('3.9.0', '1.0.0', '3.0.0');
      expect(resultA).to.be.false;
      expect(resultB).to.be.false;
      expect(resultC).to.be.true;
      expect(resultD).to.be.true;
      expect(resultE).to.be.false;
      expect(resultF).to.be.false;
    });
  });
});