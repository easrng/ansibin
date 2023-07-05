import express from "express";
import template from "./template.js";
import * as render from "./render.js";
import test from "../public/test.json" assert { type: "json" };
import fs from "fs/promises";
const app = express();
app.use(express.static("public"));
/* async */ function send(o, req, res) {
  //let render;
  //try {
  //  render = await import("./render.js?" + Date.now());
  //} catch (e) {
  //  res.send("Failed to load renderer.\n" + e);
  //  return;
  //}
  const html = (req.headers.accept || "").includes("text/html");
  if (html) {
    res.header("content-type", "text/html");
    res.send(template(render.toHtml(o)));
  } else {
    res.header("content-type", "text/plain");
    res.send(render.toAnsi(o));
  }
}
app.get("/v/:filename", async (req, res) => {
  let o;
  try {
    if (req.params.filename.match(/[\\/]/)) throw new Error();
    o = JSON.parse(
      (await fs.readFile("./recordings/" + req.params.filename)).toString()
    );
  } catch (e) {
    console.log(e);
    o = [["Error."]];
  }
  send(o, req, res);
});
app.get("/", (req, res) => {
  send(test, req, res);
});
const listener = app.listen(3019, "127.0.0.1", () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
