import { largestRect, largestSquare } from ".";

describe("rectScaler", function () {
  describe("#largestSquare()", function () {
    it("should work for trivial square container", function () {
      const containerWidth = 1;
      const containerHeight = 1;
      const numSquares = 4;
      const { rows, cols, width, height, area } = largestSquare(
        containerWidth,
        containerHeight,
        numSquares
      );
      expect(rows).toEqual(2);
      expect(cols).toEqual(2);
      expect(width).toEqual(0.5);
      expect(height).toEqual(0.5);
      expect(area).toEqual(0.25);
    });

    it("should work for non-trivial square containers", function () {
      const containerWidth = 1;
      const containerHeight = 1;
      let numSquares = 5;
      let { width, height } = largestSquare(
        containerWidth,
        containerHeight,
        numSquares
      );
      expect(width).toBeCloseTo(0.333, 0.001);
      expect(height).toBeCloseTo(0.333, 0.001);

      numSquares = 8;
      ({ width, height } = largestSquare(
        containerWidth,
        containerHeight,
        numSquares
      ));
      expect(width).toBeCloseTo(0.333, 0.001);
      expect(height).toBeCloseTo(0.333, 0.001);
    });

    it("should work for trivial single-row asymmetric containers", function () {
      const containerWidth = 1;
      const containerHeight = 35;
      const numSquares = 35;
      const { width, height } = largestSquare(
        containerWidth,
        containerHeight,
        numSquares
      );
      expect(width).toEqual(1);
      expect(height).toEqual(1);
    });

    it("should work for non-trivial single row asymmetric containers", function () {
      const containerWidth = 10;
      const containerHeight = 2;
      const numSquares = 8;
      const { width, height } = largestSquare(
        containerWidth,
        containerHeight,
        numSquares
      );
      expect(width).toEqual(1.25);
      expect(height).toEqual(1.25);
    });

    it("errors out with invalid inputs", function () {
      const containerWidth = 100;
      let containerHeight = -1;
      let numSquares = 8;
      expect(() =>
        largestSquare(containerWidth, containerHeight, numSquares)
      ).toThrow();

      containerHeight = 100;
      numSquares = 0;
      expect(() =>
        largestSquare(containerWidth, containerHeight, numSquares)
      ).toThrow();
    });
  });

  describe("#largestRect()", function () {
    it("should work for non-trivial containers", function () {
      const containerWidth = 685;
      const containerHeight = 198;
      const numRects = 5;
      const width = 125;
      const height = 33;
      const { area, rows, cols } = largestRect(
        containerWidth,
        containerHeight,
        numRects,
        width,
        height
      );
      expect(area).toEqual(16500);
      expect(rows).toEqual(3);
      expect(cols).toEqual(2);
    });

    it("errors out with invalid inputs", function () {
      const containerWidth = 100;
      let containerHeight = -1;
      let numSquares = 8;
      expect(() =>
        largestSquare(containerWidth, containerHeight, numSquares)
      ).toThrow();

      containerHeight = 100;
      numSquares = 0;
      expect(() =>
        largestSquare(containerWidth, containerHeight, numSquares)
      ).toThrow();
    });
  });
});
