import React, { useState } from 'react';
import {
  Settings,
  Power,
  Clock,
  Radio,
  Phone,
  Save,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Flame,
  Shield,
} from 'lucide-react';

interface StoreSettings {
  isStoreOpen: boolean;
  prepTimeMinutes: number;
  activeHighwayCorridor: string;
  serviceAlert: string;
  contactHotline: string;
}

interface OperationsTabProps {
  settings: StoreSettings;
  onUpdateSettings: (newSettings: Partial<StoreSettings>) => Promise<void>;
  isLoading: boolean;
}

export const OperationsTab: React.FC<OperationsTabProps> = ({
  settings,
  onUpdateSettings,
  isLoading,
}) => {
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);

    try {
      await onUpdateSettings(formData);
      setSuccessMessage('Station operational settings updated successfully.');
      setTimeout(() => setSuccessMessage(null), 3500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Status banner feedback */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Switch: Store Open / Accepting Highway Orders */}
      <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D49B44] mb-1">
              <Power className="w-4 h-4" />
              <span>Station Master Power</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Highway Kitchen Status
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {formData.isStoreOpen
                ? 'Store is OPEN. Taking highway pre-orders & express takeaway.'
                : 'Store is PAUSED. Online orders paused temporarily for rush or restock.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, isStoreOpen: !prev.isStoreOpen }))}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg border ${
              formData.isStoreOpen
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                : 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{formData.isStoreOpen ? 'STORE IS LIVE' : 'STORE PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Preparation Time Slider */}
      <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#D49B44]" />
            <h4 className="font-serif text-lg font-bold text-white">
              Estimated Kitchen Preparation Time
            </h4>
          </div>
          <span className="font-mono text-xl font-bold text-[#D49B44] bg-[#0D1B2A] px-3 py-1 rounded-xl border border-[#D49B44]/30">
            {formData.prepTimeMinutes} Mins
          </span>
        </div>

        <p className="text-xs text-stone-300">
          Displayed dynamically on customer cart and highway takeaway confirmation tokens.
        </p>

        <div className="flex items-center gap-3">
          {[12, 15, 18, 22, 30].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, prepTimeMinutes: mins }))}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                formData.prepTimeMinutes === mins
                  ? 'bg-[#9B1B1E] text-white border-[#DE2428]'
                  : 'bg-[#0D1B2A] text-stone-300 hover:text-white border-[#1E3A5F]'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
      </div>

      {/* Broadcast Highway Alert Message */}
      <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#DE2428]" />
          <h4 className="font-serif text-lg font-bold text-white">
            Highway Broadcast Announcement
          </h4>
        </div>
        <p className="text-xs text-stone-300">
          This message is broadcast to customers during checkout and atop the website notice board.
        </p>

        <textarea
          rows={2}
          value={formData.serviceAlert}
          onChange={(e) => setFormData((prev) => ({ ...prev, serviceAlert: e.target.value }))}
          className="w-full p-3 bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-[#D49B44]"
          placeholder="e.g. NH7 corridor dining open 24/7. Drive safe! Special winter makhan batch live today."
        />
      </div>

      {/* Highway Location Corridor & Hotline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D49B44]" />
            <h5 className="font-serif font-bold text-white text-sm">Station Corridor</h5>
          </div>
          <input
            type="text"
            value={formData.activeHighwayCorridor}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, activeHighwayCorridor: e.target.value }))
            }
            className="w-full p-2.5 bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl text-white text-xs focus:outline-none focus:border-[#D49B44]"
          />
        </div>

        <div className="bg-[#112338] border border-[#1E3A5F] rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D49B44]" />
            <h5 className="font-serif font-bold text-white text-sm">Customer Helpdesk Hotline</h5>
          </div>
          <input
            type="text"
            value={formData.contactHotline}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contactHotline: e.target.value }))
            }
            className="w-full p-2.5 bg-[#0D1B2A] border border-[#1E3A5F] rounded-xl text-white text-xs focus:outline-none focus:border-[#D49B44]"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3.5 bg-gradient-to-r from-[#9B1B1E] to-[#BA2024] hover:from-[#801416] hover:to-[#9B1B1E] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center gap-2 border border-[#DE2428]/40 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Operational Settings</span>
        </button>
      </div>
    </form>
  );
};
