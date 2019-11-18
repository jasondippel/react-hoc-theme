# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- \$theme is now a function that takes a string containing the keys to get to the desired value in the object separated by slashes
- Updated both dark and light themes to improve color contrast ratios
- Updated example to more accurately calculate contrast ratios
- Changed structure of theme object on window to enable better communication between theme packages (specifically between iframes)

## Added

- backgroundLight and backgroundDark values to both light and dark themes
- Exposed getActiveTheme function
- Ability to mark fields as deprecated and can provide upgrade instructions
- Remember theme type that was previously selected/used and try to use the same theme type on reload

## Removed

- background600

## [1.1.1] - 2019-11-01

### Added

- \$theme_utils object on window to enable cross-app communication

## [1.1.0] - 2019-10-26

### Added

- New dark theme
- Release documentation

### Changed

- Filled in missing parts of README

## [1.0.1] - 2019-09-17

### Added

- useTheme HOC adds display name

### Changed

- Move react, prop-types to peerDependencies

## [1.0.0] - 2019-09-15

### Removed

- Removed function to get specific theme value

### Added

- Improved error logging for `isDark` function

## [0.0.4] - 2019-09-08

### Removed

- Removed extra internal functions that served no purpose in the lib (calculated various color codes)

## [0.0.3] - 2019-08-20

### Changed

- Moved react-dom to devDependencies

## [0.0.2] - 2019-08-20

### Changed

- Added npm login step to release process

## [0.0.1] - 2019-08-20

### Added

- Initial commit
- Contains basic functionality sans testing or documentation
