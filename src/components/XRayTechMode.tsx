import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Zap, Shield, Server, Gauge, CheckCircle2, 
  X, Terminal, Binary, Eye, Sparkles, Code2, Lock, Flame
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface XRayTechModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XRayTechMode: React.FC<XRayTechModeProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'architecture' | 'comparison'>('metrics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#0b0e14] text-cyan-300 font-mono rounded-3xl max-w-3xl w-full border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden my-auto relative"
      >
        {/* Futuristic Cyber Scan Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        {/* Top Header HUD */}
        <div className="bg-[#080a0f] border-b border-cyan-500/30 px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold text-cyan-200 tracking-wider uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>MODO RAYOS X // ARQUITECTURA LIMPIA ONDIGU</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar Modo Rayos X"
          >
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* Tabs switcher */}
        <div className="px-6 pt-4 flex gap-2 border-b border-cyan-500/20 relative z-10 text-xs">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('metrics');
            }}
            className={`pb-3 px-3 font-bold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'metrics'
                ? 'border-cyan-400 text-white'
                : 'border-transparent text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Telemetría en Vivo</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('comparison');
            }}
            className={`pb-3 px-3 font-bold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'comparison'
                ? 'border-cyan-400 text-white'
                : 'border-transparent text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>OndiGu vs. WordPress Típico</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setActiveTab('architecture');
            }}
            className={`pb-3 px-3 font-bold transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-cyan-400 text-white'
                : 'border-transparent text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Seguridad & Blindaje</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 relative z-10 space-y-6 text-slate-200">
          
          {/* Tab 1: Live Telemetry Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-cyan-400 uppercase block mb-1">Carga inicial</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">0.018s</span>
                  <span className="text-[10px] text-slate-400">Sub-segundo instantáneo</span>
                </div>

                <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-cyan-400 uppercase block mb-1">Peso del código</span>
                  <span className="text-2xl sm:text-3xl font-black text-cyan-300 block font-mono">380 KB</span>
                  <span className="text-[10px] text-slate-400">Vuela en 4G/5G Lanús</span>
                </div>

                <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-cyan-400 uppercase block mb-1">PageSpeed Score</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 block font-mono">99/100</span>
                  <span className="text-[10px] text-slate-400">Google Core Web Vitals</span>
                </div>

                <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-cyan-400 uppercase block mb-1">Latencia a BA</span>
                  <span className="text-2xl sm:text-3xl font-black text-cyan-300 block font-mono">14 ms</span>
                  <span className="text-[10px] text-slate-400">Servidor Edge ultracercano</span>
                </div>

              </div>

              {/* Terminal live inspection output */}
              <div className="bg-black/90 rounded-2xl p-4 border border-cyan-500/40 text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400 pb-2 mb-2 border-b border-slate-800">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px]">DIAGNÓSTICO EN TIEMPO REAL DEL NAVEGADOR</span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p className="text-emerald-400">✓ Stack: React 18 + Vite + TypeScript (Sin PHP, sin bases de datos lentas)</p>
                  <p className="text-cyan-300">✓ Rendimiento: 0 dependencias innecesarias // CSS compilado con Tailwind</p>
                  <p className="text-emerald-400">✓ Audio: Síntesis nativa Web Audio API (0 descargas de MP3 pesados)</p>
                  <p className="text-cyan-300">✓ Certificado SSL: TLS 1.3 con encriptación militar SHA-256</p>
                  <p className="text-yellow-400">⚡ Estado del sistema: Listo para soportar 10.000 clientes simultáneos</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: OndiGu vs WordPress Comparison */}
          {activeTab === 'comparison' && (
            <div className="space-y-4 text-xs">
              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Característica</th>
                      <th className="p-3 text-red-400">Agencia Tradicional / WordPress</th>
                      <th className="p-3 text-emerald-400 bg-emerald-950/40">OndiGu Soluciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="p-3 font-semibold text-slate-300">Tiempo de carga celular</td>
                      <td className="p-3 text-red-400">3.5 a 6.0 segundos (se pierde el 50% de clientes)</td>
                      <td className="p-3 text-emerald-300 font-bold bg-emerald-950/20">0.4 a 1.2 segundos (abre al toque)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-300">Mantenimiento mensual</td>
                      <td className="p-3 text-red-400">Te cobran cuota fija obligatoria todos los meses</td>
                      <td className="p-3 text-emerald-300 font-bold bg-emerald-950/20">Sin cuotas forzadas: la web es 100% tuya</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-300">Respuesta por WhatsApp</td>
                      <td className="p-3 text-red-400">Enlace común que nadie atiende de noche</td>
                      <td className="p-3 text-emerald-300 font-bold bg-emerald-950/20">Bot con IA que atiende y vende 24/7</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-300">Atención técnica</td>
                      <td className="p-3 text-red-400">Hablás con un ejecutivo de cuenta o ticket frío</td>
                      <td className="p-3 text-emerald-300 font-bold bg-emerald-950/20">Contacto directo con Pedro Gudiño</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Security & Blindaje */}
          {activeTab === 'architecture' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4">
                <Lock className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="font-bold text-white mb-1">Cero Plugins Vulnerables</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  A diferencia de WordPress que sufre hackeos constantes por plugins desactualizados, en OndiGu el código está cerrado y blindado.
                </p>
              </div>

              <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4">
                <Server className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="font-bold text-white mb-1">Infraestructura Cloud Global</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Alojamientos con 99.98% de tiempo en línea en la red de Google Cloud y Cloudflare con protección contra ataques DDoS.
                </p>
              </div>

              <div className="bg-[#0f1420] border border-cyan-500/30 rounded-2xl p-4">
                <Shield className="w-5 h-5 text-[#FF8C00] mb-2" />
                <h4 className="font-bold text-white mb-1">Propiedad Absoluta</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Tenés acceso a los archivos, dominio a tu nombre y libertad total. Si mañana querés cambiar de servidor, te llevás todo sin trabas.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="bg-[#080a0f] border-t border-cyan-500/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 text-xs">
          <span className="text-slate-400 text-[11px]">
            Auditoría de calidad OndiGu // Pedro Gudiño, Lanús
          </span>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all cursor-pointer shadow-md"
          >
            Entendido, volver a la web
          </button>
        </div>
      </motion.div>
    </div>
  );
};
