// api/webhook.js

let lastReceivedPayload = 'No webhook received yet.';

// A simple in-memory store for the last payload is sufficient for this example,
// but for a real-world application, you would save this to a database (like MongoDB, Postgres, etc.)

// Handles POST requests (for receiving the webhook payload)
export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Get the payload from the request body
      const payload = req.body;
      
      // Convert the payload to a readable JSON string for storage
      lastReceivedPayload = JSON.stringify(payload, null, 2);
      
      console.log('Webhook Received:', lastReceivedPayload);
      
      // Respond with a 200 OK status to acknowledge receipt
      res.status(200).send('Webhook received and processed.');
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).send('Internal Server Error.');
    }
  } 
  
  // Handles GET requests (for the UI to fetch the last data)
  else if (req.method === 'GET') {
    // Return the last received payload
    res.status(200).json({ lastPayload: lastReceivedPayload });
  } 
  
  // Respond to any other methods
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
