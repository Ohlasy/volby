import { DecoderFunction, dict } from "typescript-json-decoder";

/** Decode a dict, returning only its values */
export const decodeDictValues =
  <T>(decodeItem: DecoderFunction<T>) =>
  (value: any) =>
    [...dict(decodeItem)(value).values()];
