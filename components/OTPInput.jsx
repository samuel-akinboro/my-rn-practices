import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const OTPInput = ({ length = 4, onOTPFilled }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const checkClipboard = async () => {
        const content = await Clipboard.getStringAsync();
        const otpRegex = new RegExp(`(\\d{${length}})`);
        const match = content.match(otpRegex);
        if (match) {
          const receivedOtp = match[1].split('');
          setOtp(receivedOtp);
          receivedOtp.forEach((digit, index) => {
            if (inputRefs.current[index]) {
              inputRefs.current[index].setNativeProps({ text: digit });
            }
          });
          onOTPFilled(receivedOtp.join(''));
        }
      };

      const clipboardListener = setInterval(checkClipboard, 1000);
      return () => clearInterval(clipboardListener);
    }
  }, [length, onOTPFilled]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      onOTPFilled(newOtp.join(''));
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={digit}
          onChangeText={(value) => handleOtpChange(value, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          textContentType={Platform.OS === 'ios' ? 'oneTimeCode' : 'none'}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default OTPInput;