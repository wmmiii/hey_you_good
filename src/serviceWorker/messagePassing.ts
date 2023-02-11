import { Message } from "./messages";

export async function sendMessageToServiceWorker(message: Message): Promise<void> {
  const sw = await navigator.serviceWorker.getRegistration();
  if (sw?.active == null) {
    console.error('Could not find active service worker to post message to!');
  } else {
    sw?.active?.postMessage(message);
  }
}
