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
  declare module 'react-native-websocket' {
    import { Component } from 'react';
    import { NativeSyntheticEvent, ViewProps } from 'react-native';

    export interface WebSocketEvent {
        data: string;
        type: string;
        target: WebSocket;
    }

    export interface WebSocketProps extends ViewProps {
        url: string;
        onOpen?: () => void;
        onMessage?: (event: NativeSyntheticEvent<WebSocketEvent>) => void;
        onError?: (event: NativeSyntheticEvent<WebSocketEvent>) => void;
        onClose?: (event: NativeSyntheticEvent<WebSocketEvent>) => void;
        reconnect?: boolean;
    }

    export default class WebSocket extends Component<WebSocketProps> {}
}