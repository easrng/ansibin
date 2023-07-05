const escapeHtml = (s) =>
  s.replace(/[\x26\x0A\<>'"]/g, (s) => "&#" + s.charCodeAt(0) + ";");
import stringWidth from "string-width";
export function toHtml(terminal) {
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
      typeof c === "number" ? `var(--term-ansi-${c})` : "#" + c;
    const props = [];
    if (inverse) {
      props.push(`color:${bg === 0 || bg ? colorToCSS(bg) : "var(--term-bg)"}`);
      props.push(
        `background-color:${fg === 0 || fg ? colorToCSS(fg) : "var(--term-fg)"}`
      );
    } else {
      if (fg === 0 || fg) props.push(`color:${colorToCSS(fg)}`);
      if (bg === 0 || bg) props.push(`background-color:${colorToCSS(bg)}`);
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
export function toAnsi(terminal) {
  const toEscape = ([
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
    let extra = "";
    const props = ["0"];
    //    if (fg === 0|| fg) props.push(`color:${colorToCSS(fg)}`);
    //    if (bg === 0|| bg) props.push(`background-color:${colorToCSS(bg)}`);
    if (inverse) props.push("7");
    if (bold) props.push("1");
    if (underline) props.push("4");
    if (overline) props.push("53");
    if (blink) props.push("5");
    if (strikethrough) props.push("9");
    if (invisible) props.push("8");
    if (italic) props.push("3");
    if (dim) props.push("2");
    const colorToAnsi = (code, color) => {
      if (typeof color === "number") {
        color += "";
        if (color.length === 1) {
          props.push(code + color);
        } else {
          extra += "\x1b[" + code + "8;5;" + color + "m";
        }
      } else if (color && typeof color === "string") {
        const [r, g, b] = Buffer.from(color, "hex");
        extra +=
          "\x1b[" +
          code +
          "8;2;" +
          (r || 0) +
          ";" +
          (g || 0) +
          ";" +
          (b || 0) +
          "m";
      }
    };
    colorToAnsi("3", fg);
    colorToAnsi("4", bg);
    return "\x1b[" + props.join(";") + "m" + extra;
  };
  let ansi = "";
  for (const row of terminal) {
    let style = [];
    for (let seg of row) {
      if (typeof seg === "string") {
        ansi += toEscape(style) + seg;
      } else {
        style = seg;
      }
    }
    ansi += toEscape([]) + "\n";
  }
  let lines = ansi.split("\n");
  const widths = lines.map((e) => stringWidth(e));
  const widest = widths.reduce((a, b) => (a > b ? a : b), 0);
  lines = lines.map((line, i) => line + " ".repeat(widest - widths[i]));
  const title = " ansibin ";
  const header =
    "\x1b[2m╭" +
    "─".repeat(Math.floor((widest - title.length) / 2)) +
    "\x1b[0m" +
    title +
    "\x1b[2m" +
    "─".repeat(Math.ceil((widest - title.length) / 2)) +
    "╮\x1b[0m\n";
  const footer = "\x1b[2m╰" + "─".repeat(widest) + "╯\x1b[0m\n";
  return (
    header +
    lines.map((line) => "\x1b[2m│" + line + "\x1b[2m│\x1b[0m").join("\n") +
    "\n" +
    footer
  );
}
