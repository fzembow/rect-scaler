import { RectScalerResult } from "./types";
/**
 * Finds the largest square area when trying to place N squares into a rectangle without rotation.
 *
 * @param containerWidth     The width of the container.
 * @param containerHeight    The height of the container.
 * @param numSquares         How many squares must fit within.
 * @return                   The area and number of rows and columns that fit.
 */
export declare const largestSquare: (containerWidth: number, containerHeight: number, numSquares: number) => RectScalerResult;
/**
 * Finds the largest rectangle area when trying to place N rectangle into a containing
 * rectangle without rotation.
 *
 * @param containerWidth      The width of the container.
 * @param containerHeight     The height of the container.
 * @param numSquares          How many rectangles must fit within.
 * @param width               The unscaled width of the rectangles to be placed.
 * @param height              The unscaled height of the rectangles to be placed.
 * @return                    The area and number of rows and columns that fit.
 */
export declare const largestRect: (containerWidth: number, containerHeight: number, numSquares: number, width: number, height: number) => RectScalerResult;
