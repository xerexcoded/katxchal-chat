import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to perplexity.ai
const perplexity = new OpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY || '',
    baseURL: 'https://api.perplexity.ai/',
});


export async function POST(req: Request) {
    try {
        if (!process.env.PERPLEXITY_API_KEY) {
            return new NextResponse('PERPLEXITY_API_KEY is not set', { status: 400 });
        }
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();

        // Ask Perplexity for a streaming chat completion using PPLX 70B online model
        // @see https://blog.perplexity.ai/blog/introducing-pplx-online-llms
        const response = await perplexity.chat.completions.create({
            model: 'llama-3.1-sonar-large-128k-online',
            stream: true,
            max_tokens: 2000,
            messages,
        });

        // Convert the response into a friendly text-stream.
        const stream = OpenAIStream(response);

        // Respond with the stream
        return new StreamingTextResponse(stream);
    }
    catch (e: any) {
        return new NextResponse(e.message || 'An error occurred', { status: 500 });
    }
}