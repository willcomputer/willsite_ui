let blogs = [];

async function loadBlogList() {
  try {
    const response = await fetch('https://api.will.computer/get-blogs');
    blogs = await response.json();

    const container = document.getElementById('root');
    container.innerHTML = '';

    let backButton = document.createElement('p');
    backButton.innerHTML = `<p><a onclick="loadHome()">Return Home</a></p>`;
    container.appendChild(backButton);


    let index = blogs.length - 1;
    blogs.toReversed().forEach(item => {
      const element = document.createElement('div');
      element.innerHTML = `<p><a onclick="displayBlogBody(this.id)" id=${index}>${item.date} - ${item.title}</a></p>`;
      container.appendChild(element);
      index--;
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}

function displayBlogBody(id) {
  const container = document.getElementById('root');
  container.innerHTML = '';
  const blogBody = document.createElement('div');

  const blogHeader = document.createElement('div');
  blogHeader.innerHTML = `
                          <p><a onclick="loadBlogList()">Return to Blog List</a></p>
                          <h2>${blogs[id]["title"]}</h2>
                          <p>${blogs[id]["date"]}</p>
                          `;
  blogBody.appendChild(blogHeader);



  blogs[id]["bodies"].forEach(item => {

    const element = document.createElement('div');

    if (item["type"] == "body") {
      element.innerHTML = `<p>${item["content"]}</p>`;
    }

    if (item["type"] == "subtitle") {
      element.innerHTML = `<h3>${item["content"]}</h3>`
    }

    if (item["type"] == "photo") {
      element.innerHTML = `<img src="https://api.will.computer/get-image?id=${item["content"]}"/>`
    }

    if (item["type"] == "question") {
      element.innerHTML = `<p class="comic-neue-regular-italic">${item["content"]}</p>`;
    }

    if (item["type"] == "quote") {
      element.innerHTML = `<blockquote class="comic-neue-regular-italic">${item["content"]}</blockquote>`;
    }

    if (item["type"] == "author") {
      element.innerHTML = `<p class="quote-author">${item["content"]}</p>`;
    }

    if (item["type"] == "link") {
      element.innerHTML = `<p><a target="_blank" href="${item["content"]}">${item["content"]}</a></p>`;
    }

    blogBody.appendChild(element);
  })

  container.appendChild(blogBody);
}