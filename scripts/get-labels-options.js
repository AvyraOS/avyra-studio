// Get labels field options
// Run with: node scripts/get-labels-options.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function getLabelsOptions() {
  try {
    console.log('🔍 Fetching labels field options...\n');
    
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
    
    console.log('✅ Labels Fields Found:\n');
    
    let foundLabels = false;
    
    task.custom_fields.forEach(field => {
      if (field.type === 'labels' && field.type_config?.options) {
        foundLabels = true;
        console.log(`\n📋 ${field.name} (ID: ${field.id})`);
        console.log('─'.repeat(60));
        
        field.type_config.options.forEach((option, index) => {
          console.log(`  [${index}] ${option.label}`);
          console.log(`      ID: ${option.id}`);
        });
        console.log('');
      }
    });
    
    if (!foundLabels) {
      console.log('⚠️  No labels fields found.');
      console.log('\nAll custom fields:');
      task.custom_fields.forEach(field => {
        console.log(`  - ${field.name}: ${field.type}`);
      });
    }
    
    console.log('\n💡 For labels, send an array of label option IDs\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getLabelsOptions();

