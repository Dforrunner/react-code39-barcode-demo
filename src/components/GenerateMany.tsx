import React, { useState } from 'react';

export default function GenerateMany() {
  const [csvData, setCSVData] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        const rows = contents.split('\n');
        const headers = rows[0].split(',');
        const data = rows.slice(1).map((row) => {
          const values = row.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {} as any);
        });
        setCSVData(data);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      {csvData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value as any}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
