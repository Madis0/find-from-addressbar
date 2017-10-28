browser.omnibox.setDefaultSuggestion({
    description: "Find text in page"
});

function found(results) {
  if (results.count > 0) {
    browser.find.highlightResults();
  }
}

browser.omnibox.onInputChanged.addListener((input, suggest) => {
    browser.find.find(input).then(found);
});

browser.omnibox.onInputEntered.addListener((url, disposition) => {
  browser.find.removeHighlighting();
});
