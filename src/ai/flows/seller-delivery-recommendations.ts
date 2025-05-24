// src/ai/flows/seller-delivery-recommendations.ts
'use server';
/**
 * @fileOverview An AI agent that recommends delivery locations for sellers.
 *
 * - getDeliveryRecommendations - A function that handles the delivery recommendation process.
 * - GetDeliveryRecommendationsInput - The input type for the getDeliveryRecommendations function.
 * - GetDeliveryRecommendationsOutput - The return type for the getDeliveryRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDeliveryRecommendationsInputSchema = z.object({
  sellerMetrics: z
    .string()
    .describe('Seller metrics, including product performance, views, and sales.'),
  marketTrends: z.string().describe('Current market trends for crops.'),
  county: z.string().describe('The county to focus delivery recommendations on.'),
});
export type GetDeliveryRecommendationsInput = z.infer<typeof GetDeliveryRecommendationsInputSchema>;

const GetDeliveryRecommendationsOutputSchema = z.object({
  recommendedLocations: z
    .array(z.string())
    .describe(
      'A list of recommended locations within the specified county for sellers to focus their delivery efforts on.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the recommended locations, based on seller metrics and market trends.'
    ),
});
export type GetDeliveryRecommendationsOutput = z.infer<typeof GetDeliveryRecommendationsOutputSchema>;

export async function getDeliveryRecommendations(
  input: GetDeliveryRecommendationsInput
): Promise<GetDeliveryRecommendationsOutput> {
  return getDeliveryRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getDeliveryRecommendationsPrompt',
  input: {schema: GetDeliveryRecommendationsInputSchema},
  output: {schema: GetDeliveryRecommendationsOutputSchema},
  prompt: `You are an expert in market analysis and logistics for fresh produce. Based on seller metrics and market trends in {{{county}}}, identify areas where sellers should focus their delivery efforts to meet untapped demand and improve market coverage.

Seller Metrics: {{{sellerMetrics}}}
Market Trends: {{{marketTrends}}}

Consider factors such as:
* Areas with high demand but low seller presence.
* Emerging market trends indicating growing demand in specific locations.
* Locations with a preference for specific produce.
* Logistics and accessibility for sellers.

Provide a list of recommended locations and the reasoning behind your recommendations.

Output:
Recommended Locations: {{recommendedLocations}}
Reasoning: {{reasoning}}`,
});

const getDeliveryRecommendationsFlow = ai.defineFlow(
  {
    name: 'getDeliveryRecommendationsFlow',
    inputSchema: GetDeliveryRecommendationsInputSchema,
    outputSchema: GetDeliveryRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
