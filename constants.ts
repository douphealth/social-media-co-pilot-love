// ============================================================
// SOCIAL MEDIA CO-PILOT — ENTERPRISE CONSTANTS v3.0
// ============================================================
import React from 'react';
import { Platform, Tone, CampaignGoal, AiProvider } from './types';
import { FacebookIcon } from './components/icons/FacebookIcon';
import { InstagramIcon } from './components/icons/InstagramIcon';
import { PinterestIcon } from './components/icons/PinterestIcon';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';

// --- AI Providers (Multi-LLM) ---
export const AI_PROVIDERS: {
  name: AiProvider;
  defaultModel: string;
  researchModel: string;
  critiqueModel: string;
  apiKeyUrl: string;
  badge: string;
  description: string;
}[] = [
  {
    name: AiProvider.Gemini,
    defaultModel: 'gemini-2.5-pro',
    researchModel: 'gemini-2.5-pro',
    critiqueModel: 'gemini-2.5-flash',
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
    badge: '⚡ SOTA',
    description: 'Best overall. Real-time Google Search grounding. Recommended.',
  },
  {
    name: AiProvider.OpenAI,
    defaultModel: 'gpt-4o',
    researchModel: 'gpt-4o',
    critiqueModel: 'gpt-4o-mini',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    badge: '🧠 GPT-4o',
    description: 'Excellent creativity and instruction following.',
  },
  {
    name: AiProvider.Claude,
    defaultModel: 'claude-opus-4-5',
    researchModel: 'claude-opus-4-5',
    critiqueModel: 'claude-haiku-4-5',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
    badge: '🎯 Precise',
    description: 'Best for nuanced brand voice and long-form strategy.',
  },
  {
    name: AiProvider.OpenRouter,
    defaultModel: 'anthropic/claude-opus-4-5',
    researchModel: 'google/gemini-2.5-pro',
    critiqueModel: 'anthropic/claude-haiku-4-5',
    apiKeyUrl: 'https://openrouter.ai/keys',
    badge: '🔀 Multi-Model',
    description: 'Route to any model. Mix strategies per task.',
  },
  {
    name: AiProvider.Perplexity,
    defaultModel: 'sonar-pro',
    researchModel: 'sonar-pro',
    critiqueModel: 'sonar',
    apiKeyUrl: 'https://www.perplexity.ai/settings/api',
    badge: '🔍 Real-Time',
    description: 'Real-time web search built-in. Best for trend research.',
  },
  {
    name: AiProvider.Groq,
    defaultModel: 'llama-3.3-70b-versatile',
    researchModel: 'llama-3.3-70b-versatile',
    critiqueModel: 'llama-3.1-8b-instant',
    apiKeyUrl: 'https://console.groq.com/keys',
    badge: '🚀 Ultra-Fast',
    description: '200+ tok/s. Ideal for rapid iteration and bulk generation.',
  },
];

// --- Platforms (Extended with metadata) ---
export const PLATFORMS: {
  name: Platform;
  icon: React.FC<{ className?: string }>;
  color: string;
  maxChars: number;
  bestFormats: string[];
  algorithmTip: string;
  bestPostingTimes: string;
}[] = [
  {
    name: Platform.Facebook,
    icon: FacebookIcon,
    color: '#1877F2',
    maxChars: 63206,
    bestFormats: ['Video', 'Image', 'Long-form', 'Poll'],
    algorithmTip: 'Posts with questions get 2x more comments. Go Live for 6x organic reach.',
    bestPostingTimes: 'Tue–Thu 1–3 PM',
  },
  {
    name: Platform.Instagram,
    icon: InstagramIcon,
    color: '#E1306C',
    maxChars: 2200,
    bestFormats: ['Reel', 'Carousel', 'Story', 'Static'],
    algorithmTip: 'Reels get 3x more reach than static posts. First 3 seconds are critical.',
    bestPostingTimes: 'Tue/Thu/Fri 6–8 PM',
  },
  {
    name: Platform.Pinterest,
    icon: PinterestIcon,
    color: '#E60023',
    maxChars: 500,
    bestFormats: ['Idea Pin', 'Static', 'Infographic'],
    algorithmTip: 'Vertical 2:3 ratio pins get 60% more impressions. Add text overlay.',
    bestPostingTimes: 'Sat–Sun 8–11 PM',
  },
  {
    name: Platform.LinkedIn,
    icon: LinkedInIcon,
    color: '#0A66C2',
    maxChars: 3000,
    bestFormats: ['Article', 'Carousel PDF', 'Video', 'Poll'],
    algorithmTip: 'First 3 lines determine click-through. Native video gets 5x more reach.',
    bestPostingTimes: 'Tue–Thu 8–9 AM',
  },
  {
    name: Platform.Twitter,
    icon: TwitterIcon,
    color: '#000000',
    maxChars: 280,
    bestFormats: ['Thread', 'Quote Tweet', 'Poll', 'Short Video'],
    algorithmTip: 'Threads with 7+ tweets outperform single tweets 5x. Add a hook then number threads.',
    bestPostingTimes: 'Weekdays 12–3 PM',
  },
  {
    name: Platform.TikTok,
    icon: TwitterIcon,
    color: '#010101',
    maxChars: 2200,
    bestFormats: ['Duet', 'Stitch', 'Trend Sound', 'Tutorial', 'GRWM'],
    algorithmTip: 'Watch time is #1 ranking factor. Hook in first 1.5s. Use trending sounds.',
    bestPostingTimes: 'Tue/Thu 7–9 PM',
  },
  {
    name: Platform.YouTube,
    icon: TwitterIcon,
    color: '#FF0000',
    maxChars: 5000,
    bestFormats: ['Shorts', 'Tutorial', 'List Video', 'Reaction'],
    algorithmTip: 'CTR + watch time = YouTube gold. Shorts get pushed to non-subscribers.',
    bestPostingTimes: 'Fri–Sat 12–3 PM',
  },
  {
    name: Platform.Threads,
    icon: TwitterIcon,
    color: '#101010',
    maxChars: 500,
    bestFormats: ['Hot take', 'Conversation starter', 'Poll', 'Behind-the-scenes'],
    algorithmTip: 'Controversial-but-respectful opinions dominate. Short punchy takes win.',
    bestPostingTimes: 'Weekdays 9–11 AM',
  },
];

// --- Tones with descriptions ---
export const TONES: { name: Tone; description: string; bestFor: string; emoji: string }[] = [
  { name: Tone.Professional, description: 'Authoritative & credible', bestFor: 'LinkedIn, B2B', emoji: '👔' },
  { name: Tone.Casual, description: 'Friendly & approachable', bestFor: 'Instagram, Facebook', emoji: '😊' },
  { name: Tone.Witty, description: 'Clever & humorous', bestFor: 'Twitter/X, TikTok', emoji: '🧠' },
  { name: Tone.Inspirational, description: 'Motivating & uplifting', bestFor: 'Instagram, Pinterest', emoji: '✨' },
  { name: Tone.Persuasive, description: 'Compelling & conversion-focused', bestFor: 'Facebook, LinkedIn', emoji: '🎯' },
  { name: Tone.Contrarian, description: 'Counter-intuitive hot takes', bestFor: 'Twitter/X, Threads', emoji: '🔥' },
  { name: Tone.Storytelling, description: 'Narrative & emotional arcs', bestFor: 'All platforms', emoji: '📚' },
  { name: Tone.DataDriven, description: 'Stats & research-backed', bestFor: 'LinkedIn, Twitter/X', emoji: '📊' },
];

// --- Campaign Goals with metadata ---
export const CAMPAIGN_GOALS: { name: CampaignGoal; description: string; icon: string }[] = [
  { name: CampaignGoal.BrandAwareness, description: 'Get discovered by new audiences', icon: '👁️' },
  { name: CampaignGoal.LeadGeneration, description: 'Capture leads & grow your email list', icon: '🎯' },
  { name: CampaignGoal.CommunityEngagement, description: 'Build a loyal, active tribe', icon: '🤝' },
  { name: CampaignGoal.ThoughtLeadership, description: 'Become the authority in your niche', icon: '🧠' },
  { name: CampaignGoal.SalesConversion, description: 'Drive direct purchases & revenue', icon: '💰' },
  { name: CampaignGoal.OrganicTraffic, description: 'SEO-powered traffic to your site', icon: '📈' },
  { name: CampaignGoal.AIVisibility, description: 'Get cited by ChatGPT & Perplexity', icon: '🤖' },
  { name: CampaignGoal.ViralGrowth, description: 'Engineer exponential organic spread', icon: '🔥' },
];

// --- Agent Pipeline Steps (12 phases) ---
export const AGENT_STEPS = [
  { id: 'RESEARCH',         label: '🔍 Research',         description: 'Scouting real-time trends & web intelligence via Google Search' },
  { id: 'FACT_CHECK',       label: '✅ Fact Check',         description: 'Verifying every claim, grounding sources, credibility scoring' },
  { id: 'COMPETITOR_INTEL', label: '🕵️ Competitor Intel', description: 'Mapping competitor gaps — what they\'re missing that you can own' },
  { id: 'AUDIENCE_MAPPING', label: '👥 Audience Map',     description: 'Psychographics, decision triggers & online behavior profiling' },
  { id: 'SEO_ANALYSIS',     label: '📊 SEO / AEO',        description: 'Keyword intelligence + AI answer engine optimization signals' },
  { id: 'STRATEGY',         label: '🎯 Strategy',         description: 'Crafting the campaign blueprint and positioning' },
  { id: 'CONTENT',          label: '✍️ Content Gen',      description: 'Writing 8 viral framework variations per post with psychology' },
  { id: 'CRITIQUE',         label: '🔬 AI Critique',      description: 'Dedicated editor model reviewing every post for weaknesses' },
  { id: 'REVISION',         label: '✨ Revision',           description: 'Applying AI-suggested hook & CTA improvements automatically' },
  { id: 'AEO_OPTIMIZE',     label: '🤖 AEO Optimize',     description: 'Adding schema markup & FAQ pairs for AI engine citation' },
  { id: 'POLISH',           label: '💎 Polish',           description: 'Final quality check, viral score ranking & sorting' },
  { id: 'DONE',             label: '🚀 Launch Ready',     description: 'Your enterprise viral campaign is ready to deploy!' },
] as const;

// --- Real-World Viral Benchmarks ---
export const VIRAL_BENCHMARKS: Record<string, { avgEngagement: number; viralThreshold: number; label: string }> = {
  instagram:  { avgEngagement: 1.22, viralThreshold: 5.0,  label: 'Instagram' },
  tiktok:     { avgEngagement: 5.96, viralThreshold: 15.0, label: 'TikTok' },
  twitter:    { avgEngagement: 0.45, viralThreshold: 2.0,  label: 'Twitter/X' },
  linkedin:   { avgEngagement: 0.54, viralThreshold: 3.0,  label: 'LinkedIn' },
  facebook:   { avgEngagement: 0.27, viralThreshold: 1.5,  label: 'Facebook' },
  youtube:    { avgEngagement: 4.1,  viralThreshold: 10.0, label: 'YouTube' },
  pinterest:  { avgEngagement: 0.3,  viralThreshold: 2.0,  label: 'Pinterest' },
  threads:    { avgEngagement: 2.1,  viralThreshold: 6.0,  label: 'Threads' },
};

// --- Power Words Library (Neuromarketing-validated) ---
export const POWER_WORDS = {
  urgency:   ['Now', 'Instantly', 'Today', 'Immediately', 'Limited', 'Deadline', 'Expires', 'Last Chance'],
  curiosity: ['Secret', 'Revealed', 'Hidden', 'Unknown', 'Discover', 'Uncovered', 'Surprising', 'Shocking'],
  authority: ['Proven', 'Certified', 'Expert', 'Research', 'Science-backed', 'Data-driven', 'Validated'],
  value:     ['Free', 'Bonus', 'Exclusive', 'Premium', 'Elite', 'VIP', 'Ultimate', 'Breakthrough'],
  social:    ['Everyone', 'Viral', 'Trending', 'Millions', 'Community', 'Together', '#1', 'Award-winning'],
  emotional: ['Love', 'Fear', 'Anger', 'Joy', 'Hope', 'Pride', 'Regret', 'Nostalgia', 'Inspiration'],
};

// --- Resource Links ---
export const RESOURCE_LINKS = [
  {
    category: '🚀 Affiliate Marketing Fundamentals',
    description: 'Build a strong foundation for your affiliate marketing journey.',
    links: [
      { title: "Beginner's Guide to Affiliate Marketing", url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/beginners-guide-to-affiliate-marketing/' },
      { title: 'How to Choose a Profitable Niche', url: 'https://affiliatemarketingforsuccess.com/how-to-start/how-to-choose-your-niche/' },
      { title: 'High-Ticket Affiliate Marketing Guide', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/high-ticket-affiliate-marketing/' },
      { title: 'Join The Best Affiliate Networks', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/join-the-best-affiliate-networks/' },
    ],
  },
  {
    category: '📝 Content & SEO Strategy',
    description: 'Master content that ranks, converts, and gets cited by AI.',
    links: [
      { title: 'Winning Content Strategy Framework', url: 'https://affiliatemarketingforsuccess.com/blogging/winning-content-strategy/' },
      { title: 'How to Create Evergreen Content', url: 'https://affiliatemarketingforsuccess.com/blogging/how-to-create-evergreen-content/' },
      { title: 'Best Blog Post Structure for SEO', url: 'https://affiliatemarketingforsuccess.com/blogging/what-is-the-best-structure-of-a-blog-post/' },
      { title: 'Build an Effective SEO Strategy', url: 'https://affiliatemarketingforsuccess.com/seo/build-an-effective-seo-strategy/' },
      { title: 'Link Building Strategies That Work', url: 'https://affiliatemarketingforsuccess.com/seo/link-building-strategies/' },
    ],
  },
  {
    category: '🤖 AI in Marketing (AEO/GEO)',
    description: 'Leverage AI to automate, scale, and dominate AI search engines.',
    links: [
      { title: 'ChatGPT for Marketing — Full Guide', url: 'https://affiliatemarketingforsuccess.com/ai/discover-the-power-of-chatgpt/' },
      { title: 'AI Prompt Engineering Mastery', url: 'https://affiliatemarketingforsuccess.com/ai/what-is-ai-prompt-engineering/' },
      { title: 'Avoid AI Content Detection', url: 'https://affiliatemarketingforsuccess.com/ai/avoid-ai-detection/' },
      { title: 'Launch Affiliate Business with AI Tools', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/launch-affiliate-business-ai-tools/' },
    ],
  },
  {
    category: '📧 Email Marketing',
    description: 'Build and nurture your audience with high-converting campaigns.',
    links: [
      { title: 'Proven Ways to Grow Your Email List', url: 'https://affiliatemarketingforsuccess.com/email-marketing/proven-ways-to-grow-your-email-list/' },
      { title: 'Understanding Email Marketing Funnels', url: 'https://affiliatemarketingforsuccess.com/email-marketing/understanding-email-marketing/' },
      { title: 'Craft Irresistible Email Newsletters', url: 'https://affiliatemarketingforsuccess.com/email-marketing/craft-irresistible-email-newsletters/' },
    ],
  },
  {
    category: '🌐 Website & WordPress',
    description: 'Set up a high-performance site for affiliate success.',
    links: [
      { title: '10 Steps to Build Your Website', url: 'https://affiliatemarketingforsuccess.com/how-to-start/10-simple-steps-to-build-your-website-a-beginners-guide/' },
      { title: 'WordPress Blogging Tips for Success', url: 'https://affiliatemarketingforsuccess.com/blogging/wordpress-blogging-tips/' },
      { title: 'How to Choose a Web Host', url: 'https://affiliatemarketingforsuccess.com/how-to-start/how-to-choose-a-web-host/' },
    ],
  },
];
