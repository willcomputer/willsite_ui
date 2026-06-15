let health = {};

async function loadServerHealth() {
    try {
        const response = await fetch('https://api.will.computer/pi-health');
        health = await response.json();

        const container = document.getElementById('root');
        container.innerHTML = '';

        let backButton = document.createElement('p');
        backButton.innerHTML = `<p><a onclick="loadHome()">Return Home</a></p>`;
        container.appendChild(backButton);

        const cpu = document.createElement('p');
        cpu.innerHTML = `<p>CPU Load: ${health['cpuLoadPercentage']}%</p>`;

        const memory = document.createElement('p');
        memory.innerHTML = `<p>Memory Used: ${health['percentUsedMemory']}%</p>`;

        const temp = document.createElement('p');
        temp.innerHTML = `<p>Temperature: ${health['temperature']} °C</p>`;

        container.appendChild(cpu);
        container.appendChild(memory);
        container.appendChild(temp);

  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

//   setTimeout(loadServerHealth, 3000);
}