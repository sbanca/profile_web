// utils.js

export function generateLinks(links) {
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