import { cubicInOut } from "svelte/easing";
import { writable, Writable } from "svelte/store";

export type PageId = 'index' | 'check-in' | 'daily-log';
type TransitionNames = 'fade' | 'slide-left' | 'slide-right';

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
    if ((transitionName === 'slide-right' && config.lifecycle === 'in') ||
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
let transitionName;
nextTransition.subscribe((value) => transitionName = value);
