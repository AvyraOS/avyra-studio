// Script to check what custom fields are accessible for tasks in this list
// Run with: node scripts/check-accessible-fields.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error('❌ Missing CLICKUP_API_KEY or CLICKUP_LIST_ID in .env.local');
  process.exit(1);
}

async function checkAccessibleFields() {
  try {
    console.log('🔍 Checking list: 901322224367\n');
    
    // Get existing tasks to see their custom fields
    console.log('📋 Fetching existing tasks to check for custom fields...\n');
    const tasksResponse = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task?include_closed=false`, {
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!tasksResponse.ok) {
      const error = await tasksResponse.json();
      console.error('❌ Error fetching tasks:', error);
      process.exit(1);
    }

    const tasksData = await tasksResponse.json();
    
    if (tasksData.tasks && tasksData.tasks.length > 0) {
      console.log(`✅ Found ${tasksData.tasks.length} existing task(s)\n`);
      
      const firstTask = tasksData.tasks[0];
      console.log(`📝 Checking task: "${firstTask.name}"\n`);
      
      if (firstTask.custom_fields && firstTask.custom_fields.length > 0) {
        console.log('✅ Custom Fields Available:\n');
        
        firstTask.custom_fields.forEach((field, index) => {
          console.log(`${index + 1}. ${field.name}`);
          console.log(`   ID: ${field.id}`);
          console.log(`   Type: ${field.type}`);
          if (field.type_config?.options) {
            console.log(`   Options:`, field.type_config.options.map(o => o.name).join(', '));
          }
          console.log('');
        });
        
        // Generate env vars
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

        firstTask.custom_fields.forEach(field => {
          const envVarName = fieldMap[field.name] || field.name.toUpperCase().replace(/[^A-Z0-9]/g, '_');
          console.log(`CLICKUP_CUSTOM_FIELD_${envVarName}_ID=${field.id}`);
        });
        
        console.log('\n✨ Done!\n');
        
      } else {
        console.log('⚠️  No custom fields found on existing tasks.');
        console.log('\n💡 To add custom fields:');
        console.log('   1. Open any task in this list: https://app.clickup.com/90132273150/v/li/901322224367');
        console.log('   2. Look for "Add Custom Field" button');
        console.log('   3. Create the fields you need');
        console.log('   4. Run this script again\n');
      }
    } else {
      console.log('⚠️  No tasks found in this list.');
      console.log('\n💡 Create a test task first, then add custom fields to it.');
      console.log('   Visit: https://app.clickup.com/90132273150/v/li/901322224367\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAccessibleFields();

