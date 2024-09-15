// Import the Firebase setup from firebase.js
import { database } from './firebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { generateLinks } from './utils.js';

// Get the publication ID from the URL
function getPublicationIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Reference to the 'publications' node
const publicationId = getPublicationIdFromURL();

if (publicationId) {
    const publicationRef = ref(database, `publications/${publicationId}`);
    get(publicationRef).then((snapshot) => {
        if (snapshot.exists()) {
            const pub = snapshot.val();
            displayPublicationDetails(pub);
        } else {
            document.getElementById('publication-title').textContent = 'Publication Not Found';
            document.getElementById('publication-abstract').textContent = '';
        }
    }).catch((error) => {
        console.error('Error fetching publication:', error);
    });
}

// Function to display the publication details
function displayPublicationDetails(pub) {
  const publicationTitle = document.getElementById('publication-title');
  const publicationAuthors = document.getElementById('publication-authors');
  const publicationAbstract = document.getElementById('publication-abstract');
  const publicationImage = document.getElementById('publication-image');
  const youtubeContainer = document.getElementById('youtube-container');
  const publicationLinks = document.getElementById('publication-links');
  const publicationvenue = document.getElementById('publication-venue');

  // Set the title
  publicationTitle.textContent = pub.title;

  // Set the venue
  publicationvenue.textContent = pub.venue || 'Venue not available';

  // Set the authors
  publicationAuthors.textContent = pub.authors.join(', ');

  // Set the abstract
  publicationAbstract.textContent = pub.abstract || 'Abstract not available.';

  // Display image if imageUrl exists
  if (pub.imageUrl) {
    publicationImage.src = pub.imageUrl;
    publicationImage.alt = `Image for ${pub.title}`;
  } else {
    // If no image is available, you can hide the img element or show a placeholder
    publicationImage.style.display = 'none'; // Hide the image element
  }

  // Display YouTube video if available
  if (pub.links && pub.links.youtube) {
    const youtubeIframe = `
      <div class="youtube-video">
        <iframe 
          src="https://www.youtube.com/embed/${getYouTubeId(pub.links.youtube)}" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>`;
    youtubeContainer.innerHTML = youtubeIframe;
  } else {
    youtubeContainer.style.display = 'none'; // Hide YouTube container if no video
  }

  // Generate links (if available)
  const linksHTML = generateLinks(pub.links);
  publicationLinks.innerHTML = linksHTML;
}

// Utility function to extract YouTube video ID from a URL
function getYouTubeId(url) {
    const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}


