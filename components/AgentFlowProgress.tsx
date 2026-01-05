
import React from 'react';
import { type AgentStep } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { SearchIcon } from './icons/SearchIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface AgentFlowProgressProps {
    currentStep: AgentStep;
}

const steps: { key: AgentStep; label: string; icon: React.FC<{className?: string}> }[] = [
    { key: 'RESEARCH', label: 'Zeitgeist Scouting', icon: SearchIcon },
    { key: 'FACTCHECK', label: 'Integrity Verification', icon: ShieldCheckIcon },
    { key: 'STRATEGY', label: 'Strategic Synthesis', icon: BrainCircuitIcon },
    { key: 'CONTENT', label: 'Framework Generation', icon: SparklesIcon },
    { key: 'CRITIQUE', label: 'Adversarial Critique', icon: XCircleIcon },
    { key: 'POLISH', label: 'Quality Assurance', icon: CheckCircleIcon },
];

export const AgentFlowProgress: React.FC<AgentFlowProgressProps> = ({ currentStep }) => {
    const activeIndex = steps.findIndex(s => s.key === currentStep);

    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-6">
            <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out" 
                    style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < activeIndex;
                    const isActive = index === activeIndex;

                    return (
                        <div key={step.key} className="relative z-10 flex flex-col items-center group">
                            <div className={`
                                w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500
                                ${isCompleted ? 'bg-green-500 border-green-200 dark:border-green-800 text-white' : 
                                  isActive ? 'bg-white dark:bg-slate-900 border-cyan-500 text-cyan-500 scale-110 shadow-lg shadow-cyan-500/20' : 
                                  'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'}
                            `}>
                                <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                            </div>
                            <span className={`
                                absolute top-16 whitespace-nowrap text-xs font-bold tracking-tighter uppercase transition-colors duration-500
                                ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}
                            `}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-20 text-center animate-pulse">
                <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-green-600 dark:from-cyan-400 dark:to-green-400 uppercase tracking-widest">
                    {steps[activeIndex]?.label || "Processing..."}...
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    {activeIndex === 4 
                        ? "Our adversarial agents are ruthlessly critiquing the draft to ensure SOTA quality." 
                        : "Our AI agents are architecting your high-authority campaign."}
                </p>
            </div>
        </div>
    );
};
