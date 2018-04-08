/**
 * Internal function to finds the largest rect area when trying to place N
 * rectangles into a container without rotation.
 *
 * @param {Number}  containerWidth      The width of the container.
 * @param {Number}  containerHeight     The height of the container.
 * @param {Number}  numSquares          How many rectangles must fit within.
 * @param {Object}  opts                Options, including aspect ratio.
 * @return {Object}                     The area and number of rows and columns that fit.
 */
function findBestFit(containerWidth, containerHeight, numRects, opts={}) {
  if (containerWidth < 0 || containerHeight < 0) {
    throw new Error('Container must have a non-negative area');
  }
  if (numRects < 1 || !Number.isInteger(numRects)) {
    throw new Error('Number of shapes to place must be a positive integer');
  }
  const aspectRatio = opts.aspectRatio || 1;
  if (isNaN(aspectRatio)) {
    throw new Error('Aspect ratio must be a number');
  }

  let best = { area: 0, cols: 0, rows: 0, width: 0, height: 0 };

  // TODO: Don't start with obviously-bad candidates.
  const startCols = numRects;
  const colDelta = -1;

  // For each combination of rows + cols that can fit the number of rectangles,
  // place them and see the area.
  for (let cols = startCols; cols > 0; cols += colDelta) {
    const rows = Math.ceil(numRects / cols);
    const hScale = containerWidth / (cols * aspectRatio);
    const vScale = containerHeight / rows;
    let width;
    let height;
    // Determine which axis is the constraint.
    if (hScale <= vScale) {
      width = containerWidth / cols;
      height = width / aspectRatio;
    } else {
      height = containerHeight / rows;
      width = height * aspectRatio;
    }
    const area = width * height;
    if (area > best.area) {
      best = {area, width, height, rows, cols};
    }
  }
  return best;
}


/**
 * Finds the largest square area when trying to place N squares into a rectangle without rotation.
 *
 * @param {Number}  containerWidth     The width of the container.
 * @param {Number}  containerHeight    The height of the container.
 * @param {Number}  numSquares         How many squares must fit within.
 * @return {Object}                    The area and number of rows and columns that fit.
 */
function largestSquare(containerWidth, containerHeight, numSquares) {
  return findBestFit(containerWidth, containerHeight, numSquares);
}


/**
 * Finds the largest rectangle area when trying to place N rectangle into a containing
 * rectangle without rotation.
 *
 * @param {Number}  containerWidth      The width of the container.
 * @param {Number}  containerHeight     The height of the container.
 * @param {Number}  numSquares          How many rectangles must fit within.
 * @param {Number}  width               The unscaled width of the rectangles to be placed.
 * @param {Number}  height              The unscaled height of the rectangles to be placed.
 * @return {Object}                     The area and number of rows and columns that fit.
 */
function largestRect(containerWidth, containerHeight, numSquares, width, height) {
  return findBestFit(containerWidth, containerHeight, numSquares, { aspectRatio: width / height });
}


module.exports = {
  largestRect: largestRect,
  largestSquare: largestSquare,
};
