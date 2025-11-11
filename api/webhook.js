// api/webhook.js

// This is a basic serverless function handler for Vercel/Next.js
export default async function handler(request, response) {
    
    // 1. Ensure the request method is POST, as webhooks usually send data via POST
    if (request.method !== 'POST') {
        // Respond with an error if the method is incorrect
        return response.status(405).send('Method Not Allowed. Webhooks require POST.');
    }

    try {
        // 2. The data from the sending service is in the request body
        const incomingData = request.body;
        
        // 3. Log or process the data
        console.log('✅ Webhook received successfully!');
        
        // You should inspect the data and perform your specific actions here:
        // * Update a database
        // * Send an email/notification
        // * Trigger another process
        
        // Example: Inspecting the received data
        console.log('Received Payload:', incomingData);

        // 4. Respond to the sender with a 200 status code
        // This is crucial! It tells the sender the webhook was received successfully.
        // If you don't respond quickly with 200, the sender might retry the request.
        response.status(200).json({ 
            message: 'Webhook received and processed!',
            data_received: Object.keys(incomingData).length 
        });

    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        // Respond with a 500 status if there was an internal error
        response.status(500).json({ error: 'Internal Server Error' });
    }
}
