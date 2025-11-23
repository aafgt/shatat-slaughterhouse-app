import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const formattedDateTime = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
};

export const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

// exportSingleOrderToExcel.ts
export function downloadSingleOrderExcel(
  order: Record<string, any> | any,
  fileName: string = "order.xlsx",
  excludeFields: string[] = []
): void {
  if (typeof order !== "object" || Array.isArray(order)) {
    console.error("downloadSingleOrderExcel expects a single object.");
    return;
  }

  const filteredOrder = Object.fromEntries(
    Object.entries(order).filter(([key]) => !excludeFields.includes(key))
  );

  const rows = Object.entries(filteredOrder).map(([key, value]) => {
    if (Array.isArray(value)) {
      return { Field: key, Value: JSON.stringify(value) };
    } else if (typeof value === "object" && value !== null) {
      return { Field: key, Value: JSON.stringify(value) };
    }
    return { Field: key, Value: value };
  });

  const ws = XLSX.utils.json_to_sheet(rows, { header: ["Field", "Value"] });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Order");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}

export function downloadMultipleOrdersExcel<T extends Record<string, any>>(
  data: T[],
  fileName: string = "orders.xlsx",
  excludeFields: string[] = []
): void {
  if (!Array.isArray(data)) {
    console.error("downloadMultipleOrdersExcel expects an array of objects.");
    return;
  }

  if (data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  // Filter out excluded fields
  const filteredData = data.map(item =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => !excludeFields.includes(key))
    )
  );

  // Convert nested objects or arrays to strings (so Excel doesn’t break)
  const sanitizedData = filteredData.map(item =>
    Object.fromEntries(
      Object.entries(item).map(([key, value]) => {
        if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
          return [key, JSON.stringify(value)];
        }
        return [key, value];
      })
    )
  );

  // Generate worksheet
  const ws = XLSX.utils.json_to_sheet(sanitizedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orders");

  // Write workbook to binary and trigger download
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}

export function downloadAllOrderExcel(
  order: Record<string, any>,
  fileName: string = "order.xlsx",
  excludeFields: string[] = []
): void {
  if (typeof order !== "object" || Array.isArray(order)) {
    console.error("downloadAllOrderExcel expects a single object.");
    return;
  }

  const wb = XLSX.utils.book_new();

  const addSectionToSheet = (
    wsData: any[][],
    sectionName: string,
    sectionData: Record<string, any>
  ) => {
    wsData.push([sectionName]); // Section title
    wsData.push([]); // Blank line

    for (const [key, value] of Object.entries(sectionData)) {
      if (excludeFields.includes(key)) continue;

      if (Array.isArray(value)) {
        wsData.push([key]); // Subtable title
        if (value.length > 0 && typeof value[0] === "object") {
          const headers = Object.keys(value[0]);
          wsData.push(headers);
          value.forEach((row: any) => {
            wsData.push(headers.map((h) => row[h]));
          });
        } else {
          wsData.push(["Values", ...value]);
        }
        wsData.push([]); // Spacer after table
      } else if (typeof value === "object" && value !== null) {
        wsData.push([key]); // Sub-object title
        for (const [subKey, subVal] of Object.entries(value)) {
          wsData.push([subKey, subVal]);
        }
        wsData.push([]);
      } else {
        wsData.push([key, value]);
      }
    }

    wsData.push([]);
    wsData.push([]);
  };

  // Build the worksheet
  const wsData: any[][] = [];

  if (order.cutsSummary)
    addSectionToSheet(wsData, "Cuts Summary", order.cutsSummary);

  if (order.cuttingSummary)
    addSectionToSheet(wsData, "Cutting Summary", order.cuttingSummary);

  if (order.sellingSummary) {
    const { cutsTable, ...rest } = order.sellingSummary;
    addSectionToSheet(wsData, "Selling Summary", rest);

    if (cutsTable && Array.isArray(cutsTable) && cutsTable.length > 0) {
      wsData.push(["Selling Cuts Table"]);
      const headers = Object.keys(cutsTable[0]);
      wsData.push(headers);
      cutsTable.forEach((cut) => {
        wsData.push(headers.map((h) => cut[h]));
      });
      wsData.push([]);
    }
  }

  // Create the worksheet & workbook
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Order Data");

  // Export file
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}