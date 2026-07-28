# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the project maintainers. All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

## Disclosure Policy

When the security team receives a security bug report, they will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

1. Confirm the problem and determine the affected versions
2. Audit code to find any potential similar problems
3. Prepare fixes for all releases still under maintenance
4. Release patched versions

## Security Considerations

This is a static marketing website. Key security measures in place:

- **Security Headers**: HSTS, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- **No Server-Side Data**: No database or server-side user data is stored
- **Environment Variables**: Sensitive configuration is managed through environment variables
- **Content Security**: All external resources are loaded from trusted CDNs (Google Fonts, Framer Motion)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Contact

For any security concerns, please contact the project maintainers directly.
