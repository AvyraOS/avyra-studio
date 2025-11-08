// Test the intake form submission
// Run with: node scripts/test-submission.js

const testData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  company_name: 'Acme Corp',
  website: 'https://acme.com',
  project_description: 'We need a complete brand redesign including logo, website, and marketing materials. Our goal is to modernize our brand and appeal to a younger demographic.',
  launch_timeline: 'urgent',
  services: 'brand-identity,web-design,marketing-assets',
  budget: '20k-50k',
  referral_source: 'google-search'
};

async function testSubmission() {
  try {
    console.log('🧪 Testing intake form submission...\n');
    console.log('📋 Test Data:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n🚀 Submitting to API...\n');
    
    const response = await fetch('http://localhost:3000/api/submit-intake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Submission failed!');
      console.error('Status:', response.status);
      console.error('Error:', result);
      process.exit(1);
    }

    console.log('✅ Submission successful!\n');
    console.log('📊 Result:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.integrations) {
      console.log('\n📈 Integration Status:');
      console.log(`  ClickUp: ${result.integrations.clickup ? '✅ Success' : '❌ Failed'}`);
      console.log(`  Beehive: ${result.integrations.beehive ? '✅ Success' : '⚠️  Not configured (optional)'}`);
    }
    
    console.log('\n🎉 Test complete! Check your ClickUp list for the new task.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testSubmission();

