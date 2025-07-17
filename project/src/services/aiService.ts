import OpenAI from 'openai';

// Initialize OpenAI client only if API key is available
let openai: OpenAI | null = null;

const initializeOpenAI = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey && apiKey !== 'your_openai_api_key_here') {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
    });
  }
};

// Initialize on module load
initializeOpenAI();

export interface PracticeSession {
  id: string;
  type: 'conversation' | 'presentation' | 'interview' | 'phone_call';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  startTime: Date;
}

export interface AIResponse {
  message: string;
  feedback?: {
    encouragement: string;
    suggestions: string[];
    strengths: string[];
  };
  nextPrompt?: string;
}

export class AIService {
  private conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  private currentSession: PracticeSession | null = null;

  async startSession(sessionType: PracticeSession['type'], difficulty: PracticeSession['difficulty']): Promise<string> {
    this.currentSession = {
      id: crypto.randomUUID(),
      type: sessionType,
      difficulty,
      duration: 0,
      startTime: new Date()
    };

    this.conversationHistory = [];
    
    const systemPrompt = this.getSystemPrompt(sessionType, difficulty);
    const initialMessage = await this.generateResponse(systemPrompt, true);
    
    return initialMessage.message;
  }

  async sendMessage(userMessage: string, includeAudio?: boolean): Promise<AIResponse> {
    if (!this.currentSession) {
      throw new Error('No active session. Please start a session first.');
    }

    this.conversationHistory.push({ role: 'user', content: userMessage });
    
    const response = await this.generateResponse(userMessage);
    
    this.conversationHistory.push({ role: 'assistant', content: response.message });
    
    // Limit conversation history to last 10 exchanges
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    return response;
  }

  private async generateResponse(userInput: string, isInitial = false): Promise<AIResponse> {
    // Check if OpenAI is available
    if (!openai) {
      return this.getFallbackResponse(userInput, isInitial);
    }

    try {
      const messages = [
        {
          role: 'system' as const,
          content: this.getSystemPrompt(this.currentSession!.type, this.currentSession!.difficulty)
        },
        ...this.conversationHistory,
        ...(isInitial ? [] : [{ role: 'user' as const, content: userInput }])
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      });

      const aiMessage = completion.choices[0]?.message?.content || 'I apologize, but I had trouble generating a response. Please try again.';

      // Generate feedback based on the conversation
      const feedback = await this.generateFeedback(userInput, aiMessage);

      return {
        message: aiMessage,
        feedback,
        nextPrompt: this.generateNextPrompt()
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Handle specific error types
      if (error instanceof Error && error.message.includes('429')) {
        return {
          message: "I'm currently experiencing high demand and need to take a short break. But don't worry - we can still practice together! I'll provide structured practice exercises and encouragement while we wait for the AI to be available again.",
          feedback: {
            encouragement: "Your dedication to practicing is wonderful, even when facing technical challenges!",
            suggestions: ["Try the practice exercises below", "Check your OpenAI billing at platform.openai.com", "Practice speaking aloud to build confidence"],
            strengths: ["You're persistent and committed", "You're making the effort to practice"]
          }
        };
      }
      
      return this.getFallbackResponse(userInput, isInitial);
    }
  }

  private getFallbackResponse(userInput: string, isInitial: boolean): AIResponse {
    if (isInitial) {
      return {
        message: "Welcome to LanSpeech practice! While our AI is taking a break, I can still help you practice. Try speaking about your day, your goals, or anything that interests you. Remember, every word you speak is progress!",
        feedback: {
          encouragement: "You're taking the first step by starting a practice session!",
          suggestions: ["Speak about something you're passionate about", "Practice introducing yourself", "Try describing your favorite hobby"],
          strengths: ["You're committed to improving", "You're being proactive about practice"]
        }
      };
    }

    // Simple fallback responses for continued conversation
    const fallbackResponses = [
      "That's really interesting! Can you tell me more about that?",
      "I can hear the thought you put into that response. What else would you like to share?",
      "You're doing great! How does it feel to express those thoughts out loud?",
      "That's a wonderful perspective. What made you think about that?",
      "I appreciate you sharing that with me. What would you like to talk about next?"
    ];

    const response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return {
      message: response,
      feedback: {
        encouragement: "You're doing wonderfully! Keep expressing yourself.",
        suggestions: ["Continue sharing your thoughts", "Take your time with each word", "Focus on what you want to say"],
        strengths: ["Clear communication", "Thoughtful responses", "Consistent practice"]
      }
    }
  }

  private getSystemPrompt(sessionType: PracticeSession['type'], difficulty: PracticeSession['difficulty']): string {
    const basePrompt = `You are a supportive, patient, and encouraging AI speech coach for LanSpeech. Your role is to help people who may have speech challenges (including stuttering) practice speaking in a judgment-free environment.

CORE PRINCIPLES:
- Be extremely patient and never rush the user
- Provide gentle, constructive feedback
- Celebrate small wins and progress
- Use encouraging, warm language
- Never make the user feel judged or pressured
- Adapt to the user's pace and comfort level
- Focus on building confidence over perfection

COMMUNICATION STYLE:
- Warm, friendly, and supportive
- Use "I" statements and positive framing
- Acknowledge effort over outcome
- Provide specific, actionable suggestions
- Keep responses concise but meaningful`;

    const sessionSpecificPrompts = {
      conversation: `
SESSION TYPE: Casual Conversation Practice
- Engage in natural, flowing conversation
- Ask open-ended questions about interests, experiences
- Practice turn-taking and active listening
- Help with social communication skills`,

      presentation: `
SESSION TYPE: Presentation Skills Practice
- Help structure thoughts and ideas clearly
- Practice opening statements and conclusions
- Work on pacing and emphasis
- Build confidence in sharing ideas`,

      interview: `
SESSION TYPE: Job Interview Practice
- Practice common interview questions
- Help with self-introduction and storytelling
- Work on professional communication
- Build confidence in selling skills and experience`,

      phone_call: `
SESSION TYPE: Phone Call Practice
- Practice phone etiquette and clarity
- Work on speaking without visual cues
- Help with professional phone communication
- Build comfort with voice-only interaction`
    };

    const difficultyAdjustments = {
      beginner: "Keep conversations simple and short. Provide lots of encouragement. Focus on basic communication confidence.",
      intermediate: "Engage in moderate complexity conversations. Provide balanced feedback. Work on fluency and expression.",
      advanced: "Challenge with complex topics and scenarios. Provide detailed feedback. Focus on refinement and professional skills."
    };

    return `${basePrompt}\n\n${sessionSpecificPrompts[sessionType]}\n\nDIFFICULTY LEVEL: ${difficulty.toUpperCase()}\n${difficultyAdjustments[difficulty]}`;
  }

  private async generateFeedback(userInput: string, aiResponse: string): Promise<AIResponse['feedback']> {
    // In a real implementation, this could analyze speech patterns, pace, etc.
    // For now, we'll provide encouraging general feedback
    
    const encouragements = [
      "You're doing great! Every word you speak is progress.",
      "I can hear the confidence building in your voice.",
      "That was really well expressed!",
      "You're taking your time, and that's perfect.",
      "I love how thoughtful your responses are."
    ];

    const suggestions = [
      "Try taking a deep breath before speaking",
      "Remember, there's no rush - take your time",
      "Consider pausing between thoughts",
      "Focus on one idea at a time"
    ];

    const strengths = [
      "Clear communication",
      "Thoughtful responses",
      "Good engagement",
      "Willingness to practice",
      "Authentic expression"
    ];

    return {
      encouragement: encouragements[Math.floor(Math.random() * encouragements.length)],
      suggestions: suggestions.slice(0, 2),
      strengths: strengths.slice(0, 2)
    };
  }

  private generateNextPrompt(): string {
    const prompts = [
      "What would you like to talk about next?",
      "How are you feeling about this conversation so far?",
      "Is there anything specific you'd like to practice?",
      "What's on your mind today?"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  }

  endSession(): { duration: number; sessionId: string } | null {
    if (!this.currentSession) return null;
    
    const duration = Date.now() - this.currentSession.startTime.getTime();
    const sessionId = this.currentSession.id;
    
    this.currentSession = null;
    this.conversationHistory = [];
    
    return { duration, sessionId };
  }
}