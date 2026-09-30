$source = "D:\GIT\unit-testing-playground\example-base-13\company-project-ejs\data\data.json"

$destinations = @(
    "D:\GIT\unit-testing-playground\example-base-13\company-project-alpine\data\data.json",
    "D:\GIT\unit-testing-playground\example-base-13\company-project-alpine-v2\data\data.json"
)

foreach ($destination in $destinations) {

    $destinationDir = Split-Path $destination -Parent

    # Create destination directory if it doesn't exist
    if (-not (Test-Path $destinationDir)) {
        New-Item -ItemType Directory -Path $destinationDir -Force | Out-Null
    }

    # Copy data.json
    Copy-Item -Path $source -Destination $destination -Force

    Write-Host "Copied to: $destination"
}