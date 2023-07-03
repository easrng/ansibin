const escapeHtml = (s) =>
  s.replace(/[\x26\x0A\<>'"]/g, (s) => "&#" + s.charCodeAt(0) + ";");
export default function render(terminal) {
  const toCSS = ([
    fg,
    bg,
    inverse,
    bold,
    underline,
    overline,
    blink,
    invisible,
    italic,
    dim,
    strikethrough,
  ]) => {
    const colorToCSS = (c) =>
      typeof c === "number" ? `var(--term-ansi-${c})` : c;
    const props = [];
    if (inverse) {
      props.push(`color:${(bg===0||bg) ? colorToCSS(bg) : "var(--term-bg)"}`);
      props.push(`background-color:${(fg===0||fg) ? colorToCSS(fg) : "var(--term-fg)"}`);
    } else {
      if (fg===0||fg) props.push(`color:${colorToCSS(fg)}`);
      if (bg===0||bg) props.push(`background-color:${colorToCSS(bg)}`);
    }
    if (bold) props.push("font-weight:bold");
    const decorations = [];
    if (underline) decorations.push("underline");
    if (overline) decorations.push("overline");
    if (blink) decorations.push("blink");
    if (strikethrough) decorations.push("line-through");
    if (decorations.length > 0)
      props.push("text-decoration:" + decorations.join(" "));
    if (invisible) props.push("visibility:hidden");
    if (italic) props.push("font-style:italic");
    if (dim) props.push("opacity:0.5");
    return props.join(";");
  };
  let html = "<pre><div>";
  for (const row of terminal) {
    let style = [];
    for (let seg of row) {
      if (typeof seg === "string") {
        html += `<span${
          style.length > 0 ? ` style="${escapeHtml(toCSS(style))}"` : ""
        }>${escapeHtml(seg)}</span>`;
      } else {
        style = seg;
      }
    }
    html += "\n";
  }
  html += "</div></pre>";
  return html;
}
