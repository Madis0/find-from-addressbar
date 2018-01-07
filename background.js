var resultCount = 0;

browser.omnibox.setDefaultSuggestion({
    description: "Enter text to find in page"
});

function highlightFound(results) {
  resultCount = results.count;
  
  if (results.count > 0) {
    browser.find.highlightResults();
  }
  else {
    browser.find.removeHighlighting();
  }
}

function createSuggestion(input) {
  var result = [];

  var suggestion = {
      content: input
  };

  if (resultCount > 0) {
        description = resultCount + " results found for " + input
  }
  else {
        description = "No results found for " + input
  }

  result.push(suggestion);
  return result;
}

browser.omnibox.onInputChanged.addListener((input, suggest) => {
    suggest(createSuggestion(input));
    browser.find.find(input).then(highlightFound);
});

browser.omnibox.onInputEntered.addListener((url, disposition) => {
  browser.find.removeHighlighting();
});
