let report = []

function loadBilliards1() {
    const container = document.getElementById('root');
    container.innerHTML = '';
    const body = document.createElement('div');

    body.innerHTML = `
    <p>under construction...</p>
    `;
    container.appendChild(body);
}

async function loadBilliards() {
  try {
    const response = await fetch('https://api.will.computer/get-rds-report');
    report = await response.json();

    const container = document.getElementById('root');
    container.innerHTML = '';
    console.log(report)
    
    // blogs.forEach(item => {
    //   const element = document.createElement('div');
    //   element.innerHTML = `<p><a onclick="displayBlogBody(this.id)" id=${index}>${item.date} - ${item.title}</a></p>`;
    //   container.appendChild(element);
    // });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}