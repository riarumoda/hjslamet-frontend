# Assets Directory Structure

This directory contains all the static assets for the H. Slamet e-commerce website.

## Directory Structure

\`\`\`
/assets
  /products
    - headphones.jpg
    - fitness-tracker.jpg
    - tshirt.jpg
    - water-bottle.jpg
    - charging-pad.jpg
    - crossbody-bag.jpg
    - security-camera.jpg
    - mug-set.jpg
    - ... (other product images)
  /categories
    - electronics.jpg
    - clothing.jpg
    - home.jpg
    - books.jpg
    - toys.jpg
    - wearables.jpg
    - computers.jpg
    - audio.jpg
    - ... (other category images)
  /banners
    - home-banner.jpg
    - sale-banner.jpg
    - ... (other banner images)
  /brand
    - logo.svg
    - favicon.ico
    - ... (other brand assets)
\`\`\`

## Adding New Images

1. Place product images in the `/products` directory
2. Place category images in the `/categories` directory
3. Place banner images in the `/banners` directory
4. Place brand assets in the `/brand` directory

## Image Naming Conventions

- Use kebab-case for all file names (e.g., `wireless-headphones.jpg`)
- Be descriptive but concise
- Include product ID in the filename when applicable (e.g., `product-123-main.jpg`)

## Image Optimization Guidelines

- Product images should be 800x800px minimum for high-quality display
- Keep file sizes under 200KB when possible
- Use JPG for photos and PNG for images that require transparency
- Use WebP format when supported for better compression

## Connecting with Backend

When integrating with the Java backend:

1. The backend should return image paths relative to the `/assets` directory
2. Example API response:
   ```json
   {
     "id": "123",
     "name": "Wireless Headphones",
     "image": "/assets/products/wireless-headphones.jpg"
   }
