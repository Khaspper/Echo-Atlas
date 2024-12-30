// import React, { useEffect, useState } from 'react';
// import ReactFlow, { ReactFlowProvider, Node, Edge } from 'reactflow';
// import 'reactflow/dist/style.css';

// const ArtistCard = ({ data }: { data: { name: string; photoUrl: string } }) => (
//   <div className="p-4 shadow-lg rounded-lg bg-white text-center w-32">
//     <img src={data.photoUrl} alt={data.name} className="w-16 h-16 mx-auto rounded-full" />
//     <p className="text-sm font-bold mt-2">{data.name}</p>
//   </div>
// );

// const nodeTypes = {
//   artistCard: ArtistCard,
// };

// type ArtistGraphProps = {
//   selectedArtist: string;
//   relatedArtists: { name: string; photoUrl: string; similarityScore: number }[];
// };

// export default function ArtistGraph({ selectedArtist, relatedArtists }: ArtistGraphProps) {
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);

//   useEffect(() => {
//     if (selectedArtist) {
//       const screenWidth = window.innerWidth;
//       const screenHeight = window.innerHeight;

//       // Center the main node dynamically
//       const mainNode: Node = {
//         id: selectedArtist,
//         type: 'artistCard',
//         position: { x: 0, y: 0 }, // Center at origin
//         data: { name: selectedArtist, photoUrl: 'https://via.placeholder.com/100' },
//       };

//       // Calculate positions for related artist nodes based on similarity scores
//       const baseRadius = 200; // Minimum radius
//       const maxRadius = 500; // Maximum radius
//       const relatedNodes: Node[] = relatedArtists.map((artist, index) => {
//         const angle = (index / relatedArtists.length) * 2 * Math.PI; // Evenly distribute nodes in a circle
//         const scaledRadius = baseRadius + (maxRadius - baseRadius) * artist.similarityScore;

//         return {
//           id: artist.name,
//           type: 'artistCard',
//           position: {
//             x: scaledRadius * Math.cos(angle),
//             y: scaledRadius * Math.sin(angle),
//           },
//           data: { name: artist.name, photoUrl: artist.photoUrl },
//         };
//       });

//       // Adjust the positions to ensure nodes are centered
//       const offsetX = screenWidth / 2;
//       const offsetY = screenHeight / 2;

//       const adjustedNodes = [mainNode, ...relatedNodes].map((node) => ({
//         ...node,
//         position: {
//           x: node.position.x + offsetX,
//           y: node.position.y + offsetY,
//         },
//       }));

//       // Create edges connecting the main node to related nodes
//       const relatedEdges: Edge[] = relatedArtists.map((artist) => ({
//         id: `e-${selectedArtist}-${artist.name}`,
//         source: selectedArtist,
//         target: artist.name,
//         type: 'default',
//       }));

//       // Update nodes and edges state
//       setNodes(adjustedNodes);
//       setEdges(relatedEdges);
//     }
//   }, [selectedArtist, relatedArtists]);

//   return (
//     <ReactFlowProvider>
//       <div id="react-flow-container" style={{ height: '100vh', width: '100vw' }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           nodeTypes={nodeTypes}
//           defaultViewport={{ x: 350, y: 75, zoom: .5 }} // Zoomed-out view
//           // fitView
//           // fitViewOptions={{ padding: 0 }}
//         />
//       </div>
//     </ReactFlowProvider>
//   );
// }
