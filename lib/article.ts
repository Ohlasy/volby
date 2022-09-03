import {
  array,
  decodeType,
  field,
  nullable,
  number,
  record,
  string,
} from "typescript-json-decoder";

//
// Decoding & Types
//

export type Article = decodeType<typeof decodeArticle>;

export const decodeArticle = record({
  title: string,
  author: string,
  category: nullable(string),
  pubDate: date,
  coverPhoto: field("cover-photo", nullable(string)),
  perex: string,
  serial: nullable(string),
  relativeURL: string,
  tags: array(string),
  numberOfWords: number,
});

//
// API Calls
//

export async function getAllArticles(): Promise<Article[]> {
  return await fetch("https://ohlasy.info/assets/articles.js")
    .then((response) => response.json())
    .then(array(decodeArticle));
}

//
// Helpers
//

function date(value: any): string {
  return string(value).replace(" +0000", "Z").replace(" ", "T");
}
