document.addEventListener('DOMContentLoaded', () => {
    // Get the current page filename to identify the article
    const currentPage = window.location.pathname.split('/').pop();

    fetch('articles.json')
        .then(response => response.json())
        .then(articles => {
            // Find the article that matches the current page
            const currentArticle = articles.find(article => article.file === currentPage);

            if (currentArticle) {
                const publishDate = new Date(currentArticle.publish_date);
                const expiryDate = new Date(publishDate);
                expiryDate.setDate(publishDate.getDate() + 7);

                const today = new Date();
                const timeDiff = expiryDate.getTime() - today.getTime();
                const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                if (daysLeft > 0) {
                    // Create the banner element
                    const banner = document.createElement('div');
                    banner.className = 'expiry-banner';

                    // Create the banner content
                    banner.innerHTML = `
                        <p>
                            This article's view will expire in <strong>${daysLeft}</strong> day(s).
                            You can read the original at <a href="${currentArticle.original_url}" target="_blank">the original source</a>.
                        </p>
                    `;

                    // Add the banner to the top of the body
                    document.body.insertBefore(banner, document.body.firstChild);
                }
            }
        })
        .catch(error => console.error('Error loading article data:', error));
});