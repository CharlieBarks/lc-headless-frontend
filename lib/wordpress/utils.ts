import type { Listing } from './types';

export function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&#8217;": "'",
    "&#8216;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#038;": "&",
    "&nbsp;": " ",
    "&#160;": " ",
    "&hellip;": "…",
    "&#8230;": "…",
    "&ndash;": "–",
    "&#8211;": "–",
    "&mdash;": "—",
    "&#8212;": "—",
  };

  return text.replace(/&[#a-z0-9]+;/gi, (match) => entities[match] || match);
}

export function isListingClaimed(listing: Pick<Listing, 'claimed'>): boolean {
  const claimed = listing.claimed;
  if (typeof claimed === "boolean") return claimed;
  if (typeof claimed === "object" && claimed?.raw) {
    return claimed.raw === "1" || claimed.raw === "true";
  }
  if (typeof claimed === "string") return claimed === "1";
  if (typeof claimed === "number") return claimed === 1;
  return false;
}

export function isListingFeatured(listing: Pick<Listing, 'featured'>): boolean {
  const featured = listing.featured;
  return featured === true;
}
