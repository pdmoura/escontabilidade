import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "../env";
import type { ImageSource, SanityImageRef } from "@/lib/content/types";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source).auto("format").fit("max");
}

/** Reads intrinsic dimensions out of a Sanity asset reference (image-<id>-<w>x<h>-<ext>). */
export function dimensionsFromRef(ref?: string): { width: number; height: number } | null {
  if (!ref) return null;
  const match = /-(\d+)x(\d+)-/.exec(ref);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

export function toImageSource(
  image: SanityImageRef | null | undefined,
  fallback: ImageSource,
  width = 1600,
): ImageSource {
  if (!image?.asset?._ref || !builder) return fallback;
  const dims = dimensionsFromRef(image.asset._ref) ?? { width: fallback.width, height: fallback.height };
  const url = builder.image(image).auto("format").fit("max").width(width).url();
  const scale = width / dims.width;
  return {
    src: url,
    alt: image.alt?.trim() || fallback.alt,
    width: Math.min(width, dims.width),
    height: Math.round(dims.height * Math.min(1, scale)),
  };
}
