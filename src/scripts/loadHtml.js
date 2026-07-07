// Function to load file content into a specific element
export async function loadFileToElement(fileUrl, elementId) {
    await fetch(fileUrl)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response error');
        }
        return response.text(); // Parse the file content as plain text
        })
        .then(htmlText => {
        document.getElementById(elementId).innerHTML = htmlText;
        })
        .catch(error => console.error('Error loading file:', error));
}

// Example usage:
// loadFileToElement('content.html', 'my-div-container');
