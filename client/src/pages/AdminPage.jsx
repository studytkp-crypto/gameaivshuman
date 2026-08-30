import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Sparkles, RefreshCw } from 'lucide-react';
import { API } from '../services/api';

export function AdminPage() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [category, setCategory] = useState('Animals');
  const [customPrompt, setCustomPrompt] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const loadPairs = async () => {
    setLoading(true);
    try {
      const res = await API.getAdminPairs();
      setPairs(res.pairs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPairs();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setStatusMsg(null);
    try {
      const res = await API.generateAiPair(category, customPrompt);
      setStatusMsg('🎉 Generated matched pair successfully!');
      setCustomPrompt('');
      await loadPairs();
    } catch (err) {
      setStatusMsg(`❌ Error: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this matched pair?')) return;
    try {
      await API.deletePair(id);
      setPairs(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500 text-purple-300 text-xs font-mono font-bold mb-2">
            <ShieldCheck className="w-4 h-4" /> ADMIN CONTROL CENTER
          </div>
          <h1 className="text-3xl font-black font-display text-white">Round & Pair Management</h1>
        </div>
        <button
          onClick={loadPairs}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono flex items-center gap-1.5 border border-white/10"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      {/* Generator Tool Card */}
      <div className="p-6 rounded-2xl glass-panel border border-brand-purple/40 mb-10">
        <div className="flex items-center gap-2 text-sm font-bold text-brand-cyan mb-4">
          <Sparkles className="w-4 h-4" />
          <span>GENERATE NEW MATCHED PAIR WITH GOOGLE GEMINI AI</span>
        </div>

        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Target Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
            >
              <option value="Animals">Animals</option>
              <option value="Portraits">Portraits</option>
              <option value="Food">Food</option>
              <option value="Architecture">Architecture</option>
              <option value="Nature">Nature</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Cyberpunk">Cyberpunk</option>
              <option value="Art">Art</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Custom Prompt Clue (Optional)</label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. A golden retriever playing in grass..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={generating}
              className="w-full py-2.5 rounded-xl gradient-btn font-bold text-white text-xs shadow-lg flex items-center justify-center gap-1.5"
            >
              {generating ? <span>Synthesizing...</span> : <span>⚡ Generate Pair</span>}
            </button>
          </div>
        </form>

        {statusMsg && (
          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white">
            {statusMsg}
          </div>
        )}
      </div>

      {/* Rounds Inventory Table */}
      <div className="rounded-2xl glass-card border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 font-bold text-sm text-white flex justify-between items-center">
          <span>Active Game Rounds ({pairs.length})</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 font-mono text-sm">Loading pairs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/5 font-mono text-slate-400 uppercase">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Image A</th>
                  <th className="px-4 py-3">Image B</th>
                  <th className="px-4 py-3">AI Slot</th>
                  <th className="px-4 py-3">Plays</th>
                  <th className="px-4 py-3">Accuracy</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pairs.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-bold text-white">{p.category}</td>
                    <td className="px-4 py-3">
                      <img src={p.imageAUrl} alt="A" className="w-12 h-9 object-cover rounded border border-white/10" />
                    </td>
                    <td className="px-4 py-3">
                      <img src={p.imageBUrl} alt="B" className="w-12 h-9 object-cover rounded border border-white/10" />
                    </td>
                    <td className="px-4 py-3 font-mono font-black text-brand-cyan">Slot {p.aiSlot}</td>
                    <td className="px-4 py-3 font-mono">{p.playsCount}</td>
                    <td className="px-4 py-3 font-mono text-emerald-400">{p.accuracy}%</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                        title="Delete round"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
