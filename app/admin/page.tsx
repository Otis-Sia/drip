'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LIBRARY_GROUPS = [
  {
    name: 'Shop & Products',
    files: [
      { id: 'products', name: 'Products', description: 'Main product catalog' },
      { id: 'categories', name: 'Product Categories', description: 'Product categories and metadata' },
    ]
  },
  {
    name: 'Services',
    files: [
      { id: 'services', name: 'Services', description: 'Detailed service offerings' },
      { id: 'serviceSummaries', name: 'Service Summaries', description: 'Short service descriptions for homepage' },
    ]
  },
  {
    name: 'Communication Hub',
    files: [
      { id: 'calendar', name: 'Calendar', description: 'Scheduled events and webinars' },
      { id: 'alerts', name: 'Alerts & Updates', description: 'Emergency alerts and news items' },
      { id: 'resources', name: 'Quick Resources', description: 'Useful links and portal access' },
    ]
  },
  {
    name: 'Company',
    files: [
      { id: 'branches', name: 'Branches', description: 'Company branch locations' },
      { id: 'company', name: 'Company Info', description: 'About us, stats, and values' },
      { id: 'teamMembers', name: 'Team Members', description: 'Manage leadership and staff' },
    ]
  }
];

const ALL_FILES = LIBRARY_GROUPS.flatMap(g => g.files);

export default function AdminPage() {
  const [selectedFile, setSelectedFile] = useState(ALL_FILES[0]);
  const [rawContent, setRawContent] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'code' | 'gui'>('gui');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    fetchData(selectedFile.id);
    fetchCategories();
  }, [selectedFile]);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/data?file=categories');
      if (res.ok) {
        const json = await res.json();
        setCategories(json);
      }
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  }

  async function fetchData(fileId: string) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/data?file=${fileId}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      setRawContent(JSON.stringify(json, null, 2));
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load data.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setMessage(null);
    let parsedData;
    try {
      parsedData = JSON.parse(rawContent);
    } catch (err) {
      setMessage({ type: 'error', text: 'Invalid JSON format. Please check your syntax.' });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/data?file=${selectedFile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });
      if (!res.ok) throw new Error('Failed to save data');
      setMessage({ type: 'success', text: 'Data saved successfully!' });
      setRawContent(JSON.stringify(parsedData, null, 2)); // Re-format
      
      // If we saved categories, refresh them
      if (selectedFile.id === 'categories') {
        fetchCategories();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save data.' });
    } finally {
      setSaving(false);
    }
  }

  const updateGuiData = (newData: any) => {
    setRawContent(JSON.stringify(newData, null, 2));
  };

  return (
    <div className="min-h-screen bg-bg pb-12 font-sans">
      {/* Admin Header */}
      <div className="bg-surface border-b border-border py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 relative">
          <Image 
            src="/afrodrip.svg" 
            alt="Afrodrip Logo" 
            width={180} 
            height={50} 
            className="h-10 w-auto"
            priority
          />
          <div className="h-px w-12 bg-border" />
          <h2 className="text-xl font-black text-fg tracking-tight uppercase">Admin Page</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden sticky top-24">
              <div className="p-6 border-b border-surface-alt">
                <h2 className="text-lg font-bold text-fg">Libraries</h2>
                <p className="text-xs text-muted mt-1">Select a file to edit</p>
              </div>
              <nav className="p-3 space-y-6">
                {LIBRARY_GROUPS.map((group) => (
                  <div key={group.name} className="space-y-1">
                    <h3 className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      {group.name}
                    </h3>
                    <div className="space-y-1">
                      {group.files.map((file) => (
                        <button
                          key={file.id}
                          onClick={() => setSelectedFile(file)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            selectedFile.id === file.id
                              ? 'bg-primary text-white shadow-lg shadow-primary/20'
                              : 'text-muted hover:bg-surface-alt hover:text-fg'
                          }`}
                        >
                          {file.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-surface rounded-2xl shadow-sm border border-border flex flex-col min-h-[700px]">
              
              {/* Header */}
              <div className="p-6 border-b border-surface-alt flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-fg">{selectedFile.name}</h1>
                  <p className="text-sm text-muted">{selectedFile.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Mode Toggle */}
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <div className="px-4 py-1.5 bg-white text-gray-900 shadow-sm rounded-lg text-xs font-bold">
                      GUI EDITOR
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="btn-primary flex items-center gap-2 !py-2 !px-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" />
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {message && (
                <div className={`px-6 py-3 border-b text-sm font-medium ${
                  message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 relative overflow-hidden">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <p className="text-sm text-muted font-medium">Loading data...</p>
                    </div>
                  </div>
                ) : null}

                {viewMode === 'code' ? (
                  <div className="h-[600px] p-4">
                    <textarea
                      value={rawContent}
                      onChange={(e) => setRawContent(e.target.value)}
                      className="w-full h-full font-mono text-sm p-6 bg-gray-900 text-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none resize-none selection:bg-primary/30"
                      spellCheck={false}
                    />
                  </div>
                ) : (() => {
                  try {
                    const parsed = rawContent ? JSON.parse(rawContent) : null;
                    return (
                      <GuiEditor 
                        data={parsed} 
                        onChange={updateGuiData} 
                        categories={categories}
                        fileId={selectedFile.id}
                      />
                    );
                  } catch (e) {
                    return (
                      <div className="h-[600px] flex items-center justify-center p-8 text-center">
                        <div className="max-w-md space-y-4">
                          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
                            Cannot open GUI: The JSON code has syntax errors. Please fix it in CODE mode first.
                          </div>
                          <button 
                            onClick={() => setViewMode('code')}
                            className="text-sm font-bold text-primary hover:underline"
                          >
                            Switch to CODE mode
                          </button>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>

              {/* Footer / Tip */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p>Tip: Changes are saved directly to the Supabase database.</p>
                <div className="flex items-center gap-2 text-primary font-bold">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Live Database Sync
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function GuiEditor({ data, onChange, categories, fileId }: { data: any, onChange: (newData: any) => void, categories?: any[], fileId?: string }) {
  if (!data) return null;

  // If it's a simple array (like products, branches)
  if (Array.isArray(data)) {
    return <ArrayEditor items={data} onChange={onChange} categories={categories} fileId={fileId} />;
  }

  // If it's an object with multiple arrays (like company, communication)
  return (
    <div className="p-6 space-y-12 h-[600px] overflow-y-auto">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">{key.replace(/([A-Z])/g, ' $1')}</h3>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <ArrayEditor 
              items={Array.isArray(value) ? value : [value]} 
              onChange={(newVal) => onChange({ ...data, [key]: newVal })} 
              categories={categories}
              fileId={fileId}
              embedded
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ArrayEditor({ items, onChange, categories, fileId, embedded = false }: { items: any[], onChange: (newItems: any[]) => void, categories?: any[], fileId?: string, embedded?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentItem = items[selectedIndex];

  const updateField = (field: string, value: any) => {
    const newItems = [...items];
    newItems[selectedIndex] = { ...currentItem, [field]: value };
    onChange(newItems);
  };

  const addItem = () => {
    const newItem = items.length > 0 ? { ...items[0] } : {};
    // Clear fields
    Object.keys(newItem).forEach(key => {
      if (typeof newItem[key] === 'string') newItem[key] = '';
      if (Array.isArray(newItem[key])) newItem[key] = [];
    });
    if (newItem.id) newItem.id = `new-item-${Date.now()}`;
    onChange([...items, newItem]);
    setSelectedIndex(items.length);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    setSelectedIndex(Math.max(0, index - 1));
  };

  return (
    <div className={`flex flex-col md:flex-row h-full ${embedded ? '' : 'min-h-[600px]'}`}>
      {/* List */}
      <div className={`w-full md:w-64 border-r border-surface-alt flex flex-col bg-surface-alt/50 ${embedded ? 'max-h-48 md:max-h-none' : ''}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold text-muted uppercase">{items.length} Items</span>
          <button onClick={addItem} className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {items.map((item, idx) => (
            <div key={idx} className="group relative">
              <button
                onClick={() => setSelectedIndex(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition-all truncate pr-10 ${
                  selectedIndex === idx ? 'bg-surface text-primary shadow-sm ring-1 ring-border' : 'text-muted hover:bg-surface/50'
                }`}
              >
                {item.name || item.title || item.label || `Item ${idx + 1}`}
              </button>
              {items.length > 1 && (
                <button 
                  onClick={() => removeItem(idx)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-8 overflow-y-auto bg-white">
        {currentItem ? (
          <div className="max-w-2xl space-y-6">
            {Object.entries(currentItem).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                
                {Array.isArray(value) ? (
                  <div className="space-y-2">
                    {value.map((val, vIdx) => (
                      <div key={vIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => {
                            const newArr = [...value];
                            newArr[vIdx] = e.target.value;
                            updateField(key, newArr);
                          }}
                          className="flex-1 px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        />
                        <button 
                          onClick={() => updateField(key, value.filter((_, i) => i !== vIdx))}
                          className="p-2.5 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => updateField(key, [...value, ''])}
                      className="text-xs font-bold text-primary hover:underline px-1"
                    >
                      + Add Item
                    </button>
                  </div>
                ) : key === 'category' && fileId === 'products' ? (
                  <select
                    value={value as string}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none appearance-none"
                  >
                    <option value="">Select Category</option>
                    {Array.isArray(categories) && categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                ) : key.toLowerCase().includes('date') ? (
                  <input
                    type="date"
                    value={value as string}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  />
                ) : (
                  <input
                    type={typeof value === 'number' ? 'number' : 'text'}
                    value={value as string}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Select an item to edit
          </div>
        )}
      </div>
    </div>
  );
}
