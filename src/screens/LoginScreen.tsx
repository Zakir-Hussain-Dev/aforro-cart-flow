import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../theme/constants';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (phone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(phone);
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login / Signup" showCart={false} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Welcome to Aforro</Text>
          <Text style={styles.subtitle}>Enter your phone number to proceed</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput 
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
              autoFocus
            />
          </View>

          <Button 
            title="Continue" 
            onPress={handleLogin} 
            loading={loading}
            disabled={phone.length < 10 || loading}
            style={styles.loginBtn}
          />

          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service & Privacy Policy
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xxl,
    fontWeight: TYPOGRAPHY.weight.bold as any,
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    marginBottom: SPACING.lg,
  },
  prefix: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.semiBold as any,
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.size.lg,
    color: COLORS.text,
  },
  loginBtn: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  footerText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
