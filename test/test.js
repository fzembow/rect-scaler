const expect = require('chai').expect;
const scaler = require('../');

describe('rectangleScaler', function() {
  describe('#largestSquare()', function() {
    it('should work for a trivial square container', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      const numSquares = 4;
      const {size, shapesPlaced} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(size).to.equal(0.5);
      expect(shapesPlaced).to.equal(4);
    });

    it('should work for complicated square containers', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      const numSquares = 5;
      const {size} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(size).to.be.closeTo(0.333, 0.001);
    });

    it('should work for trivial single-row asymmetric containers', function() {
      const containerWidth = 35;
      const containerHeight = 1;
      const numSquares = 35;
      const {size} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(size).to.equal(1);
    });

/*
    it('should work for complex asymmetric containers', function() {
      const containerWidth = 6;
      const containerHeight = 5;
      const numSquares = 7;
      const {size} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(size).to.equal(1);
    });
*/

    it('should work for complex single rows asymmetric containers', function() {
      const containerWidth = 10;
      const containerHeight = 2;
      const numSquares = 8;
      const {size} = scaler.largestSquare(containerWidth, containerHeight, numSquares);
      expect(size).to.equal(1.25);
    });
  });

  describe('#largestSquareEqualRows()', function() {
    it('should work for simple examples', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      const numSquares = 4;
      const {size, shapesPlaced} = scaler.largestSquareEqualRows(containerWidth, containerHeight, numSquares);
      expect(size).to.equal(0.5);
      expect(shapesPlaced).to.equal(4);
    });

    it('should work for complicated examples', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      const numSquares = 5;
      const {size, rows, cols, shapesPlaced} = scaler.largestSquareEqualRows(containerWidth, containerHeight, numSquares);
      expect(size).to.equal(0.5);
      expect(rows).to.equal(2);
      expect(cols).to.equal(2);
      expect(shapesPlaced).to.equal(4);
    });
  });

  describe('#largestRect()', function() {
    it('should work for simple examples', function() {
      const containerWidth = 1;
      const containerHeight = 1;
      const numRects = 2;
      const opts = { aspectRatio: 2.0 };
      const {rectWidth, rectHeight} = scaler.largestRect(containerWidth, containerHeight, numRects, opts);
      expect(containerWidth).to.equal(1.0);
      expect(containerHeight).to.equal(0.5);
    });
  });
});
