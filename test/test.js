const expect = require('chai').expect;
const scaler = require('../');

describe('rectScaler', function() {
  describe('#largestSquare()', function() {
    it('should work for trivial square container', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      const numSquares = 4;
      const {rows, cols, width, height, area} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(rows).to.equal(2);
      expect(cols).to.equal(2);
      expect(width).to.equal(0.5);
      expect(height).to.equal(0.5);
      expect(area).to.equal(0.25);
    });

    it('should work for non-trivial square containers', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      let numSquares = 5;
      let {width, height} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(width).to.be.closeTo(0.333, 0.001);
      expect(height).to.be.closeTo(0.333, 0.001);

      numSquares = 8;
      ({width, height} = scaler.largestSquare(containerWidth, containerHeight, numSquares));
      expect(width).to.be.closeTo(0.333, 0.001);
      expect(height).to.be.closeTo(0.333, 0.001);
    });

    it('should work for trivial single-row asymmetric containers', function() {
      const containerWidth = 1;
      const containerHeight = 35;
      const numSquares = 35;
      const {width, height} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(width).to.equal(1);
      expect(height).to.equal(1);
    });

    it('should work for non-trivial single row asymmetric containers', function() {
      const containerWidth = 10;
      const containerHeight = 2;
      const numSquares = 8;
      const {width, height} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(width).to.equal(1.25);
      expect(height).to.equal(1.25);
    });

    it('errors out with invalid inputs', function() {
      const containerWidth = 100;
      let containerHeight = -1;
      let numSquares = 8;
      expect(() => scaler.largestSquare(containerWidth, containerHeight, numSquares)).to.throw;

      containerHeight = 100;
      numSquares = 0;
      expect(() => scaler.largestSquare(containerWidth, containerHeight, numSquares)).to.throw;
    });
  });

  describe('#largestRect()', function() {
    it('should work for non-trivial containers', function() {
      const containerWidth = 685;
      const containerHeight = 198;
      const numRects = 5;
      const width = 125;
      const height = 33;
      const {area, rows, cols} = scaler.largestRect(containerWidth, containerHeight, numRects, width, height);
      expect(area).to.equal(16500);
      expect(rows).to.equal(3);
      expect(cols).to.equal(2);
    });

    it('errors out with invalid inputs', function() {
      const containerWidth = 100;
      let containerHeight = -1;
      let numSquares = 8;
      expect(() => scaler.largestSquare(containerWidth, containerHeight, numSquares)).to.throw;

      containerHeight = 100;
      numSquares = 0;
      expect(() => scaler.largestSquare(containerWidth, containerHeight, numSquares)).to.throw;
    });
  });
});
