// src/components/AttributeControls.tsx
import React from 'react';
import AttributeSlider from './AttributeSlider';
import { GeometryConfig } from '../types';

type Props = {
  geometry: GeometryConfig;
  onChange: (config: GeometryConfig) => void;
};

export default function AttributeControls({ geometry, onChange }: Props) {
  switch (geometry.type) {
    case 'cube':
      return (
        <>
          <AttributeSlider label="Width" min={0.25} max={2} value={geometry.width} onChange={(val) => onChange({ ...geometry, width: val })} />
          <AttributeSlider label="Height" min={0.25} max={2} value={geometry.height} onChange={(val) => onChange({ ...geometry, height: val })} />
          <AttributeSlider label="Depth" min={0.25} max={2} value={geometry.depth} onChange={(val) => onChange({ ...geometry, depth: val })} />
        </>
      );
    case 'sphere':
      return (
        <>
          <AttributeSlider label="Radius" min={0.125} max={1} value={geometry.radius} onChange={(val) => onChange({ ...geometry, radius: val })} />
          <AttributeSlider label="Latitude Bands" min={3} max={10} step={1} value={geometry.latitudeBands} onChange={(val) => onChange({ ...geometry, latitudeBands: val })} />
          <AttributeSlider label="Longitude Bands" min={3} max={10} step={1} value={geometry.longitudeBands} onChange={(val) => onChange({ ...geometry, longitudeBands: val })} />
        </>
      );
    case 'pyramid':
    case 'prism':
      return (
        <>
          <AttributeSlider label="Edges" min={3} max={10} step={1} value={geometry.edges} onChange={(val) => onChange({ ...geometry, edges: val })} />
          <AttributeSlider label="Height" min={0.25} max={2} value={geometry.height} onChange={(val) => onChange({ ...geometry, height: val })} />
        </>
      );
    default:
      return null;
  }
}
