'use server';
/**
 * @fileOverview A conversational chatbot for the Mama Mboga app.
 *
 * - chatWithBot - A function to handle chat interactions.
 * - ChatbotInput - The input type for the chatWithBot function.
 * - ChatbotOutput - The return type for the chatWithBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ChatbotInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
  history: z.array(z.object({
    user: z.string().optional().describe("The user's message in the history."),
    bot: z.string().optional().describe("The bot's response in the history.")
  })).optional().describe('The conversation history (most recent messages).'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  reply: z.string().describe('The chatbot\'s reply to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatWithBot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a friendly and helpful assistant for "Mama Mboga", an online platform for buying fresh produce directly from local sellers.

Your role is to assist users with their queries about the platform, available produce, how to use the site, special offers, and general information about Mama Mboga. Be concise and helpful.

Conversation History (if any):
{{#if history}}
{{#each history}}
{{#if this.user}}User: {{{this.user}}}
{{/if}}
{{#if this.bot}}Bot: {{{this.bot}}}
{{/if}}
{{/each}}
{{/if}}

Current User Message: {{{message}}}

Your Reply:`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
