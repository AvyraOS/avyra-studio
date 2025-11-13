// Get available statuses for the list
// Run with: node scripts/get-statuses.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

async function getStatuses() {
  try {
    console.log('🔍 Fetching available statuses...\n');
    
    const response = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}`, {
      headers: {
        'Authorization': CLICKUP_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error:', error);
      process.exit(1);
    }

    const data = await response.json();
    
    console.log('✅ Available statuses in your list:\n');
    
    if (data.statuses && data.statuses.length > 0) {
      data.statuses.forEach((status, index) => {
        console.log(`${index + 1}. "${status.status}"`);
        console.log(`   Type: ${status.type}`);
        console.log(`   Color: ${status.color}`);
        console.log('');
      });
      
      console.log('\n💡 Use one of these status values in the API route.\n');
      console.log(`📝 First status: "${data.statuses[0].status}" (recommended)\n`);
    } else {
      console.log('⚠️  No statuses found.\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getStatuses();

