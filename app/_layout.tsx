import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim';
import { Comfortaa_400Regular, Comfortaa_700Bold} from '@expo-google-fonts/comfortaa'
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { UserProvider } from '@/context/UserContext';
import { HabitsProvider} from '@/context/HabitsContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { JournalsProvider } from '@/context/JournalsContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Itim_400Regular,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <HabitsProvider>
        <JournalsProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen name="main/dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="main/habits" options={{ headerShown: false }} />
            <Stack.Screen name="main/journals" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
        </JournalsProvider>
      </HabitsProvider>
    </UserProvider>
    
  );
}
