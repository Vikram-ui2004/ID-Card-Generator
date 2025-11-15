import React from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function DownloadButtons({ canvasRef, cardSize }) {
  const EXPORT_SCALE = 3;

  const getNode = () => {
    const node = canvasRef?.current;
    if (!node) {
      alert("Preview not ready");
      return null;
    }
    return node;
  };

  const downloadPNG = async () => {
    const node = getNode();
    if (!node) return;

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: EXPORT_SCALE,
        style: { transform: "none" }, // FIX for motion.div transforms
      });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `id-card-${Date.now()}.png`;
      a.click();
    } catch (err) {
      console.error("PNG Export Error:", err);
      alert(err.message);
    }
  };

  const downloadPDF = async () => {
    const node = getNode();
    if (!node) return;

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: EXPORT_SCALE,
        style: { transform: "none" },
      });

      const pdf = new jsPDF({
        orientation: cardSize.w > cardSize.h ? "l" : "p",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const ratio = imgProps.width / imgProps.height;

      let w = pdfW - 20;
      let h = w / ratio;
      if (h > pdfH - 20) {
        h = pdfH - 20;
        w = h * ratio;
      }

      pdf.addImage(dataUrl, "PNG", (pdfW - w) / 2, (pdfH - h) / 2, w, h);
      pdf.save(`id-card-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert(err.message);
    }
  };

  const printCard = async () => {
    const node = getNode();
    if (!node) return;

    try {
      await document.fonts.ready;

      const dataUrl = await toPng(node, {
        pixelRatio: EXPORT_SCALE,
        style: { transform: "none" },
      });

      const win = window.open("", "_blank");
      win.document.write(`
        <img src="${dataUrl}" style="width:100%" onload="window.print()"/>
      `);
      win.document.close();
    } catch (err) {
      console.error("Print Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={downloadPNG} className="bg-green-600 text-white px-3 py-2 rounded">
        PNG
      </button>
      <button onClick={downloadPDF} className="bg-blue-600 text-white px-3 py-2 rounded">
        PDF
      </button>
      <button onClick={printCard} className="bg-black text-white px-3 py-2 rounded">
        Print
      </button>
    </div>
  );
}
