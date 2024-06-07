// table.js
// Function to sort the table
function sortTable(n) {
    const table = document.querySelector(".accommodation-table tbody");
    const rows = Array.from(table.rows);
    let isAsc = table.getAttribute("data-sort-order") === "asc";
    const arrow = document.querySelectorAll("th")[n].querySelector(".arrow");

    // Reset arrows
    document.querySelectorAll(".arrow").forEach(arrow => arrow.className = "arrow");

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[n].innerText;
        const cellB = rowB.cells[n].innerText;

        const valueA = parseDistance(cellA);
        const valueB = parseDistance(cellB);

        return isAsc ? valueA - valueB : valueB - valueA;
    });

    isAsc = !isAsc;
    table.setAttribute("data-sort-order", isAsc ? "asc" : "desc");
    arrow.classList.add(isAsc ? "asc" : "desc");

    // Append sorted rows
    rows.forEach(row => table.appendChild(row));
}

function parseDistance(distance) {
    return distance === "At the venue" ? 0 : parseInt(distance) || 0;
}
