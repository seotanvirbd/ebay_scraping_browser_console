
// eBay Listing Data Scraper
// Run this in the browser console on the eBay search results page

function scrapeEbayListings() {
    const listings = [];
    
    // Find all listing items
    const listingElements = document.querySelectorAll('li.brwrvr__item-card');
    
    console.log(`Found ${listingElements.length} listings to scrape...`);
    
    listingElements.forEach((listing, index) => {
        try {
            const data = {};
            
            // Extract title
            const titleElement = listing.querySelector('h3.bsig__title__text');
            data.title = titleElement ? titleElement.textContent.trim() : null;
            
            // Extract link
            const linkElement = listing.querySelector('a.bsig__title__wrapper');
            data.link = linkElement ? linkElement.href : null;
            
            // Extract item ID from link
            if (data.link) {
                const itemIdMatch = data.link.match(/\/itm\/(\d+)/);
                data.itemId = itemIdMatch ? itemIdMatch[1] : null;
            }
            
            // Extract condition and brand
            const conditionElement = listing.querySelector('.bsig__listingCondition');
            if (conditionElement) {
                const conditionText = conditionElement.textContent.trim();
                const parts = conditionText.split(' · ');
                data.condition = parts[0] ? parts[0].trim() : null;
                data.brand = parts[1] ? parts[1].trim() : null;
            }
            
            // Extract current price
            const priceElement = listing.querySelector('.bsig__price--displayprice');
            data.currentPrice = priceElement ? priceElement.textContent.trim() : null;
            
            // Extract previous price (if on sale)
            const previousPriceElement = listing.querySelector('.bsig__previousPrice .strikethrough');
            data.previousPrice = previousPriceElement ? previousPriceElement.textContent.trim() : null;
            
            // Extract shipping info
            const shippingElement = listing.querySelector('.bsig__logisticsCost');
            data.shipping = shippingElement ? shippingElement.textContent.trim() : null;
            
            // Extract sales count
            const salesElement = listing.querySelector('.bsig__item-hotness .textual-display');
            data.salesCount = salesElement ? salesElement.textContent.trim() : null;
            
            // Extract main image URL
            const imageElement = listing.querySelector('.brwrvr__item-card__image');
            data.imageUrl = imageElement ? imageElement.src : null;
            
            // Extract all image URLs from carousel
            const carouselImages = listing.querySelectorAll('.carousel__list img');
            data.allImages = Array.from(carouselImages).map(img => 
                img.getAttribute('data-originalsrc') || img.src
            ).filter(url => url && !url.includes('s_1x2.gif'));
            
            // Check if it's sponsored
            const sponsoredElement = listing.querySelector('.su-sponsored-label');
            data.isSponsored = sponsoredElement ? true : false;
            
            // Extract tracking data (item ID, etc.)
            const trackingElement = listing.querySelector('[data-track]');
            if (trackingElement) {
                try {
                    const trackingData = JSON.parse(trackingElement.getAttribute('data-track'));
                    data.trackingId = trackingData.eventProperty?.trackableId || null;
                } catch (e) {
                    data.trackingId = null;
                }
            }
            
            listings.push(data);
            console.log(`Scraped listing ${index + 1}:`, data.title);
            
        } catch (error) {
            console.error(`Error scraping listing ${index + 1}:`, error);
        }
    });
    
    return listings;
}

// Run the scraper
const scrapedData = scrapeEbayListings();

// Display results
console.log('\n=== SCRAPING COMPLETE ===');
console.log(`Total listings scraped: ${scrapedData.length}`);
console.table(scrapedData.map(item => ({
    Title: item.title?.substring(0, 50) + '...',
    Price: item.currentPrice,
    Condition: item.condition,
    Brand: item.brand,
    Sales: item.salesCount,
    Sponsored: item.isSponsored ? 'Yes' : 'No'
})));
