export function svgPointToWindow(svg: SVGSVGElement, x: number, y: number) {
    const pt =  new DOMPoint(x, y).matrixTransform(svg.getScreenCTM()!)
    return {
        x: pt.x,
        y: pt.y,
    }
}