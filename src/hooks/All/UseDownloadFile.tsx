export const DownloadXlsxFile = (blobPart: Blob, additionalName: string) => {
  const file = new Blob(
    [blobPart], //
    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  );
  const fileURL = window.URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = fileURL;
  link.setAttribute('download', `${additionalName}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
