import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

type AttributeSliderProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
};

export default function AttributeSlider({
  label,
  min,
  max,
  step = 0.1,
  value,
  onChange,
}: AttributeSliderProps) {
  return (
    <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
      <Text style={{ fontWeight: 'bold', margin: 4 }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ width: 50 }}>{value.toFixed(2)}</Text>
        <Slider
          style={{ flex: 1 }}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={onChange}
        />
      </View>
    </View>
  );
}