import React from 'react';
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const GeometryTypes = {
  Cubo: 'Cubo',
  Piramide: 'Piramide',
  Tetraedre: 'Tetraedre',
  Prisma: 'Prisma',
  Esfera: 'Esfera',
} as const;

function clickedGeometry(title: string) {
  console.log("Test", title)
}

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: "white",
  };

  const safePadding = '5%';

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
          <WebGLView />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <ImageButton
            imageSource={assets.png.cubo}
            onPress={() => {
              clickedGeometry(GeometryTypes.Cubo);
            }}
          />
          <ImageButton
            imageSource={assets.png.piramide}
            onPress={() => {
              clickedGeometry(GeometryTypes.Piramide);
            }}
          />
          <ImageButton
            imageSource={assets.png.tetraedro}
            onPress={() => {
              clickedGeometry(GeometryTypes.Tetraedre);
            }}
          />
          <ImageButton
            imageSource={assets.png.prisma}
            onPress={() => {
              clickedGeometry(GeometryTypes.Prisma);
            }}
          />
          <ImageButton
            imageSource={assets.png.esfera}
            onPress={() => {
              clickedGeometry(GeometryTypes.Esfera);
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
