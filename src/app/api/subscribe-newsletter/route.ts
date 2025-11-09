import { NextRequest, NextResponse } from 'next/server';

// Submit to Beehive newsletter with weekly-insights flag
async function submitToBeehive(email: string) {
  const BEEHIV_API_KEY = process.env.BEEHIV_API_KEY;
  const BEEHIV_PUBLICATION_ID = process.env.BEEHIV_PUBLICATION_ID;
  
  if (!BEEHIV_API_KEY || !BEEHIV_PUBLICATION_ID) {
    console.error('Beehiv API credentials not configured');
    return { success: false, error: 'Beehiv not configured' };
  }
  
  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIV_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: 'footer-newsletter',
        utm_medium: 'website',
        utm_campaign: 'weekly-insights',
        referring_site: 'https://avyrastudio.com',
        custom_fields: [
          {
            name: 'subscription_type',
            value: 'weekly-insights'
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Beehiv API Error:', errorData);
      return { success: false, error: errorData };
    }
    
    const result = await response.json();
    return { success: true, data: result };
    
  } catch (error) {
    console.error('Beehiv submission error:', error);
    return { success: false, error };
  }
}

// Main POST handler
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Submit to Beehive
    const beehiveResult = await submitToBeehive(email);
    
    if (!beehiveResult.success) {
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter', details: beehiveResult.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to weekly insights!'
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

