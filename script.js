document.getElementById("filterInput").addEventListener("input", handleFilter);

let data = []; // Array para guardar los datos cargados

// Función para cargar automáticamente el archivo Excel predeterminado
function loadDefaultExcel() {
  fetch('data.xlsx')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(worksheet);
      displayData(data); // Muestra todos los datos al inicio
    })
    .catch(error => console.error("Error al cargar el archivo Excel:", error));
}

// Función para mostrar los datos en la tabla
function displayData(dataArray) {
  const tableHead = document.getElementById("tableHead");
  const tableBody = document.getElementById("tableBody");

  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (dataArray.length === 0) return;

  const headers = Object.keys(dataArray[0]);
  const headerRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  tableHead.appendChild(headerRow);

  dataArray.forEach(row => {
    const rowElement = document.createElement("tr");
    headers.forEach(header => {
      const cell = document.createElement("td");
      cell.textContent = row[header];
      rowElement.appendChild(cell);
    });
    tableBody.appendChild(rowElement);
  });
}

// Función para filtrar los datos y mostrar la imagen de filtro
function handleFilter(event) {
  const query = event.target.value.toLowerCase();
  const filteredData = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(query)
    )
  );

  displayData(filteredData);

  const filterImage = document.getElementById("filterImage");
  filterImage.style.display = query ? "block" : "none";
}

// Función de inicio de sesión
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  if (username === "admin" && password === "1") {
    document.getElementById("loginSection").style.display = "none"; // Oculta el login
    document.getElementById("contentSection").style.display = "block"; // Muestra el contenido
    loadDefaultExcel(); // Carga el archivo Excel después del login
  } else {
    errorMsg.textContent = "Usuario o contraseña incorrectos. Intenta de nuevo.";
  }
}

window.onload = function() {
  // Ocultar el contenido al cargar la página
  document.getElementById("contentSection").style.display = "none";
};
