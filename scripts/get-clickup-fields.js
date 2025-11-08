// Script to fetch ClickUp list custom fields
// Run with: node scripts/get-clickup-fields.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error('❌ Missing CLICKUP_API_KEY or CLICKUP_LIST_ID in .env.local');
  process.exit(1);
}

async function getListFields() {
  try {
    console.log('🔍 Fetching ClickUp list details...\n');
    
    const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ ClickUp API Error:', error);
      process.exit(1);
    }

    const data = await response.json();
    
    console.log('✅ List Name:', data.name);
    console.log('✅ List ID:', data.id);
    console.log('\n📋 Custom Fields Found:\n');

    if (!data.custom_fields || data.custom_fields.length === 0) {
      console.log('⚠️  No custom fields found in this list.');
      return;
    }

    // Display all custom fields
    data.custom_fields.forEach((field, index) => {
      console.log(`${index + 1}. ${field.name}`);
      console.log(`   ID: ${field.id}`);
      console.log(`   Type: ${field.type}`);
      if (field.type_config?.options) {
        console.log(`   Options:`, field.type_config.options.map(o => o.name).join(', '));
      }
      console.log('');
    });

    // Generate .env.local format
    console.log('\n📝 Add these to your .env.local:\n');
    console.log('# ClickUp Custom Field IDs');
    
    const fieldMap = {
      'Name': 'NAME',
      'Client Name': 'NAME',
      'Email': 'EMAIL',
      'Company': 'COMPANY',
      'Company Name': 'COMPANY',
      'Website': 'WEBSITE',
      'Project Description': 'PROJECT_DESCRIPTION',
      'Timeline': 'TIMELINE',
      'Launch Timeline': 'TIMELINE',
      'Services': 'SERVICES',
      'Services Interested': 'SERVICES',
      'Budget': 'BUDGET',
      'Budget Range': 'BUDGET',
      'Referral Source': 'REFERRAL',
      'How did you hear about us?': 'REFERRAL'
    };

    data.custom_fields.forEach(field => {
      const envVarName = fieldMap[field.name] || field.name.toUpperCase().replace(/\s+/g, '_');
      console.log(`CLICKUP_CUSTOM_FIELD_${envVarName}_ID=${field.id}`);
    });

    console.log('\n✨ Copy the above lines to your .env.local file\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getListFields();

