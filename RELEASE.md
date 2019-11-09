# Release Process

## Changes Prior to Release

1. Create a branch with your changes on it
2. Update [CHANGELOG](CHANGELOG.md) to include brief description of changes under the "Unreleased" section
3. Merge changes into master

## Performing a Release

1. Ensure master is up to date
2. Update "Unreleased" section in [CHANGELOG](CHANGELOG.md) to now be under the appropriate version and date
3. Merge these changes into master
4. Checkout master and pull down all changes
5. Run `release` script and follow prompts; Commit any changes to master
