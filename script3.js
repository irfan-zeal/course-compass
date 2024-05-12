function updateSelectedStyle(selectElement) {
  // Remove styling from all options
  var options = selectElement.options;
  for (var i = 0; i < options.length; i++) {
    options[i].style.backgroundColor = "#fff";
    options[i].style.color = "#333";
  }

  // Apply styling to selected options
  var selectedOptions = selectElement.selectedOptions;
  for (var i = 0; i < selectedOptions.length; i++) {
    selectedOptions[i].style.backgroundColor = "#007bff";
    selectedOptions[i].style.color = "#fff";
  }
}
