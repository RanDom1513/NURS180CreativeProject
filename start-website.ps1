param(
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$nodeDirectory = 'C:\Users\75772\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$pnpmCommand = 'C:\Users\75772\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\pnpm.cmd'
$nodeExecutable = Join-Path $nodeDirectory 'node.exe'

if (-not (Test-Path -LiteralPath $nodeExecutable)) {
    Write-Host ''
    Write-Host '[Error] The bundled Node.js runtime was not found.' -ForegroundColor Red
    Write-Host 'Install Node.js 20 or newer, then run: pnpm dev'
    Read-Host 'Press Enter to close'
    exit 1
}

if (-not (Test-Path -LiteralPath $pnpmCommand)) {
    Write-Host ''
    Write-Host '[Error] pnpm was not found.' -ForegroundColor Red
    Read-Host 'Press Enter to close'
    exit 1
}

$env:PATH = "$nodeDirectory;$env:PATH"

if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules'))) {
    Write-Host 'Installing project dependencies...' -ForegroundColor Cyan
    & $pnpmCommand install
    if ($LASTEXITCODE -ne 0) {
        Write-Host '[Error] Dependency installation failed.' -ForegroundColor Red
        Read-Host 'Press Enter to close'
        exit $LASTEXITCODE
    }
}

Write-Host ''
Write-Host 'Starting Around the World, Back to Myself...' -ForegroundColor Cyan
Write-Host 'The website will open at http://127.0.0.1:5173'
Write-Host 'Press Ctrl+C in this window to stop the website.'
Write-Host ''

if (-not $NoBrowser) {
    Start-Process powershell.exe -WindowStyle Hidden -ArgumentList @(
        '-NoProfile',
        '-Command',
        "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:5173'"
    )
}

& $pnpmCommand dev --host 127.0.0.1
