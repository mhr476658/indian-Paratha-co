import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  FileText,
  Search,
  CheckCircle,
  Clock,
  Send,
  ExternalLink,
  ChevronDown,
  UserCheck,
} from 'lucide-react';

interface FranchiseInquiryRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  model: string;
  notes?: string;
  status?: string;
  timestamp: string;
}

interface FranchiseLeadsTabProps {
  inquiries: FranchiseInquiryRecord[];
  onUpdateLead: (id: string, status: string, notes?: string) => Promise<void>;
  onRefresh: () => void;
  isLoading: boolean;
}

export const FranchiseLeadsTab: React.FC<FranchiseLeadsTabProps> = ({
  inquiries,
  onUpdateLead,
  onRefresh,
  isLoading,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const STATUS_LIST = ['New', 'Contacted', 'Under Review', 'Approved', 'Archived'];

  const filteredInquiries = inquiries.filter((lead) => {
    const leadStatus = lead.status || 'New';
    const matchesStatus = filterStatus === 'ALL' || leadStatus === filterStatus;
    const q = (searchQuery || '').toLowerCase();
    const leadName = (lead.fullName || (lead as any).name || '').toLowerCase();
    const leadCity = (lead.city || (lead as any).highwayStretch || '').toLowerCase();
    const leadEmail = (lead.email || '').toLowerCase();
    const leadId = (lead.id || '').toLowerCase();

    const matchesSearch =
      leadName.includes(q) ||
      leadCity.includes(q) ||
      leadEmail.includes(q) ||
      leadId.includes(q);

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setSavingId(id);
    try {
      await onUpdateLead(id, newStatus);
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    setSavingId(id);
    try {
      await onUpdateLead(id, undefined as any, notesText);
      setEditingNotesId(null);
    } finally {
      setSavingId(null);
    }
  };

  const getStatusBadge = (status?: string) => {
    const s = status || 'New';
    switch (s) {
      case 'New':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Contacted':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Under Review':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-stone-500/20 text-stone-300 border-stone-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xl">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search applicants by name, target city, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#D49B44] focus:ring-1 focus:ring-[#D49B44]/50 transition-all"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['ALL', 'New', 'Contacted', 'Under Review', 'Approved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                filterStatus === status
                  ? 'bg-[#9B1B1E] text-white border-[#DE2428] shadow-lg shadow-[#9B1B1E]/20'
                  : 'bg-black/20 text-stone-300 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Cards */}
      {filteredInquiries.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center text-stone-400 shadow-xl">
          <Building2 className="w-12 h-12 text-stone-500 mx-auto mb-3 opacity-50" />
          <h4 className="text-lg font-bold text-white font-serif">No franchise applications found</h4>
          <p className="text-xs text-stone-400 mt-1">
            Investor inquiries submitted through the website franchise portal will land here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredInquiries.map((lead) => {
            const currentStatus = lead.status || 'New';
            const isEditingNotes = editingNotesId === lead.id;
            const displayName = lead.fullName || (lead as any).name || 'Highway Partner';
            const displayCity = lead.city || (lead as any).highwayStretch || 'Bangalore Corridor';
            const displayModel = lead.model || (lead as any).investmentCapacity || 'HIGHWAY CHALET';
            const displayPhone = lead.phone || '';
            const displayDate = lead.timestamp
              ? new Date(lead.timestamp).toLocaleDateString()
              : new Date().toLocaleDateString();

            return (
              <div
                key={lead.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#D49B44]/50 rounded-2xl p-6 shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  {/* Left: Applicant Name, Model, City */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-white font-serif tracking-tight group-hover:text-[#D49B44] transition-colors">
                        {displayName}
                      </h3>
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-black/40 text-[#D49B44] border border-white/10 backdrop-blur-sm">
                        {lead.id}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-stone-300 mt-2 flex-wrap">
                      <span className="flex items-center gap-1 text-[#D49B44] font-semibold">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{displayModel}</span>
                      </span>
                      <span className="flex items-center gap-1 text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{displayCity}</span>
                      </span>
                      <span className="flex items-center gap-1 text-stone-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{displayDate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions (Status selector, WhatsApp, Email, Phone) */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-stone-400 hidden sm:inline">Status:</span>
                      <select
                        value={currentStatus}
                        disabled={savingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs font-semibold bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D49B44] focus:ring-1 focus:ring-[#D49B44]/50 transition-all cursor-pointer backdrop-blur-md"
                      >
                        {STATUS_LIST.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Direct Call / WhatsApp */}
                    <a
                      href={`https://wa.me/${displayPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                        displayName
                      )},%20this%20is%20Indian%20Paratha%20Company%20Franchise%20Division%20regarding%20your%20inquiry%20for%20${encodeURIComponent(
                        displayCity
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:${lead.email || ''}?subject=Indian Paratha Company Franchise Partnership - ${encodeURIComponent(displayCity)}&body=Dear ${encodeURIComponent(displayName)},%0D%0A%0D%0AThank you for expressing interest in expanding Indian Paratha Company to ${encodeURIComponent(displayCity)}.`}
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors backdrop-blur-md"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D49B44]" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                {/* Contact Details & Investment Notes */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-black/20 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#D49B44]" />
                      <span className="text-stone-300 font-mono">{lead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#D49B44]" />
                      <span className="text-stone-300 font-mono">{lead.email}</span>
                    </div>
                  </div>

                  <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                        Applicant Proposal & Internal Notes
                      </span>
                      {!isEditingNotes && (
                        <button
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setNotesText(lead.notes || '');
                          }}
                          className="text-[11px] text-[#D49B44] hover:underline"
                        >
                          Edit Notes
                        </button>
                      )}
                    </div>

                    {isEditingNotes ? (
                      <div className="space-y-2 mt-1">
                        <textarea
                          rows={2}
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Add internal evaluation comments, site inspection notes..."
                          className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#D49B44] focus:ring-1 focus:ring-[#D49B44]/50 transition-all backdrop-blur-sm"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2.5 py-1 text-stone-400 hover:text-white text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNotes(lead.id)}
                            className="px-3 py-1 bg-[#D49B44] text-[#0B192C] font-bold text-xs rounded-md"
                          >
                            Save Notes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-stone-300 italic">
                        {lead.notes || 'No custom notes provided yet. Click "Edit Notes" to record team feedback.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
