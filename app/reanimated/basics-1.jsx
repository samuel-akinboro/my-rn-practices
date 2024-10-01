import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { devicewidth } from '../../theme/sizes';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const WelcomeScreen = () => {
  const texts = ['HAPPY ', 'INDEPENDENCE ', 'GREETINGS ', 'BLACKVIBES ', 'CODES ', 'PROGRAMMER ', 'KING THE'];
  const titleValue = useSharedValue(0);
  const ctaBtnWidth = useSharedValue(devicewidth * 0.30);
  const positionXValues = texts.map(() => useSharedValue(-1000));

  useEffect(() => {
    animateTitle();
    animateTexts();
    animateCTA();
  }, []);

  const animateTitle = () => {
    titleValue.value = withTiming(1, {duration: 1000});
  }

  const animateCTA = () => {
    ctaBtnWidth.value = withSpring(devicewidth * 0.90, {
      duration: 2000,
      dampingRatio: 0.8,
      stiffness: 100,
      overshootClamping: true,
      restDisplacementThreshold: 1,
      restSpeedThreshold: 25,
    });
  }

  const animateTexts = () => {
    positionXValues.forEach((positionX, index) => {
      setTimeout(() => {
        positionX.value = withTiming(0, { duration: 1700 });
      }, index * 200);
    });
  };

  const handlePress = () => {
    ctaBtnWidth.value = devicewidth * 0.30;
    titleValue.value = 0;
    positionXValues.forEach(positionX => {
      positionX.value = -1000;
    });
    animateTexts();
    animateCTA();
    animateTitle();
  };

  const MyAnimatedCTA = Animated.createAnimatedComponent(TouchableOpacity);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleValue.value,
    transform: [{translateY: interpolate(titleValue.value, [0, 1], [-10, 0], Extrapolation.CLAMP)}]
  }))

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#307123', '#228025']}
        style={styles.background}
      >
        <View style={styles.content}>
          <View style={styles.backgroundTextContainer}>
            {texts.map((text, index) => (
              <Animated.Text 
                numberOfLines={1} 
                key={index} 
                style={[
                  styles.backgroundText, 
                  { 
                    transform: [
                      { rotate: '-10deg' },
                      { translateX: positionXValues[index] }
                    ], 
                    color: text?.split(' ')[0] === 'BLACKVIBES' ? 'white' : 'rgba(255, 255, 255, 0.2)' 
                  }
                ]}
              >
                {text?.repeat(10)}
              </Animated.Text>
            ))}
          </View>
        </View>
        <View style={styles.card}>
          <Animated.Text style={[styles.cardText, animatedTitleStyle]}>
            Happy Independence Day 🇳🇬
          </Animated.Text>
          <MyAnimatedCTA 
            style={[
              styles.loginButton,
              {
                width: ctaBtnWidth
              }
            ]} 
            onPress={handlePress}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </MyAnimatedCTA>
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>🍎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>✉️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backgroundTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    width: devicewidth * 2,
    paddingTop: 0,
    paddingLeft: 10
  },
  backgroundText: {
    fontSize: devicewidth * 0.17,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
    overflow: 'visible'
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 25,
    marginBottom: 30,
    fontWeight: '700',
    alignSelf: 'flex-start',
    lineHeight: 35
  },
  loginButton: {
    backgroundColor: '#144d16',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  socialButton: {
    width: (devicewidth - 140)/4,
    height: (devicewidth - 140)/4,
    borderRadius: (devicewidth - 140)/4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 26,
    fontWeight: '700'
  },
});

export default WelcomeScreen;