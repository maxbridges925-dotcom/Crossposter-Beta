import puppeteer from 'puppeteer';

/**
 * Automates listing an item on a secondhand platform using a headless browser.
 * @param {Object} listingData - Contains title, description, price, size, and photo file paths.
 */
export async function runVintedAutomation(listingData) {
  // 1. Launch a secure, stealthy browser instance
  const browser = await puppeteer.launch({
    headless: false, // Set to true in production; false lets you visually watch it type!
    args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set realistic window dimensions to avoid bot detection
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('🌐 Navigating to platform upload page...');
    // Replace with the explicit listing upload URL of your target platform
    await page.goto('https://vinted.com', { waitUntil: 'networkidle2' });

    // --- STEP 1: COOKIE / LOGIN HANDLING ---
    // Note: Most sites require an active session. In production, pass authenticated cookies into the page instance.
    // await page.setCookie(...userSavedSessionCookies);

    // --- STEP 2: UPLOAD PHOTOS ---
    console.log('📸 Injecting item photos into file input...');
    // Locate the hidden file input element selector on the webpage
    const fileInputSelector = 'input[type="file"]'; 
    await page.waitForSelector(fileInputSelector);
    const fileInput = await page.$(fileInputSelector);
    
    // Upload all image paths passed down from the Express backend
    await fileInput.uploadFile(...listingData.photos);
    await page.setTimeOut(2000); // Give the UI a moment to process image optimization

    // --- STEP 3: FILL TEXT FIELDS ---
    console.log('✍️ Typing title and description...');
    
    const titleSelector = 'input[name="title"], [placeholder*="Title"]';
    await page.waitForSelector(titleSelector);
    await page.type(titleSelector, listingData.title, { delay: 50 }); // Simulates natural human keystrokes

    const descriptionSelector = 'textarea[name="description"]';
    await page.waitForSelector(descriptionSelector);
    await page.type(descriptionSelector, listingData.description, { delay: 30 });

    // --- STEP 4: INTERACT WITH DROPDOWNS & SELECTORS ---
    console.log('🏷️ Selecting condition and structural attributes...');
    
    // Clicking a custom platform dropdown wrapper element
    const conditionDropdownTrigger = '.condition-select-box';
    await page.waitForSelector(conditionDropdownTrigger);
    await page.click(conditionDropdownTrigger);

    // Select the explicit option matching what your user typed or selected in the UI
    const targetOptionSelector = `//span[contains(text(), "${listingData.condition}")]`;
    const [optionElement] = await page.$x(targetOptionSelector);
    if (optionElement) {
      await optionElement.click();
    }

    // --- STEP 5: FILL THE PRICE ---
    console.log('💰 Setting item price...');
    const priceSelector = 'input[name="price"]';
    await page.waitForSelector(priceSelector);
    // Clear out default placeholders if they exist
    await page.click(priceSelector, { clickCount: 3 }); 
    await page.type(priceSelector, listingData.price.toString());

    // --- STEP 6: SUBMIT FORM ---
    console.log('🚀 Clicking publish button...');
    const submitButtonSelector = 'button[type="submit"], .publish-button';
    // await page.click(submitButtonSelector); // Kept commented out so it safely halts during your tests
    
    console.log('🎉 Automation task successfully reached confirmation step!');
    await browser.close();
    return true;

  } catch (error) {
    console.error('❌ Automation script failed:', error.message);
    await browser.close();
    return false;
  }
}
