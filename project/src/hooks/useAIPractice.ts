import { useState, useCallback, useRef } from 'react';
import { AIService, PracticeSession, AIResponse } from '../services/aiService';
import { SpeechService, SpeechRecognitionResult } from '../services/speechService';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  feedback?: AIResponse['feedback'];
  isAudio?: boolean;
}

export interface UsePracticeReturn {
  messages: Message[];
  isLoading: boolean;
  isListening: boolean;
  currentSession: PracticeSession | null;
  error: string | null;
  startSession: (type: PracticeSession['type'], difficulty: PracticeSession['difficulty']) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  startListening: () => void;
  stopListening: () => void;
  speakMessage: (text: string) => Promise<void>;
  endSession: () => void;
  clearError: () => void;
}

export function useAIPractice(): UsePracticeReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const aiService = useRef(new AIService());
  const speechService = useRef(new SpeechService());
  const currentTranscript = useRef('');

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const startSession = useCallback(async (
    type: PracticeSession['type'], 
    difficulty: PracticeSession['difficulty']
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessages([]);
      
      const initialMessage = await aiService.current.startSession(type, difficulty);
      
      setCurrentSession({
        id: crypto.randomUUID(),
        type,
        difficulty,
        duration: 0,
        startTime: new Date()
      });

      const aiMessage = addMessage({
        type: 'ai',
        content: initialMessage
      });

      // Speak the initial message
      try {
        await speechService.current.speak({ text: initialMessage });
      } catch (speechError) {
        console.warn('Could not speak initial message:', speechError);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start session');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const sendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || !currentSession) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add user message
      addMessage({
        type: 'user',
        content: messageContent
      });

      // Get AI response
      const response = await aiService.current.sendMessage(messageContent);
      
      // Add AI message with feedback
      const aiMessage = addMessage({
        type: 'ai',
        content: response.message,
        feedback: response.feedback
      });

      // Speak the AI response
      try {
        await speechService.current.speak({ text: response.message });
      } catch (speechError) {
        console.warn('Could not speak AI response:', speechError);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, addMessage]);

  const handleSpeechResult = useCallback((result: SpeechRecognitionResult) => {
    currentTranscript.current = result.transcript;
    
    if (result.isFinal && result.transcript.trim()) {
      sendMessage(result.transcript);
      currentTranscript.current = '';
    }
  }, [sendMessage]);

  const handleSpeechError = useCallback((error: string) => {
    setError(error);
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!speechService.current.isSpeechRecognitionSupported()) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const success = speechService.current.startListening(
      handleSpeechResult,
      handleSpeechError
    );

    if (success) {
      setIsListening(true);
      setError(null);
    }
  }, [handleSpeechResult, handleSpeechError]);

  const stopListening = useCallback(() => {
    speechService.current.stopListening();
    setIsListening(false);
    
    // If there's a current transcript, send it
    if (currentTranscript.current.trim()) {
      sendMessage(currentTranscript.current);
      currentTranscript.current = '';
    }
  }, [sendMessage]);

  const speakMessage = useCallback(async (text: string) => {
    try {
      await speechService.current.speak({ text });
    } catch (err) {
      console.warn('Could not speak message:', err);
    }
  }, []);

  const endSession = useCallback(() => {
    const sessionData = aiService.current.endSession();
    speechService.current.stopListening();
    
    setCurrentSession(null);
    setIsListening(false);
    setMessages([]);
    setError(null);
    
    // In a real app, you'd save session data here
    if (sessionData) {
      console.log('Session ended:', sessionData);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isListening,
    currentSession,
    error,
    startSession,
    sendMessage,
    startListening,
    stopListening,
    speakMessage,
    endSession,
    clearError
  };
}