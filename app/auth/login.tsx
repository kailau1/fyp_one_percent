import { StyleSheet,Text, } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ButtonCTA from '@/components/ui/ButtonCTA';
import {useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import InputField from '@/components/InputField';
import { loginUser } from '@/scripts/services/userService';

export default function LoginScreen() {
    const router = useRouter();
    const colourScheme = useColorScheme();
    const iconColour = colourScheme === 'dark' ? '#fff' : '#000';

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    
    const validateInputs = () => {
        const newErrors: typeof errors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const callLoginUser = async () => {
        if (!validateInputs()) return;
        await loginUser(email, password, router, setLoading);
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.headerContainer}>
                <MaterialIcons name="arrow-back" size={28} color={iconColour} onPress={() => router.back()} style={styles.backIcon}/>
                <ThemedText style={styles.title}>Enter Your Details</ThemedText> 
            </ThemedView>
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
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
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
    backIcon: {
        position: 'absolute',
        left: 0,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: '3%',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Comfortaa_400Regular',
        fontWeight: 500,
        fontSize: 32,
        marginTop: '14%',
        marginBottom: '3%',
        lineHeight: 36,
    },
    textFieldsContainer: {
        alignItems: 'center',
        padding: 10,
        position: 'relative',
        width: '100%',
        marginTop: '7%'
    },
    textFieldLarge: {
        padding: 10,
        width: '100%',
        fontFamily: 'Comfortaa_400Regular',
        outlineWidth: 0,
        fontSize: 18
    },
    inputContainer: {
        backgroundColor: '#F0F0F0',
        position: 'relative', 
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingLeft: '8%', 
        marginTop: '5%',
    },
    icon: {
        position: 'absolute', 
        left: 10,
        top: '50%',
        transform: [{ translateY: -10 }], 
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