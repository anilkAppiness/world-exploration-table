export function exportTableToCSV(
  table,
  {
    filename = "table",
    excludeColumns = [],
    onlySelected = false
  } = {}
) {
  const headers = table
    .getAllLeafColumns()
    .map(column => column.id)
    .filter(id => !excludeColumns.includes(id));

  const csvContent = [
    headers.join(","),
    ...(onlySelected
      ? table.getFilteredSelectedRowModel().rows
      : table.getRowModel().rows
    ).map(row =>
      headers
        .map(header => {
          const cellValue = row.getValue(header);
          return typeof cellValue === "string"
            ? `"${cellValue.replace(/"/g, '""')}"`
            : cellValue;
        })
        .join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
