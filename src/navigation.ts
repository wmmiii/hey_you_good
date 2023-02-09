import { cubicInOut } from "svelte/easing";
import { writable, Writable } from "svelte/store";

export type PageId = 'index' | 'check-in' | 'daily-log' | 'settings';
type TransitionNames = 'fade' | 'fade-push' | 'fade-pop' | 'slide-left' | 'slide-right';

export const currentPage: Writable<PageId> = writable('index');

export function transitionTo(page: PageId, transitionName: TransitionNames) {
  nextTransition.set(transitionName);
  setTimeout(() => {
    currentPage.set(page);
  });
}

export const pageTransition = (_node, config: { lifecycle: 'in' | 'out' }) => ({
  duration: 400,
  css: t => {
    t = cubicInOut(t);
    if (transitionName === 'fade-push' && config.lifecycle === 'in') {
      return `opacity: ${t}; transform: scale(${1 + (1 - t) * 0.05})`;
    } else if (transitionName === 'fade-pop' && config.lifecycle === 'out') {
      return `opacity: ${t}; transform: scale(${1 + (1 - t) * 0.05})`;
    } else if (transitionName === 'fade-push' || transitionName === 'fade-pop') {
      return `opacity: ${t}`;

    } else if ((transitionName === 'slide-right' && config.lifecycle === 'in') ||
      (transitionName === 'slide-left' && config.lifecycle === 'out')) {
      return `left: -${(1 - t) * 50}%; opacity: ${t}`;
    } else if ((transitionName === 'slide-left' && config.lifecycle === 'in') ||
      (transitionName === 'slide-right' && config.lifecycle === 'out')) {
      return `left: ${(1 - t) * 50}%; opacity: ${t}`;

    } else {
      return `opacity: ${t}`;
    }
  }
});

const nextTransition: Writable<TransitionNames> = writable('fade');
let transitionName: TransitionNames;
nextTransition.subscribe((value) => transitionName = value);
