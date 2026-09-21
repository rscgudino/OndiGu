import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { X, Printer, Download, Share2, ShieldCheck, CheckCircle2, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { useCurrency } from '../context/CurrencyContext';

interface OfficialQuotePdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseOption: {
    name: string;
    description: string;
    deliveryDays: string;
    basePrice: number;
  };
  selectedAddons: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    extraDays: number;
  }>;
  totalEstimate: number;
}

export const OfficialQuotePdfModal: React.FC<OfficialQuotePdfModalProps> = ({
  isOpen,
  onClose,
  baseOption,
  selectedAddons,
  totalEstimate,
}) => {
  const { currency, formatPrice, convertToUsd } = useCurrency();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const quoteNumber = `OG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const today = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const validUntil = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const handlePrintOrPdf = () => {
    soundFx.playClick();
    window.print();
  };

  const handleShareWhatsApp = () => {
    soundFx.playSuccess();
    const addonsList = selectedAddons.map((a) => `- ${a.name} (${formatPrice(a.price)})`).join('\n');
    const msg = `*PRESUPUESTO FORMAL ONDIGU (${quoteNumber})*
*Cliente:* Presupuesto Web Solicitado
*Fecha:* ${today}
*Validez:* 15 días corridos

*Solución Principal:*
${baseOption.name} - ${formatPrice(baseOption.basePrice)}
*Plazo:* ${baseOption.deliveryDays}

*Módulos Adicionales:*
${addonsList || 'Ninguno'}

*TOTAL ESTIMADO:* ${formatPrice(totalEstimate)} (${currency})
*Formas de pago:* Transferencia bancaria (alias), Mercado Pago, Tarjetas, USDT.

Hola Pedro, quiero confirmar este presupuesto oficial generado en tu web.`;

    const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto"
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Documento Oficial // OndiGu Soluciones
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintOrPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
              title="Imprimir o Guardar en PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Content */}
        <div ref={printRef} className="p-6 sm:p-10 bg-white text-slate-800 font-sans print:p-0">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-slate-900 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-black tracking-tight text-slate-950">
                  Ondi<span className="text-[#FF4500]">Gu</span>
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-orange-100 text-[#FF4500] rounded font-bold">
                  Oficial
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Tecnología con onda // La señal de Gudiño</p>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
                Lanús, Gran Buenos Aires, Argentina
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono text-slate-400 uppercase block">Presupuesto Formal Nº</span>
              <span className="text-base font-mono font-black text-slate-900 block">{quoteNumber}</span>
              <p className="text-xs text-slate-500 mt-1">Fecha de emisión: <strong>{today}</strong></p>
              <p className="text-xs text-emerald-700 font-medium">Validez comercial: 15 días ({validUntil})</p>
            </div>
          </div>

          {/* Client & Project Overview */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
            <h4 className="text-xs font-mono uppercase text-slate-500 mb-2 font-bold tracking-wider">
              Detalle del Servicio Solicitado
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-base font-bold text-slate-900">{baseOption.name}</p>
                <p className="text-xs text-slate-600 mt-0.5">{baseOption.description}</p>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="text-xs font-mono text-slate-500 block">Tiempo de entrega:</span>
                <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
                  {baseOption.deliveryDays}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase text-slate-500 mb-2 font-bold tracking-wider">
              Desglose de Ítems & Módulos
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Concepto / Módulo</th>
                    <th className="py-2.5 px-3 text-center">Plazo</th>
                    <th className="py-2.5 px-3 text-right">Inversión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-slate-900">{baseOption.name}</strong>
                      <span className="block text-[11px] text-slate-500">Estructura base llave en mano</span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-600 font-mono">{baseOption.deliveryDays}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      {formatPrice(baseOption.basePrice)}
                    </td>
                  </tr>

                  {selectedAddons.map((addon) => (
                    <tr key={addon.id}>
                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {addon.name}
                        </span>
                        <span className="block text-[11px] text-slate-500 pl-5">{addon.description}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-600 font-mono">+{addon.extraDays}d</td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">
                        {formatPrice(addon.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Section */}
          <div className="bg-slate-950 text-white rounded-2xl p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#FF8C00] uppercase font-bold tracking-wider block">
                  Total Final Presupuestado
                </span>
                <span className="text-xs text-slate-400">
                  Incluye desarrollo, pruebas, puesta en marcha y garantía OndiGu.
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-3xl font-black text-white font-mono block">
                  {formatPrice(totalEstimate)}
                </span>
                <span className="text-[11px] font-mono text-slate-400 block">
                  {currency === 'ARS'
                    ? `Equivalente aprox: u$s ${convertToUsd(totalEstimate)} USD`
                    : `Equivalente aprox: $${totalEstimate.toLocaleString('es-AR')} ARS`}
                </span>
              </div>
            </div>
          </div>

          {/* Payment terms & Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 pt-2 border-t border-slate-200 mb-6">
            <div>
              <strong className="text-slate-900 block mb-1">Medios de Pago Habilitados:</strong>
              <p>• Transferencia bancaria directa (CBU/CVU sin comisiones)</p>
              <p>• Mercado Pago (Dinero en cuenta o QR)</p>
              <p>• Tarjetas de crédito / débito en cuotas</p>
              <p>• Criptomonedas estables (USDT / USDC vía Binance)</p>
            </div>
            <div>
              <strong className="text-slate-900 block mb-1">Garantía y Compromiso:</strong>
              <p>• 100% de acompañamiento directo con Pedro Gudiño.</p>
              <p>• Soporte post-entrega y garantía de funcionamiento.</p>
              <p>• Código limpio, veloz y sin costos ocultos mensuales.</p>
            </div>
          </div>

          {/* Signature block */}
          <div className="pt-4 border-t border-dashed border-slate-300 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-slate-900">Pedro Gudiño</p>
              <p className="text-slate-500">Fundador & Desarrollador Principal // OndiGu</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-full border border-emerald-300">
                ✓ EMISIÓN CERTIFICADA
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions (Hidden on print) */}
        <div className="bg-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cerrar vista previa
          </button>
          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintOrPdf}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Confirmar por WhatsApp</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
