'use server';

/**
 * @fileOverview Recommends produce based on user's past purchases and location.
 *
 * - recommendProduce - A function that recommends produce.
 * - RecommendProduceInput - The input type for the recommendProduce function.
 * - RecommendProduceOutput - The return type for the recommendProduce function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProduceInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  location: z.string().describe('The location of the user.'),
  pastPurchases: z
    .array(z.string())
    .describe('A list of the user\'s past purchases.'),
});
export type RecommendProduceInput = z.infer<typeof RecommendProduceInputSchema>;

const RecommendProduceOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended produce items.'),
});
export type RecommendProduceOutput = z.infer<typeof RecommendProduceOutputSchema>;

export async function recommendProduce(input: RecommendProduceInput): Promise<RecommendProduceOutput> {
  return recommendProduceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProducePrompt',
  input: {schema: RecommendProduceInputSchema},
  output: {schema: RecommendProduceOutputSchema},
  prompt: `You are a produce recommendation expert. Based on the user's past purchases and location, recommend produce items they might be interested in.

User ID: {{{userId}}}
Location: {{{location}}}
Past Purchases: {{#each pastPurchases}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Recommendations:`, // Handlebars syntax here
});

const recommendProduceFlow = ai.defineFlow(
  {
    name: 'recommendProduceFlow',
    inputSchema: RecommendProduceInputSchema,
    outputSchema: RecommendProduceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
