import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Settings, Map, User, RefreshCcw, LayoutGrid } from 'lucide-react-native';
import { postImages } from '../../theme/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimerCarouselDots from '../../components/TimerCarouselDots';

const FitnessFeedScreen = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>August Favorite Way</Text>
            <Text style={styles.subHeaderText}>5 days left</Text>
          </View>
          <Bell fill="white" color="#fff" size={24} style={styles.bellIcon} />
        </View>
        
        <View style={styles.carouselContainer}>
          <Image
            source={{uri: postImages[0]}}
            style={styles.backgroundImage}
          />
          <View style={{position: 'absolute', bottom: 110, alignSelf: 'center'}}>
            <TimerCarouselDots
              activeDotIndex={activeDotIndex}
              setActiveDotIndex={setActiveDotIndex}
            />
          </View>
        </View>
        
        <View style={styles.feedContainer}>
          <View style={styles.feedHeader}>
            <Text style={styles.feedHeaderText}>Feed</Text>
            <Settings color="#000" size={24} />
          </View>
        
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>Night running</Text>
            <Text style={styles.activityDate}>10.09.2023 at 11:38PM</Text>
            <View style={styles.activityStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Distance</Text>
                <Text style={styles.statValue}>1.92 mi</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Elev Gain</Text>
                <Text style={styles.statValue}>201 ft</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Time</Text>
                <Text style={styles.statValue}>16m 57s</Text>
              </View>
            </View>
            <View style={styles.userInteraction}>
              <View style={styles.userInfo}>
                <Image
                  source={{uri: postImages[1]}}
                  style={styles.avatar}
                />
                <Text style={styles.username}>@Jenny Wilson</Text>
              </View>
              <View style={styles.interactionIcons}>
                <Text style={styles.commentCount}>1760</Text>
                <View style={styles.heartIcon} />
              </View>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.bottomNav}>
        <LayoutGrid color="#999" size={24} />
        <Map color="#999" size={24} />
        <View style={styles.mainNavButton}>
          <RefreshCcw color="#fff" size={24} />
        </View>
        <User color="#999" size={24} />
        <Image
          source={{uri: postImages[2]}}
          style={styles.navAvatar}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 60,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
  },
  bellIcon: {
    position: 'absolute',
    right: 20,
    top: 0,
  },
  carouselContainer: {
    height: '50%'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  feedContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  feedHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  activityStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {},
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInteraction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  interactionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    marginRight: 10,
  },
  heartIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    // position: 'absolute',
    // ...StyleSheet.absoluteFill,
    // bottom: 30,
    // top: 'auto'
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#999',
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: '#999',
  },
  mainNavButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff7f50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default FitnessFeedScreen;