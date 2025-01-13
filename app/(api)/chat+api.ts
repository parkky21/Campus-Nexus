import _ from 'lodash';
import * as chat from '@botpress/chat';


export async function Post(request:Request) {
    const webhookId = process.env.WEBHOOK_ID;

    if (!webhookId) {
        return Response.json(
            { error: "Missing Api KEy" },
            { status: 400 },
        );
    }

    const apiUrl = `https://chat.botpress.cloud/${webhookId}`;

    try {
        // Connect to Botpress chat client
        const client = await chat.Client.connect({ apiUrl });

        // Create a conversation
        const { conversation } = await client.createConversation({});

        // Extract the message from the request body
        const { message } =await request.json();
        if (!message) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // Send the user message
        await client.createMessage({
            conversationId: conversation.id,
            payload: {
                type: 'text',
                text: message,
            },
        });
        const { messages } = await client.listConversationMessages({ id: conversation.id });
        const sortedMessages = _.sortBy(messages, (m) => new Date(m.createdAt).getTime());

        // Extract the bot's response
        const botResponse = sortedMessages.find((m) => m.userId !== client.user.id);

        if (!botResponse) {
            return Response.json(
                { error: "Bot did not respond" },
                { status: 500 },
            );
        }
        return new Response(JSON.stringify({ data: botResponse.payload.text }), {
            status: 200,
        });

    } catch (error) {
        console.error('Error handling chat request:', error);
        return Response.json(
            { error: "Error handling chat request" },
            { status: 500 },
        );    }
}
