import React from 'react'
import { GridPattern } from './icons'

export default function Toolbar({ showGrid, setShowGrid }) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Preview Options</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showGrid} onChange={(e)=> setShowGrid(e.target.checked)} />
            Grid
          </label>
        </div>
      </div>

      <div className="text-xs text-slate-500">Tip: click elements in the preview to select & drag them.</div>
    </div>
  )
}
