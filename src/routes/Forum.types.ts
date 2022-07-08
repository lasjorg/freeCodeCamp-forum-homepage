export interface Forum {
  users: User[];
  primary_groups: PrimaryGroup[];
  flair_groups: FlairGroup[];
  topic_list: TopicList;
}

export interface FlairGroup {
  id: number;
  name: string;
  flair_url: string;
  flair_bg_color: string;
  flair_color: string;
}

export interface PrimaryGroup {
  id: number;
  name: string;
}

export interface TopicList {
  can_create_topic: boolean;
  more_topics_url: string;
  per_page: number;
  topics: Topic[];
}

export interface Topic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: null | string;
  created_at: Date;
  last_posted_at: Date;
  bumped: boolean;
  bumped_at: Date;
  archetype: Archetype;
  unseen: boolean;
  pinned: boolean;
  unpinned: null;
  excerpt?: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  bookmarked: null;
  liked: null;
  tags_descriptions: Record<string, never>;
  views: number;
  like_count: number;
  has_summary: boolean;
  last_poster_username: string;
  category_id: number;
  pinned_globally: boolean;
  featured_link: null;
  has_accepted_answer: boolean;
  can_vote: boolean;
  posters: Poster[];
}

export enum Archetype {
  Regular = 'regular'
}

export interface Poster {
  extras: Extras | null;
  description: Description;
  user_id: number;
  primary_group_id: number | null;
  flair_group_id: number | null;
}

export enum Description {
  FrequentPoster = 'Frequent Poster',
  FrequentPosterAcceptedAnswer = 'Frequent Poster, Accepted Answer',
  MostRecentPoster = 'Most Recent Poster',
  MostRecentPosterAcceptedAnswer = 'Most Recent Poster, Accepted Answer',
  OriginalPoster = 'Original Poster',
  OriginalPosterMostRecentPoster = 'Original Poster, Most Recent Poster'
}

export enum Extras {
  Latest = 'latest',
  LatestSingle = 'latest single'
}

export interface User {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  primary_group_name?: string;
  flair_name: null | string;
  flair_url?: string;
  flair_bg_color?: string;
  flair_color?: string;
  admin?: boolean;
  moderator?: boolean;
  trust_level: number;
}
