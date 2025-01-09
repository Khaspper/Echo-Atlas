declare module 'colorthief' {
  export default class ColorThief {
      getColor(image: HTMLImageElement | HTMLCanvasElement, quality?: number): [number, number, number];
      getPalette(image: HTMLImageElement | HTMLCanvasElement, colorCount?: number, quality?: number): [number, number, number][];
  }
}

// Tells TypeScript: "Hey, I'm defining a module called colorthief because it doesn't have built-in types"
// Exports the ColorThief class as the default export so I can import it with import ColorThief from 'colorthief'

// getColor: Returns a single dominant color as an RGB array ([R, G, B])
// getPalette: Returns a palette of dominant colors, each as an RGB array