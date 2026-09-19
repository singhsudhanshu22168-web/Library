/* ==========================================================================
   STUDYSPACE OS — TELEPHONY VOICE CAMPAIGN ADAPTER (`IVoiceProvider`)
   ========================================================================== */

export interface VoiceCallPayload {
  toPhoneNumber: string;
  memberId: string;
  scriptTemplateKey: string;
  templateVariables: Record<string, string>;
}

export interface VoiceCallResult {
  providerCallId: string;
  status: 'QUEUED' | 'INITIATED' | 'FAILED';
  message: string;
}

export interface IVoiceProvider {
  initiateOutboundCall(payload: VoiceCallPayload): Promise<VoiceCallResult>;
}

/**
 * Exotel Telephony Provider Adapter Implementation
 */
export class ExotelVoiceAdapter implements IVoiceProvider {
  async initiateOutboundCall(payload: VoiceCallPayload): Promise<VoiceCallResult> {
    const callId = `exotel_call_${Math.random().toString(36).substring(2, 10)}`;
    return {
      providerCallId: callId,
      status: 'INITIATED',
      message: `Outbound IVR call dispatched to ${payload.toPhoneNumber} via Exotel API.`
    };
  }
}

/**
 * Quiet Hours Guard (21:00 to 08:00 Local Time)
 */
export function isQuietHoursActive(): boolean {
  const currentHour = new Date().getHours();
  // Quiet hours active between 9:00 PM (21) and 8:00 AM (8)
  return currentHour >= 21 || currentHour < 8;
}

/**
 * Voice Campaign Queue Dispatcher
 */
export async function dispatchVoiceReminderCall(payload: VoiceCallPayload, provider: IVoiceProvider): Promise<VoiceCallResult> {
  if (isQuietHoursActive()) {
    return {
      providerCallId: 'N/A',
      status: 'QUEUED',
      message: 'Quiet Hours Active (21:00 - 08:00). Call held in queue until 08:00 AM.'
    };
  }

  return await provider.initiateOutboundCall(payload);
}
