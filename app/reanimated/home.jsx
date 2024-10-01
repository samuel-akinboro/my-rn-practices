import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import { Link } from 'expo-router'

const index = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const routes = [
    {
      name: 'basics-1',
      href: 'reanimated/basics-1'
    },
  ]
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.wrapper}>
          {routes?.map((page, i) => (
            <Link asChild href={page?.href} key={i}>
              <TouchableOpacity
                style={StyleSheet.flatten([
                  styles.card,
                  hoveredIndex === i && styles.cardHovered
                ])}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Text>{page?.name}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    padding: 16
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10
  },
  card: {
    width: 200,
    backgroundColor: '#fff',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardHovered: {
    transform: [{ scale: 1.05 }],
  }
})