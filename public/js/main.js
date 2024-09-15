// main.js

// Import the shared database reference from firebase.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { generateLinks } from './utils.js';

// Reference to the 'publications' node
const publicationsRef = ref(database, 'publications');

// Fetch and display publications
get(publicationsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const publications = snapshot.val();
      displayPublications(publications);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error('Error fetching publications:', error);
  });

function displayPublications(publications) {
  const publicationsContainer = document.getElementById('publications-container');
  publicationsContainer.innerHTML = '';

  const publicationArray = Object.values(publications);
  shuffleArray(publicationArray);

  Object.entries(publications).forEach(([pubId, pub]) => {
    const publicationHTML = generatePublicationHTML(pub, pubId);
    publicationsContainer.insertAdjacentHTML('beforeend', publicationHTML);
  });

  // Make entire card clickable by adding an event listener
  document.querySelectorAll('.publication-card').forEach(card => {
    card.addEventListener('click', function () {
      const pubId = this.getAttribute('data-id');
      window.location.href = `publication.html?id=${pubId}`;
    });
  });
}


function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

// Function to generate the publication card markup
function generatePublicationHTML(pub, pubId) {
  const authors = pub.authors.join(', ');
  const tagsHTML = pub.tags ? pub.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '';
  const linksHTML = generateLinks(pub.links);

  const backgroundStyle = pub.thumbnailUrl ? `style="background-image: url(${pub.thumbnailUrl})"` : `style="background-image: url('images/150.png')"`; 

  return `
    <div class="row publication-card" data-id="${pubId}">
      <div class="three columns card-thumbnail" ${backgroundStyle}></div>
      <div class="nine columns card-content">
        <p class="publication-venue">${pub.venue || ''}</p>
        <h5 class="publication-title">${pub.title}</h5>
        <p class="publication-authors">${authors}</p>
        <div class="publication-tags">${tagsHTML}</div>
        <div class="card-footer">
          <div class="publication-links">${linksHTML}</div>
        </div>
      </div>
    </div>
  `;
}



// main.js