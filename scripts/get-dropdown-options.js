// Get dropdown field options and their IDs
// Run with: node scripts/get-dropdown-options.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function getDropdownOptions() {
  try {
    console.log('🔍 Fetching dropdown options...\n');
    
    // Get a task with custom fields
    const tasksResponse = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task?include_closed=false`, {
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!tasksResponse.ok) {
      const error = await tasksResponse.json();
      console.error('❌ Error:', error);
      process.exit(1);
    }

    const tasksData = await tasksResponse.json();
    
    if (!tasksData.tasks || tasksData.tasks.length === 0) {
      console.log('⚠️  No tasks found. Create a task first.');
      process.exit(1);
    }

    const task = tasksData.tasks[0];
    
    console.log('✅ Dropdown Fields and Their Options:\n');
    
    task.custom_fields.forEach(field => {
      if (field.type === 'drop_down' && field.type_config?.options) {
        console.log(`\n📋 ${field.name} (ID: ${field.id})`);
        console.log('─'.repeat(60));
        
        field.type_config.options.forEach((option, index) => {
          console.log(`  [${index}] ${option.name}`);
          console.log(`      ID: ${option.id}`);
          console.log(`      Order: ${option.orderindex}`);
        });
        console.log('');
      }
    });
    
    console.log('\n💡 For dropdowns, send the option ID (UUID) as the value\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getDropdownOptions();

