const swUpdateInterval = 1000 * 60 * 60;

let registration: Promise<ServiceWorkerRegistration>;
export function getSWRegistration(): Promise<ServiceWorkerRegistration> {
  if (registration) {
    return registration;
  }

  if (navigator.serviceWorker == null) {
    return Promise.reject("This browser does not support service workers!");
  }

  registration = navigator.serviceWorker.register('service_worker.js');

  registration.then((reg) => {
    setInterval(() => reg.update, swUpdateInterval);
  });

  return registration;
}
