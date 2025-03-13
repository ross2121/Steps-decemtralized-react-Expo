declare module 'react-native-intent-launcher' {
    export function launchIntent(options: {
      action: string;
      data?: string;
      type?: string;
      category?: string;
      package?: string;
      flags?: number;
    }): Promise<void>;
  }