let blogs = [];

async function loadBlogs() {
  try {
    const response = await fetch('https://api.will.computer/get-blogs');
    blogs = await response.json();
    
    const container = document.getElementById('blog');
    container.innerHTML = '';
    
    let index = blogs.length - 1;
    blogs.toReversed().forEach(item => {
      const element = document.createElement('div');
      element.innerHTML = `<p><a onclick="displayBody(this.id)" id=${index}>${item.date} - ${item.title}</a></p>`;
      container.appendChild(element);
      index--;
    });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

function displayBody(id) {
    const container = document.getElementById('blog');
    container.innerHTML = '';
    const blogBody = document.createElement('div');

    const backbutton = document.createElement('div');
    backbutton.innerHTML = '<p><a onclick="loadBlogs()">Return to Blog List</a></p>';
    blogBody.appendChild(backbutton);


    blogs[id]["bodies"].forEach(item => {
        if (item["type"] == "body") {
            const element = document.createElement('p');
            element.innerHTML = item["content"];
            blogBody.appendChild(element)
        }

    })
    container.appendChild(blogBody)
}

console.log("Hello, World!")

loadBlogs();
