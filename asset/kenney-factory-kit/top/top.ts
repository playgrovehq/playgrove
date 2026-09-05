// Generated native mesh asset. Geometry is embedded; no GLB loader is needed.
export type V3 = [number, number, number];
export type Transform = {position: V3; rotation: [number, number, number, number]; scale: V3};
export type NativeAsset = {parts: {id: string; parent: string | null; transform: Transform; geometry: {kind: "mesh"; positions: V3[]; normals: V3[]; indices: number[]}; color: string}[]; clips: Record<"stand" | "walk" | "run" | "jump", {duration: number; loop: boolean; tracks: {part: string; keys: {time: number; transform: Transform}[]}[]}>};
export const asset: NativeAsset = {"parts":[{"id":"part_0","parent":null,"transform":{"position":[0,0,0],"rotation":[0,0,0,1],"scale":[1,1,1]},"geometry":{"kind":"mesh","positions":[[-0.5,0,-0.5],[0.5,0,0.5],[0.5,0,-0.5],[-0.5,0,0.5]],"normals":[[0,1,0],[0,1,0],[0,1,0],[0,1,0]],"indices":[0,1,2,1,0,3]},"color":"#76769c"}],"clips":{"stand":{"duration":1,"loop":true,"tracks":[]},"walk":{"duration":1,"loop":true,"tracks":[]},"run":{"duration":1,"loop":true,"tracks":[]},"jump":{"duration":1,"loop":true,"tracks":[]}}};
export default asset;
