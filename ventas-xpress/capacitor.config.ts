import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.VentasXpress',
  appName: 'VentasXpress',
  webDir: 'www',
  bundledWebRuntime: false,
  "server": {
    "cleartext": true
  }
};

export default config;

/* import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FrancescaBaby&Kids',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config; */
