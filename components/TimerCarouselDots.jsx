import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

const TimerCarouselDots = ({ totalDots = 5, duration = 5000, onDotChange = () => {} }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(totalDots, {
        duration: duration * totalDots,
        easing: Easing.linear,
      }),
      -1, // Repeat indefinitely
      false // Don't reverse the animation
    );
  }, [totalDots, duration]);

  useAnimatedReaction(
    () => Math.floor(progress.value),
    (currentIndex, previousIndex) => {
      if (currentIndex !== previousIndex) {
        runOnJS(onDotChange)(currentIndex % totalDots);
      }
    }
  );

  const renderDots = () => {
    return Array(totalDots)
      .fill()
      .map((_, index) => {
        const dotStyle = useAnimatedStyle(() => {
          const activeDotIndex = Math.floor(progress.value) % totalDots;
          const isActive = index === activeDotIndex;
          const dotProgress = isActive ? progress.value % 1 : 0;

          return {
            width: withTiming(isActive ? dotProgress : '0%', { duration: 100 }),
            opacity: withTiming(isActive ? 1 : 0.3, { duration: 100 }),
          };
        });

        const timerStyle = useAnimatedStyle(() => {
          const activeDotIndex = Math.floor(progress.value) % totalDots;
          const isActive = index === activeDotIndex;
          const dotProgress = isActive ? progress.value % 1 : 0;

          return {
            width: `${dotProgress * 100}%`,
          };
        });

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              progress.value = index;
              progress.value = withRepeat(
                withTiming(totalDots, {
                  duration: duration * totalDots,
                  easing: Easing.linear,
                }),
                -1, // Repeat indefinitely
                false // Don't reverse the animation
              );
            }}
            style={styles.dotContainer}
          >
            <Animated.View style={[styles.dot, dotStyle]} />
            <Animated.View style={[styles.timerOverlay, timerStyle]} />
          </TouchableOpacity>
        );
      });
  };

  return <View style={styles.container}>{renderDots()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  timerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'white',
  },
});

export default TimerCarouselDots;