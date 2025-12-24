# Eagle Harbor Citizens Association Website

A professional, responsive website for The Eagle Harbor Citizens Association - "Paradise on The Patuxent"

## 🌟 Features

### Core Functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Google Calendar Integration**: Embedded community events calendar
- **Member Directory**: Secure, password-protected resident directory
- **Document Library**: Access to constitution, bylaws, meeting minutes, and permits
- **Photo Gallery**: Community events and waterfront beauty showcase
- **Contact Forms**: Google Forms integration for easy communication

### Pages Included
1. **Homepage** (`index.html`) - Welcome and community overview
2. **About** (`about.html`) - Community history and leadership
3. **Events** (`events.html`) - Calendar and upcoming events
4. **Directory** (`directory.html`) - Member contact information (protected)
5. **Documents** (`documents.html`) - Important community documents
6. **Gallery** (`gallery.html`) - Photo collection with modal viewer
7. **Contact** (`contact.html`) - Board contact and communication forms

### Technical Features
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Fast Loading**: Optimized images and efficient CSS/JavaScript
- **Accessibility**: WCAG compliant with proper contrast and navigation
- **Google Integration**: Calendar, Forms, and Maps embedded
- **Security**: Protected member areas with authentication
- **Mobile-First**: Responsive design prioritizing mobile experience

## 🚀 Deployment Options

### Option 1: GitHub Pages (FREE - Recommended)
**Best for**: Free hosting with custom domain support

1. **Create GitHub Account**
   - Go to [github.com](https://github.com) and create a free account
   - Choose username like "eagleharborca" or "ehca-official"

2. **Create Repository**
   - Click "New repository"
   - Name it: `eagleharborca.github.io` (for main domain) or `website`
   - Make it public
   - Initialize with README

3. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop all HTML files
   - Commit changes with message "Initial website upload"

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "main" or "master"
   - Folder: "/ (root)"
   - Save

5. **Access Website**
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - Usually takes 5-10 minutes to go live

6. **Custom Domain (Optional)**
   - Purchase domain from Namecheap, GoDaddy, etc.
   - In GitHub Pages settings, add your custom domain
   - Update DNS records at your domain provider

### Option 2: Netlify (FREE)
**Best for**: Easy deployment with form handling

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub account

2. **Deploy Website**
   - Click "New site from Git"
   - Connect to GitHub repository
   - Deploy settings: leave defaults
   - Click "Deploy site"

3. **Custom Domain**
   - Go to Domain settings
   - Add custom domain
   - Follow DNS configuration instructions

### Option 3: Vercel (FREE)
**Best for**: Fast global CDN and easy deployment

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import from GitHub repository
   - Deploy with default settings

3. **Custom Domain**
   - Go to project settings
   - Add domain in "Domains" section

### Option 4: Traditional Web Hosting ($5-15/month)
**Best for**: Full control and additional features

**Recommended Providers:**
- **Bluehost**: $3.95/month, includes domain
- **SiteGround**: $6.99/month, excellent support
- **HostGator**: $2.75/month, beginner-friendly

**Setup Process:**
1. Purchase hosting plan with cPanel
2. Upload files via File Manager or FTP
3. Point domain to hosting provider
4. Configure email accounts if needed

## 🔧 Setup Instructions

### Step 1: Download Files
- Download all HTML files from this project
- Keep all files in the same folder
- Maintain the file structure as provided

### Step 2: Customize Content
Before deploying, update these elements:

**Contact Information:**
- Replace placeholder phone numbers in `contact.html`
- Update email addresses throughout the site
- Verify mailing address in footer

**Google Integration:**
- Replace Google Calendar embed URL in `events.html`
- Update Google Forms URLs in `contact.html`
- Add Google Maps embed in `contact.html`

**Images:**
- Replace placeholder images with actual community photos
- Optimize images for web (recommended: under 500KB each)
- Update image alt text for accessibility

### Step 3: Google Services Setup

#### Google Calendar Integration
1. **Create Google Calendar**
   - Go to [calendar.google.com](https://calendar.google.com)
   - Create new calendar: "Eagle Harbor Events"
   - Make it public

2. **Get Embed Code**
   - Calendar Settings → Integrate calendar
   - Copy embed code
   - Replace the iframe src in `events.html`

#### Google Forms Integration
1. **Create Contact Form**
   - Go to [forms.google.com](https://forms.google.com)
   - Create form with fields: Name, Email, Subject, Message
   - Get form URL
   - Replace form action in `contact.html`

#### Google Maps Integration
1. **Get Embed Code**
   - Go to [Google Maps](https://maps.google.com)
   - Search for "23308 Hawkins Drive, Aquasco, MD"
   - Click Share → Embed a map
   - Copy iframe code
   - Replace map embed in `contact.html`

### Step 4: Member Directory Setup
The member directory requires additional backend setup:

**Option A: Simple Password Protection**
- Use basic HTTP authentication
- Contact hosting provider for setup

**Option B: Google Sheets Integration**
- Store member data in Google Sheets
- Use Google Apps Script for authentication
- More complex but fully functional

**Option C: Third-party Service**
- Use services like Airtable or Notion
- Embed as iframe with password protection

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized images for mobile data
- Fast loading on slow connections
- Accessible mobile forms

## 🔒 Security Features

- **HTTPS**: Secure connection (automatic with GitHub Pages/Netlify)
- **Protected Directory**: Member information requires authentication
- **Form Protection**: Google Forms includes spam protection
- **No Sensitive Data**: No passwords or personal data stored in code

## 🎨 Customization Guide

### Colors and Branding
The website uses CSS custom properties for easy customization:

```css
:root {
    --primary-color: #2c5aa0;    /* Main blue */
    --secondary-color: #1a4480;  /* Darker blue */
    --accent-color: #f4a261;     /* Orange accent */
    --text-dark: #2c3e50;        /* Dark text */
    --text-light: #6c757d;       /* Light text */
}
```

### Adding New Pages
1. Copy an existing HTML file
2. Update the navigation menu in all files
3. Follow the same structure and styling
4. Test on mobile devices

### Updating Content
- **Events**: Add to Google Calendar (automatically appears on website)
- **Photos**: Upload to gallery folder and update `gallery.html`
- **Documents**: Add links in `documents.html`
- **News**: Update homepage or create news section

## 📊 Analytics Setup

### Google Analytics (Recommended)
1. Create Google Analytics account
2. Get tracking code
3. Add to all HTML files before `</head>` tag

### Alternative Analytics
- **Plausible**: Privacy-focused, simple setup
- **Fathom**: GDPR compliant, easy to use
- **Cloudflare Analytics**: Free with Cloudflare

## 🆘 Support and Maintenance

### Regular Updates
- **Monthly**: Update events calendar
- **Quarterly**: Review and update documents
- **Annually**: Update board member information

### Technical Support
- **GitHub Issues**: For technical problems
- **Community Forums**: Web development help
- **Hosting Support**: Contact your hosting provider

### Backup Strategy
- **GitHub**: Automatic version control
- **Local Backup**: Download files monthly
- **Database Backup**: If using member directory

## 📞 Getting Help

### For Technical Issues:
1. Check hosting provider documentation
2. Search GitHub issues and forums
3. Contact web development community
4. Consider hiring local web developer

### For Content Updates:
1. Designate tech-savvy board member
2. Create simple update procedures
3. Train multiple people on basic updates
4. Document all login credentials securely

## 🎯 Next Steps

1. **Choose hosting option** (GitHub Pages recommended for free)
2. **Set up Google services** (Calendar, Forms, Maps)
3. **Customize content** with actual community information
4. **Test thoroughly** on different devices
5. **Launch and announce** to community
6. **Train board members** on updates and maintenance

## 📋 Launch Checklist

- [ ] All placeholder content replaced
- [ ] Contact information updated
- [ ] Google Calendar integrated
- [ ] Google Forms working
- [ ] Google Maps embedded
- [ ] All links tested
- [ ] Mobile responsiveness verified
- [ ] Images optimized
- [ ] SEO meta tags updated
- [ ] Analytics installed
- [ ] Backup plan established
- [ ] Board members trained
- [ ] Community announcement prepared

---

**Eagle Harbor Citizens Association Website**  
*Paradise on The Patuxent*

For questions about this website, contact the Citizens Association board at info@eagleharborca.org or (301) 888-2410.