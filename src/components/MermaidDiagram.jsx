import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import './MermaidDiagram.css';

// Global counter to ensure unique IDs across all component instances
let globalInstanceCounter = 0;

const MermaidDiagram = ({ chart }) => {
  const containerRef = useRef(null);
  const instanceId = useRef(++globalInstanceCounter);
  const renderCount = useRef(0);
  const [isDark, setIsDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current || !chart) {
        return;
      }

      // Initialize Mermaid with modern theme based on dark mode preference
      // Must re-initialize before each render since theme can't change after init
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        themeVariables: isDark ? {
          // Modern soft dark theme
          primaryColor: '#3b3b5c',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#6366f1',
          secondaryColor: '#2d2d44',
          tertiaryColor: '#252538',
          lineColor: '#818cf8',
          textColor: '#cbd5e1',
          mainBkg: '#1a1a2e',
          nodeBorder: '#818cf8',
          clusterBkg: '#252538',
          titleColor: '#e2e8f0',
          edgeLabelBackground: '#2d2d44',
          actorBkg: '#3b3b5c',
          actorTextColor: '#e2e8f0',
          actorLineColor: '#818cf8',
          signalColor: '#a5b4fc',
          signalTextColor: '#cbd5e1',
          noteBkgColor: '#2d2d44',
          noteTextColor: '#cbd5e1'
        } : {
          // Modern soft light theme
          primaryColor: '#e0e7ff',
          primaryTextColor: '#3730a3',
          primaryBorderColor: '#a5b4fc',
          secondaryColor: '#f5f3ff',
          tertiaryColor: '#ede9fe',
          lineColor: '#818cf8',
          textColor: '#4338ca',
          mainBkg: '#faf5ff',
          nodeBorder: '#a5b4fc',
          clusterBkg: '#f5f3ff',
          titleColor: '#3730a3',
          edgeLabelBackground: '#f5f3ff',
          actorBkg: '#e0e7ff',
          actorTextColor: '#3730a3',
          actorLineColor: '#818cf8',
          signalColor: '#6366f1',
          signalTextColor: '#4338ca',
          noteBkgColor: '#ede9fe',
          noteTextColor: '#4338ca'
        }
      });

      // Generate unique ID using instance ID + render count to avoid collisions
      renderCount.current += 1;
      const uniqueId = `mermaid-${instanceId.current}-${renderCount.current}`;

      try {
        const { svg } = await mermaid.render(uniqueId, chart);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;

          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="
              color: #ff6b6b;
              background: rgba(255, 107, 107, 0.1);
              padding: 1rem;
              border-radius: 8px;
              border: 1px solid #ff6b6b;
            ">
              <strong>Diagram Error:</strong> ${error.message}
            </div>
          `;
        }
      }
    };

    renderDiagram();
  }, [chart, isDark]);

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram"
    />
  );
};

export default MermaidDiagram;
