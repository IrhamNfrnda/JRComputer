import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const ServiceScreen = ({ navigation }) => {
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  // const [attachment, setAttachment] = useState(null);

  const handleFormSubmit = () => {
    // Pass the form data as route parameters to the OrderService screen
    navigation.navigate('OrderService', {
      deviceType,
      brand,
      model,
      issueDescription,
      // attachment,
    });
    
  };

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setAttachment(res);
    } catch (error) {
      console.log('Error picking file:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Form Service</Text>
        <Text variant="titleSmall">Masukan Data Perangkat</Text>
      </View>
      <TextInput
        label="Tipe Perangkat"
        value={deviceType}
        onChangeText={text => setDeviceType(text)}
        style={styles.input}
      />
      <TextInput
        label="Merk"
        value={brand}
        onChangeText={text => setBrand(text)}
        style={styles.input}
      />
      <TextInput
        label="Model"
        value={model}
        onChangeText={text => setModel(text)}
        style={styles.input}
      />
      <TextInput
        label="Deskripsi Masalah"
        value={issueDescription}
        onChangeText={text => setIssueDescription(text)}
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      {/* <Button onPress={handleFilePicker} style={styles.filePickerButton}>
        {attachment ? 'Foto Terupload' : 'Upload Foto'}
      </Button> */}
      <Button mode="contained" onPress={handleFormSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  )
}

ServiceScreen.navigationOptions = {
  title: 'Repair Service Form',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  filePickerButton: {
    marginTop: 16,
    marginBottom: 16,
    borderColor: 'grey',
  },
  button: {
    marginTop: 16,
  },
});

export default ServiceScreen
