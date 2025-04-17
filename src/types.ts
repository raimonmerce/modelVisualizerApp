export type GeometryConfig =
| { type: 'cube', width: number, height: number, depth: number }
| { type: 'sphere', radius: number, latitudeBands: number, longitudeBands: number }
| { type: 'pyramid', radius: number, edges: number, height: number }
| { type: 'prism', radius: number, edges: number, height: number };