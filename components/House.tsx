// The site's one drawing: a house on a blueprint, drawn from the foundation up.
// Each stage of the course is one layer of the house, and building comes last.
export function House({ animate = false }: { animate?: boolean }) {
  return (
    <svg className={animate ? "house house-draw" : "house"} viewBox="56 72 560 386" role="img" aria-label="A blueprint of a house. The foundation is labeled product, the floor plan design, the frame architecture, and the finished roof build.">
      {/* 1. Foundation */}
      <g className="h1">
        <path pathLength={1} d="M92 410h300v34H92z" />
        <path pathLength={1} d="M92 427h300" className="thin" />
      </g>
      {/* 2. Floor plan: the door and windows */}
      <g className="h2">
        <path pathLength={1} d="M214 410v-92h56v92" />
        <path pathLength={1} d="M126 278h56v52h-56zM154 278v52M126 304h56" className="thin" />
        <path pathLength={1} d="M302 278h56v52h-56zM330 278v52M302 304h56" className="thin" />
      </g>
      {/* 3. Frame */}
      <g className="h3">
        <path pathLength={1} d="M100 410V222h284v188" />
        <path pathLength={1} d="M100 222 242 110l142 112" className="thin" />
        <path pathLength={1} d="M242 110v112M171 166v56M313 166v56" className="thin" />
      </g>
      {/* 4. Roof */}
      <g className="h4">
        <path pathLength={1} d="M72 240 242 88l170 152" />
        <path pathLength={1} d="M316 138V92h38v80" />
      </g>
      {/* Labels */}
      <g className="house-labels">
        <path d="M412 164h34M404 256h42M370 304h76M392 427h54" className="leader" />
        <text x="454" y="170"><tspan className="n">4 </tspan>Build</text>
        <text x="454" y="262"><tspan className="n">3 </tspan>Architecture</text>
        <text x="454" y="310"><tspan className="n">2 </tspan>Design</text>
        <text x="454" y="433"><tspan className="n">1 </tspan>Product</text>
      </g>
    </svg>
  );
}
