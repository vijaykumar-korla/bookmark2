import { useRef, useState, useEffect } from "react";

function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#0f172a"); // Default slate dark
  const [brushSize, setBrushSize] = useState(4);

  // Colors list matching the professional palette
  const colors = [
    { label: "Dark", value: "#0f172a" },
    { label: "Blue", value: "#1e70e6" },
    { label: "Red", value: "#ef4444" },
    { label: "Green", value: "#10b981" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    // Set display size
    canvas.width = 800 * 2;
    canvas.height = 450 * 2;
    canvas.style.width = "100%";
    canvas.style.height = "450px";

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, []);

  // Update stroke styles on change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    // Get mouse position relative to canvas bounding box
    const rect = canvasRef.current.getBoundingClientRect();
    const x = nativeEvent.clientX - rect.left;
    const y = nativeEvent.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = nativeEvent.clientX - rect.left;
    const y = nativeEvent.clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const link = document.createElement("a");
    link.download = "sketch.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="container">
      <h2>Whiteboard Study Desk</h2>
      <p style={{ margin: "0.5rem 0 1.5rem 0", color: "var(--text-secondary)" }}>
        Draw layouts, sketch flow diagrams, or write equations using the canvas board.
      </p>

      <div className="card-premium" style={{ padding: "1.5rem", backgroundColor: "#ffffff" }}>
        
        {/* Controls Bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--border-color)"
        }}>
          
          {/* Colors */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500" }}>Color:</span>
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: c.value,
                  border: color === c.value ? "3px solid #e2e8f0" : "1px solid #d1d5db",
                  cursor: "pointer",
                  boxShadow: color === c.value ? "0 0 0 2px var(--accent-blue)" : "none"
                }}
                title={c.label}
              />
            ))}
          </div>

          {/* Size */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500" }}>Brush size:</span>
            <select
              className="select-field"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              style={{ width: "100px", padding: "0.35rem 0.5rem" }}
            >
              <option value={2}>Thin</option>
              <option value={4}>Medium</option>
              <option value={8}>Thick</option>
              <option value={16}>Extra Thick</option>
            </select>
          </div>

          {/* Canvas Actions */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={clearCanvas} className="btn btn-secondary" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}>
              🧹 Clear Board
            </button>
            <button onClick={downloadCanvas} className="btn btn-primary" style={{ padding: "0.45rem 1rem", fontSize: "0.85rem" }}>
              💾 Save Sketch
            </button>
          </div>
        </div>

        {/* Drawing Canvas */}
        <div style={{ border: "1px solid #d1d5db", borderRadius: "var(--radius-sm)", overflow: "hidden", backgroundColor: "#fafafa" }}>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ display: "block", cursor: "crosshair" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Whiteboard;
