# 🚀 DELRAY.SERVICES: WORLD RECORD DEPLOYMENT SCRIPT
# This script initializes the repository and pushes the "God Mode" site to GitHub.

$RepoUrl = "https://github.com/Delrayw24/delray.services.git" # Corrected URL

Write-Host "🥂 INNOVATING: Preparing World Record Launch..." -ForegroundColor Cyan

# 1. Initialize Git if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git Repository..."
    git init
}

# 2. Configure Remote
# Remove existing origin to ensure we use the correct one
git remote remove origin 2>$null
git remote add origin $RepoUrl
Write-Host "Remote set to: $RepoUrl"

# 3. Stage & Commit
git add .
git commit -m "World Record Launch: God Mode Activated 🚀"

# 4. Push
Write-Host "Pushing to GitHub (Main)..."
git branch -M main
git push -u origin main

if ($?) {
    Write-Host "✅ SUCCESS: Site pushed to GitHub!" -ForegroundColor Green
    Write-Host "Check Netlify for the live build."
}
else {
    Write-Host "⚠️ NOTICE: Push might have failed." -ForegroundColor Yellow
    Write-Host "If you see authentication errors, please run 'gh auth login' or ensure you have permission."
}

Pause
