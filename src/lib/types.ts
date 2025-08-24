export interface BaseContent {
  _id: string;
  additional_properties: Record<string, any>;
  type: string;
}

export interface TextBlock extends BaseContent {
  type: 'text';
  content: string;
}

export interface HeaderBlock extends BaseContent {
  type: 'header';
  content: string;
  level: 2 | 3 | 4 | 5 | 6;
}

export interface ImageAdditionalProperties {
  countryId?: number;
  fullSizeResizeUrl?: string;
  galleries?: any[];
  ingestionMethod?: string;
  iptc_job_identifier?: string;
  iptc_source?: string;
  iptc_title?: string;
  keywords?: string[];
  mime_type?: string;
  originalName?: string;
  originalUrl?: string;
  owner?: string;
  proxyUrl?: string;
  published?: boolean;
  resizeUrl?: string;
  restricted?: boolean;
  takenOn?: string;
  thumbnailResizeUrl?: string;
  usage_instructions?: string;
  version?: number;
  template_id?: number;
  link?: string;
}

export interface ImageCredits {
  affiliation?: Array<{
    name: string;
    type: string;
  }>;
  by?: Array<{
    byline: string;
    name: string;
    type: string;
  }>;
}

export interface ImageBlock extends BaseContent {
  type: 'image';
  additional_properties: ImageAdditionalProperties;
  address?: {
    locality?: string;
    region?: string;
    country_name?: string;
  };
  alt_text?: string;
  auth?: Record<string, string>;
  caption?: string;
  copyright?: string;
  created_date?: string;
  credits?: ImageCredits;
  geo?: Record<string, any>;
  height?: number;
  image_type?: string;
  last_updated_date?: string;
  licensable?: boolean;
  owner?: {
    id: string;
    sponsored: boolean;
  };
  slug?: string;
  source?: {
    additional_properties?: Record<string, any>;
    edit_url?: string;
    system?: string;
  };
  subtitle?: string;
  taxonomy?: {
    associated_tasks?: any[];
  };
  url?: string;
  version?: string;
  width?: number;
  syndication?: Record<string, any>;
  creditIPTC?: string;
  country_name?: string;
}

export interface QuoteBlock extends BaseContent {
  type: 'quote';
  subtype: 'pullquote' | 'blockquote';
  citation?: {
    content: string;
    type: string;
  };
  content_elements: Array<{
    _id: string;
    additional_properties: Record<string, any>;
    content: string;
    type: string;
  }>;
}

export interface ListItem {
  _id: string;
  additional_properties: {
    indent: number;
  };
  alignment: string;
  content: string;
  type: string;
}

export interface ListBlock extends BaseContent {
  type: 'list';
  list_type: 'ordered' | 'unordered';
  items: ListItem[];
}

export interface ReferenceBlock extends BaseContent {
  type: 'reference';
  referent: {
    id: string;
    provider: string;
    type: string;
  };
}

export interface OEmbedRaw {
  title: string;
  author_name?: string;
  author_url?: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height?: number;
  thumbnail_width?: number;
  thumbnail_url?: string;
  html: string;
  _id: string;
}

export interface OEmbedBlock extends BaseContent {
  type: 'oembed_response';
  subtype: 'youtube' | 'twitter' | 'instagram' | 'facebook' | 'tiktok';
  raw_oembed: OEmbedRaw;
  referent: {
    id: string;
    provider: string;
    referent_properties: Record<string, any>;
    service: string;
    type: string;
  };
}

export interface CustomEmbedBlock extends BaseContent {
  type: 'custom_embed';
  subtype: 'videoplayer' | 'section_break' | string;
  embed: {
    config: {
      caption?: string;
      videoCode?: string;
      [key: string]: any;
    };
    id: string;
    url: string;
  };
}

export interface RawHtmlBlock extends BaseContent {
  type: 'raw_html';
  content: string;
}

export type ContentElement = 
  | TextBlock 
  | HeaderBlock 
  | ImageBlock 
  | QuoteBlock 
  | ListBlock 
  | ReferenceBlock 
  | OEmbedBlock 
  | CustomEmbedBlock 
  | RawHtmlBlock;

export interface AuthorSocialLink {
  site: string;
  url: string | null;
  deprecated?: boolean;
  deprecation_msg?: string;
}

export interface AuthorAdditionalProperties {
  original: {
    _id: string;
    type?: string;
    version?: string;
    slug: string;
    byline: string;
    firstName: string;
    lastName: string;
    image?: string;
    expertise?: string | null;
    location?: string | null;
    role?: string | null;
    email?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    bio: string;
    longBio?: string;
    last_updated_date: string;
    author_type?: string;
    linkedin?: string | null;
    books?: any[];
    podcasts?: any[];
    education?: any[];
    awards?: any[];
    affiliations?: string;
    bio_page?: string;
    native_app_rendering?: boolean;
    fuzzy_match?: boolean;
    contributor?: boolean;
    status?: boolean;
  };
}

export interface Author {
  _id: string;
  type: string;
  version: string;
  name: string;
  org?: string | null;
  image?: {
    url: string;
    version: string;
  };
  description: string;
  url?: string;
  slug: string;
  social_links: AuthorSocialLink[];
  socialLinks: AuthorSocialLink[];
  additional_properties: AuthorAdditionalProperties;
}

export interface Credits {
  by: Author[];
}

export interface Section {
  _id: string;
  _website?: string;
  type: string;
  version: string;
  name: string;
  path: string;
  parent_id: string;
  parent?: {
    default: string;
  };
  additional_properties?: {
    original: {
      _id: string;
      _website?: string;
      name: string;
      inactive: boolean;
      ancestors: Record<string, string[]>;
      parent: Record<string, string>;
      order: Record<string, number>;
      meta_description: string;
      meta_title: string;
      subtitle?: string;
      node_type: string;
    };
  };
  _website_section_id?: string;
}

export interface Tag {
  _id?: string;
  description: string;
  slug: string;
  text: string;
}

export interface Taxonomy {
  primary_section?: Section;
  primary_site?: Section;
  sections?: Section[];
  sites?: Section[];
  tags?: Tag[];
}

export interface Website {
  website_section?: Section;
  website_url: string;
}

export interface PromoItem {
  _id: string;
  additional_properties: ImageAdditionalProperties;
  address?: Record<string, any>;
  alt_text?: string;
  auth?: Record<string, string>;
  caption?: string;
  copyright?: string;
  created_date?: string;
  credits?: ImageCredits;
  height?: number;
  image_type?: string;
  last_updated_date?: string;
  licensable?: boolean;
  owner?: {
    id: string;
    sponsored: boolean;
  };
  source?: {
    additional_properties?: Record<string, any>;
    edit_url?: string;
    system?: string;
  };
  subtitle?: string;
  taxonomy?: {
    associated_tasks?: any[];
  };
  type: string;
  url?: string;
  version?: string;
  width?: number;
  syndication?: Record<string, any>;
  creditIPTC?: string;
  country_name?: string;
  related_content?: {
    derivative_of?: Array<{
      referent: {
        id: string;
        type: string;
      };
      type: string;
    }>;
  };
  slug?: string;
}

export interface RelatedContent {
  basic?: Array<{
    _id: string;
    referent: {
      id: string;
      provider: string;
      type: string;
    };
    type: string;
  }>;
  clonedChildren?: any[];
  clonedFromParent?: any[];
}

export interface Article {
  _id: string;
  additional_properties: {
    has_published_copy: boolean;
    is_published: boolean;
    publish_date: string;
  };
  address: Record<string, any>;
  canonical_website: string;
  content_elements: ContentElement[];
  copyright: string;
  created_date: string;
  credits: Credits;
  description: {
    basic: string;
  };
  display_date: string;
  distributor: {
    category: string;
    name: string;
    subcategory: string;
  };
  first_publish_date?: string;
  geo: Record<string, any>;
  headlines: {
    basic: string;
    meta_title: string;
    mobile: string;
    native: string;
    print: string;
    table: string;
    tablet: string;
    web: string;
  };
  label?: {
    rubric?: {
      display: boolean;
      text: string;
    };
  };
  language: string;
  last_updated_date: string;
  owner: {
    id?: string;
    sponsored: boolean;
  };
  planning?: {
    scheduling?: Record<string, any>;
    story_length?: {
      character_count_actual?: number;
      inch_count_actual?: number;
      line_count_actual?: number;
      word_count_actual?: number;
    };
  };
  promo_items: {
    '1_1'?: PromoItem;
    basic?: PromoItem;
    video?: CustomEmbedBlock;
  };
  publish_date: string;
  related_content?: RelatedContent;
  revision: {
    branch: string;
    editions: string[];
    parent_id?: string;
    published: boolean;
    revision_id: string;
  };
  source: {
    name: string;
    source_type: string;
    system: string;
  };
  subheadlines: {
    basic: string;
  };
  subtype: string;
  taxonomy: Taxonomy;
  type: string;
  version: string;
  websites: Record<string, Website>;
  workflow?: {
    status_code: number;
  };
  canonical_url: string;
  publishing?: {
    scheduled_operations?: {
      publish_edition?: any[];
      unpublish_edition?: any[];
    };
  };
  website?: string;
  website_url?: string;
}

export interface Collection {
  _id: string;
  version: string;
  created_date: string;
  headlines: {
    basic: string;
  };
  last_updated_date: string;
  type: string;
  canonical_website: string;
  content_elements: Article[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string | number;
    details?: any;
  };
  meta?: {
    total?: number;
    limit?: number;
    offset?: number;
    has_more?: boolean;
  };
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface FieldSelection {
  fields?: string;
}

export interface SortParams {
  sort_field?: string;
  sort_direction?: 'asc' | 'desc';
}

export type QueryParams = PaginationParams & FieldSelection & SortParams;