import React, { forwardRef, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const IDCardCanvas = forwardRef(
  (
    {
      template,
      fields,
      updateField,
      portrait,
      updatePortrait,
      showGrid,
      cardSize,
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
      if (ref) ref.current = containerRef.current;
    }, [ref]);

    // Generate grid lines
    const gridLines = showGrid
      ? (() => {
          const lines = [];
          const step = 20;

          for (let x = step; x < cardSize.w; x += step) {
            lines.push(
              <div
                key={`v-${x}`}
                className="absolute top-0 bottom-0 w-px bg-slate-200 pointer-events-none"
                style={{ left: x }}
              />
            );
          }
          for (let y = step; y < cardSize.h; y += step) {
            lines.push(
              <div
                key={`h-${y}`}
                className="absolute left-0 right-0 h-px bg-slate-200 pointer-events-none"
                style={{ top: y }}
              />
            );
          }
          return lines;
        })()
      : null;

    return (
      <div
        ref={containerRef}
        className="relative w-full h-full select-none"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Template background */}
        {template?.src && (
          <img
            src={template.src}
            alt={template.name}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Optional grid */}
        {gridLines}

        {/* Draggable Portrait */}
        {portrait.show && portrait.src && (
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={{
              left: 0,
              top: 0,
              right: cardSize.w - portrait.width,
              bottom: cardSize.h - portrait.height,
            }}
            onDragEnd={(e, info) => {
              const rect = containerRef.current.getBoundingClientRect();
              updatePortrait({
                x: info.point.x - rect.left,
                y: info.point.y - rect.top,
              });
            }}
            initial={{ x: portrait.x, y: portrait.y }}
            animate={{ x: portrait.x, y: portrait.y }}
            onMouseDown={() => setSelected("portrait")}
            style={{
              width: portrait.width,
              height: portrait.height,
              position: "absolute",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow:
                selected === "portrait"
                  ? "0 0 0 2px rgba(30,64,175,0.5)"
                  : "none",
            }}
          >
            <img
              src={portrait.src}
              alt="portrait"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Draggable Text Fields */}
        {Object.keys(fields).map((key) => {
          const f = fields[key];
          return (
            <motion.div
              key={key}
              drag
              dragMomentum={false}
              dragConstraints={{
                left: 0,
                top: 0,
                right: cardSize.w - 20,
                bottom: cardSize.h - 20,
              }}
              onDragEnd={(e, info) => {
                const rect = containerRef.current.getBoundingClientRect();
                updateField(key, {
                  x: info.point.x - rect.left,
                  y: info.point.y - rect.top,
                });
              }}
              initial={{ x: f.x, y: f.y }}
              animate={{ x: f.x, y: f.y }}
              onMouseDown={() => setSelected(key)}
              className="absolute cursor-move px-1"
              style={{
                border:
                  selected === key
                    ? "1px dashed rgba(30,64,175,0.5)"
                    : "1px solid transparent",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  color: f.color,
                  fontSize: f.size,
                  fontFamily: f.font,
                  fontWeight: f.bold ? 700 : 400,
                  textAlign: f.align,
                }}
              >
                {f.text}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }
);

export default IDCardCanvas;
