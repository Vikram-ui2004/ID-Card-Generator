import React, { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import IDCardCanvas from './components/IDCardCanvas'
import TemplateData from './data/templates'
import { sampleFonts } from './data/fonts'
import DownloadButtons from './components/DownloadButtons'

export default function App() {
  // template cell holds image url and id
  const [selectedTemplate, setSelectedTemplate] = useState(TemplateData[0])
  // card fields with position, style
  const [fields, setFields] = useState({
    name: { id: 'name', text: 'Vikram Nayak', x: 40, y: 160, font: 'Poppins', size: 26, color: '#0b1221', bold: true, align: 'left' },
    team: { id: 'team', text: 'IAMR College / Web Dev Team', x: 40, y: 195, font: 'Poppins', size: 16, color: '#1f2937', bold: false, align: 'left' }
  })
  const [portrait, setPortrait] = useState({
    src: '', x: 260, y: 40, width: 100, height: 120, show: true
  })
  const [showGrid, setShowGrid] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [cardSize, setCardSize] = useState({ w: 420, h: 270 }) // preview size (px)
  const canvasRef = useRef()

  const updateField = (key, patch) => {
    setFields(prev => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  const updatePortrait = (patch) => setPortrait(prev => ({ ...prev, ...patch }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-[1400px] mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Custom ID Card Generator</h1>
          <p className="text-sm text-slate-500 mt-1">Pick a template, drag text & photo into place, style fonts & colors, and export a print-ready file.</p>
        </header>

        <div className="flex gap-6">
          <aside className="w-96">
            <Sidebar
              templates={TemplateData}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              fields={fields}
              updateField={updateField}
              portrait={portrait}
              updatePortrait={updatePortrait}
              sampleFonts={sampleFonts}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              setCardSize={setCardSize}
            />
          </aside>

          <main className="flex-1">
            <Toolbar showGrid={showGrid} setShowGrid={setShowGrid} />
            <div className="mt-4 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white rounded-lg p-4 shadow flex-shrink-0">
                <div className="text-sm text-slate-600 mb-2">Live Preview</div>
                <div
                  id="id-card-preview"
                  className="relative border border-slate-200"
                  style={{
                    width: cardSize.w + 'px',
                    height: cardSize.h + 'px',
                    backgroundColor: backgroundColor
                  }}
                >
                  <IDCardCanvas
                    ref={canvasRef}
                    template={selectedTemplate}
                    fields={fields}
                    updateField={updateField}
                    portrait={portrait}
                    updatePortrait={updatePortrait}
                    showGrid={showGrid}
                    cardSize={cardSize}
                  />
                </div>

                <div className="mt-3 flex gap-2">
                  <DownloadButtons
                    canvasRef={canvasRef}
                    cardSize={cardSize}
                    selectedTemplate={selectedTemplate}
                    fields={fields}
                    portrait={portrait}
                    backgroundColor={backgroundColor}
                  />
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg p-4 shadow">
                <h3 className="font-medium text-slate-700 mb-2">Selected Element Controls</h3>
                <div className="text-sm text-slate-500">Click a text or photo in the preview to select and edit it on the left (or use controls in the sidebar).</div>
                <div className="mt-4">
                  <div className="text-xs text-slate-400">Hints</div>
                  <ul className="list-disc ml-5 text-sm text-slate-600 mt-2">
                    <li>Drag text or portrait directly in the preview to reposition.</li>
                    <li>For print, export PNG/PDF at higher resolution (the exporter scales the card for print DPI).</li>
                    <li>Use the grid toggle for alignment help.</li>
                  </ul>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
