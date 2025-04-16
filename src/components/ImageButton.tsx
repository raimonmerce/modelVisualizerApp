import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Image, ImageSourcePropType } from 'react-native';

type ImageButtonProps = {
  imageSource: ImageSourcePropType;
  onPress: () => void;
};

export default function ImageButton({ imageSource, onPress }: ImageButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
});
