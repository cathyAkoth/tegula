const AVAILABLE_SHEET =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCOyc82XL_vxkOAijXu-ssTbmfa6cB8xR_bSvBMe0JCndN2WJgdTiEbGLPISz32ZhPO1Cdc3IVqJEt/pub?output=csv';

const COMPLETED_SHEET =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTet2E1HIVpsOWA5FCuK00h7c0rqdQrKgRYGqphsKE2eabEZmHwO-5idarZufYSnQ02SXR1Fx_4QKiR/pub?output=csv';

let availableData = [];
let completedData = [];
let availableLimit = 6;
let completedLimit = 6;

// FETCH AVAILABLE PROJECTS
Papa.parse(AVAILABLE_SHEET, {
  download: true,
  header: true,
  complete: res => {
    availableData = res.data;
    renderAvailable();
  }
});

// FETCH COMPLETED PROJECTS
Papa.parse(COMPLETED_SHEET, {
  download: true,
  header: true,
  complete: res => {
    completedData = res.data;
    renderCompleted();
  }
});

function renderAvailable() {
  const container = document.getElementById('availableProjects');
  container.innerHTML = '';

  const search = document.getElementById('searchAvailable').value.toLowerCase();
  const type = document.getElementById('typeFilter').value;
  const status = document.getElementById('statusFilter').value;

  let filtered = availableData.filter(p => {
    const matchSearch =
      p.name?.toLowerCase().includes(search) ||
      p.location?.toLowerCase().includes(search);

    const matchType = type === 'all' || p.type === type;
    const matchStatus = status === 'all' || p.Status === status;

    return matchSearch && matchType && matchStatus;
  });

  filtered.slice(0, availableLimit).forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image || 'https://via.placeholder.com/400x250'}">
        <div class="info">
          <h3>${p.name}</h3>
          <p><strong>Location:</strong> ${p.location}</p>
          <p><strong>Type:</strong> ${p.type}</p>
          <p><strong>Status:</strong> ${p.Status}</p>
          <p><strong>Price:</strong> ${p.price}</p>
          <p>${p.details}</p>
        </div>
      </div>
    `;
  });
}

function renderCompleted() {
  const container = document.getElementById('completedProjects');
  container.innerHTML = '';

  completedData.slice(0, completedLimit).forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image || 'https://via.placeholder.com/400x250'}">
        <div class="info">
          <h3>${p.project_name}</h3>
          <p><strong>Location:</strong> ${p.location}</p>
          <p><strong>Client:</strong> ${p.client_name}</p>
          <p>${p.description}</p>
        </div>
      </div>
    `;
  });
}

// EVENTS
document.getElementById('searchAvailable').addEventListener('input', renderAvailable);
document.getElementById('typeFilter').addEventListener('change', renderAvailable);
document.getElementById('statusFilter').addEventListener('change', renderAvailable);

document.getElementById('loadMoreAvailable').onclick = () => {
  availableLimit += 6;
  renderAvailable();
};

document.getElementById('loadMoreCompleted').onclick = () => {
  completedLimit += 6;
  renderCompleted();
};


// Load Handed Over Projects
fetch(handedURL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("handed-projects");
    data.forEach(project => {
      container.innerHTML += `
        <div class="project-card">
          <img src="${project.image}" alt="${project.project_name}">
          <div class="content">
            <span class="badge completed">Completed</span>
            <h3>${project.project_name}</h3>
            <p><strong>Location:</strong> ${project.location}</p>
            <p>"${project.feedback}"</p>
            <div class="client">— ${project.client_name}</div>
          </div>
        </div>
      `;
    });
  });
