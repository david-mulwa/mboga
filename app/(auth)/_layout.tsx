import { Stack } from "expo-router";


export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='welcome' />
            <Stack.Screen name='login' />
            <Stack.Screen name='register' />
            <Stack.Screen name='reset' />
        </Stack>
    )
}