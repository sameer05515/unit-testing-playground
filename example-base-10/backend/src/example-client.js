// Example client to test the API endpoint
// Run: node src/example-client.js (make sure server.js is running first)

const API_URL = 'http://localhost:3000/api/snapshots';

async function fetchSnapshots() {
  try {
    console.log('Fetching snapshots from API...');
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Success! Data received:');
      console.log(JSON.stringify(result.data, null, 2));
      console.log(`\nSource: ${result.source}`);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// Alternative: Fetch raw JSON
async function fetchSnapshotsRaw() {
  try {
    console.log('\nFetching raw snapshots...');
    const response = await fetch('http://localhost:3000/api/snapshots/raw');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw data received:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching raw data:', error.message);
  }
}

// Run both examples
fetchSnapshots();
// Uncomment to also fetch raw version:
// fetchSnapshotsRaw();
