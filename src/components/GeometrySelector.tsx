// src/components/GeometrySelector.tsx
import React from 'react';
import { View } from 'react-native';
import ImageButton from './ImageButton';
import { assets } from '../assets/assets';
import { GeometryConfig } from '../types';

type Props = {
  onSelectGeometry: (config: GeometryConfig) => void;
  onSelectColor: (color: [number, number, number]) => void;
};

export default function GeometrySelector({ onSelectGeometry, onSelectColor }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      <ImageButton
        imageSource={assets.png.cubo}
        onPress={() => {
          onSelectColor([0.0, 0.0, 1.0]);
          onSelectGeometry({ type: 'cube', width: 1, height: 1.5, depth: 1 });
        }}
      />
      <ImageButton
        imageSource={assets.png.piramide}
        onPress={() => {
          onSelectColor([1.0, 0.0, 1.0]);
          onSelectGeometry({ type: 'pyramid', edges: 4, height: 1.2, radius: 0.5 });
        }}
      />
      <ImageButton
        imageSource={assets.png.prisma}
        onPress={() => {
          onSelectColor([0.0, 1.0, 0.0]);
          onSelectGeometry({ type: 'prism', edges: 6, height: 1, radius: 0.5 });
        }}
      />
      <ImageButton
        imageSource={assets.png.esfera}
        onPress={() => {
          onSelectColor([1.0, 1.0, 0.0]);
          onSelectGeometry({ type: 'sphere', radius: 0.5, latitudeBands: 8, longitudeBands: 8 });
        }}
      />
    </View>
  );
}
