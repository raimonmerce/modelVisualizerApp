// App.tsx
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import WebGLView from './src/components/WebGLView';
import GeometrySelector from './src/components/GeometrySelector';
import AttributeControls from './src/components/AttributeControls';
import Toast from 'react-native-toast-message';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GeometryConfig } from './src/types';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: 'white' };
  const safePadding = '5%';

  const [selectedGeometry, setSelectedGeometry] = useState<GeometryConfig>({
    type: 'cube',
    width: 1,
    height: 1.5,
    depth: 1,
  });

  const [colorGeometry, setColorGeometry] = useState<[number, number, number]>([0.0, 0.0, 1.0]);

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white, paddingHorizontal: safePadding, paddingBottom: safePadding }}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Geometry Viewer</Text>
            <Text style={styles.sectionDescription}>
              Click the <Text style={styles.highlight}>geometries</Text> to visualize them and configure them.
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <WebGLView geometry={selectedGeometry} color={colorGeometry} />
        </View>
        <GeometrySelector onSelectGeometry={setSelectedGeometry} onSelectColor={setColorGeometry} />
        <AttributeControls geometry={selectedGeometry} onChange={setSelectedGeometry} />
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
