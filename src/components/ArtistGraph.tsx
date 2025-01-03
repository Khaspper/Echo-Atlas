import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ArtistGraphProps {
  selectedArtist: string;
  relatedArtists: { name: string; similarityScore: number; photoUrl: string }[];
  centerArtistPhoto: string | null;
}

export default function ArtistGraph({
  selectedArtist,
  relatedArtists,
  centerArtistPhoto,
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
    const svgGroup = svgSelection.append("g");

    // Set up zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        svgGroup.attr("transform", event.transform);
      });

    // Apply zoom behavior to the SVG element
    svgSelection.call(zoom).style("cursor", "grab");

    // Add central node for the selected artist
    const centralNode = svgGroup
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Add central artist's photo
    centralNode
      .append("image")
      .attr("href", centerArtistPhoto || "https://via.placeholder.com/150")
      .attr("x", -80)
      .attr("y", -80)
      .attr("width", 160)
      .attr("height", 160)
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("clip-path", "circle(80px at center)");

    // Add central artist's name
    centralNode
      .append("text")
      .text(selectedArtist)
      .attr("text-anchor", "middle")
      .attr("y", 100)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .style("fill", "#333");

    // Add nodes for related artists with animation
    const angleStep = (2 * Math.PI) / relatedArtists.length;
    const maxDistance = 1000;

    relatedArtists.forEach((artist, index) => {
      let adjustedSimilarityScore = artist.similarityScore;
      if (artist.similarityScore >= 0.9 && artist.similarityScore <= 1) {
        adjustedSimilarityScore = 0.85;
      }

      const angle = angleStep * index;
      const distance = maxDistance * (1 - adjustedSimilarityScore) * 1.5;

      const nodeGroup = svgGroup
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // Add artist's photo as the node
      nodeGroup
        .append("image")
        .attr("href", artist.photoUrl || "https://via.placeholder.com/150")
        .attr("x", -40)
        .attr("y", -40)
        .attr("width", 80)
        .attr("height", 80)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("clip-path", "circle(40px at center)");

      // Add artist name below the photo
      nodeGroup
        .append("text")
        .text(artist.name)
        .attr("text-anchor", "middle")
        .attr("y", 50)
        .style("font-size", "12px")
        .style("fill", "#333");

      // Animate the node to its designated spot
      nodeGroup
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr(
          "transform",
          `translate(${width / 2 + Math.cos(angle) * distance}, ${
            height / 2 + Math.sin(angle) * distance
          })`
        );
    });
  }, [selectedArtist, relatedArtists, centerArtistPhoto]);

  return <svg ref={svgRef}></svg>;
}
