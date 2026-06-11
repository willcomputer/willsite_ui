let blogs = [];

async function loadBlogList() {
  try {
    const response = await fetch('https://api.will.computer/get-blogs');
    blogs = await response.json();

    const container = document.getElementById('root');
    container.innerHTML = '';

    let index = blogs.length - 1;
    blogs.toReversed().forEach(item => {
      const element = document.createElement('div');
      element.innerHTML = `<p><a onclick="displayBlogBody(this.id)" id=${index}>${item.date} - ${item.title}</a></p>`;
      container.appendChild(element);
      index--;
    });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

function displayBlogBody(id) {
  const container = document.getElementById('root');
  container.innerHTML = '';
  const blogBody = document.createElement('div');

  const backbutton = document.createElement('div');
  backbutton.innerHTML = '<p><a onclick="loadBlogList()">Return to Blog List</a></p>';
  blogBody.appendChild(backbutton);

  console.log(blogs[id]);

  blogs[id]["bodies"].forEach(item => {

    const element = document.createElement('div');

    if (item["type"] == "body") {
      element.innerHTML = `<p>${item["content"]}</p>`;
    }

    if (item["type"] == "photo") {
      element.innerHTML = `<img src="https://api.will.computer/get-image?id=${item["content"]}"/>`
    }

    blogBody.appendChild(element);
  })

  container.appendChild(blogBody);
}