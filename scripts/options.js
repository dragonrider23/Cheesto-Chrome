(function() {
  'use strict';
  chrome.webRequest.onErrorOccurred.addListener(handleWebError, { urls: ['http://*/*', 'https://*/*'] });

  function handleWebError(details) {
    if (details.error === 'net::ERR_CONNECTION_REFUSED') {
      displayStatus('Error validating API key. Connection Refused', 'error');
    } else if (details.error === 'net::ERR_NAME_NOT_RESOLVED') {
      displayStatus('Invalid hostname. Name Not Resolved', 'error');
    } else if (details.error === 'net::ERR_ABORTED') {
      displayStatus('Connection aborted');
    } else {
      displayStatus('Error: ' + details.error, 'error');
    }
  }

  function saveOptions() {
    var address = $('#dan_address').val();
    var apikey = $('#dan_apikey').val();
    var logNum = $('#dan_log_number').val();
    var tabDefault = $('#dan_default_tab').val();
    var filterMine = $('#dan_filter_mine').prop('checked');

    // Trim trailing slashes and spaces from web address
    address = address.replace(/[\s/]+$/, '');
    // Trim trailing whitespace from api key
    apikey = apikey.replace(/\s+$/, '');

    var parsedLogNum = parseInt(logNum, 10);
    if (isNaN(parsedLogNum)) {
      displayStatus('Please enter a number for logs field.', 'error');
      return;
    }

    if (parsedLogNum < 1 || parsedLogNum > 50) {
      displayStatus('# of logs must be between 1 and 50 inclusive', 'error');
      return;
    }

    if (!validTabDefault(tabDefault)) {
      tabDefault = 'dynamic';
    }

    // Display modified strings back to user
    $('#dan_address').val(address);
    $('#dan_apikey').val(apikey);

    // First test for version 6
    $.getJSON(address + '/api/key/test', {'apikey': apikey})
      .done(function(data) {
        if (data.errorcode === 0) {
          storeSettings(address, apikey, 6, parsedLogNum, tabDefault, filterMine);
        } else {
          displayStatus('Error validating API key. Make sure you have the right path and key and that Dandelion is version 6 or newer.', 'error');
        }
      })
      .fail(function() {
        displayStatus('Please check URL and try again.', 'error');
      });
  }

  function storeSettings(address, apikey, version, logNum, tabDefault, filterMine) {
    chrome.storage.local.set({
      dandelionAdd: address,
      dandelionAPI: apikey,
      dandelionVer: version,
      dandelionLogNum: logNum,
      dandelionTabDefault: tabDefault,
      dandelionFilterMine: filterMine
    }, function() {
      var background = chrome.extension.getBackgroundPage();
      background.loadSettings();
      displayStatus('Options saved.');
    });
  }

  function validTabDefault(candidate) {
    switch (candidate) {
      case 'dynamic':
      case 'logs':
      case 'cheesto':
        return true;
    }
    return false;
  }

  function displayStatus(message, classColor) {
    clearTimeout(statusTimeout);
    classColor = typeof classColor !== 'undefined' ? classColor : '';
    var status = $('#status');

    status.html(message);
    status.addClass(classColor);

    statusTimeout = setTimeout(function() {
      status.html('');
      status.removeClass(classColor);
    }, 5000);
  }

  function restoreOptions() {
    chrome.storage.local.get({
      dandelionAdd: '',
      dandelionAPI: '',
      dandelionLogNum: 5,
      dandelionTabDefault: 'dynamic',
      dandelionFilterMine: false
    }, function(items) {
      $('#dan_address').val(items.dandelionAdd);
      $('#dan_apikey').val(items.dandelionAPI);
      $('#dan_log_number').val(items.dandelionLogNum);
      $('#dan_default_tab').val(items.dandelionTabDefault);
      $('#dan_filter_mine').prop('checked', items.dandelionFilterMine);
    });
  }

  var statusTimeout;
  document.addEventListener('DOMContentLoaded', restoreOptions);
  $('#save').click(saveOptions);
})();
