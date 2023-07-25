import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaymentScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.navigate('MainMenu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instruksi Pembayaran</Text>

      {/* Payment Instructions */}
      <View style={styles.paymentInstructions}>
        <Text style={styles.stepText}>Step 1:</Text>
        <Text style={styles.instructionText}>
          Transfer total biaya pemesanan ke rekening bank dibawah:
        </Text>
        <Text style={styles.bankDetails}>Bank: Bank BCA</Text>
        <Text style={styles.bankDetails}>Rekening: 89772374</Text>
        <Text style={styles.bankDetails}>Atas Nama: Julianto Royand</Text>
      </View>

      <View style={styles.paymentInstructions}>
        <Text style={styles.stepText}>Step 2:</Text>
        <Text style={styles.instructionText}>
          Jika sudah ditransfer, silahkan kirimkan bukti transfer ke email
          royandjulianto@gmail.com
        </Text>
      </View>

      <View style={styles.paymentInstructions}>
        <Text style={styles.stepText}>Step 3:</Text>
        <Text style={styles.instructionText}>
          Jika pembayaran sudah terkonfirmasi, maka kami akan menghubungi anda melalui whatsapp untuk proses lebih lanjut
        </Text>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Kembali ke menu utama</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  paymentInstructions: {
    marginBottom: 16,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bankDetails: {
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentScreen;
