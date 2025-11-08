// Debug script to see what's being sent to ClickUp
// Run with: node scripts/debug-submission.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

const testData = {
  name: 'Debug Test',
  email: 'debug@test.com',
  company_name: 'Debug Company',
  website: 'https://debug.com',
  project_description: 'This is a debug test',
  launch_timeline: 'urgent',
  services: 'brand-identity,web-design',
  budget: '20k-50k',
  referral_source: 'referral'
};

// Mapping functions
function mapBudgetToOptionId(budget) {
  const mapping = {
    '2k-5k': 'eb3b310f-b02a-46c8-8b4c-3007e0a17ad1',
    '5k-10k': 'd481b9d7-80d5-4751-956d-81fe9324d5e4',
    '10k-20k': '81ea29d8-981c-4ef4-af8b-05fb3400c09d',
    '20k-50k': '05d44939-da8c-421e-88e8-a1a05a406286',
    '50k-100k+': '8e88d126-38c1-4239-baf2-e4fa685c37a3'
  };
  return mapping[budget] || '';
}

function mapTimelineToOptionId(timeline) {
  const mapping = {
    'urgent': 'e9b670e1-784b-4be5-94b5-fa76951c8cbb',
    '1-2-months': '4a5456bc-3672-41af-b864-fdeaf233b992',
    '3-6-months': 'db4648b7-3d88-4c83-a185-29291dcd07a0',
    'flexible': 'd97b49c7-d58f-4177-8948-7ca91cb73cee'
  };
  return mapping[timeline] || '';
}

function mapReferralToOptionId(referral) {
  const mapping = {
    'referral': '98d46a63-0a30-493e-9a20-c9d9e553f0aa',
    'social-media': 'caf16000-d179-488c-a80d-09d5df9211b8',
    'google-search': 'f1b43e5b-91f3-4947-af4a-ad5e40c77c5d',
    'event-conference': '9a91c1d6-4b58-4c02-9bb1-b28245db053f',
    'other': '416ab280-5bdf-470a-8dca-eb13ef54e695'
  };
  return mapping[referral] || '';
}

function mapServicesToOptionIds(services) {
  const mapping = {
    'brand-identity': 'dbfca6f8-8115-47ed-b049-1712464a14ad',
    'brand-strategy': '83613798-d7a5-4889-9e3e-ba9d303e1ade',
    'web-design': '5114fcdc-5716-493c-9551-0162a62cf0b2',
    'ui-ux-design': '5bf611b4-65aa-4ab0-b364-0daa38de8d84',
    'marketing-assets': 'ac91982e-c46e-47dc-bc0f-feeaa63ccbf3',
    'event-design': '1ba569a5-907e-43d3-a7a1-fb0b2b2ab25f',
    'development': 'fc93eeac-263c-4d80-b016-73beb1635d7f',
    'other': '7433b508-eb07-461f-a07c-f752f1255b45'
  };
  
  return services.split(',').map(service => mapping[service.trim()]).filter(Boolean);
}

async function debugSubmission() {
  try {
    console.log('🔍 Checking environment variables...\n');
    console.log('CLICKUP_CUSTOM_FIELD_EMAIL_ID:', process.env.CLICKUP_CUSTOM_FIELD_EMAIL_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_COMPANY_ID:', process.env.CLICKUP_CUSTOM_FIELD_COMPANY_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_WEBSITE_ID:', process.env.CLICKUP_CUSTOM_FIELD_WEBSITE_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_PROJECT_DESCRIPTION_ID:', process.env.CLICKUP_CUSTOM_FIELD_PROJECT_DESCRIPTION_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_TIMELINE_ID:', process.env.CLICKUP_CUSTOM_FIELD_TIMELINE_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_SERVICES_ID:', process.env.CLICKUP_CUSTOM_FIELD_SERVICES_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_BUDGET_ID:', process.env.CLICKUP_CUSTOM_FIELD_BUDGET_ID || '❌ NOT SET');
    console.log('CLICKUP_CUSTOM_FIELD_REFERRAL_ID:', process.env.CLICKUP_CUSTOM_FIELD_REFERRAL_ID || '❌ NOT SET');
    
    const customFields = [
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_EMAIL_ID || '',
        value: testData.email
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_COMPANY_ID || '',
        value: testData.company_name
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_WEBSITE_ID || '',
        value: testData.website
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_PROJECT_DESCRIPTION_ID || '',
        value: testData.project_description
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_TIMELINE_ID || '',
        value: mapTimelineToOptionId(testData.launch_timeline)
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_SERVICES_ID || '',
        value: mapServicesToOptionIds(testData.services)
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_BUDGET_ID || '',
        value: mapBudgetToOptionId(testData.budget)
      },
      {
        id: process.env.CLICKUP_CUSTOM_FIELD_REFERRAL_ID || '',
        value: mapReferralToOptionId(testData.referral_source)
      }
    ].filter(field => field.id);
    
    console.log('\n📋 Custom fields to be sent:');
    console.log(JSON.stringify(customFields, null, 2));
    
    const payload = {
      name: `${testData.name} - ${testData.company_name} (${testData.budget})`,
      description: 'Debug test task',
      status: 'to do',
      custom_fields: customFields
    };
    
    console.log('\n📦 Full payload:');
    console.log(JSON.stringify(payload, null, 2));
    
    console.log('\n🚀 Sending to ClickUp...\n');
    
    const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ ClickUp API Error:');
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
    
    console.log('✅ Task created successfully!\n');
    console.log('📊 Response:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

debugSubmission();

