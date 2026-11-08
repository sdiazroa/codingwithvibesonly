// A house on a blueprint. Architecture is the foundation. Design is everything you see.
// Product is what runs through the house and keeps it working.
export function House() {
  return (
    <svg
      className="house"
      viewBox="52 18 540 438"
      role="img"
      aria-label="A blueprint of a house. Architecture is the foundation. Design spans the whole house. Product is the line running through it."
    >
      <path d="M92 410h300v34H92z" className="base" />
      <path d="M100 410V222h284v188" />
      <path d="M214 410v-92h56v92" />
      <path d="M126 278h56v52h-56zM154 278v52M126 304h56" className="thin" />
      <path d="M302 278h56v52h-56zM330 278v52M302 304h56" className="thin" />
      <path d="M72 240 242 88l170 152" />
      <path d="M316 138V92h38v80" />
      <path d="M368 410V240h-33v-68" className="wire" />
      <g className="house-labels">
        <path d="M72 70V58h340v12" />
        <path d="M368 356h78M392 427h54" className="leader" />
        <text x="242" y="44" textAnchor="middle">Design</text>
        <text x="454" y="363">Product</text>
        <text x="454" y="434">Architecture</text>
      </g>
    </svg>
  );
}
