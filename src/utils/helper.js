export const formatURL = (s) => {
  let result = s.toLowerCase();
  result = '/' + result + 's'
  result = result.replace('&', '')
  return result;
};

export const formatOrderCode = (time) => {
  return time.getYears() + time.getMonths() + time.getDates() + time.getHours() + time.getMinutes() + time.getSeconds() + ""
}

// const onFileUpload = () => {
//   const formData = new FormData();

//   formData.append(
//       "myFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//   );

//   // Details of the uploaded file
//   console.log(this.state.selectedFile);

//   // Request made to the backend api
//   // Send formData object
//   setImage(this.state)
// };