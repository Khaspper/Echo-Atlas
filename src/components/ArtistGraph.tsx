// components/ArtistGraph.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import ArtistCard from './ArtistCard';

interface ArtistGraphProps {
  selectedArtist: string;
  relatedArtists: { name: string; similarityScore: number; photoUrl: string }[];
  centerArtistPhoto: string | null;
}

const ArtistGraph: React.FC<ArtistGraphProps> = ({
  selectedArtist,
  relatedArtists,
  centerArtistPhoto,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<{
    name: string;
    photoUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedArtist || relatedArtists.length === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (!svgRef.current) return;

    const svgSelection = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svgSelection
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('background-color', '#f9f9f9');

    svgSelection.selectAll('*').remove();
    const svgGroup = svgSelection.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 2]).on('zoom', (event) => {
      svgGroup.attr('transform', event.transform);
    });

    svgSelection.call(zoom).style('cursor', 'grab');

    const centralNode = svgGroup.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
    centralNode.append('image')
      .attr('href', centerArtistPhoto || 'https://via.placeholder.com/150')
      .attr('x', -80)
      .attr('y', -80)
      .attr('width', 160)
      .attr('height', 160)
      .attr('clip-path', 'circle(80px at center)');

    centralNode.append('text')
      .text(selectedArtist)
      .attr('text-anchor', 'middle')
      .attr('y', 100)
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#333');

    const angleStep = (2 * Math.PI) / relatedArtists.length;
    const maxDistance = 1000;

    relatedArtists.forEach((artist, index) => {
      let adjustedSimilarityScore = artist.similarityScore;
      if (artist.similarityScore >= 0.9 && artist.similarityScore <= 1) {
        adjustedSimilarityScore = 0.85;
      }

      const angle = angleStep * index;
      const distance = maxDistance * (1 - adjustedSimilarityScore) * 1.5;

      const nodeGroup = svgGroup.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .style('cursor', 'pointer')
        .on('click', () => setSelectedNode({ name: artist.name, photoUrl: artist.photoUrl }));

      nodeGroup.append('image')
        .attr('href', artist.photoUrl || 'https://via.placeholder.com/150')
        .attr('x', -40)
        .attr('y', -40)
        .attr('width', 80)
        .attr('height', 80)
        .attr('clip-path', 'circle(40px at center)');

      nodeGroup.append('text')
        .text(artist.name)
        .attr('text-anchor', 'middle')
        .attr('y', 50)
        .style('font-size', '12px')
        .style('fill', '#333');

      nodeGroup.transition().duration(500).ease(d3.easeLinear).attr(
        'transform',
        `translate(${width / 2 + Math.cos(angle) * distance}, ${
          height / 2 + Math.sin(angle) * distance
        })`
      );

      let movementFactor = 2000;
      function moveRandomly() {
        if (movementFactor < 0.5) return;

        const randomX = Math.random() * movementFactor - movementFactor / 2;
        const randomY = Math.random() * movementFactor - movementFactor / 2;

        nodeGroup
          .transition()
          .duration(60)
          .ease(d3.easeLinear)
          .attr(
            'transform',
            `translate(${width / 2 + Math.cos(angle) * distance + randomX}, ${
              height / 2 + Math.sin(angle) * distance + randomY
            })`
          )
          .on('end', () => {
            movementFactor *= 0.9;
            moveRandomly();
          });
      }

      setTimeout(moveRandomly, 40);
    });
  }, [selectedArtist, relatedArtists, centerArtistPhoto]);

  return (
    <>
      <svg ref={svgRef}></svg>
      {selectedNode && (
        <ArtistCard
          artist={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </>
  );
};

export default ArtistGraph;
