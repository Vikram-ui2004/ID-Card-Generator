import React from 'react'

export default function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {templates.map(t => (
        <button
          key={t.id}
          onClick={() => onSelectTemplate(t)}
          className={`flex items-center gap-3 p-2 rounded border ${selectedTemplate.id === t.id ? 'border-primary bg-slate-50' : 'border-slate-100'}`}
        >
          <img src={t.src} alt={t.name} className="h-12 w-20 object-cover rounded" />
          <div className="text-left">
            <div className="text-sm font-medium">{t.name}</div>
            <div className="text-xs text-slate-500">{t.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
