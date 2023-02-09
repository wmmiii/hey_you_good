import "./browserHistory";
import App from "./App.svelte";
import { initStorage } from './storage/localDb';

const swUpdateInterval = 1000 * 60 * 60;

initStorage();

if (navigator.serviceWorker != null) {
  navigator.serviceWorker
    .register('service_worker.js')
    .then((reg) => {
      setInterval(() => reg.update, swUpdateInterval);
    });
}

new App({
  target: document.body,
});
