import Popup from "./Popup.svelte";
import NewTab from "./NewTab.svelte";
import "./tailwind.css";

const app = new NewTab({
//const app = new Popup({
  target: document.body,
  intro: true
});

export default app;
