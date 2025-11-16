# Contributing to WebPhone

First off, thank you for considering contributing to WebPhone! It's people like you that make WebPhone such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots or animated GIFs if possible**
* **Include your environment details** (OS, Browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some other applications where this enhancement exists, if applicable**

### Pull Requests

* Fill in the required template
* Follow the JavaScript/React coding style
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Process

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/webphone.git
   cd webphone
   ```

3. Install dependencies:
   ```bash
   npm run install-all
   ```

4. Create a branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```

### Coding Standards

#### JavaScript/React
- Use ES6+ features
- Use functional components with Hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

#### Formatting
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use trailing commas in objects/arrays

#### Naming Conventions
- Components: PascalCase (e.g., `WebPhone.js`)
- Files: camelCase (e.g., `useSIP.js`)
- CSS files: Same as component name (e.g., `WebPhone.css`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semicolons, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(call): add call recording functionality

Add ability to record audio/video calls with start/stop controls
and automatic file download.

Closes #123
```

```
fix(registration): resolve WebSocket connection timeout

Increase timeout from 5s to 10s to handle slow networks.
Add retry logic with exponential backoff.

Fixes #456
```

### Testing

Before submitting a pull request, ensure:

1. All existing tests pass
2. New features have tests
3. Code coverage hasn't decreased
4. Manual testing completed

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

### Documentation

* Update README.md if needed
* Add JSDoc comments for functions
* Update CHANGELOG.md
* Update relevant documentation files

## Project Structure

```
webphone/
├── client/              # React frontend
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # React components
│       ├── hooks/      # Custom hooks
│       └── utils/      # Utility functions
├── server/             # Express backend
├── docs/               # Documentation
└── .github/            # GitHub templates
```

## Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Commit** your changes
4. **Push** to your fork
5. **Create** a Pull Request

### Pull Request Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added to complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] CHANGELOG.md updated

## Review Process

* Maintainers will review your PR
* Address any requested changes
* Once approved, your PR will be merged
* Your contribution will be credited in CHANGELOG.md

## Getting Help

* Check existing issues and documentation
* Join discussions in GitHub Discussions
* Ask questions in issues with `question` label

## Recognition

Contributors will be:
* Listed in CHANGELOG.md
* Credited in release notes
* Mentioned in README.md (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the BSD License.

---

**Thank you for contributing to WebPhone!** 🎉
