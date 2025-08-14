# SleepTide Website - FTP Upload Instructions

## Method 1: Using FTP Client (Recommended)

Download a free FTP client like **FileZilla** or **Cyberduck**:

### Connection Settings:
- **Host:** pixie-ftp.porkbun.com
- **Protocol:** FTP
- **Port:** 21
- **Username:** sleeptide.app
- **Password:** noSpYBUw3UnggDRJaNxfr)hwJw

### Files to Upload:
Upload these files to the root directory of your hosting:

**Main Files:**
- `index.html` 
- `styles.css`
- `script.js`
- `sitemap.xml`
- `robots.txt`

**MEDIA Folder:**
Create a folder called `MEDIA` and upload:
- `01.png` - `06.png` (all 6 app screenshots)
- `AppStoreWht.svg` (white App Store badge)
- `AppStoreBlk.svg` (black App Store badge)

## Method 2: Try Command Line Upload

If the FTP client works for you, we can also try this alternative approach:

```bash
# Navigate to project directory
cd /Users/ahadvirani/Business/ROOSTERGOOSE/sleeptide-web

# Use lftp (more reliable than curl for FTP)
lftp -u sleeptide.app,noSpYBUw3UnggDRJaNxfr)hwJw pixie-ftp.porkbun.com << EOF
set ftp:passive-mode off
mirror -R . .
quit
EOF
```

## Method 3: GitHub Connect (Alternative)

If FTP continues to have issues, you can still use GitHub Connect from your Porkbun hosting panel:
1. Log into your Porkbun hosting control panel
2. Find the GitHub integration option
3. Connect to repository: `AhadV/sleeptide-web`
4. Set branch: `master`

## What Happens After Upload

Once uploaded, your site will be live at:
**https://sleeptide.app**

The site includes:
✅ SEO optimization for Google ranking
✅ Mobile-responsive design  
✅ All 6 app screenshots showcased
✅ App Store button linking to sleepwell.app
✅ Beautiful starry ocean theme with your brand colors