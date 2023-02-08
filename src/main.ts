import "./browserHistory";
import App from "./App.svelte";
import {initStorage} from './storage/localDb';

initStorage();

if (navigator.serviceWorker != null) {
  navigator.serviceWorker.register('service_worker.js')
}

new App({
  target: document.body,
});
