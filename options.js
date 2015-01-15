// Saves options to chrome.storage.sync.
var min = document.getElementById('min');
var max = document.getElementById('max');
var min_value = document.getElementById('min_value');
var max_value = document.getElementById('max_value');
min.onchange = function() {
	min_value.textContent = this.value;
}
max.onchange = function() {
	max_value.textContent = this.value;
}
function save_options() {
  var status = document.getElementById('status');
  if( min.value > max.value ) {
  	status.textContent = 'Error: Minimum value must be less than Maximum value';
  	return;
  }
  chrome.storage.sync.set({
    min: min.value,
    max: max.value
  }, function() {
    // Update status to let user know options were saved.
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1300);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    min: 0,
    max: 600000
  }, function(items) {
    min.value = items.min;
    max.value = items.max;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);