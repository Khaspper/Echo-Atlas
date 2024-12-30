import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ArtistGraphProps {
  selectedArtist: string;
  relatedArtists: { name: string; similarityScore: number; photoUrl: string }[];
}

export default function ArtistGraph({
  selectedArtist,
  relatedArtists,
}: ArtistGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!selectedArtist || relatedArtists.length === 0) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (!svgRef.current) return;

    // Set up the SVG canvas
    const svgSelection = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svgSelection
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background-color", "#f9f9f9");

    // Clear existing graph
    svgSelection.selectAll("*").remove();

    // Append a group to contain all graph elements
    const svgGroup = svgSelection.append("g");

    // Set up zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2]) // Set zoom limits
      .on("zoom", (event) => {
        svgGroup.attr("transform", event.transform); // Apply zoom and pan transformations
      });

    // Apply zoom behavior to the SVG element
    svgSelection.call(zoom).style("cursor", "grab");

    // Add central node for the searched artist
    const centralNode = svgGroup
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Add central artist's circle
    centralNode
      .append("circle")
      .attr("r", 80)
      .attr("fill", "#4caf50")
      .attr("stroke", "#333")
      .attr("stroke-width", 2);

    // Add central artist's name
    centralNode
      .append("text")
      .text(selectedArtist)
      .attr("text-anchor", "middle")
      .attr("y", 4)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#fff");

    // Add nodes for related artists that smoothly move to their positions
    const angleStep = (2 * Math.PI) / relatedArtists.length;
    const maxDistance = 1000; // Maximum distance from the center

    relatedArtists.forEach((artist, index) => {
      const angle = angleStep * index;
      const distance = maxDistance * (1 - artist.similarityScore); // Distance based on similarity score
      const overshootFactor = 1.3; // Overshoot distance as a multiplier
      const overshootDistance = distance * overshootFactor;

      // Create a group for each related artist starting at the center
      const nodeGroup = svgGroup
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // Add circular node for related artist
      nodeGroup
        .append("circle")
        .attr("r", 50)
        .attr("fill", "#2196f3")
        .attr("stroke", "#333")
        .attr("stroke-width", 1.5);

      // Add artist name inside the circle
      nodeGroup
        .append("text")
        .text(artist.name)
        .attr("text-anchor", "middle")
        .attr("y", 4)
        .style("font-size", "12px")
        .style("fill", "#fff");

      // Initial overshooting movement
      nodeGroup
        .transition()
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr("transform", `translate(${width / 2 + Math.cos(angle) * overshootDistance}, ${height / 2 + Math.sin(angle) * overshootDistance})`)
        .on("end", () => {
          // Rubber-banding effect to their designated positions
          let velocityX = 0; // Initial velocity
          let velocityY = 0;
          const damping = 0.95; // Slow down over time
          const springStrength = 0.05; // Rubber-banding strength

          d3.timer(() => {
            const transformAttr = nodeGroup.attr("transform");
            if (!transformAttr) return true; // Stop if transform is null

            const match = transformAttr.match(/translate\(([^,]+), ([^)]+)\)/);
            if (!match) return true; // Stop if match is null

            const x = parseFloat(match[1]);
            const y = parseFloat(match[2]);

            const dx = width / 2 + Math.cos(angle) * distance - x;
            const dy = height / 2 + Math.sin(angle) * distance - y;

            velocityX += dx * springStrength;
            velocityY += dy * springStrength;
            velocityX *= damping;
            velocityY *= damping;

            const newX = x + velocityX;
            const newY = y + velocityY;

            nodeGroup.attr("transform", `translate(${newX}, ${newY})`);

            return Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(velocityX) < 0.1 && Math.abs(velocityY) < 0.1; // Stop timer when settled
          });
        });
    });
  }, [selectedArtist, relatedArtists]);

  return <svg ref={svgRef}></svg>;
}
