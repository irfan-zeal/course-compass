let collegesData; // Global variable to store the parsed CSV data

// Function to load the CSV file and parse it
function loadCSV() {
  fetch("clg_data.csv")
    .then((response) => response.text())
    .then((data) => {
      collegesData = data.split("\n").map((row) =>
        row.split(",").reduce((obj, val, index) => {
          const header = [
            "college_name",
            "department",
            "location",
            "percentage",
          ];
          obj[header[index]] = isNaN(val) ? val.trim() : parseFloat(val);
          return obj;
        }, {})
      );
    });
}

function recommendColleges() {
  const percentage = parseFloat(document.getElementById("percentage").value);
  const location = document.getElementById("location").value.toLowerCase();
  const departments = document
    .getElementById("department")
    .value.toLowerCase()
    .split(",")
    .map((s) => s.trim());

  const recommendations = collegesData.filter((college) => {
    return (
      college.percentage >= percentage &&
      college.location.toLowerCase().includes(location) &&
      departments.some((dep) => college.department.toLowerCase().includes(dep))
    );
  });

  displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
  const table = document.getElementById("recommendations-table");
  const tbody = document.getElementById("recommendations");
  tbody.innerHTML = "";

  if (recommendations.length === 0) {
    const row = tbody.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 4;
    cell.textContent = "No colleges found matching your criteria.";
  } else {
    recommendations.forEach((college) => {
      const row = tbody.insertRow();
      row.insertCell().textContent = college.college_name;
      row.insertCell().textContent = college.department;
      row.insertCell().textContent = college.location;
      row.insertCell().textContent = college.percentage;
    });
  }
}
