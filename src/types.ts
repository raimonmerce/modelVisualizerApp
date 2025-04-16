export type GeometryConfig =
| { type: 'cube', width: number, height: number, depth: number }
| { type: 'sphere', radius: number, latitudeBands: number, longitudeBands: number }
| { type: 'pyramid', edges: number, height: number }
| { type: 'prism', edges: number, height: number };