import "./browserHistory";
import App from "./App.svelte";
import {initStorage} from './storage/localDb';

initStorage();

new App({
  target: document.body,
});
