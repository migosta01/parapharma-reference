
        // Make translations available to JS
        window.variantStrings = window.variantStrings || {};
        window.variantStrings.addToCart = "ADD TO CART";
        window.variantStrings.soldOut = "Sold out";
        window.variantStrings.adding = "Translation missing: en.sections.add_to_cart.adding_text";
        window.variantStrings.added = "Translation missing: en.sections.add_to_cart.added_text";

        var addToCartButtonText = "ADD TO CART"
        var showPriceButton = false
      


  // Init function for scroll to first section functionality (Image with Text buttons)
  function initImageTextScrollToFirst() {
    try {
      // Handle scroll-to-first-section functionality for image with text buttons
      const scrollToFirstButtons = document.querySelectorAll('.image-text-scroll-to-first[data-scroll-to-first-section]');
      console.log('🎯 Image with Text: Found ' + scrollToFirstButtons.length + ' scroll-to-first buttons');
      
      scrollToFirstButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          console.log('🎯 Image with Text: Scrolling to first section...');
          
          // Find the first section on the page (excluding header/navigation)
          const selectors = [
            // Most common first section patterns
            'main section:first-of-type',
            '.main-content section:first-of-type',
            '.page-content section:first-of-type',
            
            // Shopify section patterns
            '.shopify-section:not([data-section-type="header"]):not([data-section-type="announcement-bar"])',
            'section.shopify-section:not([data-section-type="header"])',
            
            // General section patterns
            'main > *:first-child',
            '.content section:first-of-type',
            'section:not(header):not([role="banner"])',
            
            // Fallback to any section
            'section:first-of-type',
            '[data-section-type]:not([data-section-type="header"])',
            
            // Last resort - any content element
            'main > div:first-child',
            '.main > *:first-child'
          ];
          
          let targetElement = null;
          let usedSelector = '';
          
          for (const selector of selectors) {
            try {
              const elements = document.querySelectorAll(selector);
              if (elements.length > 0) {
                targetElement = elements[0];
                usedSelector = selector;
                console.log(`✅ Found target using selector: ${usedSelector}`, targetElement);
                break;
              }
            } catch (error) {
              console.warn(`❌ Invalid selector: ${selector}`, error);
            }
          }
          
          if (targetElement) {
            // Calculate offset for fixed headers
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const stickyHeader = document.querySelector('.sticky-header, .header-sticky, [style*="position: fixed"]')?.offsetHeight || 0;
            const adminBarHeight = document.querySelector('#admin_bar_iframe, .admin-bar')?.offsetHeight || 0;
            const announcementBar = document.querySelector('.announcement-bar, .promo-bar')?.offsetHeight || 0;
            
            const offset = Math.max(headerHeight, stickyHeader) + adminBarHeight + announcementBar + 20;
            
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
            
            console.log(`✅ Image with Text: Scrolled to first section using selector: ${usedSelector}`);
            
            // Optional: Add visual highlight to show successful targeting
            targetElement.style.transition = 'all 0.3s ease';
            targetElement.style.transform = 'scale(1.01)';
            setTimeout(() => {
              targetElement.style.transform = 'scale(1)';
            }, 300);
            
          } else {
            console.warn('⚠️ Image with Text: No first section found, falling back to scroll to top');
            // Fallback: scroll to top if no target found
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        });
      });
    } catch (error) {
      console.error('❌ Error initializing image with text scroll to first:', error);
    }
  }

  // Init function for scroll to product functionality
  function initScrollToProduct() {
    try {
      // Handle smooth scrolling for product links
      const scrollButtons = document.querySelectorAll('.js-scroll-to-products, [data-scroll-to-product="true"]');
      console.log('Found ' + scrollButtons.length + ' product scroll buttons');
      
      if (scrollButtons.length === 0) return;
      
      scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          try {
            console.log('Button clicked: ', this);
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log('Target ID: ', targetId);
            let targetElement = document.querySelector(targetId);
            console.log('Initial target element found: ', targetElement);
            
            if (targetElement) {
              // Scroll to the target element with smooth behavior
              console.log('Scrolling to specific target: ', targetElement);
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } else {
              // Try various common product section selectors if the specific ID wasn't found
              const productSelectors = [
                // Main product selectors
                '#MainProduct',
                '#shopify-section-product-template',
                '#shopify-section-product',
                '#product-section',
                '.product-section',
                // Fallback to any product-related elements
                '.product-template',
                '.product-container',
                '.product-main',
                '.product',
                '[data-section-type="product"]',
                '[data-section-id*="product"]'
              ];
              
              console.log('Trying fallback selectors: ', productSelectors);
              
              // Try each selector until we find a match
              for (const selector of productSelectors) {
                targetElement = document.querySelector(selector);
                if (targetElement) {
                  console.log('Found product element with selector: ', selector);
                  targetElement.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start'
                  });
                  return; // Exit once we've found and scrolled to a product element
                }
              }
              
              console.log('No product selectors found, trying main content');
              
              // Final fallback: if no product section is found, try scrolling to the main content area
              targetElement = document.querySelector('main') || document.querySelector('#MainContent');
              if (targetElement) {
                console.log('Scrolling to main content: ', targetElement);
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              } else {
                console.log('No scrollable element found');
              }
            }
          } catch (err) {
            console.error('Error in scroll button click handler:', err);
          }
        });
      });
    } catch (err) {
      console.error('Error initializing scroll to product functionality:', err);
    }
  }

  // Enhanced Accordion functionality with debugging
  function initAccordions() {
    console.log('Initializing accordions...');
    const accordionContainers = document.querySelectorAll('#image-text-section-template--20083730448562__image_with_text_kknfyi .accordion-items-wrapper');
    console.log('Found', accordionContainers.length, 'accordion containers');
    
    if (accordionContainers.length === 0) {
      console.log('No accordion containers found');
      return;
    }
    
    accordionContainers.forEach((container, containerIndex) => {
      console.log(`Processing container ${containerIndex + 1}`);
      const accordionItems = container.querySelectorAll('.accordion-item');
      const accordionMode = container.getAttribute('data-accordion-mode') === 'true';
      console.log(`Container ${containerIndex + 1} has ${accordionItems.length} items, accordion mode: ${accordionMode}`);
      
      accordionItems.forEach((item, itemIndex) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (!header) {
          console.log(`No header found for item ${itemIndex + 1}`);
          return;
        }
        
        if (!content) {
          console.log(`No content found for item ${itemIndex + 1}`);
          return;
        }
        
        // Skip if already initialized
        if (header.hasAttribute('data-accordion-initialized')) {
          console.log(`Item ${itemIndex + 1} already initialized, skipping`);
          return;
        }
        
        console.log(`Setting up click handler for item ${itemIndex + 1}`);
        
        // Create the click handler function
        const clickHandler = function(e) {
          console.log(`Accordion item ${itemIndex + 1} clicked!`);
          e.preventDefault();
          e.stopPropagation();
          
          const isActive = item.classList.contains('active');
          console.log(`Item ${itemIndex + 1} is currently ${isActive ? 'active' : 'inactive'}`);
          
          // If in accordion mode, close all other items
          if (accordionMode && !isActive) {
            console.log('Accordion mode: closing other items');
            accordionItems.forEach((otherItem, otherIndex) => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                console.log(`Closing item ${otherIndex + 1}`);
                otherItem.classList.remove('active');
              }
            });
          }
          
          // Toggle the current item
          if (isActive) {
            console.log(`Closing item ${itemIndex + 1}`);
            item.classList.remove('active');
          } else {
            console.log(`Opening item ${itemIndex + 1}`);
            item.classList.add('active');
          }
          
          // Trigger custom event for tracking/analytics
          try {
            container.dispatchEvent(new CustomEvent('accordion:toggle', {
              detail: {
                item: item,
                isOpen: !isActive,
                text: header.querySelector('.accordion-header-text')?.textContent
              }
            }));
          } catch (err) {
            console.error('Error dispatching accordion event:', err);
          }
        };
        
        // Add the click listener
        header.addEventListener('click', clickHandler);
        
        // Store the handler reference for potential cleanup
        header._accordionClickHandler = clickHandler;
        
        // Mark as initialized
        header.setAttribute('data-accordion-initialized', 'true');
        
        // Add visual feedback on hover
        header.style.cursor = 'pointer';
        
        // Add keyboard support
        const keyHandler = function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log(`Keyboard trigger for item ${itemIndex + 1}`);
            e.preventDefault();
            clickHandler(e);
          }
        };
        
        header.addEventListener('keydown', keyHandler);
        header._accordionKeyHandler = keyHandler;
        
        // Make header focusable for accessibility
        if (!header.hasAttribute('tabindex')) {
          header.setAttribute('tabindex', '0');
        }
        
        console.log(`Item ${itemIndex + 1} setup complete`);
      });
    });
    
    console.log('Accordion initialization complete');
  }

  // Function to manually test accordion (for debugging)
  function testAccordion() {
    console.log('Testing accordion functionality...');
    const firstItem = document.querySelector('#image-text-section-template--20083730448562__image_with_text_kknfyi .accordion-item');
    if (firstItem) {
      console.log('Found first accordion item, toggling...');
      firstItem.classList.toggle('active');
      console.log('First item is now:', firstItem.classList.contains('active') ? 'active' : 'inactive');
      return true;
    } else {
      console.log('No accordion items found for testing');
      return false;
    }
  }

  // Initialize immediately if DOM is already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM Content Loaded - initializing components');
      initImageTextScrollToFirst();
      initScrollToProduct();
      initAccordions();
    });
  } else {
    // DOM is already ready
    console.log('DOM already ready - initializing components immediately');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  }
  
  // Also run on window load to ensure all elements are fully loaded
  window.addEventListener('load', function() {
    console.log('Window loaded - re-initializing components');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  });
  
  // Additional initialization for dynamic content
  document.addEventListener('shopify:section:load', function() {
    console.log('Shopify section loaded - initializing components');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  });

  // Backup initialization using setTimeout
  setTimeout(function() {
    console.log('Backup initialization running...');
    if (document.querySelector('#image-text-section-template--20083730448562__image_with_text_kknfyi .accordion-items-wrapper') && !document.querySelector('#image-text-section-template--20083730448562__image_with_text_kknfyi .accordion-header[data-accordion-initialized]')) {
      console.log('Found uninitialized accordions, running backup init');
      initAccordions();
    }
  }, 2000);

  // Make functions globally available for debugging
  window.debugAccordion = {
    init: initAccordions,
    test: testAccordion,
    toggle: function(index) {
      const items = document.querySelectorAll('#image-text-section-template--20083730448562__image_with_text_kknfyi .accordion-item');
      if (items[index]) {
        items[index].classList.toggle('active');
        console.log(`Manually toggled item ${index + 1}`);
      }
    }
  };

  // Final fallback: try to initialize immediately
  try {
    console.log('Immediate initialization attempt...');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  } catch (err) {
    console.error('Immediate initialization failed:', err);
  }



  // Init function for scroll to first section functionality (Image with Text buttons)
  function initImageTextScrollToFirst() {
    try {
      // Handle scroll-to-first-section functionality for image with text buttons
      const scrollToFirstButtons = document.querySelectorAll('.image-text-scroll-to-first[data-scroll-to-first-section]');
      console.log('🎯 Image with Text: Found ' + scrollToFirstButtons.length + ' scroll-to-first buttons');
      
      scrollToFirstButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          console.log('🎯 Image with Text: Scrolling to first section...');
          
          // Find the first section on the page (excluding header/navigation)
          const selectors = [
            // Most common first section patterns
            'main section:first-of-type',
            '.main-content section:first-of-type',
            '.page-content section:first-of-type',
            
            // Shopify section patterns
            '.shopify-section:not([data-section-type="header"]):not([data-section-type="announcement-bar"])',
            'section.shopify-section:not([data-section-type="header"])',
            
            // General section patterns
            'main > *:first-child',
            '.content section:first-of-type',
            'section:not(header):not([role="banner"])',
            
            // Fallback to any section
            'section:first-of-type',
            '[data-section-type]:not([data-section-type="header"])',
            
            // Last resort - any content element
            'main > div:first-child',
            '.main > *:first-child'
          ];
          
          let targetElement = null;
          let usedSelector = '';
          
          for (const selector of selectors) {
            try {
              const elements = document.querySelectorAll(selector);
              if (elements.length > 0) {
                targetElement = elements[0];
                usedSelector = selector;
                console.log(`✅ Found target using selector: ${usedSelector}`, targetElement);
                break;
              }
            } catch (error) {
              console.warn(`❌ Invalid selector: ${selector}`, error);
            }
          }
          
          if (targetElement) {
            // Calculate offset for fixed headers
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const stickyHeader = document.querySelector('.sticky-header, .header-sticky, [style*="position: fixed"]')?.offsetHeight || 0;
            const adminBarHeight = document.querySelector('#admin_bar_iframe, .admin-bar')?.offsetHeight || 0;
            const announcementBar = document.querySelector('.announcement-bar, .promo-bar')?.offsetHeight || 0;
            
            const offset = Math.max(headerHeight, stickyHeader) + adminBarHeight + announcementBar + 20;
            
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
            
            console.log(`✅ Image with Text: Scrolled to first section using selector: ${usedSelector}`);
            
            // Optional: Add visual highlight to show successful targeting
            targetElement.style.transition = 'all 0.3s ease';
            targetElement.style.transform = 'scale(1.01)';
            setTimeout(() => {
              targetElement.style.transform = 'scale(1)';
            }, 300);
            
          } else {
            console.warn('⚠️ Image with Text: No first section found, falling back to scroll to top');
            // Fallback: scroll to top if no target found
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        });
      });
    } catch (error) {
      console.error('❌ Error initializing image with text scroll to first:', error);
    }
  }

  // Init function for scroll to product functionality
  function initScrollToProduct() {
    try {
      // Handle smooth scrolling for product links
      const scrollButtons = document.querySelectorAll('.js-scroll-to-products, [data-scroll-to-product="true"]');
      console.log('Found ' + scrollButtons.length + ' product scroll buttons');
      
      if (scrollButtons.length === 0) return;
      
      scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          try {
            console.log('Button clicked: ', this);
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log('Target ID: ', targetId);
            let targetElement = document.querySelector(targetId);
            console.log('Initial target element found: ', targetElement);
            
            if (targetElement) {
              // Scroll to the target element with smooth behavior
              console.log('Scrolling to specific target: ', targetElement);
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } else {
              // Try various common product section selectors if the specific ID wasn't found
              const productSelectors = [
                // Main product selectors
                '#MainProduct',
                '#shopify-section-product-template',
                '#shopify-section-product',
                '#product-section',
                '.product-section',
                // Fallback to any product-related elements
                '.product-template',
                '.product-container',
                '.product-main',
                '.product',
                '[data-section-type="product"]',
                '[data-section-id*="product"]'
              ];
              
              console.log('Trying fallback selectors: ', productSelectors);
              
              // Try each selector until we find a match
              for (const selector of productSelectors) {
                targetElement = document.querySelector(selector);
                if (targetElement) {
                  console.log('Found product element with selector: ', selector);
                  targetElement.scrollIntoView({
                    behavior: 'smooth', 
                    block: 'start'
                  });
                  return; // Exit once we've found and scrolled to a product element
                }
              }
              
              console.log('No product selectors found, trying main content');
              
              // Final fallback: if no product section is found, try scrolling to the main content area
              targetElement = document.querySelector('main') || document.querySelector('#MainContent');
              if (targetElement) {
                console.log('Scrolling to main content: ', targetElement);
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              } else {
                console.log('No scrollable element found');
              }
            }
          } catch (err) {
            console.error('Error in scroll button click handler:', err);
          }
        });
      });
    } catch (err) {
      console.error('Error initializing scroll to product functionality:', err);
    }
  }

  // Enhanced Accordion functionality with debugging
  function initAccordions() {
    console.log('Initializing accordions...');
    const accordionContainers = document.querySelectorAll('#image-text-section-template--20083730448562__image_with_text_PUWjX9 .accordion-items-wrapper');
    console.log('Found', accordionContainers.length, 'accordion containers');
    
    if (accordionContainers.length === 0) {
      console.log('No accordion containers found');
      return;
    }
    
    accordionContainers.forEach((container, containerIndex) => {
      console.log(`Processing container ${containerIndex + 1}`);
      const accordionItems = container.querySelectorAll('.accordion-item');
      const accordionMode = container.getAttribute('data-accordion-mode') === 'true';
      console.log(`Container ${containerIndex + 1} has ${accordionItems.length} items, accordion mode: ${accordionMode}`);
      
      accordionItems.forEach((item, itemIndex) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (!header) {
          console.log(`No header found for item ${itemIndex + 1}`);
          return;
        }
        
        if (!content) {
          console.log(`No content found for item ${itemIndex + 1}`);
          return;
        }
        
        // Skip if already initialized
        if (header.hasAttribute('data-accordion-initialized')) {
          console.log(`Item ${itemIndex + 1} already initialized, skipping`);
          return;
        }
        
        console.log(`Setting up click handler for item ${itemIndex + 1}`);
        
        // Create the click handler function
        const clickHandler = function(e) {
          console.log(`Accordion item ${itemIndex + 1} clicked!`);
          e.preventDefault();
          e.stopPropagation();
          
          const isActive = item.classList.contains('active');
          console.log(`Item ${itemIndex + 1} is currently ${isActive ? 'active' : 'inactive'}`);
          
          // If in accordion mode, close all other items
          if (accordionMode && !isActive) {
            console.log('Accordion mode: closing other items');
            accordionItems.forEach((otherItem, otherIndex) => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                console.log(`Closing item ${otherIndex + 1}`);
                otherItem.classList.remove('active');
              }
            });
          }
          
          // Toggle the current item
          if (isActive) {
            console.log(`Closing item ${itemIndex + 1}`);
            item.classList.remove('active');
          } else {
            console.log(`Opening item ${itemIndex + 1}`);
            item.classList.add('active');
          }
          
          // Trigger custom event for tracking/analytics
          try {
            container.dispatchEvent(new CustomEvent('accordion:toggle', {
              detail: {
                item: item,
                isOpen: !isActive,
                text: header.querySelector('.accordion-header-text')?.textContent
              }
            }));
          } catch (err) {
            console.error('Error dispatching accordion event:', err);
          }
        };
        
        // Add the click listener
        header.addEventListener('click', clickHandler);
        
        // Store the handler reference for potential cleanup
        header._accordionClickHandler = clickHandler;
        
        // Mark as initialized
        header.setAttribute('data-accordion-initialized', 'true');
        
        // Add visual feedback on hover
        header.style.cursor = 'pointer';
        
        // Add keyboard support
        const keyHandler = function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log(`Keyboard trigger for item ${itemIndex + 1}`);
            e.preventDefault();
            clickHandler(e);
          }
        };
        
        header.addEventListener('keydown', keyHandler);
        header._accordionKeyHandler = keyHandler;
        
        // Make header focusable for accessibility
        if (!header.hasAttribute('tabindex')) {
          header.setAttribute('tabindex', '0');
        }
        
        console.log(`Item ${itemIndex + 1} setup complete`);
      });
    });
    
    console.log('Accordion initialization complete');
  }

  // Function to manually test accordion (for debugging)
  function testAccordion() {
    console.log('Testing accordion functionality...');
    const firstItem = document.querySelector('#image-text-section-template--20083730448562__image_with_text_PUWjX9 .accordion-item');
    if (firstItem) {
      console.log('Found first accordion item, toggling...');
      firstItem.classList.toggle('active');
      console.log('First item is now:', firstItem.classList.contains('active') ? 'active' : 'inactive');
      return true;
    } else {
      console.log('No accordion items found for testing');
      return false;
    }
  }

  // Initialize immediately if DOM is already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM Content Loaded - initializing components');
      initImageTextScrollToFirst();
      initScrollToProduct();
      initAccordions();
    });
  } else {
    // DOM is already ready
    console.log('DOM already ready - initializing components immediately');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  }
  
  // Also run on window load to ensure all elements are fully loaded
  window.addEventListener('load', function() {
    console.log('Window loaded - re-initializing components');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  });
  
  // Additional initialization for dynamic content
  document.addEventListener('shopify:section:load', function() {
    console.log('Shopify section loaded - initializing components');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  });

  // Backup initialization using setTimeout
  setTimeout(function() {
    console.log('Backup initialization running...');
    if (document.querySelector('#image-text-section-template--20083730448562__image_with_text_PUWjX9 .accordion-items-wrapper') && !document.querySelector('#image-text-section-template--20083730448562__image_with_text_PUWjX9 .accordion-header[data-accordion-initialized]')) {
      console.log('Found uninitialized accordions, running backup init');
      initAccordions();
    }
  }, 2000);

  // Make functions globally available for debugging
  window.debugAccordion = {
    init: initAccordions,
    test: testAccordion,
    toggle: function(index) {
      const items = document.querySelectorAll('#image-text-section-template--20083730448562__image_with_text_PUWjX9 .accordion-item');
      if (items[index]) {
        items[index].classList.toggle('active');
        console.log(`Manually toggled item ${index + 1}`);
      }
    }
  };

  // Final fallback: try to initialize immediately
  try {
    console.log('Immediate initialization attempt...');
    initImageTextScrollToFirst();
    initScrollToProduct();
    initAccordions();
  } catch (err) {
    console.error('Immediate initialization failed:', err);
  }



document.addEventListener('DOMContentLoaded', function() {
  // Handle scroll-to-first-section functionality
  const guaranteeButtons = document.querySelectorAll('.guarantee-section__cta[data-scroll-to-first-section]');
  
  guaranteeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      console.log('🎯 Scrolling to first section...');
      
      // Find the product details section or first section on the page (excluding header/navigation)
      const selectors = [
        // Product details section (highest priority)
        '[data-section-type="product"]',
        '.shopify-section[data-section-type="product"]',
        '.product-section',
        '.shop-product-section',
        '.product-details',
        '.product-template',
        '#ProductSection',
        '#shopify-section-product-template',
        
        // Most common first section patterns
        'main section:first-of-type',
        '.main-content section:first-of-type',
        '.page-content section:first-of-type',
        
        // Shopify section patterns
        '.shopify-section:not([data-section-type="header"]):not([data-section-type="announcement-bar"])',
        'section.shopify-section:not([data-section-type="header"])',
        
        // General section patterns
        'main > *:first-child',
        '.content section:first-of-type',
        'section:not(header):not([role="banner"])',
        
        // Fallback to any section
        'section:first-of-type',
        '[data-section-type]:not([data-section-type="header"])',
        
        // Last resort - any content element
        'main > div:first-child',
        '.main > *:first-child'
      ];
      
      let targetElement = null;
      let usedSelector = '';
      
      for (let selector of selectors) {
        try {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            // Get the first element that's not a header/nav
            for (let element of elements) {
              const tagName = element.tagName.toLowerCase();
              const sectionType = element.getAttribute('data-section-type');
              
              // Skip header/navigation elements
              if (tagName === 'header' || 
                  tagName === 'nav' || 
                  sectionType === 'header' || 
                  sectionType === 'announcement-bar' ||
                  element.getAttribute('role') === 'banner') {
                continue;
              }
              
              targetElement = element;
              usedSelector = selector;
              break;
            }
            
            if (targetElement) {
              console.log(`✅ Found first section with selector: ${selector}`);
              break;
            }
          }
        } catch (e) {
          // Skip invalid selectors
          continue;
        }
      }
      
      if (targetElement) {
        // Calculate offset for fixed headers
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const stickyHeader = document.querySelector('.sticky-header, .header-sticky, [style*="position: fixed"]')?.offsetHeight || 0;
        const adminBarHeight = document.querySelector('#admin_bar_iframe, .admin-bar')?.offsetHeight || 0;
        const announcementBar = document.querySelector('.announcement-bar, .promo-bar')?.offsetHeight || 0;
        
        const offset = Math.max(headerHeight, stickyHeader) + adminBarHeight + announcementBar + 20;
        
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
        
        console.log(`✅ Scrolled to first section using selector: ${usedSelector}`);
        
        // Optional: Add visual highlight to show successful targeting
        targetElement.style.transition = 'all 0.3s ease';
        targetElement.style.transform = 'scale(1.01)';
        setTimeout(() => {
          targetElement.style.transform = 'scale(1)';
        }, 300);
        
      } else {
        console.warn('❌ Could not find any suitable first section to scroll to');
        console.log('🔍 Available sections on page:');
        
        // Debug: Show available sections
        const allSections = document.querySelectorAll('section, .shopify-section, main > *, .main > *');
        allSections.forEach((section, index) => {
          const tagName = section.tagName.toLowerCase();
          const id = section.id || 'no-id';
          const sectionType = section.getAttribute('data-section-type') || 'no-section-type';
          const className = section.className || 'no-class';
          
          console.log(`   ${index + 1}. <${tagName}> id="${id}" data-section-type="${sectionType}" class="${className}"`);
        });
      }
    });
  });
});
