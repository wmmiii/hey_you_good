import { currentPage, PageId, transitionTo } from "./navigation";

interface PageState {
  page: PageId;
}

// Ignore the first fire of `subscribe` as it does not denote a state change.
let ignoreStateUpdate = true;

currentPage.subscribe((value) => {
  if (ignoreStateUpdate) {
    ignoreStateUpdate = false;
    return;
  }

  const state: PageState = {
    page: value,
  };
  window.history.pushState(state, value);
});

window.onpopstate = (event) => {
  // We don't want to push the state right after it was just popped.
  ignoreStateUpdate = true;

  const state: PageState = event.state;
  const page = state && state.page ? state.page : 'index';
  transitionTo(page, 'fade');
};
