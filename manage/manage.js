document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get({ searchHistory: [] }, function(result) {
      var searchHistory = result.searchHistory;
  
      var searchHistoryDiv = document.getElementById('searchHistory');
      for (var i = 0; i < searchHistory.length; i++) {
        var searchData = searchHistory[i];
  
        var searchEntry = document.createElement('div');
        searchEntry.innerHTML = `
          <p style="color:red;"><strong>Từ Nhạy Cảm:</strong> ${searchData.text}</p>
          <p><strong>Tên trang web:</strong> ${searchData.title}</p>
          <p><strong>Trang Web:</strong></p><a href="${searchData.data}">${searchData.data}</a>
          <p><strong>Loại tìm kiếm:</strong> ${searchData.type}</p>
          <p style="color:blue;"><strong>Thời gian tìm kiếm:</strong> ${new Date(searchData.time_search).toLocaleString()}</p>
          <hr>
        `;
  
        searchHistoryDiv.appendChild(searchEntry);
      }
    });
  });
  