import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
const client = createClient({
  projectId: '1qv4ola0', // Replace with your actual project ID
  dataset: 'production',  // Replace with your dataset
  useCdn: true,           // Set to true to use CDN for faster load times
  apiVersion: '2021-10-21', // Sanity API version
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs from Sanity source
export const urlFor = (source: any) => builder.image(source);

// Export the client for use in other parts of your app
export default client;
