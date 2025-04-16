import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import WebGLView from './src/components/WebGLView';
import ImageButton from './src/components/ImageButton';
import { assets } from './src/assets/assets.ts';
import Toast from 'react-native-toast-message';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { GeometryConfig } from './src/types';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",
  };

  const safePadding = '5%';

  const [selectedGeometry, setSelectedGeometry] = useState<GeometryConfig>({
    type: 'cube',
    width: 1,
    height: 1,
    depth: 1
  });

  const [colorGeometry, setColorGeometry] = useState<[number, number, number]>([0.0, 0.0, 1.0]);
  
  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <View style={styles.sectionContainer}>
            <Text
              style={[styles.sectionTitle]}>
              {"Geometry Viewer"}
            </Text>
            <Text
              style={[styles.sectionDescription]}>
              Click the <Text style={styles.highlight}>geometries</Text> to visualize them and configure them.
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <WebGLView geometry={selectedGeometry} color={colorGeometry}/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <ImageButton
            imageSource={assets.png.cubo}
            onPress={() => {
              setColorGeometry([0.0, 0.0, 1.0]);
              setSelectedGeometry({ type: 'cube', width: 1, height: 1.5, depth: 1 });
            }}
          />
          <ImageButton
            imageSource={assets.png.piramide}
            onPress={() => {
              setColorGeometry([1.0, 0.0, 1.0]);
              setSelectedGeometry({ type: 'pyramid', edges: 4, height: 1.2 });
            }}
          />
          <ImageButton
            imageSource={assets.png.tetraedro}
            onPress={() => {
              setColorGeometry([1.0, 0.0, 0.0]);
              setSelectedGeometry({ type: 'pyramid', edges: 3, height: 1.2 });
            }}
          />
          <ImageButton
            imageSource={assets.png.prisma}
            onPress={() => {
              setColorGeometry([0.0, 1.0, 0.0]);
              setSelectedGeometry({ type: 'prism', edges: 6, height: 1 });
            }}
          />
          <ImageButton
            imageSource={assets.png.esfera}
            onPress={() => {
              setColorGeometry([1.0, 1.0, 0.0]);
              setSelectedGeometry({ type: 'sphere', radius: 0.5, latitudeBands: 8, longitudeBands: 8 });
            }}
          />
        </View>
      </ScrollView>
      <Toast /> 
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
