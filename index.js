/**
 * Finds the largest rect size when trying to place N rectangles into a container without rotation.
 * @param {Number}  containerWidth       The width of the container
 * @param {Number}  containerHeight      The container of the container
 * @param {Number}  numRects  How many rectangles must fit within.
 * @return {Object} The size and number of rows and columns that fit.
 */
function largestRect(containerWidth, containerHeight, numRects, opts={}) {
  const maintainEqualRows = opts.maintainEqualRows || false;
  const aspectRatio = opts.aspectRatio || 1;

  const maxArea = (containerWidth * containerHeight) / numRects;
  const sqrt = Math.sqrt(maxArea);
  let width = aspectRatio >= 1 ? sqrt : sqrt * aspectRatio;
  let height = aspectRatio <= 1 ? sqrt : sqrt / aspectRatio;

  let cols = Math.floor(containerWidth / width);
  let rows = Math.floor(containerHeight / height);
  let shapesPlaced = cols * rows;
  let last = {cols, rows};

  while (shapesPlaced < numRects) {
    last = {cols, rows};

    // TODO: Don't bump cols / rows one at a time, do this based on the
    // full remaining space instead.
    // const remainingWidth = containerWidth - cols * width;
    // const remainingHeight = containerHeight - rows * height;
    let xDelta = (containerWidth / width) % 1;
    let yDelta = (containerHeight / height) % 1;

    // Figure out which axis is the closest to a reduction.
    if (xDelta < yDelta) {
      cols += 1;
      width = containerWidth / cols;
      height = width / aspectRatio;
    } else {
      rows += 1;
      height = containerHeight / rows;
      width = height * aspectRatio;
    }

    shapesPlaced = cols * rows;
  }

  if (maintainEqualRows && shapesPlaced !== numRects) {
    const lastRows = last.rows;
    const lastCols = last.cols;
    const remainingWidth = containerWidth - lastCols * width;
    const remainingHeight = containerHeight - lastRows * height;
    let maxWidth;
    let maxHeight;
    if (remainingHeight * aspectRatio > remainingWidth) {
      maxWidth = containerWidth / lastCols;
      maxHeight = maxWidth / aspectRatio;
    } else {
      maxHeight = containerHeight / lastRows;
      maxWidth = maxHeight * aspectRatio;
    }

    return {
      width: maxWidth,
      height: maxHeight,
      rows: lastRows,
      cols: lastCols,
      shapesPlaced: lastRows * lastCols,
    };
  }

  return {
    width,
    height,
    rows,
    cols,
    shapesPlaced: Math.min(numRects, rows * cols),
  };
}

/**
 * Finds the largest square size when trying to place N squares into a rectangle without rotation.
 * @param {Number}  containerWidth       The width of the container
 * @param {Number}  containerHeight      The height of the container
 * @param {Number}  numSquares  How many squares must fit within.
 * @return {Object} The size and number of rows and columns that fit.
 */
function largestSquare(containerWidth, containerHeight, numSquares, opts={}) {
  const res = largestRect(containerWidth, containerHeight, numSquares, opts);
  return {
    ...res,
    size: res.width,
  };
}

/**
 * Finds the largest square size when trying to place N squares into a rectangle without rotation,
 * with the restriction that rows must be of an equal width. Note that the number of squares placed
 * might be smaller than the total number of squares to be placed.
 * @param {Number}  containerWidth       The width of the container
 * @param {Number}  containerHeight      The height of the container
 * @param {Number}  numSquares  How many squares must fit within.
 * @return {Object} The size and number of rows and columns that fit.
 */
function largestSquareEqualRows(containerWidth, containerHeight, numSquares, opts={}) {
  return largestSquare(containerWidth, containerHeight, numSquares, { ...opts, maintainEqualRows: true });
}


module.exports = {
  largestRect: largestRect,
  largestSquare: largestSquare,
  largestSquareEqualRows: largestSquareEqualRows
};
