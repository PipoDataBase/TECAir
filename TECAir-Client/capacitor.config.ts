import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'test-tec-air',
  webDir: 'dist/test-tec-air/',
  server: {
    androidScheme: 'http'
  }
};

export default config;
