import React, { useState } from 'react'
import TemplateSelector from './TemplateSelector'

export default function Sidebar({
  templates,
  selectedTemplate,
  onSelectTemplate,
  fields,
  updateField,
  portrait,
  updatePortrait,
  sampleFonts,
  backgroundColor,
  setBackgroundColor,
  setCardSize
}) {

  const [activeFieldKey, setActiveFieldKey] = useState('name')

  const onChangeSize = (w, h) => {
    setCardSize({ w: Number(w), h: Number(h) })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-slate-700">Templates</h3>
        <div className="mt-3">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-slate-700">Card Size & Background</h3>
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs text-slate-500">Width (px)</label>
            <input defaultValue={420} onChange={(e)=> onChangeSize(e.target.value, undefined)} className="w-full border p-2 mt-1 rounded"/>
          </div>
          <div>
            <label className="text-xs text-slate-500">Height (px)</label>
            <input defaultValue={270} onChange={(e)=> onChangeSize(undefined, e.target.value)} className="w-full border p-2 mt-1 rounded"/>
          </div>

          <div>
            <label className="text-xs text-slate-500">Background color</label>
            <input type="color" value={backgroundColor} onChange={(e)=> setBackgroundColor(e.target.value)} className="w-full mt-1 h-8 rounded"/>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-slate-700">Fields</h3>

        <div className="mt-3 flex gap-2">
          {Object.keys(fields).map(k => (
            <button
              key={k}
              onClick={() => setActiveFieldKey(k)}
              className={`px-3 py-1 rounded ${activeFieldKey === k ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <FieldEditor
            fieldKey={activeFieldKey}
            field={fields[activeFieldKey]}
            updateField={updateField}
            sampleFonts={sampleFonts}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-slate-700">Portrait / Photo</h3>
        <div className="mt-3">
          <label className="text-xs text-slate-500">Upload</label>
          <input type="file" accept="image/*" onChange={(e)=>{
            const file = e.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = (ev)=> updatePortrait({ src: ev.target.result })
            reader.readAsDataURL(file)
          }} className="mt-2"/>
          <div className="mt-2">
            <label className="text-xs text-slate-500">Show portrait</label>
            <div className="mt-1">
              <input type="checkbox" checked={portrait.show} onChange={(e)=> updatePortrait({ show: e.target.checked })}/>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input type="number" value={portrait.width} onChange={(e)=> updatePortrait({ width: Number(e.target.value) })} className="border p-1 rounded" />
              <input type="number" value={portrait.height} onChange={(e)=> updatePortrait({ height: Number(e.target.value) })} className="border p-1 rounded" />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-xs text-slate-500">
        Tips: Use the grid toggle for alignment. Export PNG at 2x-3x scale for print quality.
      </footer>
    </div>
  )
}


function FieldEditor({ fieldKey, field, updateField, sampleFonts }) {
  if (!field) return <div className="text-sm text-slate-500">Select a field to edit.</div>

  return (
    <div className="space-y-3">
      <label className="text-xs text-slate-500">Text</label>
      <input value={field.text} onChange={(e)=> updateField(fieldKey, { text: e.target.value })} className="w-full border p-2 rounded"/>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-slate-500">Font</label>
          <select value={field.font} onChange={(e)=> updateField(fieldKey, { font: e.target.value })} className="w-full border p-2 rounded">
            {sampleFonts.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Size</label>
          <input type="number" value={field.size} onChange={(e)=> updateField(fieldKey, { size: Number(e.target.value) })} className="w-full border p-2 rounded" />
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-500">Color</label>
        <input type="color" value={field.color} onChange={(e)=> updateField(fieldKey, { color: e.target.value })} className="w-full mt-1 h-8 rounded"/>
      </div>

      <div className="flex gap-2">
        <label className="text-xs text-slate-500 flex items-center gap-2"><input type="checkbox" checked={field.bold} onChange={(e)=> updateField(fieldKey, { bold: e.target.checked })}/> Bold</label>
        <label className="text-xs text-slate-500 flex items-center gap-2">
          Align
          <select value={field.align} onChange={(e)=> updateField(fieldKey, { align: e.target.value })} className="border p-1 rounded ml-2">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>
    </div>
  )
}
