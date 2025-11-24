/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Activity, Eye, ArrowRight, Share2, AlertTriangle, Layers, Clock } from 'lucide-react';

// --- TELEMETRY PIPELINE DIAGRAM ---
// Visualizes flow: App -> OTel -> Prometheus -> Grafana
export const TelemetryPipelineDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    { 
        id: 0, 
        name: "Instrumentación", 
        tool: "SDK de OpenTelemetry", 
        desc: "Generación de trazas, métricas y logs.",
        icon: <Activity className="text-white" size={24} />,
        color: "bg-blue-600"
    },
    { 
        id: 1, 
        name: "Recolección", 
        tool: "OTel Collector", 
        desc: "Agregación, filtrado y procesamiento.",
        icon: <Share2 className="text-white" size={24} />,
        color: "bg-slate-700"
    },
    { 
        id: 2, 
        name: "Almacenamiento", 
        tool: "Prometheus", 
        desc: "Persistencia eficiente en series temporales.",
        icon: <Database className="text-white" size={24} />,
        color: "bg-red-600"
    },
    { 
        id: 3, 
        name: "Visualización", 
        tool: "Grafana", 
        desc: "Consulta, correlación y alertas.",
        icon: <Eye className="text-white" size={24} />,
        color: "bg-orange-500"
    }
  ];

  return (
    <div className="flex flex-col p-8 bg-slate-900 border border-slate-800 w-full max-w-5xl mx-auto shadow-sm rounded-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-800 -z-0"></div>
        
        {stages.map((stage, index) => (
            <div key={stage.id} className="relative z-10 flex flex-col items-center group w-full md:w-1/4">
                <motion.div 
                    className={`w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-500 border-4 rounded-full ${activeStage === index ? stage.color + ' border-white scale-110' : 'bg-slate-800 border-slate-700 grayscale opacity-50'}`}
                >
                    {stage.icon}
                </motion.div>
                
                {/* Data Packet Animation */}
                {activeStage === index && index < 3 && (
                    <motion.div 
                        className="hidden md:block absolute top-6 left-1/2 w-3 h-3 bg-white z-20 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        initial={{ x: 20, opacity: 1 }}
                        animate={{ x: 150, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}

                <div className="mt-6 text-center px-2">
                    <h4 className={`font-bold text-xs uppercase tracking-widest mb-2 ${activeStage === index ? 'text-white' : 'text-slate-600'}`}>{stage.name}</h4>
                    <div className="text-xs font-serif italic text-blue-400 mb-2">{stage.tool}</div>
                    <p className={`text-xs transition-opacity duration-300 ${activeStage === index ? 'opacity-100 text-slate-400' : 'opacity-0 h-0'}`}>
                        {stage.desc}
                    </p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- PUSH VS PULL DIAGRAM ---
// Interactive toggle between Prometheus (Pull) and OTel (Push) models
export const PushVsPullDiagram: React.FC = () => {
    const [mode, setMode] = useState<'pull' | 'push'>('pull');

    return (
        <div className="flex flex-col items-center p-8 bg-blue-900/30 border border-blue-800 w-full rounded-sm backdrop-blur-sm">
            <div className="flex items-center justify-between w-full mb-8 border-b border-blue-800 pb-4">
                <h3 className="font-serif text-xl text-white">Arquitectura de Recolección</h3>
                <div className="flex bg-slate-800 p-1 rounded-sm">
                    <button 
                        onClick={() => setMode('pull')}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${mode === 'pull' ? 'bg-blue-600 shadow-sm text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Pull (Prometheus)
                    </button>
                    <button 
                        onClick={() => setMode('push')}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm ${mode === 'push' ? 'bg-blue-600 shadow-sm text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Push (OTel)
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-lg h-64 bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner rounded-sm">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
                    {Array.from({length: 72}).map((_, i) => <div key={i} className="border border-blue-500"></div>)}
                </div>

                {/* Central Server */}
                <div className="absolute left-10 flex flex-col items-center z-10">
                    <div className={`w-20 h-20 border-2 flex flex-col items-center justify-center z-10 bg-slate-800 shadow-xl transition-colors duration-500 rounded-lg ${mode === 'pull' ? 'border-red-500' : 'border-slate-600'}`}>
                        {mode === 'pull' ? <Database className="text-red-500" /> : <Share2 className="text-slate-400" />}
                    </div>
                    <span className="text-xs font-bold mt-3 uppercase tracking-wider text-slate-300 bg-slate-900 px-2 rounded">
                        {mode === 'pull' ? 'Servidor' : 'Collector'}
                    </span>
                </div>

                {/* Targets (Apps) */}
                <div className="absolute right-10 flex flex-col gap-4 z-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                             {/* Arrow Animation */}
                            <div className="w-32 h-6 relative flex items-center justify-center">
                                <AnimatePresence mode='wait'>
                                    {mode === 'pull' ? (
                                        <motion.div 
                                            key="pull-arrow"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            className="flex items-center text-red-400 font-mono text-[10px] tracking-widest font-bold bg-slate-900 px-1 rounded"
                                        >
                                            <span className="mr-2">SCRAPE</span> ←
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="push-arrow"
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: -20, opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                            className="flex items-center text-blue-400 font-mono text-[10px] tracking-widest font-bold bg-slate-900 px-1 rounded"
                                        >
                                            ← <span className="ml-2">EMITIR</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="w-10 h-10 bg-slate-800 border border-slate-600 flex items-center justify-center rounded">
                                <Server size={18} className="text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-6 bg-slate-900/50 border-l-2 border-white text-sm text-slate-300 w-full shadow-sm">
                <span className="font-bold text-white block mb-1 font-serif text-lg">{mode === 'pull' ? 'Modelo Pull (Tirar):' : 'Modelo Push (Empujar):'}</span>
                {mode === 'pull' 
                    ? "El servidor conoce los objetivos e inicia la conexión. Ideal para detectar servicios 'caídos' (up=0), pero requiere acceso directo a la red." 
                    : "Los servicios envían telemetría a un colector. Superior para trabajos de corta duración (Lambda), redes de alta seguridad y escalado masivo."
                }
            </div>
        </div>
    );
};

// --- CARDINALITY EXPLOSION DIAGRAM ---
// Demonstrates how labels multiply series count
export const CardinalityExplosionDiagram: React.FC = () => {
    const [labels, setLabels] = useState<string[]>([]);
    
    // Base metric count (e.g., http_requests_total)
    const base = 1;
    
    const multipliers: Record<string, number> = {
        'Método (GET/POST)': 4,
        'Estado (200/500)': 5,
        'Instancia (Pod)': 10,
        'User_ID (¡Peligro!)': 1000
    };

    const currentSeries = labels.reduce((acc, label) => acc * multipliers[label], base);
    const maxSafe = 10000; // Threshold for visual alert

    const toggleLabel = (label: string) => {
        setLabels(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
    };

    return (
        <div className="flex flex-col md:flex-row gap-0 items-stretch bg-slate-900 border border-slate-800 shadow-sm rounded-sm overflow-hidden">
            <div className="flex-1 p-8 border-r border-slate-800">
                <h3 className="font-serif text-xl mb-2 text-white">Simulador de Cardinalidad</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    La "cardinalidad" es el número de series temporales únicas. Añadir etiquetas con valores ilimitados provoca una explosión exponencial.
                </p>
                
                <div className="space-y-3">
                    <div className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">Añadir Etiquetas (Labels)</div>
                    {Object.keys(multipliers).map(label => (
                        <button
                            key={label}
                            onClick={() => toggleLabel(label)}
                            className={`flex items-center justify-between w-full px-5 py-4 border transition-all text-sm font-medium rounded-sm ${labels.includes(label) ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'}`}
                        >
                            <span>{label}</span>
                            <span className="font-mono text-xs opacity-70">x{multipliers[label]}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-end bg-slate-950 p-8 relative overflow-hidden">
                {/* Visual Bar Graph growing */}
                <div className="relative w-full max-w-[200px] h-[300px] bg-slate-900 border border-slate-800 flex flex-col justify-end mb-8 shadow-inner rounded-sm">
                    <motion.div 
                        className={`w-full transition-colors duration-500 ${currentSeries > maxSafe ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-blue-500'}`}
                        initial={{ height: '1%' }}
                        animate={{ height: `${Math.min(100, Math.max(1, Math.log10(currentSeries) * 20))}%` }} 
                    />
                     {/* Warning Overlay */}
                     {currentSeries > maxSafe && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-[2px] flex-col text-red-500 animate-pulse p-4 text-center z-10 border-2 border-red-500/50 m-2 rounded">
                            <AlertTriangle size={32} className="mb-2" />
                            <span className="font-bold text-sm uppercase tracking-wider">Explosión de Series</span>
                            <span className="text-xs text-slate-300 mt-2 font-serif italic">Límite de memoria excedido</span>
                        </div>
                    )}
                </div>
                
                <div className="text-center z-20">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Total Series Temporales</div>
                    <div className={`font-mono text-4xl font-bold ${currentSeries > maxSafe ? 'text-red-500' : 'text-white'}`}>
                        {currentSeries.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};