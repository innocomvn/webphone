# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of WebPhone seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:

- Open a public GitHub issue
- Discuss the vulnerability in public forums
- Exploit the vulnerability

### Please DO:

1. **Email us directly** at: security@yourdomain.com (hoặc create a private security advisory)
2. **Provide detailed information** including:
   - Type of vulnerability
   - Full paths of source file(s) related to the vulnerability
   - Location of the affected source code (tag/branch/commit)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the vulnerability
   - Suggested fix (if any)

3. **Allow reasonable time** for us to respond and fix the issue before public disclosure

## Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Best effort

## Security Update Process

1. **Acknowledgment**: We acknowledge receipt of your report
2. **Investigation**: We investigate and validate the issue
3. **Fix Development**: We develop and test a fix
4. **Release**: We release a patched version
5. **Disclosure**: We publicly disclose the vulnerability (coordinated with reporter)
6. **Credit**: We credit the reporter (if desired)

## Known Security Considerations

### WebRTC Security

- **Media Encryption**: All media streams use DTLS-SRTP encryption
- **Signaling**: Use WSS (WebSocket Secure) for SIP signaling
- **HTTPS Required**: WebRTC requires HTTPS in production

### Application Security

- **CORS**: Configure `ALLOWED_ORIGINS` in production
- **Input Validation**: All user inputs are validated
- **XSS Protection**: Security headers prevent XSS attacks
- **CSRF Protection**: Implement CSRF tokens if needed

### Deployment Security

- **Environment Variables**: Never commit `.env` files
- **Secrets Management**: Use secure secret management
- **Regular Updates**: Keep dependencies up to date
- **Security Scanning**: Run security audits regularly

## Security Best Practices

### For Users

1. **Use HTTPS**: Always deploy with HTTPS in production
2. **Secure WebSocket**: Use WSS instead of WS
3. **Update Regularly**: Keep WebPhone updated to latest version
4. **Strong Passwords**: Use strong SIP account passwords
5. **Firewall Rules**: Configure firewall for WebRTC ports

### For Developers

1. **Dependency Updates**: Regularly update dependencies
   ```bash
   npm audit
   npm audit fix
   ```

2. **Security Scanning**: Run security scans
   ```bash
   npm audit
   npm run lint
   ```

3. **Code Review**: Review all code changes for security issues

4. **Secure Coding**: Follow OWASP guidelines

## Security Headers

WebPhone implements the following security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (production only)

## Dependencies

We regularly monitor and update dependencies for security vulnerabilities.

### Automated Scanning

- GitHub Dependabot alerts
- npm audit in CI/CD pipeline
- Regular manual reviews

## Vulnerability Disclosure Policy

We follow **Coordinated Vulnerability Disclosure**:

1. Report received
2. Issue confirmed and fixed
3. Patch released
4. Public disclosure (90 days or when fixed, whichever is sooner)

## Hall of Fame

We appreciate security researchers who help us keep WebPhone secure:

<!-- Contributors will be listed here -->

---

## Questions?

For security-related questions, please contact: security@yourdomain.com

For general questions, please use GitHub Discussions.

---

**Last Updated**: November 16, 2024
