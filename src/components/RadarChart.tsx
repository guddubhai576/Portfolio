import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SkillData {
  name: string;
  level: number; // 0 to 100
}

interface RadarChartProps {
  data: SkillData[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size = 300 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = 40;
    const width = size;
    const height = size;
    const radius = Math.min(width, height) / 2 - margin;

    const features = data.map(d => d.name);
    const numFeatures = features.length;

    // Scale
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 100]);
    const angleScale = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, numFeatures]);

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Draw circular grid lines
    const ticks = [20, 40, 60, 80, 100];
    ticks.forEach(t => {
      g.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', rScale(t))
        .style('fill', 'none')
        .style('stroke', 'currentColor')
        .style('stroke-opacity', 0.1)
        .style('stroke-dasharray', '3,3');
    });

    // Draw axis lines and labels
    features.forEach((f, i) => {
      const angle = angleScale(i);
      const x = Math.cos(angle - Math.PI / 2) * radius;
      const y = Math.sin(angle - Math.PI / 2) * radius;
      
      const labelX = Math.cos(angle - Math.PI / 2) * (radius + 20);
      const labelY = Math.sin(angle - Math.PI / 2) * (radius + 20);

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .style('stroke', 'currentColor')
        .style('stroke-opacity', 0.2)
        .style('stroke-width', 1);

      // Labels
      g.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(f)
        .style('font-size', '10px')
        .style('fill', 'currentColor')
        .attr('class', 'text-slate-600 dark:text-slate-400');
    });

    // Create the polygon coordinates
    const line = d3.lineRadial<SkillData>()
      .angle((d, i) => angleScale(i))
      .radius(d => rScale(d.level))
      .curve(d3.curveLinearClosed);

    // Draw the path
    g.append('path')
      .datum(data)
      .attr('d', line)
      .style('fill', 'rgb(20, 184, 166)') // teal-500
      .style('fill-opacity', 0.2)
      .style('stroke', 'rgb(20, 184, 166)') // teal-500
      .style('stroke-width', 2);
      
    // Add dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => Math.cos(angleScale(i) - Math.PI / 2) * rScale(d.level))
      .attr('cy', (d, i) => Math.sin(angleScale(i) - Math.PI / 2) * rScale(d.level))
      .attr('r', 4)
      .style('fill', 'rgb(20, 184, 166)')
      .style('stroke', '#fff')
      .style('stroke-width', 1);

  }, [data, size]);

  return <svg ref={svgRef} className="mx-auto overflow-visible" />;
};
