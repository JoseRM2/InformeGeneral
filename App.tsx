/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { NetworkScene, ServerArchitectureScene } from './components/ObservabilityScenes';
import { TelemetryPipelineDiagram, PushVsPullDiagram, CardinalityExplosionDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, Layers, GitMerge, AlertTriangle, FileText, Database, Activity } from 'lucide-react';

const StatCard = ({ label, value, delay }: { label: string, value: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-slate-900 rounded-none border border-slate-800 hover:border-blue-500 transition-all duration-300 w-full" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-3xl text-white text-center mb-2">{value}</h3>
      <div className="w-8 h-0.5 bg-blue-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity"></div>
      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed">{label}</p>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
    <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 border border-slate-800 shadow-sm">
            <Icon size={14}/> {subtitle}
        </div>
        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white tracking-tight">{title}</h2>
        <div className="w-24 h-1 bg-blue-500 mx-auto opacity-30"></div>
    </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-slate-800 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-serif font-bold text-xl pb-1 rounded-sm">O</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity text-white ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              INFORME <span className="font-normal text-slate-400">TÉCNICO</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-slate-400 uppercase">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-white transition-colors cursor-pointer">Resumen</a>
            <a href="#triad" onClick={scrollToSection('triad')} className="hover:text-white transition-colors cursor-pointer">La Tríada</a>
            <a href="#architecture" onClick={scrollToSection('architecture')} className="hover:text-white transition-colors cursor-pointer">Arquitectura</a>
            <a href="#challenges" onClick={scrollToSection('challenges')} className="hover:text-white transition-colors cursor-pointer">Desafíos</a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-white">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-blue-400 transition-colors cursor-pointer uppercase">Resumen</a>
            <a href="#triad" onClick={scrollToSection('triad')} className="hover:text-blue-400 transition-colors cursor-pointer uppercase">La Tríada</a>
            <a href="#architecture" onClick={scrollToSection('architecture')} className="hover:text-blue-400 transition-colors cursor-pointer uppercase">Arquitectura</a>
            <a href="#challenges" onClick={scrollToSection('challenges')} className="hover:text-blue-400 transition-colors cursor-pointer uppercase">Desafíos</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <NetworkScene />
        
        {/* Gradient Overlay - Dark Blue */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.7)_0%,rgba(2,6,23,0.9)_60%,rgba(2,6,23,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 border border-blue-900/50 text-blue-300 text-xs tracking-[0.25em] uppercase font-bold bg-slate-900/50 backdrop-blur-sm shadow-sm">
            Arquitecturas de Observabilidad Modernas
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight md:leading-[1.1] mb-8 text-white drop-shadow-2xl">
            Un Análisis Técnico<br/><span className="text-blue-400 italic">Exhaustivo</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12 border-l-2 border-blue-500 pl-6 text-left">
            Una evaluación profunda de la convergencia entre Grafana, Prometheus y OpenTelemetry en sistemas distribuidos a escala global.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors cursor-pointer tracking-widest uppercase">
                <span>Explorar el Informe</span>
                <span className="p-3 border border-slate-700 rounded-full group-hover:border-blue-500 group-hover:bg-blue-600 transition-colors bg-slate-900">
                    <ArrowDown size={16} className="text-white"/>
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-blue-400 uppercase">01. Resumen Ejecutivo</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-white">El Cambio de Paradigma</h2>
              <div className="w-16 h-1 bg-blue-600 mb-6"></div>
              <p className="text-sm text-slate-400 leading-relaxed font-serif italic border-l border-slate-700 pl-4">
                "La monitorización pregunta: '¿Funciona el sistema?'. La observabilidad permite preguntar: '¿Por qué se comporta así?'"
              </p>
            </div>
            <div className="md:col-span-8 text-lg text-slate-300 leading-relaxed space-y-6 font-light">
              <p>
                <span className="text-6xl float-left mr-4 mt-[-10px] font-serif text-blue-500/20">E</span>n el panorama actual de la ingeniería de software, dominado por microservicios efímeros y orquestación de contenedores, la monitorización tradicional basada en el estado estático es insuficiente.
              </p>
              <p>
                Tres tecnologías de código abierto han convergido para formar el estándar de facto: <strong className="text-white">Grafana</strong> como la capa de visualización agnóstica; <strong className="text-white">Prometheus</strong> como el motor de métricas basado en series temporales; y <strong className="text-white">OpenTelemetry</strong> como el marco unificado para la generación de telemetría (trazas, métricas y logs).
              </p>
            </div>
          </div>
        </section>

        {/* The Pipeline Visualization */}
        <section className="py-20 bg-slate-950 border-y border-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h3 className="font-serif text-2xl text-white">Tubería de Telemetría</h3>
                    <p className="text-sm text-slate-500 mt-2">Flujo de datos desde la instrumentación hasta la acción</p>
                </div>
                <TelemetryPipelineDiagram />
            </div>
        </section>

        {/* The Triad Deep Dive */}
        <section id="triad" className="py-24 bg-slate-900">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title="Los Tres Pilares Tecnológicos" 
                    subtitle="La Pila Tecnológica" 
                    icon={Layers} 
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-800 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-900 shadow-sm">
                    {/* Grafana */}
                    <div className="p-10 hover:bg-slate-800 transition-colors group">
                        <div className="w-12 h-12 border border-slate-700 flex items-center justify-center text-white mb-6 font-serif text-2xl bg-slate-900 group-hover:border-orange-500 transition-colors">G</div>
                        <h3 className="font-serif text-2xl mb-2 text-white">Grafana</h3>
                        <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-6">Visualización Agnóstica</h4>
                        <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                            La "lente" que se sitúa sobre cualquier almacén de datos. Permite correlacionar visualmente logs, métricas y trazas sin necesidad de migrar los datos. Es esencialmente sin estado respecto a los datos métricos.
                        </p>
                        <ul className="text-xs text-slate-500 space-y-3 font-medium uppercase tracking-wide group-hover:text-slate-300 transition-colors">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-500"></div>Panel Único de Vidrio</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-500"></div>Alertas Unificadas</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-orange-500"></div>Transformación de Consultas</li>
                        </ul>
                    </div>

                    {/* Prometheus */}
                    <div className="p-10 hover:bg-slate-800 transition-colors group">
                        <div className="w-12 h-12 border border-slate-700 flex items-center justify-center text-red-500 mb-6 font-serif text-2xl bg-slate-900 group-hover:border-red-500 transition-colors">P</div>
                        <h3 className="font-serif text-2xl mb-2 text-white">Prometheus</h3>
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-6">Almacenamiento Métrico</h4>
                        <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                            Motor de almacenamiento crítico basado en series temporales (TSDB). Introdujo el modelo de datos multidimensional (etiquetas) y el lenguaje PromQL, convirtiéndose en el estándar de la industria.
                        </p>
                        <ul className="text-xs text-slate-500 space-y-3 font-medium uppercase tracking-wide group-hover:text-slate-300 transition-colors">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500"></div>Modelo Pull (Raspado)</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500"></div>Descubrimiento de Servicios</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500"></div>Alta Eficiencia Local</li>
                        </ul>
                    </div>

                    {/* OpenTelemetry */}
                    <div className="p-10 hover:bg-slate-800 transition-colors group">
                        <div className="w-12 h-12 border border-slate-700 flex items-center justify-center text-blue-500 mb-6 font-serif text-2xl bg-slate-900 group-hover:border-blue-500 transition-colors">O</div>
                        <h3 className="font-serif text-2xl mb-2 text-white">OpenTelemetry</h3>
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">El Mensajero Universal</h4>
                        <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                            Marco unificado para la generación y transmisión de telemetría. Desacopla la instrumentación del backend, evitando el "bloqueo del proveedor" y facilitando la correlación de señales.
                        </p>
                        <ul className="text-xs text-slate-500 space-y-3 font-medium uppercase tracking-wide group-hover:text-slate-300 transition-colors">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500"></div>SDKs Estandarizados</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500"></div>Modelo Push</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500"></div>Protocolo OTLP</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Architecture: Push vs Pull */}
        <section id="architecture" className="py-24 bg-blue-950 text-white overflow-hidden relative border-y border-slate-800">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <PushVsPullDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/50 text-blue-200 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-800">
                            <GitMerge size={14}/> Patrones de Arquitectura
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Modelo Push vs. Pull</h2>
                        <p className="text-lg text-blue-100/70 mb-6 leading-relaxed font-light">
                            Una divergencia fundamental. <strong className="text-white">Prometheus</strong> "tira" (pull) de los datos, lo que lo hace robusto para detectar fallos en infraestructura estática. <strong className="text-white">OpenTelemetry</strong> "empuja" (push) los datos, ideal para trabajos efímeros (Lambda) y redes seguras.
                        </p>
                        <div className="p-6 border-l-2 border-blue-400 bg-blue-900/20 backdrop-blur-sm">
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Recomendación Estratégica</h4>
                            <p className="text-blue-200/80 leading-relaxed text-sm">
                                Utilizar OTel para la instrumentación (Push) y exportar a Prometheus para el almacenamiento (compatibilidad Pull), utilizando el OTel Collector como intermediario.
                            </p>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* Challenges: Cardinality */}
        <section id="challenges" className="py-24 bg-slate-950">
            <div className="container mx-auto px-6">
                <SectionHeader 
                    title="Gestión de Alta Cardinalidad" 
                    subtitle="Riesgos Técnicos" 
                    icon={AlertTriangle} 
                />
                
                <div className="max-w-4xl mx-auto mb-12 text-center text-lg text-slate-400 font-light">
                    <p>
                        La causa principal de fallos en implementaciones de Prometheus. Incluir etiquetas como <code className="text-blue-300 bg-slate-800 px-1 rounded">user_id</code> o <code className="text-blue-300 bg-slate-800 px-1 rounded">ip_address</code> puede causar una explosión en el consumo de memoria.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <CardinalityExplosionDiagram />
                </div>
            </div>
        </section>

        {/* Strategy / Impact */}
        <section id="impact" className="py-24 bg-slate-900 border-t border-slate-800">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative h-[500px]">
                    <div className="absolute inset-0 bg-slate-800 border border-slate-700 rounded-sm overflow-hidden">
                        <ServerArchitectureScene />
                        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-slate-400 font-serif italic bg-slate-900/80 backdrop-blur-sm py-2 mx-6 border border-slate-700 rounded-full">Vista abstracta de la Pila de Observabilidad</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center pl-0 md:pl-12">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-blue-500 uppercase">Conclusiones</div>
                    <h2 className="font-serif text-4xl mb-6 text-white">Hacia un Futuro Unificado</h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed font-light">
                        La industria converge hacia un modelo híbrido que aprovecha las fortalezas de cada herramienta mitigando sus debilidades inherentes.
                    </p>
                    
                    <div className="space-y-8">
                        <div className="flex gap-6 group">
                            <div className="w-10 h-10 border border-slate-700 flex items-center justify-center font-serif font-bold text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors rounded-sm">1</div>
                            <div>
                                <h4 className="font-bold text-white mb-2 font-serif text-lg">Estandarizar en OpenTelemetry</h4>
                                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">Desacople su código del proveedor. Utilice SDKs de OTel para toda nueva instrumentación, garantizando neutralidad.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 group">
                            <div className="w-10 h-10 border border-slate-700 flex items-center justify-center font-serif font-bold text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors rounded-sm">2</div>
                            <div>
                                <h4 className="font-bold text-white mb-2 font-serif text-lg">Prometheus como Lengua Franca</h4>
                                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">Asegure que su arquitectura exporte métricas compatibles con PromQL para aprovechar el ecosistema existente.</p>
                            </div>
                        </div>
                         <div className="flex gap-6 group">
                            <div className="w-10 h-10 border border-slate-700 flex items-center justify-center font-serif font-bold text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors rounded-sm">3</div>
                            <div>
                                <h4 className="font-bold text-white mb-2 font-serif text-lg">Grafana como Centro de Mando</h4>
                                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">Construya flujos de trabajo que pivoten entre métricas, logs y trazas, no solo tableros aislados.</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Recommendations / Stats */}
        <section className="py-24 bg-slate-950 border-t border-slate-800">
           <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-slate-800 bg-slate-900">
                    <StatCard label="Adopción de Prometheus" value="Estándar" delay="0s" />
                    <StatCard label="Velocidad CNCF (OTel)" value="#2" delay="0.1s" />
                    <StatCard label="Plugins de Grafana" value="100+" delay="0.2s" />
                    <StatCard label="Tendencia" value="Híbrida" delay="0.3s" />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-black text-slate-500 py-16 border-t-4 border-blue-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
                <div className="text-white font-serif font-bold text-2xl mb-4">Arquitecturas de Observabilidad</div>
                <p className="text-sm leading-relaxed text-slate-600">
                    "El objetivo es proporcionar a los arquitectos de sistemas una hoja de ruta detallada para la transición desde la monitorización aislada hacia una observabilidad full-stack cohesiva y escalable."
                </p>
            </div>
            <div className="flex flex-col gap-4 text-sm font-medium">
                <span className="text-blue-500 uppercase tracking-widest text-xs font-bold mb-2">Recursos</span>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><FileText size={14}/> Informe Completo (PDF)</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Activity size={14}/> Documentación OTel</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Database size={14}/> Prometheus.io</a>
            </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-700">
            <span>&copy; 2025 Análisis Técnico de Ingeniería.</span>
            <span>Basado en el informe "Arquitecturas de Observabilidad Modernas".</span>
        </div>
      </footer>
    </div>
  );
};

export default App;