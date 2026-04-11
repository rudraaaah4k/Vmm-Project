
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});


function parseInputArray(value) {
  return value
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "")
    .map(Number);
}


function runAlgorithm(type) {
  const referenceString = parseInputArray(document.getElementById("referenceString").value);
  const frameCount = parseInt(document.getElementById("frameCount").value);

  if (!referenceString.length || frameCount <= 0) {
    alert("Please enter valid reference string and frame count.");
    return;
  }

  let result;
  if (type === "LRU") {
    result = simulateLRU(referenceString, frameCount);
  } else {
    result = simulateOptimal(referenceString, frameCount);
  }

  displayPagingResult(type, result, frameCount);
}

function simulateLRU(referenceString, frameCount) {
  let frames = [];
  let faults = 0;
  let history = [];
  let recentUse = new Map();

  referenceString.forEach((page, index) => {
    let hit = frames.includes(page);

    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        let lruPage = frames[0];
        let leastRecent = recentUse.get(lruPage) ?? -1;

        frames.forEach(p => {
          let usedAt = recentUse.get(p) ?? -1;
          if (usedAt < leastRecent) {
            leastRecent = usedAt;
            lruPage = p;
          }
        });

        frames[frames.indexOf(lruPage)] = page;
      }
    }

    recentUse.set(page, index);
    history.push({
      page,
      frames: [...frames],
      status: hit ? "Hit" : "Fault"
    });
  });

  return { history, faults, hits: referenceString.length - faults };
}

function simulateOptimal(referenceString, frameCount) {
  let frames = [];
  let faults = 0;
  let history = [];

  referenceString.forEach((page, index) => {
    let hit = frames.includes(page);

    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        let pageToReplace = -1;
        let farthest = -1;

        for (let i = 0; i < frames.length; i++) {
          let nextUse = referenceString.slice(index + 1).indexOf(frames[i]);

          if (nextUse === -1) {
            pageToReplace = i;
            break;
          }

          if (nextUse > farthest) {
            farthest = nextUse;
            pageToReplace = i;
          }
        }

        frames[pageToReplace] = page;
      }
    }

    history.push({
      page,
      frames: [...frames],
      status: hit ? "Hit" : "Fault"
    });
  });

  return { history, faults, hits: referenceString.length - faults };
}

function displayPagingResult(type, result, frameCount) {
  const summary = document.getElementById("pagingSummary");
  const container = document.getElementById("pagingTableContainer");

  summary.innerHTML = `
    <p><strong>Algorithm:</strong> ${type}</p>
    <p><strong>Total Page Faults:</strong> ${result.faults}</p>
    <p><strong>Total Hits:</strong> ${result.hits}</p>
    <p><strong>Hit Ratio:</strong> ${(result.hits / (result.hits + result.faults)).toFixed(2)}</p>
  `;

  let table = `
    <table>
      <thead>
        <tr>
          <th>Step</th>
          <th>Page</th>
          ${Array.from({ length: frameCount }, (_, i) => `<th>Frame ${i + 1}</th>`).join("")}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  result.history.forEach((entry, index) => {
    table += `<tr class="${entry.status === "Hit" ? "hit" : "fault"}">
      <td>${index + 1}</td>
      <td>${entry.page}</td>`;

    for (let i = 0; i < frameCount; i++) {
      table += `<td>${entry.frames[i] !== undefined ? entry.frames[i] : "-"}</td>`;
    }

    table += `<td>${entry.status}</td></tr>`;
  });

  table += `</tbody></table>`;
  container.innerHTML = table;
}

function clearPaging() {
  document.getElementById("pagingSummary").innerHTML = "";
  document.getElementById("pagingTableContainer").innerHTML = "";
}


function runSegmentation() {
  const bases = parseInputArray(document.getElementById("segmentBases").value);
  const limits = parseInputArray(document.getElementById("segmentLimits").value);
  const segNo = parseInt(document.getElementById("segmentNumber").value);
  const offset = parseInt(document.getElementById("segmentOffset").value);

  const output = document.getElementById("segmentationOutput");

  if (bases.length !== limits.length) {
    output.innerHTML = `<p style="color:red;">Number of bases and limits must be same.</p>`;
    return;
  }

  if (segNo < 0 || segNo >= bases.length) {
    output.innerHTML = `<p style="color:red;">Invalid segment number.</p>`;
    return;
  }

  if (offset < limits[segNo]) {
    const physicalAddress = bases[segNo] + offset;
    output.innerHTML = `
      <p><strong>Valid Access</strong></p>
      <p>Segment Number: ${segNo}</p>
      <p>Base Address: ${bases[segNo]}</p>
      <p>Limit: ${limits[segNo]}</p>
      <p>Offset: ${offset}</p>
      <p><strong>Physical Address = Base + Offset = ${physicalAddress}</strong></p>
    `;
  } else {
    output.innerHTML = `
      <p style="color:red;"><strong>Invalid Access</strong></p>
      <p>Offset exceeds segment limit, so trap occurs.</p>
    `;
  }
}

function clearSegmentation() {
  document.getElementById("segmentationOutput").innerHTML = "";
}


function runFragmentation() {
  const blocks = parseInputArray(document.getElementById("blockSizes").value);
  const processes = parseInputArray(document.getElementById("processSizes").value);
  const output = document.getElementById("fragmentationOutput");

  let allocation = new Array(processes.length).fill(-1);
  let remainingBlocks = [...blocks];

  for (let i = 0; i < processes.length; i++) {
    for (let j = 0; j < remainingBlocks.length; j++) {
      if (remainingBlocks[j] >= processes[i]) {
        allocation[i] = j;
        remainingBlocks[j] -= processes[i];
        break;
      }
    }
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Process No.</th>
          <th>Process Size</th>
          <th>Allocated Block</th>
          <th>Remaining in Block</th>
        </tr>
      </thead>
      <tbody>
  `;

  let internalFragmentation = 0;

  for (let i = 0; i < processes.length; i++) {
    if (allocation[i] !== -1) {
      html += `
        <tr>
          <td>P${i + 1}</td>
          <td>${processes[i]}</td>
          <td>${allocation[i] + 1}</td>
          <td>${remainingBlocks[allocation[i]]}</td>
        </tr>
      `;
    } else {
      html += `
        <tr>
          <td>P${i + 1}</td>
          <td>${processes[i]}</td>
          <td>Not Allocated</td>
          <td>-</td>
        </tr>
      `;
    }
  }

  html += `</tbody></table>`;

  remainingBlocks.forEach(space => {
    internalFragmentation += space;
  });

  html += `
    <p style="margin-top:15px;"><strong>Total Remaining Free Space:</strong> ${internalFragmentation}</p>
    <p><strong>Observation:</strong> If total free space exists but is scattered in small pieces, it represents external fragmentation. Wasted space inside allocated partitions represents internal fragmentation.</p>
  `;

  output.innerHTML = html;
}

function clearFragmentation() {
  document.getElementById("fragmentationOutput").innerHTML = "";
}
