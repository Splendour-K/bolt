export interface MeetingDetails {
  meetingId: string;
  meetingUrl: string;
  startTime: Date;
  endTime: Date;
  participants: string[];
  hostEmail: string;
  title: string;
  description?: string;
}

export interface MeetingCreationRequest {
  title: string;
  description?: string;
  startTime: Date;
  duration: number; // in minutes
  attendeeEmails: string[];
  hostEmail: string;
}

export class MeetingService {
  private static instance: MeetingService;
  
  static getInstance(): MeetingService {
    if (!MeetingService.instance) {
      MeetingService.instance = new MeetingService();
    }
    return MeetingService.instance;
  }

  /**
   * Creates a Google Meet link for a therapy session
   * In production, this would integrate with Google Calendar API
   */
  async createMeeting(request: MeetingCreationRequest): Promise<MeetingDetails> {
    // For demo purposes, we'll generate a realistic Google Meet URL
    // In production, this would use Google Calendar API to create actual meetings
    
    const meetingId = this.generateMeetingId();
    const meetingUrl = `https://meet.google.com/${meetingId}`;
    
    const meeting: MeetingDetails = {
      meetingId,
      meetingUrl,
      startTime: request.startTime,
      endTime: new Date(request.startTime.getTime() + request.duration * 60000),
      participants: request.attendeeEmails,
      hostEmail: request.hostEmail,
      title: request.title,
      description: request.description
    };

    // In production, this would:
    // 1. Create Google Calendar event
    // 2. Add Google Meet link
    // 3. Send calendar invites to participants
    // 4. Store meeting details in database
    
    console.log('Meeting created:', meeting);
    return meeting;
  }

  /**
   * Generates a realistic Google Meet meeting ID
   */
  private generateMeetingId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const segments = [];
    
    // Generate 3 segments of 4 characters each (xxx-xxxx-xxx format)
    for (let i = 0; i < 3; i++) {
      let segment = '';
      const length = i === 1 ? 4 : 3; // Middle segment is 4 chars
      
      for (let j = 0; j < length; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(segment);
    }
    
    return segments.join('-');
  }

  /**
   * Gets meeting details by ID
   */
  async getMeeting(meetingId: string): Promise<MeetingDetails | null> {
    // In production, this would fetch from database or Google Calendar API
    // For demo, return null (meeting not found)
    return null;
  }

  /**
   * Updates meeting details
   */
  async updateMeeting(meetingId: string, updates: Partial<MeetingDetails>): Promise<MeetingDetails | null> {
    // In production, this would update the Google Calendar event
    console.log('Meeting update requested:', meetingId, updates);
    return null;
  }

  /**
   * Cancels a meeting
   */
  async cancelMeeting(meetingId: string): Promise<boolean> {
    // In production, this would cancel the Google Calendar event
    console.log('Meeting cancellation requested:', meetingId);
    return true;
  }

  /**
   * Generates calendar invite content
   */
  generateCalendarInvite(meeting: MeetingDetails): string {
    const startTime = meeting.startTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = meeting.endTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: meeting.title,
      dates: `${startTime}/${endTime}`,
      details: `${meeting.description || ''}\n\nJoin the meeting: ${meeting.meetingUrl}`,
      location: meeting.meetingUrl
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  /**
   * Validates Google Meet URL format
   */
  isValidMeetUrl(url: string): boolean {
    const meetUrlPattern = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
    return meetUrlPattern.test(url);
  }

  /**
   * Extracts meeting ID from Google Meet URL
   */
  extractMeetingId(url: string): string | null {
    const match = url.match(/meet\.google\.com\/([a-z]{3}-[a-z]{4}-[a-z]{3})/);
    return match ? match[1] : null;
  }
}