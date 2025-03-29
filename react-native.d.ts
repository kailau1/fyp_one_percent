import 'react-native';

declare module 'react-native' {
  interface TextStyle {
    outlineWidth?: number; // To relieve the error: Property 'outlineWidth' does not exist on type 'TextStyle' despite the code working.
  }
}

declare module '@env' {
  export const BASE_URL: string;
}