// Script to fetch ClickUp space details and find custom fields
// Run with: node scripts/get-clickup-space-fields.js

require('dotenv').config({ path: '.env.local' });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error('❌ Missing CLICKUP_API_KEY or CLICKUP_LIST_ID in .env.local');
  process.exit(1);
}

async function getListHierarchy() {
  try {
    console.log('🔍 Fetching list hierarchy...\n');
    
    // First get the list to find its folder
    const listResponse = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}`, {
      headers: { 'Authorization': CLICKUP_API_KEY }
    });
    
    if (!listResponse.ok) {
      throw new Error('Failed to fetch list');
    }
    
    const listData = await listResponse.json();
    const folderId = listData.folder?.id;
    const spaceId = listData.space?.id;
    
    console.log('✅ List:', listData.name);
    console.log('✅ Space ID:', spaceId);
    if (folderId) console.log('✅ Folder ID:', folderId);
    console.log('');
    
    // Get space details with custom fields
    if (spaceId) {
      console.log('🔍 Checking Space-level custom fields...\n');
      const spaceResponse = await fetch(`https://api.clickup.com/api/v2/space/${spaceId}`, {
        headers: { 'Authorization': CLICKUP_API_KEY }
      });
      
      if (spaceResponse.ok) {
        const spaceData = await spaceResponse.json();
        
        if (spaceData.custom_fields && spaceData.custom_fields.length > 0) {
          console.log('📋 Space-Level Custom Fields:\n');
          spaceData.custom_fields.forEach((field, index) => {
            console.log(`${index + 1}. ${field.name}`);
            console.log(`   ID: ${field.id}`);
            console.log(`   Type: ${field.type}`);
            console.log('');
          });
        } else {
          console.log('⚠️  No space-level custom fields found.');
        }
      }
    }
    
    // Get folder details if exists
    if (folderId) {
      console.log('🔍 Checking Folder-level custom fields...\n');
      const folderResponse = await fetch(`https://api.clickup.com/api/v2/folder/${folderId}`, {
        headers: { 'Authorization': CLICKUP_API_KEY }
      });
      
      if (folderResponse.ok) {
        const folderData = await folderResponse.json();
        
        if (folderData.custom_fields && folderData.custom_fields.length > 0) {
          console.log('📋 Folder-Level Custom Fields:\n');
          folderData.custom_fields.forEach((field, index) => {
            console.log(`${index + 1}. ${field.name}`);
            console.log(`   ID: ${field.id}`);
            console.log(`   Type: ${field.type}`);
            console.log('');
          });
        } else {
          console.log('⚠️  No folder-level custom fields found.');
        }
      }
    }
    
    console.log('\n💡 To create custom fields:');
    console.log('   1. Go to your ClickUp list');
    console.log('   2. Click the "+" button next to any task');
    console.log('   3. Scroll down and click "Add Custom Field"');
    console.log('   4. Create the fields listed in the documentation');
    console.log('   5. Run this script again to get the IDs\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getListHierarchy();

