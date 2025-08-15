# 🛍️ eBay Scraper - Browser Console Edition

> **Scrape eBay listings directly from your browser console - Zero installations required!**

## 🚀 What You Can Extract
- **Product titles** and descriptions
- **Current & previous prices** (sale detection)
- **Shipping costs** and availability
- **Product condition** and brand info
- **Sales count** and popularity metrics
- **Product images** (main + carousel)
- **Item IDs** and direct links
- **Sponsored listing** detection

## 📁 Files Structure
```
├── README.md                    # This guide
├── ebay_without_pagination.js   # Complete eBay scraper
├── utils.js                     # Export utilities (JSON/CSV/Excel)
└── examples/                    # Sample outputs
```

## ⚡ Quick Start

### Method 1: Complete Script (Recommended)
1. Go to **eBay search results page** (any search)
2. Press `F12` → Open **Console** tab  
3. Copy-paste `ebay_without_pagination.js`
4. Hit **Enter** - data appears in console table
5. Load `utils.js` and run `exportData(scrapedData)` for file downloads

### Method 2: Step by Step
1. **Load utilities first**: Paste `utils.js` code
2. **Run eBay scraper**: Paste `ebay_without_pagination.js`
3. **Export results**: `exportData(scrapedData, 'ebay_listings')`

## 🎯 Key Features
- ✅ **No software installation** - works in any browser
- ✅ **Comprehensive data extraction** - prices, images, ratings
- ✅ **Anti-detection friendly** - uses natural browser behavior
- ✅ **Export to multiple formats** (JSON, CSV, Excel)
- ✅ **Handles dynamic content** - waits for elements to load
- ✅ **Error handling** - continues even if some items fail

## 🔧 Customization Examples

### Target Different eBay Pages
```javascript
// For specific categories, searches, or seller pages
// The scraper automatically adapts to eBay's listing structure
```

### Extract Additional Data
```javascript
// Add to the scraping function:
data.sellerName = listing.querySelector('.seller-name')?.textContent?.trim();
data.location = listing.querySelector('.item-location')?.textContent?.trim();
data.watchers = listing.querySelector('.watchers-count')?.textContent?.trim();
```

### Filter Results
```javascript
// Only get items under $50
const affordableItems = scrapedData.filter(item => 
  parseFloat(item.currentPrice.replace(/[^0-9.]/g, '')) < 50
);
```

## 📊 Sample Output
```json
{
  "title": "iPhone 13 Pro Max 128GB Unlocked",
  "currentPrice": "$899.99",
  "previousPrice": "$999.99", 
  "condition": "Used",
  "brand": "Apple",
  "shipping": "Free shipping",
  "salesCount": "142 sold",
  "itemId": "123456789",
  "link": "https://ebay.com/itm/123456789",
  "isSponsored": false,
  "imageUrl": "https://i.ebayimg.com/...",
  "allImages": ["url1", "url2", "url3"]
}
```

## 🛡️ Best Practices
- **Respect rate limits** - don't scrape too aggressively
- **Check robots.txt** - follow eBay's guidelines
- **Use for personal research** - respect terms of service
- **Test on small datasets** first before bulk scraping
- **Handle errors gracefully** - some listings may have different structures

## 🚫 Limitations
- Only scrapes **current page** (no auto-pagination)
- **Dynamic content** may require page refresh
- **Anti-bot measures** may limit intensive scraping
- Some **premium listings** may have different selectors

## 🔗 Extending to Other Sites
The same principles work on other e-commerce sites:
- **Amazon** - modify selectors for product cards
- **Mercari** - adapt for different price structures  
- **Facebook Marketplace** - handle social media layouts
- **Craigslist** - simple list-based scraping

## ⚠️ Legal Notice
- Always respect website **terms of service**
- Use scraped data **responsibly** and **ethically**
- Don't overload servers with **excessive requests**
- Consider **official APIs** when available

## 📺 Video Tutorial
Watch the complete walkthrough: [Your YouTube Link]

---

**Start scraping eBay in under 2 minutes! 🎉**  
*No Python, no Node.js - just your browser and JavaScript magic!*
