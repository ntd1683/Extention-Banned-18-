chrome.history.onVisited.addListener(function(result) {
  var searchData = {
    text: '',
    title: result.title,
    data: result.url,
    type: 1,
    time_search: new Date().getTime()
  };

  chrome.storage.local.get({ searchHistory: [] }, function(result) {
    var search = result.searchHistory;

    var searchTmp = decodeURI(searchData.data);

    // Kiểm tra từ nhạy cảm
    fetch(chrome.runtime.getURL('json/sensitive_words.json'))
      .then(response => response.json())
      .then(data => {
        var sensitiveWords = data.sensitiveWords;

        for (var i = 0; i < sensitiveWords.length; i++) {
          if (searchTmp.includes('https://www.google.com/search')) {
            var searchQuery = new URL(searchTmp).searchParams.get('q');

            if (searchQuery.toLowerCase().includes(sensitiveWords[i].toLowerCase())) {
              searchData.text = sensitiveWords[i].toLowerCase();
              search.push(searchData);
              chrome.storage.local.set({ searchHistory: search });
              // Chuyển hướng khi có từ nhạy cảm
              chrome.tabs.update(result.id, { url: 'https://bocongan.gov.vn/lien-he.html' });
              break;
            }
          } else {
            if (searchTmp.toLowerCase().includes(sensitiveWords[i].toLowerCase())) {
              searchData.text = sensitiveWords[i].toLowerCase();
              search.push(searchData);

              chrome.storage.local.set({ searchHistory: search });
              // Chuyển hướng khi có từ nhạy cảm
              chrome.tabs.update(result.id, { url: 'https://bocongan.gov.vn/lien-he.html' });
              break;
            }
          }
        }
      });
  });
});
