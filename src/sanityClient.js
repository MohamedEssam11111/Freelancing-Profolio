import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
export const client = createClient({
  projectId: "727u7vlk",
  dataset: "production",
  apiVersion: "2025-05-07",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
