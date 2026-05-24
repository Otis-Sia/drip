'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

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
  },
  {
    name: 'Content & Media',
    files: [
      { id: 'blog', name: 'Blog Posts', description: 'Articles, news, and guides' },
      { id: 'gallery', name: 'Gallery Items', description: 'Photos and videos for site gallery' },
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
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  useEffect(() => {
    fetchData(selectedFile.id);
    fetchCategories();
  }, [selectedFile]);

  // Log out user when the page is closed or refreshed
  useEffect(() => {
    const handleUnload = () => {
      supabase.auth.signOut();
      
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sb-')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

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
    let parsedData: any;
    try {
      parsedData = JSON.parse(rawContent);
    } catch (err) {
      setMessage({ type: 'error', text: 'Invalid JSON format. Please check your syntax.' });
      return;
    }

    const now = new Date().toISOString();
    if (Array.isArray(parsedData)) {
      parsedData = parsedData.map(item => {
        if (item && typeof item === 'object') {
          return { ...item, created_at: item.created_at || now };
        }
        return item;
      });
    } else if (typeof parsedData === 'object' && parsedData !== null) {
      Object.keys(parsedData).forEach(key => {
        if (Array.isArray(parsedData[key])) {
          parsedData[key] = parsedData[key].map((item: any) => {
            if (item && typeof item === 'object') {
              return { ...item, created_at: item.created_at || now };
            }
            return item;
          });
        }
      });
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
          
          <button 
            onClick={handleSignOut}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 text-xs font-bold text-muted hover:text-red-500 transition-colors uppercase tracking-widest border border-border rounded-lg hover:border-red-200 hover:bg-red-50"
          >
            Sign Out
          </button>
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
            <div className="bg-surface rounded-2xl shadow-sm border border-border flex flex-col h-[calc(100vh-8rem)] min-h-[600px]">
              
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
  const [activeTab, setActiveTab] = useState<string | null>(null);

  if (!data) return null;

  // If it's a simple array (like products, branches)
  if (Array.isArray(data)) {
    return <ArrayEditor items={data} onChange={onChange} categories={categories} fileId={fileId} />;
  }

  // If it's an object with multiple arrays (like company, communication)
  const keys = Object.keys(data);
  const currentTab = activeTab && keys.includes(activeTab) ? activeTab : keys[0];

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex border-b border-surface-alt px-4 overflow-x-auto shrink-0 bg-surface">
        {keys.map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
              currentTab === key 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted hover:text-fg hover:border-border'
            }`}
          >
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-hidden bg-surface-alt/20 p-6">
        {currentTab && (
          <div className="h-full bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
            <ArrayEditor 
              items={Array.isArray(data[currentTab]) ? data[currentTab] : [data[currentTab]]} 
              onChange={(newVal) => onChange({ ...data, [currentTab]: newVal })} 
              categories={categories}
              fileId={fileId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ArrayEditor({ items, onChange, categories, fileId, embedded = false }: { items: any[], onChange: (newItems: any[]) => void, categories?: any[], fileId?: string, embedded?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const currentItem = items[selectedIndex];

  const updateField = (field: string, value: any) => {
    const newItems = [...items];
    newItems[selectedIndex] = { ...currentItem, [field]: value };
    onChange(newItems);
  };

  const addItem = () => {
    let newItem: any = {};
    if (items.length > 0) {
      newItem = { ...items[0] };
      // Clear fields
      Object.keys(newItem).forEach(key => {
        if (typeof newItem[key] === 'string') newItem[key] = '';
        if (Array.isArray(newItem[key])) newItem[key] = [];
      });
    } else {
      // Provide default fields based on fileId if items is empty
      if (fileId === 'products') {
        newItem = {
          category: '',
          name: '',
          description: '',
          longDescription: '',
          tags: [],
          features: [],
          specs: [],
          image: '',
          images: [],
          useCases: [],
          size: '',
          length: '',
          colour_or_type: '',
          thickness: '',
          other_specs: ''
        };
      } else if (fileId === 'categories') {
        newItem = { title: '', description: '', image: '' };
      } else if (fileId === 'services') {
        newItem = { title: '', tagline: '', problem: '', approach: '', features: [], outcomes: [], image: '', icon: '' };
      } else if (fileId === 'blog') {
        newItem = { title: '', topic: '', excerpt: '', content: '', image: '', author: '', published_at: '' };
      } else if (fileId === 'teamMembers') {
        newItem = { name: '', role: '', department: '', bio: '', image: '' };
      } else if (fileId === 'gallery') {
        newItem = { title: '', url: '', type: 'image' };
      } else {
        newItem = { name: '' };
      }
    }
    // Always ensure an ID is self-generated
    newItem.id = `new-item-${Date.now()}`;
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

        {/* Search Bar */}
        <div className="p-2 border-b border-border bg-surface">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-alt border border-border rounded-lg text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {fileId === 'products' && (
          <div className="flex overflow-x-auto border-b border-surface-alt bg-surface scrollbar-hide">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === 'All' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-fg'
              }`}
            >
              All
            </button>
            {(() => {
              const uniqueCats = Array.from(new Set(items.map(item => item.category || 'Uncategorized')));
              return uniqueCats.map(catId => {
                const catName = categories?.find(c => c.id === catId)?.title || catId;
                return (
                  <button
                    key={catId}
                    onClick={() => setActiveCategory(catId)}
                    className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                      activeCategory === catId ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-fg'
                    }`}
                  >
                    {catName}
                  </button>
                );
              });
            })()}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {(() => {
            if (fileId === 'products') {
              const groups: Record<string, {item: any, originalIndex: number}[]> = {};
              items.forEach((item, idx) => {
                const cat = item.category || 'Uncategorized';
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push({ item, originalIndex: idx });
              });

              return Object.entries(groups)
                .filter(([catId]) => activeCategory === 'All' || activeCategory === catId)
                .map(([catId, groupItems]) => {
                const catName = categories?.find(c => c.id === catId)?.title || catId;
                
                return (
                  <div key={catId} className="mb-4">
                    {activeCategory === 'All' && (
                      <h4 className="px-2 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">{catName}</h4>
                    )}
                    <div className="space-y-1 mt-1">
                      {groupItems.map(({ item, originalIndex: idx }) => {
                        const searchableText = (item.name || item.title || item.label || '').toLowerCase();
                        if (searchQuery && !searchableText.includes(searchQuery.toLowerCase())) return null;

                        return (
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
                        );
                      })}
                    </div>
                  </div>
                );
              });
            }

            return items.map((item, idx) => {
              const searchableText = (item.name || item.title || item.label || '').toLowerCase();
              if (searchQuery && !searchableText.includes(searchQuery.toLowerCase())) return null;

              return (
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
              );
            });
          })()}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-8 overflow-y-auto bg-white">
        {currentItem ? (
          <div className="max-w-2xl space-y-6">
            {Object.entries({
              ...currentItem,
              ...(fileId === 'blog' && !('topic' in currentItem) ? { topic: currentItem.topic || '' } : {}),
              ...(fileId === 'products' ? { specs: Array.isArray(currentItem.specs) ? currentItem.specs : [] } : {})
            }).map(([key, value]) => {
              if (key === 'id') return null;
              
              const isImageField = (typeof value === 'string' || value == null) && (
                key.toLowerCase().includes('image') ||
                key.toLowerCase().includes('photo') ||
                key.toLowerCase().includes('avatar') ||
                key.toLowerCase() === 'logo' ||
                (key === 'url' && currentItem?.type === 'image') ||
                (typeof value === 'string' && /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i.test(value))
              );

              return (
              <div key={key} className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                
                {Array.isArray(value) ? (
                  key === 'specs' && fileId === 'products' ? (
                    <div className="space-y-4">
                      {value.map((spec: any, sIdx: number) => {
                        // Handle case where old data might be just strings
                        const isObject = typeof spec === 'object' && spec !== null;
                        const name = isObject ? spec.name || '' : spec;
                        const options = isObject && Array.isArray(spec.options) ? spec.options : [];
                        
                        return (
                          <div key={sIdx} className="p-4 border border-border rounded-xl space-y-3 bg-surface-alt/50">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                list="spec-names-list"
                                placeholder="Property Name (e.g. Size, Length)"
                                value={name}
                                onChange={(e) => {
                                  const newSpecs = [...value];
                                  newSpecs[sIdx] = { name: e.target.value, options };
                                  updateField(key, newSpecs);
                                }}
                                className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                              />
                              <datalist id="spec-names-list">
                                <option value="Size" />
                                <option value="Length" />
                                <option value="Width" />
                                <option value="Height" />
                                <option value="Colour or Type" />
                                <option value="Thickness" />
                                <option value="Other Specs" />
                              </datalist>
                              <button 
                                onClick={() => {
                                  const newSpecs = [...value];
                                  newSpecs.splice(sIdx, 1);
                                  updateField(key, newSpecs);
                                }} 
                                className="p-2 text-red-500 hover:text-red-600 bg-red-50 rounded-lg transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                            <div className="space-y-2 pl-3 border-l-2 border-primary/20">
                              {options.map((opt: string, oIdx: number) => (
                                <div key={oIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder="Option value (e.g. Small, 2m)"
                                    value={opt}
                                    onChange={(e) => {
                                      const newSpecs = [...value];
                                      const newOptions = [...options];
                                      newOptions[oIdx] = e.target.value;
                                      newSpecs[sIdx] = { name, options: newOptions };
                                      updateField(key, newSpecs);
                                    }}
                                    className="flex-1 px-3 py-1.5 bg-surface border border-border rounded-lg text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                                  />
                                  <button 
                                    onClick={() => {
                                      const newSpecs = [...value];
                                      const newOptions = [...options];
                                      newOptions.splice(oIdx, 1);
                                      newSpecs[sIdx] = { name, options: newOptions };
                                      updateField(key, newSpecs);
                                    }} 
                                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                  </button>
                                </div>
                              ))}
                              <button 
                                onClick={() => {
                                  const newSpecs = [...value];
                                  newSpecs[sIdx] = { name, options: [...options, ''] };
                                  updateField(key, newSpecs);
                                }} 
                                className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
                              >
                                + Add Option
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button 
                        onClick={() => updateField(key, [...value, { name: '', options: [''] }])}
                        className="w-full py-3 border border-dashed border-primary/30 rounded-xl text-xs font-bold text-primary hover:bg-primary/5 transition-colors uppercase tracking-wider"
                      >
                        + Add New Property (Size, Length, etc.)
                      </button>
                    </div>
                  ) : (
                  <div className="space-y-2">
                    {value.map((val, vIdx) => {
                      const isArrImageField = (typeof val === 'string' || val == null) && (
                        key.toLowerCase().includes('image') ||
                        key.toLowerCase().includes('photo') ||
                        key.toLowerCase().includes('avatar') ||
                        key.toLowerCase() === 'gallery' ||
                        (typeof val === 'string' && /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i.test(val))
                      );
                      return (
                      <div key={vIdx} className="space-y-2">
                        <div className="flex gap-2">
                        <input
                          type="text"
                          value={val ?? ''}
                          onChange={(e) => {
                            const newArr = [...value];
                            newArr[vIdx] = e.target.value;
                            updateField(key, newArr);
                          }}
                          className="flex-1 px-4 py-2.5 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        />
                        {isArrImageField && (
                          <ImageUploadButton onUpload={(url) => {
                            const newArr = [...value];
                            newArr[vIdx] = url;
                            updateField(key, newArr);
                          }} />
                        )}
                        <button 
                            onClick={() => updateField(key, value.filter((_, i) => i !== vIdx))}
                            className="p-2.5 text-gray-300 hover:text-red-500 transition-colors bg-surface-alt border border-border rounded-xl flex items-center justify-center shrink-0"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                        {isArrImageField && val && <ImagePreview src={val} />}
                      </div>
                    ); })}
                    <button 
                      onClick={() => updateField(key, [...value, ''])}
                      className="text-xs font-bold text-primary hover:underline px-1"
                    >
                      + Add Item
                    </button>
                  </div>
                  )
                ) : key === 'category' && fileId === 'products' ? (
                  <>
                    <input
                      list="categories-list"
                      value={value as string || ''}
                      onChange={(e) => updateField(key, e.target.value)}
                      placeholder="Select or type a category"
                      className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                    <datalist id="categories-list">
                      {Array.isArray(categories) && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                      ))}
                    </datalist>
                  </>
                ) : key === 'topic' && fileId === 'blog' ? (
                  <>
                    <input
                      list="topics-list"
                      value={value as string}
                      onChange={(e) => updateField(key, e.target.value)}
                      placeholder="Select or type a topic"
                      className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                    <datalist id="topics-list">
                      <option value="Irrigation" />
                      <option value="Greenhouse" />
                      <option value="Agronomy" />
                      <option value="Farming" />
                      <option value="General" />
                    </datalist>
                  </>
                ) : key.toLowerCase().includes('date') || key === 'published_at' ? (
                  <input
                    type="date"
                    value={(value as string) ?? ''}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  />
                ) : key === 'type' && fileId === 'gallery' ? (
                  <>
                    <input
                      list="gallery-type-list"
                      value={value as string}
                      onChange={(e) => updateField(key, e.target.value)}
                      placeholder="Select or type type"
                      className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                    <datalist id="gallery-type-list">
                      <option value="image" />
                      <option value="video" />
                    </datalist>
                  </>
                ) : key === 'content' || key === 'excerpt' || key === 'description' || key === 'bio' || key === 'caption' ? (
                  <textarea
                    value={(value as string) ?? ''}
                    onChange={(e) => updateField(key, e.target.value)}
                    rows={key === 'content' ? 10 : 4}
                    className="w-full px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none resize-y"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type={typeof value === 'number' ? 'number' : 'text'}
                        value={(value as string) ?? ''}
                        onChange={(e) => updateField(key, e.target.value)}
                        className="flex-1 px-4 py-3 bg-surface-alt border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      />
                      {isImageField && (
                        <ImageUploadButton onUpload={(url) => updateField(key, url)} />
                      )}
                    </div>
                    {isImageField && value && <ImagePreview src={value as string} />}
                  </div>
                )}
              </div>
            ); })}
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

function ImagePreview({ src }: { src: string }) {
  const [info, setInfo] = useState<{ width: number, height: number, type: string } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setInfo(null);
      setError(false);
      return;
    }
    
    setError(false);
    const img = new window.Image();
    img.onload = () => {
      let type = 'UNKNOWN';
      const match = src.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
      if (match) {
        type = match[1].toUpperCase();
      } else if (src.startsWith('data:image/')) {
        type = src.split(';')[0].split('/')[1].toUpperCase();
      } else {
        type = 'IMAGE';
      }
      
      setInfo({
        width: img.naturalWidth,
        height: img.naturalHeight,
        type
      });
    };
    img.onerror = () => {
      setError(true);
    };
    img.src = src;
  }, [src]);

  if (!src) return null;

  return (
    <div className="mt-2 flex gap-4 p-3 bg-surface border border-border rounded-xl">
      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {!error ? (
          <img src={src} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase">Invalid</div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        {info ? (
          <>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider">TYPE: {info.type}</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-wider mt-1">DIMENSIONS: {info.width} × {info.height}</span>
          </>
        ) : !error ? (
          <span className="text-[10px] font-bold text-gray-400 tracking-wider">LOADING INFO...</span>
        ) : (
          <span className="text-[10px] font-bold text-red-400 tracking-wider">CANNOT LOAD IMAGE</span>
        )}
      </div>
    </div>
  );
}

function ImageUploadButton({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('afrodrip_assets')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('afrodrip_assets')
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }

  return (
    <div className="relative inline-flex items-center shrink-0 h-full">
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        title="Upload Image"
      />
      <button
        type="button"
        disabled={uploading}
        className="px-4 h-full bg-surface-alt border border-border rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition-colors disabled:opacity-50 whitespace-nowrap flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full" />
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Upload
          </>
        )}
      </button>
    </div>
  );
}
