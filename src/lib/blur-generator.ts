import { getPlaiceholder } from "plaiceholder";
export async function getBlurData(imageUrl: string) {
  const buffer = await fetch(imageUrl).then((res) => res.arrayBuffer());
  const data = getPlaiceholder(buffer as Buffer);
  return data;
}
