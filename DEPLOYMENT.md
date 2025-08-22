# Deployment Guide

This document explains how to deploy the Disguise My App landing page to various hosting platforms.

## 🚀 Quick Deployment Options

### GitHub Pages (Recommended)

GitHub Pages is free and perfect for static websites like this landing page.

#### Setup Steps:

1. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it `disguise-my-app-landing` (or your preferred name)
   - Make it **public** (required for free GitHub Pages)
   - Don't initialize with README (we already have one)

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Disguise My App landing page"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/disguise-my-app-landing.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Click "Save"

4. **Access your site**:
   - Your site will be available at: `https://YOURUSERNAME.github.io/disguise-my-app-landing`
   - It may take a few minutes to become active

### Netlify

Netlify offers automatic deployments and custom domains.

#### Setup Steps:

1. **Sign up at [netlify.com](https://netlify.com)**
2. **Connect your GitHub repository**:
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
3. **Deploy settings**:
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to `/`)
   - Click "Deploy site"
4. **Your site is live**:
   - Netlify provides a random URL
   - You can customize it in site settings

### Vercel

Vercel provides fast global deployment with excellent performance.

#### Setup Steps:

1. **Sign up at [vercel.com](https://vercel.com)**
2. **Import your project**:
   - Click "New Project"
   - Import from GitHub
   - Select your repository
3. **Deploy**:
   - Default settings work perfectly
   - Click "Deploy"
4. **Your site is live** with a `.vercel.app` domain

### Custom Domain Setup

For any of the above platforms, you can add a custom domain:

1. **Purchase a domain** (e.g., `disguisemyapp.com`)
2. **Add CNAME record** in your DNS settings:
   - GitHub Pages: Point to `YOURUSERNAME.github.io`
   - Netlify: Point to your Netlify domain
   - Vercel: Point to `cname.vercel-dns.com`
3. **Configure in platform settings**:
   - Add your custom domain in the platform's settings
   - Enable HTTPS (usually automatic)

## 🛠️ Local Development

### Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server is installed)
npx http-server

# PHP
php -S localhost:8000
```

### Live Reload Development

For a better development experience with live reload:

```bash
# Using live-server (Node.js)
npx live-server

# Using browser-sync
npx browser-sync start --server --files "*.html, *.css, *.js"
```

## 📊 Analytics Setup (Optional)

To track visitors, you can add Google Analytics:

1. **Create a Google Analytics account**
2. **Add tracking code** to the `<head>` section of `index.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🔒 Security Headers

For production deployment, consider adding security headers. Create a `_headers` file (Netlify) or configure headers in your hosting platform:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 📈 Performance Tips

1. **Enable compression** (gzip/brotli) on your hosting platform
2. **Use a CDN** for global performance (most platforms include this)
3. **Optimize images** if you add any in the future
4. **Monitor Core Web Vitals** using PageSpeed Insights

## 🐛 Troubleshooting

### Common Issues:

1. **GitHub Pages not loading**:
   - Ensure repository is public
   - Check that Pages is enabled in settings
   - Wait 5-10 minutes for changes to propagate

2. **Custom domain not working**:
   - Verify DNS records are correctly set
   - Check HTTPS certificate status
   - Clear browser cache

3. **CSS/JS not loading**:
   - Check file paths are correct
   - Ensure all files are committed and pushed
   - Verify no 404 errors in browser console

## 📞 Support

If you encounter issues with deployment, please check the documentation for your chosen platform or open an issue in this repository.

---

**Happy deploying! 🚀**
