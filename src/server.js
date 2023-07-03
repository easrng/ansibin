import express from "express";
import template from "./template.js";
import render from "./render.js";
import test from "../public/test.json" assert { type: "json" };
import fs from "fs/promises"
const app = express();
app.use(express.static("public"));
app.get("/v/:filename", async (req, res) => {
  let o;
  try {
    if(req.params.filename.match(/[\\/]/)) throw new Error();
    o = JSON.parse((await fs.readFile("./recordings/"+req.params.filename)).toString());
  } catch (e) {
    console.log(e)
    o = [["Error."]];
  }
  res.send(template(render(o)));
});
app.get("/", (req, res) => {
  res.send(template(render(test)));
});
const listener = app.listen(3019, "127.0.0.1", () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
