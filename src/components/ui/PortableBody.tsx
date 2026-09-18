import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { toImageSource } from "@/sanity/lib/image";
import type { SanityImageRef } from "@/lib/content/types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageRef & { caption?: string } }) => {
      const img = toImageSource(value, { src: "", alt: "", width: 1600, height: 900 }, 1600);
      if (!img.src) return null;
      return (
        <figure>
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 720px, 100vw" className="rounded-[2px]" />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-editorial">
      <PortableText value={value} components={components} />
    </div>
  );
}
