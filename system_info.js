async function updateSystemInfo() {
  const ul = document.getElementById('system_info');
  if (!ul) {
    return;
  }

  try {
    const cpuUsage = await getCpuUsage();
    const memoryUsage = await getMemoryUsage();

    const newItems = [
      { label: 'CPU', value: cpuUsage },
      { label: 'Memory', value: memoryUsage }
    ];

    updateListIfChanged(ul, newItems);
  } catch (error) {
    console.error('Error updating system info:', error);
    const newItems = [
      { label: 'Error', value: 'Failed to retrieve system info' }
    ];
    updateListIfChanged(ul, newItems);
  }
}

async function getCpuUsage() {
  try {
    const info = await new Promise((resolve, reject) => {
      chrome.system.cpu.getInfo((info) => {
        if (info) {
          resolve(info);
        } else {
          reject(new Error('Failed to retrieve CPU info'));
        }
      });
    });

    const totalUsage = info.processors.reduce((sum, processor) => {
      const total = processor.usage.total;
      const busy = total - processor.usage.idle;
      return sum + (busy / total) * 100;
    }, 0) / info.numOfProcessors;

    return `${totalUsage.toFixed(2)}%`;
  } catch (error) {
    console.error(`Error calculating CPU usage: ${error.message}`);
    throw error;
  }
}

async function getMemoryUsage() {
  try {
    const info = await new Promise((resolve, reject) => {
      chrome.system.memory.getInfo((info) => {
        if (info) {
          resolve(info);
        } else {
          reject(new Error('Failed to retrieve memory info'));
        }
      });
    });

    const totalMemory = info.capacity / (1024 * 1024 * 1024); // convert to GB
    const availableMemory = info.availableCapacity / (1024 * 1024 * 1024);
    const usedMemory = totalMemory - availableMemory;
    const usagePercent = (usedMemory / totalMemory) * 100;

    return `${usedMemory.toFixed(2)}/${totalMemory.toFixed(2)}GB (${usagePercent.toFixed(2)}%)`;
  } catch (error) {
    console.error(`Error calculating memory usage: ${error.message}`);
    throw error;
  }
}
