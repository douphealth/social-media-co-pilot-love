
export enum Platform {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Pinterest = 'Pinterest',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
}

export enum Tone {
  Professional = 'Professional',
  Casual = 'Casual',
  Witty = 'Witty',
  Inspirational = 'Inspirational',
  Persuasive = 'Persuasive',
}

export enum InputMode {
  Topic = 'Topic / Keyword',
  URLSitemap = 'URL / Sitemap',
}

export enum CampaignGoal {
    BrandAwareness = 'Brand Awareness',
    LeadGeneration = 'Lead Generation',
    CommunityEngagement = 'Community Engagement',
    ThoughtLeadership = 'Thought Leadership',
    SalesConversion = 'Sales & Conversion',
}

export interface ViralBreakdown {
  emotional_resonance: number;
  platform_optimization: number;
  content_value: number;
  engagement_triggers: number;
}

export interface PostVariation {
    variation_name: string;
    archetype: 'AIDA' | 'PAS' | 'BAB' | 'CONTRARIAN' | 'VIDEO' | 'POLL';
    post_title: string;
    post_text: string;
    call_to_action: string;
    share_snippet: string;
    viral_trigger: string;
    poll_options?: string[];
}

export type WordPressPostStatus = 'idle' | 'publishing' | 'published' | 'error';
export type MediaGenerationStatus = 'idle' | 'generating' | 'completed' | 'error';

export interface HashtagStrategy {
    core: string[];
    niche: string[];
    trending: string[];
}

export interface GeneratedPost {
  platform: Platform;
  variations: PostVariation[];
  image_prompt: string;
  viral_score: number;
  viral_breakdown: ViralBreakdown;
  optimization_notes: string;
  hashtag_strategy: HashtagStrategy;
  funnel_stage?: 'Awareness' | 'Engagement' | 'Conversion';
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
}

export interface FactCheckAnalysis {
    credibility_score: number; 
    verified_claims: string[];
    potential_misinformation: string[];
    content_warnings: string[];
    citations: string[];
}

export interface CompetitorAnalysis {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
}

export interface AudiencePersona {
    name: string;
    demographics: string;
    summary: string;
    goals: string[];
    pain_points: string[];
}

export interface PredictiveMetrics {
    estimated_engagement_rate: string;
    virality_probability: string;
    audience_sentiment_forecast: string;
    predicted_ctr: string;
}

export interface TopicAnalysis {
    campaign_strategy: string;
    trend_alignment: string;
    audience_resonance: string;
    content_gaps: string;
    viral_hooks: string[];
    seo_keywords?: { primary: string[]; secondary: string[]; lsi: string[] };
    predictive_metrics?: PredictiveMetrics;
    fact_check_analysis?: FactCheckAnalysis;
    competitor_analysis?: CompetitorAnalysis;
    audience_persona_details?: AudiencePersona;
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
}

// SOTA Feature: Brand DNA
export interface BrandVoiceProfile {
    archetype: string;
    sentence_structure: string;
    vocabulary_level: string;
    banned_words: string[];
    emoji_usage: string;
    persuasion_tactics: string[];
}

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
  brandVoiceSample?: string; // New Input
  brandVoiceProfile?: BrandVoiceProfile; // Analyzed Profile
}

export interface ViralPost {
    platform: string;
    post_text: string;
    neuro_score: number;
    viral_trigger: string;
}

export enum AiProvider {
    Gemini = 'Google Gemini',
    OpenAI = 'OpenAI',
    Claude = 'Anthropic Claude',
    OpenRouter = 'OpenRouter',
}

export interface AiConfig {
    provider: AiProvider;
    apiKey: string;
    model: string;
    isValidated: boolean;
}

export interface WordPressConfig {
    url: string;
    username: string;
    password: string; 
    isValidated: boolean;
}

// Updated Steps to include CRITIQUE
export type AgentStep = 'RESEARCH' | 'STRATEGY' | 'FACTCHECK' | 'CONTENT' | 'CRITIQUE' | 'POLISH' | 'DONE';

export type StreamChunk = 
    | { type: 'step'; step: AgentStep }
    | { type: 'analysis'; data: TopicAnalysis }
    | { type: 'post'; data: GeneratedPost }
    | { type: 'grounding'; data: GroundingMetadata }
    | { type: 'voice_analysis'; data: BrandVoiceProfile };
    
export interface LikedVariation {
    id: string;
    text: string;
    tone: string;
    platform: string;
    timestamp: number;
}
