import { NextRequest, NextResponse } from 'next/server';

// Type definitions for the intake form data
interface IntakeFormData {
  name: string;
  email: string;
  company_name: string;
  website: string;
  project_description: string;
  launch_timeline: string;
  services: string; // Comma-separated string
  budget: string;
  referral_source: string;
}

// Determine priority based on budget
function getPriority(budget: string): number {
  if (budget === '50k-100k+') return 1;
  if (budget === '20k-50k') return 2;
  if (budget === '10k-20k') return 3;
  return 4;
}

// Map form values to ClickUp dropdown option IDs
function mapBudgetToOptionId(budget: string): string {
  const mapping: {[key: string]: string} = {
    '2k-5k': 'eb3b310f-b02a-46c8-8b4c-3007e0a17ad1',
    '5k-10k': 'd481b9d7-80d5-4751-956d-81fe9324d5e4',
    '10k-20k': '81ea29d8-981c-4ef4-af8b-05fb3400c09d',
    '20k-50k': '05d44939-da8c-421e-88e8-a1a05a406286',
    '50k-100k+': '8e88d126-38c1-4239-baf2-e4fa685c37a3'
  };
  return mapping[budget] || '';
}

function mapTimelineToOptionId(timeline: string): string {
  const mapping: {[key: string]: string} = {
    'urgent': 'e9b670e1-784b-4be5-94b5-fa76951c8cbb',
    '1-2-months': '4a5456bc-3672-41af-b864-fdeaf233b992',
    '3-6-months': 'db4648b7-3d88-4c83-a185-29291dcd07a0',
    'flexible': 'd97b49c7-d58f-4177-8948-7ca91cb73cee'
  };
  return mapping[timeline] || '';
}

function mapReferralToOptionId(referral: string): string {
  const mapping: {[key: string]: string} = {
    'referral': '98d46a63-0a30-493e-9a20-c9d9e553f0aa',
    'social-media': 'caf16000-d179-488c-a80d-09d5df9211b8',
    'google-search': 'f1b43e5b-91f3-4947-af4a-ad5e40c77c5d',
    'event-conference': '9a91c1d6-4b58-4c02-9bb1-b28245db053f',
    'other': '416ab280-5bdf-470a-8dca-eb13ef54e695'
  };
  return mapping[referral] || '';
}

function mapServicesToOptionIds(services: string): string[] {
  const mapping: {[key: string]: string} = {
    'brand-identity': '33564287-79e3-40e1-adce-714681203127',
    'brand-strategy': '014c586b-c218-49a1-b283-a08b885da827',
    'web-design': '2a019838-4c7e-40f8-87ac-9385e628e2da',
    'ui-ux-design': 'f000bad9-04e2-4d8d-a230-f7d07c733a12',
    'marketing-assets': 'b79d66d1-fd65-4e3e-bc56-57a7174b79f4',
    'event-design': 'c4db668d-0aa4-4af3-b8b6-d3ea730478f7',
    'development': 'c4feeb34-e9ab-4e25-ae85-eeef4937a711',
    'other': '82f5d94a-b7c8-4965-a49e-6be8864f6326'
  };
  
  return services.split(',').map(service => mapping[service.trim()]).filter(Boolean);
}

// Submit to ClickUp
async function submitToClickUp(data: IntakeFormData) {
  const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
  const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
  
  if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
    console.error('ClickUp API credentials not configured');
    return { success: false, error: 'ClickUp not configured' };
  }
  
  try {
    // Format the task description with all data
    const taskDescription = `
**Contact Information:**
- Name: ${data.name}
- Email: ${data.email}
- Company/Project: ${data.company_name}
${data.website ? `- Website: ${data.website}` : ''}

**Project Details:**
${data.project_description}

**Project Requirements:**
- Timeline: ${data.launch_timeline}
- Services Interested: ${data.services.split(',').join(', ')}
- Budget Range: ${data.budget}
- Referral Source: ${data.referral_source}
    `.trim();
    
    // Create ClickUp task
    const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        description: taskDescription,
        status: 'to do',
        priority: getPriority(data.budget),
        custom_fields: [
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_EMAIL_ID || '',
            value: data.email
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_COMPANY_ID || '',
            value: data.company_name
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_WEBSITE_ID || '',
            value: data.website || ''
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_PROJECT_DESCRIPTION_ID || '',
            value: data.project_description
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_TIMELINE_ID || '',
            value: mapTimelineToOptionId(data.launch_timeline)
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_SERVICES_ID || '',
            value: mapServicesToOptionIds(data.services)
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_BUDGET_ID || '',
            value: mapBudgetToOptionId(data.budget)
          },
          {
            id: process.env.CLICKUP_CUSTOM_FIELD_REFERRAL_ID || '',
            value: mapReferralToOptionId(data.referral_source)
          }
        ].filter(field => field.id) // Only include if custom field IDs are configured
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('ClickUp API Error:', errorData);
      return { success: false, error: errorData };
    }
    
    const result = await response.json();
    return { success: true, data: result };
    
  } catch (error) {
    console.error('ClickUp submission error:', error);
    return { success: false, error };
  }
}

// Submit to Beehiv
async function submitToBeehive(email: string, name: string, companyName: string) {
  const BEEHIV_API_KEY = process.env.BEEHIV_API_KEY;
  const BEEHIV_PUBLICATION_ID = process.env.BEEHIV_PUBLICATION_ID;
  
  if (!BEEHIV_API_KEY || !BEEHIV_PUBLICATION_ID) {
    console.error('Beehiv API credentials not configured');
    return { success: false, error: 'Beehiv not configured' };
  }
  
  try {
    // Split name into first and last
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
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
        utm_source: 'intake-form',
        utm_medium: 'website',
        utm_campaign: 'avyra-studio-application',
        referring_site: 'https://avyrastudio.com',
        custom_fields: [
          {
            name: 'first_name',
            value: firstName
          },
          {
            name: 'last_name', 
            value: lastName
          },
          {
            name: 'company',
            value: companyName
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
    const data: IntakeFormData = await request.json();
    
    // Validate required fields
    if (!data.email || !data.name || !data.company_name || !data.project_description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Submit to both platforms in parallel
    const [clickupResult, beehiveResult] = await Promise.all([
      submitToClickUp(data),
      submitToBeehive(data.email, data.name, data.company_name)
    ]);
    
    // Log results
    console.log('ClickUp Result:', clickupResult.success ? 'Success' : 'Failed');
    console.log('Beehiv Result:', beehiveResult.success ? 'Success' : 'Failed');
    
    // Return success even if one service fails (graceful degradation)
    return NextResponse.json({
      success: true,
      integrations: {
        clickup: clickupResult.success,
        beehive: beehiveResult.success
      }
    });
    
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

