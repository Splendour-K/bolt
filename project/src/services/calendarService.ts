export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  attendees?: string[];
  meetingUrl?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  bookingId?: string;
}

export interface TherapistAvailability {
  therapistId: string;
  date: string;
  timeSlots: TimeSlot[];
}

export class CalendarService {
  private static instance: CalendarService;
  
  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  /**
   * Get therapist availability for a specific date range
   */
  async getTherapistAvailability(
    therapistId: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<TherapistAvailability[]> {
    // In production, this would integrate with Google Calendar API
    // For now, generating realistic availability patterns
    
    const availability: TherapistAvailability[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // Skip weekends for most therapists
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const timeSlots = this.generateDayTimeSlots(currentDate, therapistId);
        
        availability.push({
          therapistId,
          date: currentDate.toISOString().split('T')[0],
          timeSlots
        });
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return availability;
  }

  /**
   * Generate realistic time slots for a therapist on a given day
   */
  private generateDayTimeSlots(date: Date, therapistId: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    
    // Standard working hours: 9 AM to 6 PM
    const workingHours = [
      { start: 9, end: 12 },   // Morning: 9 AM - 12 PM
      { start: 13, end: 18 }   // Afternoon: 1 PM - 6 PM
    ];
    
    workingHours.forEach(period => {
      for (let hour = period.start; hour < period.end; hour++) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setHours(hour + 1, 0, 0, 0);
        
        // Randomly make some slots unavailable (existing bookings)
        const isAvailable = Math.random() > 0.3; // 70% availability rate
        
        slots.push({
          start: slotStart,
          end: slotEnd,
          available: isAvailable,
          bookingId: isAvailable ? undefined : `booking_${Date.now()}_${Math.random()}`
        });
      }
    });
    
    return slots;
  }

  /**
   * Book a time slot for a therapy session
   */
  async bookTimeSlot(
    therapistId: string,
    clientId: string,
    startTime: Date,
    endTime: Date,
    sessionDetails: {
      sessionType: string;
      concerns: string;
      preferredContact: 'video' | 'phone';
    }
  ): Promise<{ success: boolean; bookingId?: string; error?: string }> {
    try {
      // In production, this would:
      // 1. Check slot availability in real-time
      // 2. Create calendar event in therapist's calendar
      // 3. Send calendar invites to both parties
      // 4. Update database with booking details
      
      const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, always succeed unless slot is in the past
      if (startTime < new Date()) {
        return {
          success: false,
          error: 'Cannot book sessions in the past'
        };
      }
      
      return {
        success: true,
        bookingId
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Booking failed'
      };
    }
  }

  /**
   * Get upcoming sessions for a user
   */
  async getUpcomingSessions(userId: string, userRole: 'client' | 'therapist'): Promise<CalendarEvent[]> {
    // In production, this would query the database for actual bookings
    // For now, returning mock data based on user role
    
    const now = new Date();
    const sessions: CalendarEvent[] = [];
    
    if (userRole === 'therapist') {
      // Mock therapist sessions
      sessions.push(
        {
          id: 'session_1',
          title: 'Session with Alex Thompson',
          start: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
          end: new Date(now.getTime() + 3 * 60 * 60 * 1000),
          description: 'Follow-up session - Working on presentation skills',
          meetingUrl: 'https://meet.google.com/abc-defg-hij'
        },
        {
          id: 'session_2',
          title: 'Initial Assessment - Maria Santos',
          start: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          end: new Date(now.getTime() + 25 * 60 * 60 * 1000),
          description: 'First session - Phone call confidence',
          meetingUrl: 'https://meet.google.com/xyz-uvwx-rst'
        }
      );
    } else {
      // Mock client sessions
      sessions.push(
        {
          id: 'session_3',
          title: 'Session with Dr. Sarah Chen',
          start: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          end: new Date(now.getTime() + 25 * 60 * 60 * 1000),
          description: 'Working on public speaking anxiety',
          meetingUrl: 'https://meet.google.com/def-ghij-klm'
        }
      );
    }
    
    return sessions;
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string, reason?: string): Promise<{ success: boolean; error?: string }> {
    try {
      // In production, this would:
      // 1. Update booking status in database
      // 2. Cancel calendar event
      // 3. Send cancellation notifications
      // 4. Process refund if applicable
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Cancellation failed'
      };
    }
  }

  /**
   * Reschedule a booking
   */
  async rescheduleBooking(
    bookingId: string,
    newStartTime: Date,
    newEndTime: Date
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // In production, this would:
      // 1. Check new slot availability
      // 2. Update calendar event
      // 3. Send updated invites
      // 4. Update database
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (newStartTime < new Date()) {
        return {
          success: false,
          error: 'Cannot reschedule to a past time'
        };
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Rescheduling failed'
      };
    }
  }

  /**
   * Format time slot for display
   */
  formatTimeSlot(slot: TimeSlot): string {
    const startTime = slot.start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    const endTime = slot.end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return `${startTime} - ${endTime}`;
  }

  /**
   * Check if a time slot conflicts with existing bookings
   */
  hasConflict(newSlot: TimeSlot, existingSlots: TimeSlot[]): boolean {
    return existingSlots.some(existing => 
      !existing.available &&
      ((newSlot.start >= existing.start && newSlot.start < existing.end) ||
       (newSlot.end > existing.start && newSlot.end <= existing.end) ||
       (newSlot.start <= existing.start && newSlot.end >= existing.end))
    );
  }

  /**
   * Get available time slots for a specific date
   */
  getAvailableSlots(availability: TherapistAvailability, date: string): TimeSlot[] {
    const dayAvailability = availability;
    if (!dayAvailability || dayAvailability.date !== date) {
      return [];
    }
    
    return dayAvailability.timeSlots.filter(slot => slot.available);
  }
}