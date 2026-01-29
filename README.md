# Modern Edge Technologies Website - Static Version

This is a static HTML/CSS/JavaScript version of the Modern Edge Technologies website, optimized for GitHub Pages hosting.

## Features

- **Responsive Design**: Works on all devices and screen sizes
- **Custom Cursor**: Interactive cursor with hover effects
- **Smooth Animations**: CSS and JavaScript animations for enhanced UX
- **Parallax Effects**: Scroll-based parallax animations
- **Contact Form**: Functional contact form (requires backend integration)
- **Modern Design**: Minimalist aesthetic with clean typography

## File Structure

```
static-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All CSS styles
├── js/
│   └── main.js         # JavaScript functionality
├── favicon.png         # Website favicon
└── README.md          # This file
```

## GitHub Pages Deployment

### Option 1: Direct Upload
1. Create a new repository on GitHub
2. Upload all files from the `static-website` folder to the repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch" and choose "main" branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using Git
1. Initialize git in the static-website folder:
   ```bash
   cd static-website
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/yourusername/repository-name.git
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages in repository settings

## Customization

### Colors
The website uses CSS custom properties for easy color customization:
- `--color-black`: #000000
- `--color-white`: #ffffff  
- `--color-grey`: #E5E5E5
- `--color-grey-dark`: #666666

### Content
- Edit `index.html` to update text content, images, and structure
- Modify the services and projects sections with your own content
- Update contact information in the contact section

### Styling
- All styles are in `css/styles.css`
- The design is mobile-first and responsive
- Uses CSS Grid and Flexbox for layouts

### JavaScript Features
- Custom cursor with smooth following animation
- Preloader with multi-phase animation
- Scroll-triggered animations using Intersection Observer
- Smooth scrolling navigation
- Parallax effects
- Contact form handling (currently simulated)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The static version is optimized for performance:
- No external dependencies except Google Fonts
- Minimal JavaScript bundle
- Optimized CSS with efficient selectors
- Uses modern web APIs for smooth animations

## Contact Form Integration

The contact form currently simulates submission. To make it functional:

1. **Using Netlify Forms** (if hosting on Netlify):
   - Add `netlify` attribute to the form tag
   - Add `name` attributes to form inputs

2. **Using Formspree**:
   - Sign up at formspree.io
   - Update form action to your Formspree endpoint

3. **Custom Backend**:
   - Create an API endpoint
   - Update the `submitForm` function in `main.js`

## License

This project is open source and available under the MIT License.