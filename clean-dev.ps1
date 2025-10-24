# PowerShell script to clean and start dev server
Write-Host "Cleaning .next directory..." -ForegroundColor Yellow

# Remove .next directory if it exists
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host ".next directory removed successfully!" -ForegroundColor Green
} else {
    Write-Host ".next directory not found, nothing to clean." -ForegroundColor Cyan
}

Write-Host "`nStarting development server..." -ForegroundColor Yellow
pnpm dev
