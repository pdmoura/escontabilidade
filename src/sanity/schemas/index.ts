import { article, articleCategory } from "./article";
import { faq } from "./faq";
import { professional } from "./professional";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  siteSettings,
  professional,
  service,
  faq,
  testimonial,
  articleCategory,
  article,
];
