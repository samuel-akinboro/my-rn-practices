import { Stack } from "expo-router"

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='home' />
    </Stack>
  )
}

export default Layout