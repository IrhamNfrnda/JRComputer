import React from 'react';
import { View, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import { Avatar } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const AboutScreen = () => {
  const handleOpenWebsite = () => {
    Linking.openURL('https://www.jrcomputer.pku');
  };

  const handleOpenInstagram = () => {
    Linking.openURL('https://www.instagram.com/jrcomputer');
  };

  const handleOpenFacebook = () => {
    Linking.openURL('https://www.facebook.com/jrcomputer');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar.Image
            source={require('../../assets/logo.png')}
            size={80}
            style={styles.logo}
          />
          <Text style={styles.title}>JRComputer.Pku</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang</Text>
          <Text>
            Service dan Instalasi computer, laptop, jaringan, CCTV
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kontak</Text>
          <Text>Email: royandjulianto@gmail.com</Text>
          <Text>No. Hp: +6281371459267</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sosial Media</Text>
          <Text onPress={handleOpenInstagram}>Instagram: @jrcomputer.pku</Text>
          <Text onPress={handleOpenFacebook}>Facebook: JRComputer.Pku</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alamat</Text>
          <Text>JRComputer.Pku</Text>
          <Text>Jalan Harapan Raya</Text>
          <Text>Pekanbaru, Indonesia</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: -0.5296,
              longitude: 101.4479,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{ latitude: -0.5296, longitude: 101.4479 }}
              title="JRComputer"
              description="Computer Repair & IT Support"
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapContainer: {
    flex: 1,
    height: 400,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default AboutScreen;
