# rect-scaler

A set of javascript functions for calculating how large a set of equally sized squares or rectangles can be to fit within an arbitrary rectangular container, to cover it as fully as possible.

![Illustration](illustration.png?raw=true "Illustration")

Useful for graphical layouts where you need to space items in a nice way. This algorithm does not allow for rotations, and is not generic bin packing.

## Usage

Install from npm:

```
npm install rect-scaler
```

### Fitting squares

Pass the size of the container and the number of squares that need to be placed to `largestSquare()`,
resulting in an object containing the optimal solution.

```js
import { largestSquare } from "rect-scaler";

const containerWidth = 100;
const containerHeight = 100;
const numSquares = 8;
const { rows, cols, width, height, area } = largestSquare(
  containerWidth,
  containerHeight,
  numSquares
);
```

### Fitting rectangles

Pass the size of the container and the number of rectangles that need to be placed,
along with the size of an (unscaled) rectangle that needs to be placed,
resulting in an object containing the optimal solution.

```ts
import { largestRect } from "rect-scaler";

const containerWidth = 100;
const containerHeight = 100;
const numRects = 8;
const rectWidth = 10;
const rectHeight = 2;
const result = largestRect(
  containerWidth,
  containerHeight,
  numRects,
  rectWidth,
  rectHeight
);
```

## Testing

```
yarn test
```

## Todo

- A mode to only allow for equally-sized rows, which would mean that not all rectangles could be placed, but the result would be more visually elegant.
- It might always be the case that the optimal solution is the one where the meta-rectangle's aspect ratio most closely matches that of the container? Worth investigating as an optimization

## Acknowledgements

Inspired by [this question](https://math.stackexchange.com/questions/466198) on Math StackExchange.

[Erich's Packing Center](https://www2.stetson.edu/~efriedma/packing.html) is also pretty interesting, for mathematical thought behind more complex versions of this.

## License

MIT, see [LICENSE.md](http://github.com/fzembow/fit-rect/blob/master/LICENSE.md) for details.
