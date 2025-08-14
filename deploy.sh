#!/bin/bash

# FTP deployment script for SleepTide website
FTP_HOST="pixie-ftp.porkbun.com"
FTP_USER="sleeptide.app"
FTP_PASS="noSpYBUw3UnggDRJaNxfr)hwJw"

echo "🚀 Deploying SleepTide website to Porkbun hosting..."

# Upload main files
echo "📄 Uploading HTML, CSS, JS files..."
curl -T "index.html" ftp://$FTP_HOST/ --user "$FTP_USER:$FTP_PASS"
curl -T "styles.css" ftp://$FTP_HOST/ --user "$FTP_USER:$FTP_PASS"
curl -T "script.js" ftp://$FTP_HOST/ --user "$FTP_USER:$FTP_PASS"
curl -T "sitemap.xml" ftp://$FTP_HOST/ --user "$FTP_USER:$FTP_PASS"
curl -T "robots.txt" ftp://$FTP_HOST/ --user "$FTP_USER:$FTP_PASS"

# Create MEDIA directory and upload images
echo "📁 Creating MEDIA directory..."
curl -X "MKD MEDIA" ftp://$FTP_HOST/ --user "$FTP_USER:$FTP_PASS" --quote "MKD MEDIA" 2>/dev/null || true

echo "🖼️ Uploading app screenshots and assets..."
curl -T "MEDIA/01.png" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/02.png" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/03.png" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/04.png" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/05.png" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/06.png" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/AppStoreWht.svg" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"
curl -T "MEDIA/AppStoreBlk.svg" ftp://$FTP_HOST/MEDIA/ --user "$FTP_USER:$FTP_PASS"

echo "✅ Deployment complete! Your website should be live at https://sleeptide.app"