
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { PostCard } from './components/PostCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { CampaignHistory } from './components/CampaignHistory';
import { ApiConfigurator } from './components/ApiConfigurator';
import { WordPressConfigurator } from './components/WordPressConfigurator';
import { BottomNavBar } from './components/BottomNavBar';
import { Resources } from './components/Resources';
import { LandingPage } from './components/LandingPage';
import { ViralVault } from './components/ViralVault';
import { AgentFlowProgress } from './components/AgentFlowProgress';
import { AiProvider, type ApiResponse, type GeneratedPost, type InputFormData, type AiConfig, type WordPressConfig, type ViralPost, type LikedVariation, type AgentStep } from './types';
import { generateViralPostsStream, generateImageFromPrompt, generateViralTrends, generateVeoVideo, generateSpeech } from './services/aiService';
import { publishPostToWordPress } from './services/wordpressService';
import { AI_PROVIDERS } from './constants';
import { WordPressIcon } from './components/icons/WordPressIcon';

export type ActiveView = 'generator' | 'history' | 'config' | 'wordpress' | 'resources' | 'vault';
export type Theme = 'light' | 'dark';

// #region Performance Utilities
const base64ToBlob = (base64Data: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
};

const dataUrlToBlobUrl = (dataUrl: string): { blobUrl: string } => {
    const [meta, base64] = dataUrl.split(',');
    const mimeType = meta.match(/:(.*?);/)?.[1] || 'image/jpeg';
    return { blobUrl: URL.createObjectURL(base64ToBlob(base64, mimeType)) };
};
// #endregion

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agentStep, setAgentStep] = useState<AgentStep>('RESEARCH');
  const [isBulkPublishing, setIsBulkPublishing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [campaignHistory, setCampaignHistory] = useState<ApiResponse[]>([]);
  const [activeView, setActiveView] = useState<ActiveView>('generator');
  const [theme, setTheme] = useState<Theme>('dark');
  const [likedVariations, setLikedVariations] = useState<LikedVariation[]>([]);
  const [viralTrends, setViralTrends] = useState<ViralPost[] | null>(null);
  const [isVaultLoading, setIsVaultLoading] = useState<boolean>(false);
  const [vaultError, setVaultError] = useState<string | null>(null);

  const [aiConfig, setAiConfig] = useState<AiConfig>({
      provider: AI_PROVIDERS[0].name,
      apiKey: '',
      model: AI_PROVIDERS[0].defaultModel,
      isValidated: false,
  });
  
  const [wordPressConfig, setWordPressConfig] = useState<WordPressConfig>({
      url: '',
      username: '',
      password: '',
      isValidated: false,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    try {
      const savedAiConfig = localStorage.getItem('aiConfig');
      const savedWpConfig = localStorage.getItem('wordPressConfig');
      const savedHistory = localStorage.getItem('campaignHistory');
      const savedLikes = localStorage.getItem('likedVariations');

      if (savedAiConfig) setAiConfig(JSON.parse(savedAiConfig));
      if (savedWpConfig) setWordPressConfig(JSON.parse(savedWpConfig));
      if (savedHistory) setCampaignHistory(JSON.parse(savedHistory));
      if (savedLikes) setLikedVariations(JSON.parse(savedLikes));
      
      // Proactive Intelligence: Scout trends on load
      if (savedAiConfig && JSON.parse(savedAiConfig).isValidated) {
          handleGenerateViralTrends('Affiliate Marketing');
      }
    } catch (e) { localStorage.clear(); }
  }, []);

  const handleLikeVariation = (variation: LikedVariation) => {
      setLikedVariations(prev => {
          const newLikes = [variation, ...prev].slice(0, 50);
          localStorage.setItem('likedVariations', JSON.stringify(newLikes));
          return newLikes;
      });
  };

  const handleGenerate = useCallback(async (formData: InputFormData) => {
    setIsLoading(true);
    setAgentStep('RESEARCH');
    setError(null);
    setApiResponse(null);

    let finalResponse: ApiResponse = {
      id: `campaign_${Date.now()}`,
      campaignTitle: formData.topic || formData.sourceUrl,
      timestamp: Date.now(),
      topic_analysis: { campaign_strategy: "", trend_alignment: "", audience_resonance: "", content_gaps: "", viral_hooks: [] },
      posts: [],
    };

    try {
      const stream = generateViralPostsStream(formData, aiConfig, likedVariations);
      for await (const chunk of stream) {
        if (chunk.type === 'step') setAgentStep(chunk.step);
        if (chunk.type === 'analysis') finalResponse.topic_analysis = chunk.data;
        if (chunk.type === 'post') finalResponse.posts.push({ ...chunk.data, imageIsLoading: true, wordpressStatus: 'idle', videoStatus: 'idle', audioStatus: 'idle' });
        if (chunk.type === 'grounding') finalResponse.groundingMetadata = chunk.data;
        setApiResponse({ ...finalResponse, posts: [...finalResponse.posts] });
      }
      
      setIsLoading(false);
      const updatedCampaign = { ...finalResponse };
      setApiResponse(updatedCampaign);
      
      // Post-Generation: Parallel Image Dispatch
      const imagePromises = updatedCampaign.posts.map((post, index) => 
        generateImageFromPrompt(post.image_prompt, aiConfig).then(dataUrl => {
            const { blobUrl } = dataUrlToBlobUrl(dataUrl);
            setApiResponse(prev => {
                if (!prev) return null;
                const newPosts = [...prev.posts];
                newPosts[index] = { ...newPosts[index], imageUrl: blobUrl, imageDataUrl: dataUrl, imageIsLoading: false };
                return { ...prev, posts: newPosts };
            });
        })
      );
      await Promise.allSettled(imagePromises);
      saveCampaignToHistory(finalResponse);

    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [aiConfig, likedVariations]);

  const saveCampaignToHistory = (campaign: ApiResponse) => {
    setCampaignHistory(prev => {
      const newHistory = [campaign, ...prev.filter(p => p.id !== campaign.id)].slice(0, 20);
      localStorage.setItem('campaignHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleGenerateViralTrends = async (niche: string) => {
    setIsVaultLoading(true);
    try {
        const trends = await generateViralTrends(niche, aiConfig);
        setViralTrends(trends);
    } catch (err: any) { setVaultError(err.message); }
    finally { setIsVaultLoading(false); }
  };

  const hasResults = useMemo(() => apiResponse && apiResponse.posts.length > 0, [apiResponse]);

  const renderContent = () => {
    if (isLoading) return <AgentFlowProgress currentStep={agentStep} />;
    
    if (activeView === 'history') return <CampaignHistory history={campaignHistory} onLoad={c => { setApiResponse(c); setActiveView('generator'); }} onDelete={id => setCampaignHistory(prev => prev.filter(c => c.id !== id))} />;
    if (activeView === 'config') return <ApiConfigurator currentConfig={aiConfig} onSave={c => setAiConfig(c)} onClose={() => setActiveView('generator')} />;
    if (activeView === 'wordpress') return <WordPressConfigurator currentConfig={wordPressConfig} onSave={c => setWordPressConfig(c)} onClose={() => setActiveView('generator')} />;
    if (activeView === 'resources') return <Resources />;
    if (activeView === 'vault') return <ViralVault onGenerate={handleGenerateViralTrends} trends={viralTrends} isLoading={isVaultLoading} error={vaultError} />;

    if (hasResults && apiResponse) {
      return (
        <div className="animate-fade-in">
          <button onClick={() => setApiResponse(null)} className="w-full mb-8 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-green-500 text-white font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">New Proactive Campaign</button>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-1/3"><AnalysisDisplay analysis={apiResponse.topic_analysis} groundingMetadata={apiResponse.groundingMetadata} /></aside>
            <main className="w-full lg:w-2/3 grid grid-cols-1 xl:grid-cols-2 gap-6">
                {apiResponse.posts.map((post, i) => (
                    <PostCard 
                        key={i} post={post} 
                        onRegenerate={() => {}} 
                        onPublish={() => {}} 
                        onGenerateVideo={() => {}} 
                        onGenerateAudio={() => {}} 
                        onLikeVariation={handleLikeVariation} 
                        isWordPressConfigured={wordPressConfig.isValidated} 
                    />
                ))}
            </main>
          </div>
        </div>
      );
    }
    
    return (
        <>
            {viralTrends && activeView === 'generator' && (
                <div className="mb-12 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-black">!</div>
                        <div>
                            <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">PROACTIVE ALERT</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">AI scouts detected a peaked trend: <span className="font-bold">"{viralTrends[0].post_text.substring(0, 40)}..."</span></p>
                        </div>
                    </div>
                    <button onClick={() => setActiveView('vault')} className="px-4 py-2 bg-cyan-500 text-white text-xs font-bold rounded-lg">View Alpha</button>
                </div>
            )}
            <LandingPage onGenerate={handleGenerate} isLoading={isLoading} />
        </>
    );
  }

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header isLandingPage={!hasResults && activeView === 'generator'} theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} onToggleHistory={() => setActiveView('history')} onToggleApiConfig={() => setActiveView('config')} onToggleWordPressConfig={() => setActiveView('wordpress')} onToggleResources={() => setActiveView('resources')} onToggleViralVault={() => setActiveView('vault')} />
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8 flex-grow">{renderContent()}</main>
      <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;
