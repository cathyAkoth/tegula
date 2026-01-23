// js/news.js
const paymentPlansContainer = document.getElementById('paymentPlans');
const happyClientsContainer = document.getElementById('happyClients');

// --------- Load Payment Plans from Google Sheet CSV ---------
const paymentCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOL0irLSycVrPZjUdyoBmwMbgrqtdmbn6c2J0YgQEWWFiR5p8OHAMj7sI957XeA1jAcMHC0MQM-L3t/pub?output=csv"; // replace with your CSV link

Papa.parse(paymentCSV, {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;
    data.forEach(plan => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <span class="badge">${plan.status || 'Plan'}</span>
        <h3>${plan.title}</h3>
        <p><strong>Plan Type:</strong> ${plan.plan_type || 'N/A'}</p>
        <p><strong>Down Payment:</strong> ${plan.down_payment || 'N/A'}</p>
        <p><strong>Installment Period:</strong> ${plan.installment_period || 'N/A'}</p>
        <p><strong>Benefit:</strong> ${plan.benefit || 'N/A'}</p>
        <p>${plan.description || ''}</p>
      `;
      paymentPlansContainer.appendChild(card);
    });
  }
});

// --------- Load Happy Clients from Google Sheet CSV ---------
const clientsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRC_KrmfQQ6BMFssNb9CptWd5UVZhZsgiZhYEq1mgccCZqid0ZIuALu-1bIZhALkyRLtCqaSCOzgT1V/pub?output=csv"; // replace with your CSV link

Papa.parse(clientsCSV, {
  download: true,
  header: true,
  complete: function(results) {
    const data = results.data;
    data.forEach(client => {
      const card = document.createElement('div');
      card.classList.add('testimonial-card');
      card.innerHTML = `
        <img src="${client.image}" alt="${client.client_name}">
        <h4>${client.client_name} (${client.client_type})</h4>
        <p>${client.story}</p>
        <p><strong>Property Type:</strong> ${client.property_type || 'N/A'}</p>
        <p><strong>Location:</strong> ${client.location || 'N/A'}</p>
      `;
      happyClientsContainer.appendChild(card);
    });
  }
});

// --------- Carousel Navigation for Happy Clients ---------
const prevBtn = document.getElementById('prevClient');
const nextBtn = document.getElementById('nextClient');

let offset = 0;
const cardWidth = 370; // approximate width including gap

nextBtn.addEventListener('click', () => {
  const maxOffset = happyClientsContainer.scrollWidth - happyClientsContainer.clientWidth;
  offset += cardWidth;
  if(offset > maxOffset) offset = 0;
  happyClientsContainer.style.transform = `translateX(-${offset}px)`;
});

prevBtn.addEventListener('click', () => {
  const maxOffset = happyClientsContainer.scrollWidth - happyClientsContainer.clientWidth;
  offset -= cardWidth;
  if(offset < 0) offset = maxOffset;
  happyClientsContainer.style.transform = `translateX(-${offset}px)`;
});
