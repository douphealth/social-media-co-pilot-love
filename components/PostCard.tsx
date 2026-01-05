
import React, { useState, useEffect } from 'react';
import type { GeneratedPost, PostVariation, Platform, HashtagStrategy, LikedVariation } from '../types';
import { PLATFORMS } from '../constants';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { InfoIcon } from './icons/InfoIcon';
import { WordPressIcon } from './icons/WordPressIcon';
import { SkeletonLoader } from './SkeletonLoader';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const StarIcon: React.FC<{ className?: string, filled?: boolean }> = ({ className, filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

interface PostCardProps {
  post: GeneratedPost;
  onRegenerate: () => void;
  onPublish: (variationIndex: number) => void;
  onGenerateVideo: () => void;
  onGenerateAudio: (text: string) => void;
  onLikeVariation: (variation: LikedVariation) => void;
  isWordPressConfigured: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onRegenerate, onPublish, onGenerateVideo, onGenerateAudio, onLikeVariation, isWordPressConfigured }) => {
  const [activeVarIdx, setActiveVarIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'content' | 'preview'>('content');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const activeVar = post.variations[activeVarIdx];
  const platformInfo = PLATFORMS.find(p => p.name === post.platform);
  const Icon = platformInfo?.icon;

  const handleLike = () => {
      const newLiked = new Set(liked);
      if (liked.has(activeVarIdx)) newLiked.delete(activeVarIdx);
      else {
          newLiked.add(activeVarIdx);
          onLikeVariation({ id: `${Date.now()}`, text: activeVar.post_text, tone: 'Learned', platform: post.platform, timestamp: Date.now() });
      }
      setLiked(newLiked);
  };

  return (
    <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden group">
      <div className="p-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-slate-600 dark:text-slate-300">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{post.platform}</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Viral Blueprint</span>
          </div>
        </div>
        <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-2xl font-black text-sm border border-green-500/20">
            {post.viral_score}% Virality
        </div>
      </div>

      <div className="p-1.5 flex gap-1 bg-slate-100 dark:bg-slate-900/50">
        {post.variations.map((v, i) => (
            <button 
                key={i} onClick={() => setActiveVarIdx(i)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-tighter rounded-xl transition-all ${activeVarIdx === i ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
                {v.variation_name.split(' ')[0]}
            </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-900">
            {post.imageUrl ? <img src={post.imageUrl} className="w-full h-full object-cover" /> : <SkeletonLoader />}
        </div>

        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-cyan-500/20">
                    Framework: {activeVar.variation_name}
                </span>
                <button onClick={handleLike} className={`p-2 rounded-xl transition-all ${liked.has(activeVarIdx) ? 'text-yellow-500 bg-yellow-500/10' : 'text-slate-400 hover:text-yellow-500'}`}>
                    <StarIcon className="w-5 h-5" filled={liked.has(activeVarIdx)} />
                </button>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{activeVar.post_title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{activeVar.post_text}</p>
            </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex gap-3">
        <button className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">Copy Assets</button>
        {isWordPressConfigured && <button onClick={() => onPublish(activeVarIdx)} className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-500 shadow-lg shadow-green-500/20 transition-all">SOTA Publish</button>}
      </div>
    </div>
  );
};
