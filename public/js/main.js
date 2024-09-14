// main.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9GQOtuqi7EB_mud57UjxYylLxrrlMiXk",
  authDomain: "web-profile-rb.firebaseapp.com",
  databaseURL: "https://web-profile-rb-default-rtdb.firebaseio.com",
  projectId: "web-profile-rb",
  storageBucket: "web-profile-rb.appspot.com",
  messagingSenderId: "1083266735534",
  appId: "1:1083266735534:web:3b993e9be258b2b0367c3f",
  measurementId: "G-NC4XWE04J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

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

// Rest of your code remains the same
function displayPublications(publications) {
  const publicationsContainer = document.getElementById('publications-container');
  publicationsContainer.innerHTML = '';

  const publicationArray = Object.values(publications);
  shuffleArray(publicationArray);

  publicationArray.forEach((pub) => {
    const publicationHTML = generatePublicationHTML(pub);
    publicationsContainer.insertAdjacentHTML('beforeend', publicationHTML);
  });
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function generatePublicationHTML(pub) {
  const authors = pub.authors.join(', ');

  return `
    <h6 style="margin-bottom: 0px">
      <strong>${pub.title}</strong>
      ${generateLinks(pub.links)}
    </h6>
    <p><em>${authors}</em></p>
  `;
}

function generateLinks(links) {
    let linksHTML = '';
    
    if (links.acm) {
      linksHTML += ` <a href="${links.acm}"><img style="bottom: -5px; position: relative;color: #222" src="/images/DL_icon.svg" alt="ACM Digital Library"></a>`;
    }
    if (links.github) {
      linksHTML += ` <a href="${links.github}"><i class="fa-brands fa-square-github fa-xl" aria-hidden="true"></i></a>`;
    }
    if (links.arxiv) {
      linksHTML += ` <a href="${links.arxiv}"><img style="bottom: -5px; position: relative;width: 50px; color: #222" src="/images/arxiv.png" alt="arXiv"></a>`;
    }
    if (links.eusset) {
      linksHTML += ` <a href="${links.eusset}"><img style="bottom: -5px; position: relative;width: 20px; color: #222" src="/images/eus.png" alt="EUSSET"></a>`;
    }
    if (links.youtube) {
      linksHTML += ` <a href="${links.youtube}"><i class="fa-brands fa-youtube fa-xl" aria-hidden="true"></i></a>`;
    }
    if (links.springer) {
      linksHTML += ` <a href="${links.springer}"><img style="bottom: -2px; position: relative;width: 70px; color: #222" src="/images/springer.png" alt="Springer"></a>`;
    }
    if (links.ieee) {
      linksHTML += ` <a href="${links.ieee}"><img style="bottom: -2px; position: relative;width: 50px; color: #222" src="/images/ieee-1.svg" alt="IEEE"></a>`;
    }
    if (links.frontiers) {
      linksHTML += ` <a href="${links.frontiers}"><img style="bottom: -5px; position: relative;width: 90px; color: #222" src="/images/frontiers.svg" alt="Frontiers"></a>`;
    }
    if (links.doi) {
      linksHTML += ` <a href="${links.doi}">DOI</a>`;
    }
    if (links.pdf) {
      linksHTML += ` <a href="${links.pdf}"><i class="fa-solid fa-file-pdf fa-xl" aria-hidden="true"></i></a>`;
    }
    
    return linksHTML;
  }
  