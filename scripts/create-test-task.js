// Create a test task to reveal custom field IDs
// Run with: node scripts/create-test-task.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function createTestTask() {
  try {
    console.log('🔧 Creating test task to reveal custom fields...\n');
    
    const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
      method: 'POST',
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'TEST - Ignore this task',
        description: 'This is a test task created to reveal custom field IDs. You can delete this.'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error:', error);
      process.exit(1);
    }

    const task = await response.json();
    console.log('✅ Test task created!\n');
    
    if (task.custom_fields && task.custom_fields.length > 0) {
      console.log('📋 Custom Fields Found:\n');
      
      task.custom_fields.forEach((field, index) => {
        console.log(`${index + 1}. ${field.name}`);
        console.log(`   ID: ${field.id}`);
        console.log(`   Type: ${field.type}`);
        console.log('');
      });
      
      console.log('\n📝 Add these to your .env.local:\n');
      
      const fieldMap = {
        'Name': 'NAME',
        'Email': 'EMAIL',
        'Company Name': 'COMPANY',
        'Website': 'WEBSITE',
        'Project Description': 'PROJECT_DESCRIPTION',
        'Timeline': 'TIMELINE',
        'Services': 'SERVICES',
        'Budget': 'BUDGET',
        'Referral Source': 'REFERRAL'
      };

      task.custom_fields.forEach(field => {
        const envVarName = fieldMap[field.name] || field.name.toUpperCase().replace(/[^A-Z0-9]/g, '_');
        console.log(`CLICKUP_CUSTOM_FIELD_${envVarName}_ID=${field.id}`);
      });
      
      console.log('\n✨ Done! You can now delete the test task from ClickUp.\n');
    } else {
      console.log('⚠️  No custom fields found on task.\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestTask();

