import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import * as SMS from 'expo-sms-retriever';
import OTPInput from '../../components/OTPInput';

export default function SMSOTPAutofill() {
  const [otp, setOtp] = useState('');

  const handleOTPFilled = (filledOtp) => {
    console.log('OTP filled:', filledOtp);
    // Here you can handle the filled OTP, e.g., send it to your server
  };

  useEffect(() => {
    const startSMSListener = async () => {
      if (Platform.OS === 'android') {
        try {
          const registered = await SMS.startSMSRetrieverAsync();
          if (registered) {
            SMS.addSMSListener((event) => {
              if (event && event.message) {
                const otpRegex = /(\d{4})/; // Assumes OTP is 4 digits
                const match = event.message.match(otpRegex);
                if (match) {
                  setOtp(match[1]);
                  handleOTPFilled(match[1]);
                }
              }
            });
          }
        } catch (error) {
          console.error('Failed to start SMS Retriever', error);
        }
      } else if (Platform.OS === 'ios') {
        // iOS doesn't support automatic SMS retrieval in the same way
        console.log('Automatic SMS retrieval not supported on iOS');
      }
    };

    startSMSListener();

    return () => {
      if (Platform.OS === 'android') {
        SMS.removeSMSListener();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enter OTP:</Text>
      <OTPInput length={4} onOTPFilled={handleOTPFilled} value={otp} />
    </View>
  );
}