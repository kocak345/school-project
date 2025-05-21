function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

document.getElementById('upload-button').addEventListener('click', () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result; // Base64-encoded content
        const files = JSON.parse(localStorage.getItem('files')) || [];

        // Save file name and content to localStorage
        files.push({ name: file.name, content: fileContent });
        localStorage.setItem('files', JSON.stringify(files));

        alert('File uploaded and saved!');
        displayFiles();
    };

    reader.readAsDataURL(file); // Convert file to Base64
});

function displayFiles() {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    const fileList = document.getElementById('file-list');

    fileList.innerHTML = ''; // Clear the list

    files.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.style.marginLeft = '10px';
        downloadButton.addEventListener('click', () => {
            downloadFile(file.name, file.content);
        });

        listItem.appendChild(downloadButton);
        fileList.appendChild(listItem);
    });
}

function downloadFile(fileName, content) {
    const link = document.createElement('a');
    link.href = content; // Base64-encoded file
    link.download = fileName;
    link.click();
}

// Display saved files on page load
displayFiles();