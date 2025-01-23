import { StyleSheet,Text, } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ButtonCTA from '@/components/ui/ButtonCTA';
import {useState} from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import InputField from '@/components/InputField';
import { loginUser } from '@/scripts/services/userService';
import  Header  from '@/components/Header';
import { useUser } from '@/context/UserContext';

export default function LoginScreen() {
    const router = useRouter();
    const colourScheme = useColorScheme();
    const iconColour = colourScheme === 'dark' ? '#fff' : '#000';
    const { setUser } = useUser();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string; }>({});
    
    const validateInputs = () => {
        const newErrors: typeof errors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const callLoginUser = async () => {
        if (!validateInputs()) return;
        const errorMessage = await loginUser(email, password, router, setLoading, setUser);

        if (errorMessage) {
            setErrors((prev) => ({...prev, general: errorMessage }));
    }}

    return (
        <ThemedView style={styles.container}>
            <Header title="Enter your details" onBackPress={() => router.back()} iconColour={iconColour} />
            <InputField
                placeholder="Enter your email"
                icon="mail"
                onChangeText={newText => setEmail(newText)}
            />
            <InputField
                placeholder="Password"
                icon="key"
                secureTextEntry={true}
                onChangeText={newText => setPassword(newText)}
            />
            <ThemedView style={styles.errorContainer}>
                {errors.email && <Text style={styles.errorText}>* {errors.email}</Text>}
                {errors.password && <Text style={styles.errorText}>* {errors.password}</Text>}
                {errors.general && <Text style={styles.errorText}>* {errors.general}</Text>}
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>
                <ButtonCTA onPress={callLoginUser} title='Login' />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
        height: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '60%',
        position: 'absolute',
        bottom: 0,
        marginBottom: '4%',
    },
    errorContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});