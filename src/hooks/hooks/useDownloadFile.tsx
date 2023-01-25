export const useDownloadFile = (blobPart: Blob, fileName: string) => {
  const file = new Blob(
    [blobPart], //
    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  );
  const fileURL = window.URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = fileURL;
  link.setAttribute('download', `${fileName}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// RESERVE

// interface IType {
//   type: string;
//   mime: string;
// }
//
// export const downloadFile = (blobPart: Blob, fileName: string, { type, mime }: IType) => {
//   const file = new Blob([blobPart], { type: mime });
//   const fileURL = window.URL.createObjectURL(file);
//   const link = document.createElement('a');
//
//   link.href = fileURL;
//   link.setAttribute('download', `${fileName}.${type}`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
