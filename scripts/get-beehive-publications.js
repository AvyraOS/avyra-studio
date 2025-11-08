// Get all Beehive publications
// Run with: node scripts/get-beehive-publications.js

require('dotenv').config({ path: '.env.local' });

const BEEHIVE_API_KEY = process.env.BEEHIVE_API_KEY;

if (!BEEHIVE_API_KEY) {
  console.error('❌ BEEHIVE_API_KEY not set in .env.local');
  console.log('\nGet your Beehive API key from:');
  console.log('https://app.beehiiv.com/settings/integrations');
  process.exit(1);
}

async function getPublications() {
  try {
    console.log('🔍 Fetching your Beehive publications...\n');
    
    const response = await fetch('https://api.beehiiv.com/v2/publications', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEEHIVE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Beehive API Error:', error);
      process.exit(1);
    }

    const result = await response.json();
    
    if (!result.data || result.data.length === 0) {
      console.log('⚠️  No publications found.');
      process.exit(1);
    }

    console.log('✅ Your Beehive Publications:\n');
    
    result.data.forEach((pub, index) => {
      console.log(`${index + 1}. ${pub.name}`);
      console.log(`   ID: ${pub.id}`);
      console.log(`   Subdomain: ${pub.subdomain}`);
      console.log(`   Subscribers: ${pub.subscriber_count || 'N/A'}`);
      console.log('');
    });

    console.log('\n📝 To use a publication, add to your .env.local:');
    console.log('\nBEEHIVE_PUBLICATION_ID=your_publication_id_here\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getPublications();

