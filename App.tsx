import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import './i18n';
import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ProfileDetailPage } from "./screens/UserDetailScreen";
import { EmptyScreenComponent } from "./components/EmptyScreenComponent";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthScreen } from "./screens/AuthScreen";

// Create a QueryClient optimized for React Native + Zustand
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 404s or auth errors
        if ((error as any)?.status === 404 || (error as any)?.status === 401) {
          return false
        }
        return failureCount < 2
      },
      refetchOnWindowFocus: false, // React Native doesn't have window focus
      refetchOnMount: false, // Let Zustand handle initial auth state
      refetchOnReconnect: 'always', // Refetch when network reconnects
    },
    mutations: {
      retry: 1,
    },
  },
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Stack Navigator for Home screen with UserDetail
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen
        name="UserDetail"
        component={ProfileDetailPage}
        options={{
          headerShown: false,
          // headerTitle: "",
          // headerTransparent: true,
          // headerTintColor: "#333",
        }}
      />

    </Stack.Navigator>
  );
};

const AppContent = () => {
  const { session, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFDFD", justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#EE9CA7" />
        <Text style={{ marginTop: 10, color: "#666" }}>{t('common.loading')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFDFD" }}>
      <NavigationContainer>
        <StatusBar style='dark' />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName = "explore";

              if (route.name === "Explore") {
                iconName = "explore";
              } else if (route.name === "Match") {
                iconName = "favorite";
              } else if (route.name === "Message") {
                iconName = "chat";
              } else if (route.name === "Profile") {
                iconName = "person";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#EE9CA7",
            tabBarInactiveTintColor: "#666",
            tabBarStyle: {
              backgroundColor: "white",
              borderTopColor: "#F0F0F0",
              borderTopWidth: 1,
              paddingVertical: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
          })}
        >
          <Tab.Screen
            name="Explore"
            component={HomeStack}
            options={{ tabBarLabel: t('tabs.explore') }}
          />
        <Tab.Screen
          name="Match"
          options={{ tabBarLabel: t('tabs.match') }}
        >
          {(props: any) => (
            <EmptyScreenComponent
              {...props}
              onNavigateToProfile={() => {
                props.navigation.navigate("Profile");
              }}
              featureName={t('tabs.match')}
              icon='favorite'
            />
          )}
        </Tab.Screen>
         <Tab.Screen
           name="Message"
           options={{ tabBarLabel: t('tabs.message') }}
         >
            {(props: any) => (
              <EmptyScreenComponent
                {...props}
                onNavigateToProfile={() => {
                  props.navigation.navigate("Profile");
                }}
                featureName={t('tabs.message')}
                icon='chat'
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            // component={session && session.user ? ProfileScreen : AuthScreen}
              component= {(props: any) => (
                  <EmptyScreenComponent
                      {...props}
                      onNavigateToProfile={() => {
                          props.navigation.navigate("Profile");
                      }}
                      featureName={t('tabs.profile')}
                      icon='favorite'
                  />
              )}
            options={{ tabBarLabel: t('tabs.profile') }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
