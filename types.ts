// ============================================================
// SOCIAL MEDIA CO-PILOT — ENTERPRISE TYPES v3.0
// SOTA · Multi-LLM · AEO/GEO/SEO Optimized · AI Visibility
// ============================================================

export enum Platform {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Pinterest = 'Pinterest',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter (X)',
  TikTok = 'TikTok',
  YouTube = 'YouTube Shorts',
  Threads = 'Threads',
}

export enum Tone {
  Professional = 'Professional',
  Casual = 'Casual',
  Witty = 'Witty',
  Inspirational = 'Inspirational',
  Persuasive = 'Persuasive',
  Contrarian = 'Contrarian',
  Storytelling = 'Storytelling',
  DataDriven = 'Data-Driven',
}

export enum InputMode {
  Topic = 'Topic / Keyword',
  URLSitemap = 'URL / Sitemap',
  Competitor = 'Competitor Analysis',
  TrendSurfer = 'Trend Surfer',
}

export enum CampaignGoal {
  BrandAwareness = 'Brand Awareness',
  LeadGeneration = 'Lead Generation',
  CommunityEngagement = 'Community Engagement',
  ThoughtLeadership = 'Thought Leadership',
  SalesConversion = 'Sales & Conversion',
  OrganicTraffic = 'Organic Traffic Boost',
  AIVisibility = 'AI Visibility (AEO/GEO)',
  ViralGrowth = 'Viral Growth Hack',
}

export enum ContentFramework {
  AIDA = 'AIDA',
  PAS = 'PAS',
  BAB = 'BAB',
  CONTRARIAN = 'CONTRARIAN',
  VIDEO_SCRIPT = 'VIDEO_SCRIPT',
  STORYBRAND = 'STORYBRAND',
  FOUR_PS = '4Ps',
  HOOK_STORY_OFFER = 'HOOK_STORY_OFFER',
}

// --- Viral Intelligence ---
export interface ViralBreakdown {
  emotional_resonance: number;
  platform_optimization: number;
  content_value: number;
  engagement_triggers: number;
  curiosity_gap: number;
  shareability: number;
  ai_visibility_score: number;
}

export interface ViralPsychologyProfile {
  primary_emotion: string;
  cognitive_bias: string;
  virality_archetype: string;
  expected_shares_multiplier: number;
}

// --- Post Structure ---
export interface PostVariation {
  variation_name: string;
  archetype: ContentFramework | string;
  post_title: string;
  post_text: string;
  call_to_action: string;
  share_snippet: string;
  viral_trigger: string;
  poll_options?: string[];
  schema_markup?: Record<string, unknown>;
  faq_pairs?: { question: string; answer: string }[];
  carousel_slides?: string[];
  reel_script?: string;
  thread_chain?: string[];
  linkedin_article_outline?: string;
  headline_score?: number;
  reading_grade_level?: number;
  emotional_words_count?: number;
  power_words_used?: string[];
  psychology_profile?: ViralPsychologyProfile;
}

export type WordPressPostStatus = 'idle' | 'publishing' | 'published' | 'error';
export type MediaGenerationStatus = 'idle' | 'generating' | 'completed' | 'error';

export interface HashtagStrategy {
  core: string[];
  niche: string[];
  trending: string[];
  competitor: string[];
  aeo: string[];
}

export interface SEOIntelligence {
  primary_keywords: string[];
  secondary_keywords: string[];
  lsi_keywords: string[];
  entity_mentions: string[];
  search_intent: 'Informational' | 'Navigational' | 'Commercial' | 'Transactional';
  featured_snippet_opportunity: boolean;
  estimated_monthly_searches: string;
  keyword_difficulty: string;
  aeo_answer_format?: string;
  geo_location_signal?: string;
}

export interface GeneratedPost {
  platform: Platform;
  variations: PostVariation[];
  image_prompt: string;
  viral_score: number;
  viral_breakdown: ViralBreakdown;
  optimization_notes: string;
  hashtag_strategy: HashtagStrategy;
  seo_intelligence?: SEOIntelligence;
  funnel_stage?: 'Awareness' | 'Engagement' | 'Conversion';
  best_posting_time?: string;
  content_repurposing_ideas?: string[];
  sourceUrl?: string;
  imageUrl?: string;
  imageDataUrl?: string;
  imageIsLoading?: boolean;
  imageError?: string;
  videoUrl?: string;
  videoStatus?: MediaGenerationStatus;
  videoError?: string;
  audioUrl?: string;
  audioStatus?: MediaGenerationStatus;
  audioError?: string;
  wordpressStatus: WordPressPostStatus;
  wordpressUrl?: string;
  wordpressError?: string;
  critique?: PostCritique;
  revised?: boolean;
}

// --- Critique Engine ---
export interface PostCritique {
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
  specific_improvements: string[];
  revised_hook?: string;
  revised_cta?: string;
  competitor_differentiation: string;
}

// --- Analysis & Intelligence ---
export interface FactCheckAnalysis {
  credibility_score: number;
  verified_claims: string[];
  potential_misinformation: string[];
  content_warnings: string[];
  citations: string[];
  source_authority_scores?: Record<string, number>;
}

export interface CompetitorAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  content_gaps: string[];
  steal_worthy_tactics: string[];
}

export interface AudiencePersona {
  name: string;
  demographics: string;
  summary: string;
  goals: string[];
  pain_points: string[];
  preferred_content_formats: string[];
  online_behavior: string;
  psychographics: string;
  decision_triggers: string[];
}

export interface PredictiveMetrics {
  estimated_engagement_rate: string;
  virality_probability: string;
  audience_sentiment_forecast: string;
  predicted_ctr: string;
  estimated_organic_reach: string;
  ai_search_visibility_score: string;
  projected_follower_growth: string;
}

export interface ContentCalendarSlot {
  day: string;
  platform: Platform;
  best_time: string;
  content_type: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface TopicAnalysis {
  campaign_strategy: string;
  trend_alignment: string;
  audience_resonance: string;
  content_gaps: string;
  viral_hooks: string[];
  seo_intelligence?: SEOIntelligence;
  seo_keywords?: { primary: string[]; secondary: string[]; lsi: string[] };
  predictive_metrics?: PredictiveMetrics;
  fact_check_analysis?: FactCheckAnalysis;
  competitor_analysis?: CompetitorAnalysis;
  audience_persona_details?: AudiencePersona;
  aeo_opportunity?: string;
  geo_context?: string;
  ai_cited_sources?: string[];
  optimal_content_calendar?: ContentCalendarSlot[];
}

export interface GroundingMetadata {
  groundingChunks: { web?: { uri?: string; title?: string }; maps?: { uri?: string; title?: string } }[];
}

export interface ApiResponse {
  id: string;
  campaignTitle: string;
  timestamp: number;
  topic_analysis: TopicAnalysis;
  posts: GeneratedPost[];
  groundingMetadata?: GroundingMetadata;
  generation_time_ms?: number;
  model_used?: string;
  total_viral_score?: number;
}

// --- Brand DNA ---
export interface BrandVoiceProfile {
  archetype: string;
  sentence_structure: string;
  vocabulary_level: string;
  banned_words: string[];
  emoji_usage: string;
  persuasion_tactics: string[];
  signature_phrases: string[];
  content_pillars: string[];
  competitor_differentiators: string[];
}

// --- Input ---
export interface InputFormData {
  inputMode: InputMode;
  topic: string;
  sourceUrl: string;
  selectedPlatforms: Platform[];
  tone: Tone;
  campaignGoal: CampaignGoal;
  postCount: number;
  trendBoost: boolean;
  location?: string;
  competitorUrl?: string;
  audiencePersona?: string;
  brandVoiceSample?: string;
  brandVoiceProfile?: BrandVoiceProfile;
  targetLanguage?: string;
  ageRange?: string;
  enableCritique?: boolean;
  aeoMode?: boolean;
  includeSchemaMarkup?: boolean;
  viralPsychologyMode?: boolean;
}

// --- Viral Vault ---
export interface ViralPost {
  platform: string;
  post_text: string;
  neuro_score: number;
  viral_trigger: string;
  emotion_profile?: string;
  trend_velocity?: string;
  ai_visibility_notes?: string;
}

// --- AI Config ---
export enum AiProvider {
  Gemini = 'Google Gemini',
  OpenAI = 'OpenAI',
  Claude = 'Anthropic Claude',
  OpenRouter = 'OpenRouter',
  Perplexity = 'Perplexity Sonar',
  Groq = 'Groq (Ultra-Fast)',
}

export interface AiConfig {
  provider: AiProvider;
  apiKey: string;
  model: string;
  isValidated: boolean;
  useMultiModel?: boolean;
  critiqueModel?: string;
  researchModel?: string;
}

export interface WordPressConfig {
  url: string;
  username: string;
  password: string;
  isValidated: boolean;
  autoPublish?: boolean;
  defaultCategory?: string;
  addSchemaMarkup?: boolean;
}

// --- Agent Pipeline (12 Steps) ---
export type AgentStep =
  | 'RESEARCH'
  | 'FACT_CHECK'
  | 'COMPETITOR_INTEL'
  | 'AUDIENCE_MAPPING'
  | 'SEO_ANALYSIS'
  | 'STRATEGY'
  | 'CONTENT'
  | 'CRITIQUE'
  | 'REVISION'
  | 'AEO_OPTIMIZE'
  | 'POLISH'
  | 'DONE';

export type StreamChunk =
  | { type: 'step'; step: AgentStep; label?: string }
  | { type: 'analysis'; data: TopicAnalysis }
  | { type: 'post'; data: GeneratedPost }
  | { type: 'grounding'; data: GroundingMetadata }
  | { type: 'voice_analysis'; data: BrandVoiceProfile }
  | { type: 'critique'; postIndex: number; data: PostCritique }
  | { type: 'progress'; percent: number; message: string };

export interface LikedVariation {
  id: string;
  text: string;
  tone: string;
  platform: string;
  timestamp: number;
  viral_score?: number;
  engagement_actual?: number;
}

// --- Scheduling ---
export interface ScheduledPost {
  id: string;
  post: GeneratedPost;
  variationIndex: number;
  platform: Platform;
  scheduledAt: number;
  status: 'pending' | 'published' | 'failed';
}
