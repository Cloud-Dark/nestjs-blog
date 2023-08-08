import React, { useState } from 'react';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleUpload = () => {
    const url = 'https://temp.sh/upload';
  
    const formData = new FormData();
    formData.append('uploadfile', selectedFile);
    formData.append('submit', 'Upload!');
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text()) // Convert response to text
      .then(result => {
        document.getElementById('result').textContent = result; // Set the result as the text content of the div
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  return (
    <div>
      <input type="file" name="file" onChange={handleFileChange} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div id="result"></div>
    </div>
  );
}

export default FileUploadPage;