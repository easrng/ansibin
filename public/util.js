export function convertWindowsTerminalTheme(theme) {
  const ansiKeys = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "purple",
    "cyan",
    "white",
    "brightBlack",
    "brightRed",
    "brightGreen",
    "brightYellow",
    "brightBlue",
    "brightPurple",
    "brightCyan",
    "brightWhite",
  ].map((e, i) => ["ansi-" + i, e]);
  ansiKeys.push(["fg", "foreground"]);
  ansiKeys.push(["bg", "background"]);
  return `.theme-${theme.name.toLowerCase().replace(/\s+/g, "-")}{${ansiKeys
    .map(([k, v]) => "--term-" + k + ":" + theme[v])
    .join(";")}}`;
}
