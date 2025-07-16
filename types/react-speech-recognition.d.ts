declare module 'react-speech-recognition' {
  export interface UseSpeechRecognitionOptions {
    commands?: any[];
  }

  export interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
  }

  export interface UseSpeechRecognitionResult {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
    resetTranscript: () => void;
  }

  export function useSpeechRecognition(
    options?: UseSpeechRecognitionOptions
  ): UseSpeechRecognitionResult;

  export function startListening(options?: {
    continuous?: boolean;
    interimResults?: boolean;
    language?: string;
  }): void;

  export function stopListening(): void;

  export function abortListening(): void;

  const SpeechRecognition: {
    startListening: typeof startListening;
    stopListening: typeof stopListening;
    abortListening: typeof abortListening;
  };

  export default SpeechRecognition;
}
