# Source Control Integrations

T3 Code connects to **GitHub** so you can create pull requests, review code, and manage repositories without leaving your editor.

## Supported

- **GitHub** – Pull requests, repository creation, and clone integration (`gh` CLI)
- **Git URL** – Clone any repository via HTTPS/SSH without provider-specific tooling

## Setup (GitHub)

1. Install the GitHub CLI: https://cli.github.com/
2. Authenticate: `gh auth login`
3. Confirm: `gh auth status`

## Usage

- **Add Project** → GitHub repository (`owner/repo`) or paste a Git URL
- **Publish Repository** → create a GitHub repo and push
- Git panel PR actions work when `gh` is installed and authenticated
