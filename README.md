# 🚀 Version Updater Action

A **GitHub Action** to automatically increment the **patch version** in your `package.json` and output the updated version as `TAG_VERSION`.

## 📚 Description

This custom GitHub Action:
- Increments the **patch version** in `package.json`.
- Outputs the new version as `TAG_VERSION` for use in subsequent workflow steps.
- Ensures a valid semantic version format (`MAJOR.MINOR.PATCH`).

## 🛠️ Usage

### Workflow Example

Create a workflow file (e.g., `.github/workflows/version-updater.yml`) in your repository:

```yaml
name: Version Update Workflow

on:
  push:
    branches:
      - main

jobs:
  version_update:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Update Version
        id: version_updater
        uses: your-username/version-updater-action@v0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Print New Version
        run: echo "🔖 New version: ${{ steps.version_updater.outputs.TAG_VERSION }}"
```

## 🚦 How It Works

1. The action reads the `version` field from `package.json`.
2. It increments the patch version (e.g., `1.0.0 → 1.0.1`).
3. The updated version is saved back to `package.json`.
4. The new version is set as an output variable `TAG_VERSION`, which can be used in subsequent workflow steps.

## 📝 Example Scenario

Before: `"version": "1.0.0"`

After: `"version": "1.0.1"`

Output in workflow:

```sql
🔖 New version: 1.0.1
```

## 💡 Outputs

| Name        | Description                          |
|-------------|--------------------------------------|
| `TAG_VERSION` | The new version after the patch update |

## 🤝 Contributing

Feel free to submit a PR if you encounter issues or have suggestions for improvements.

### Steps to Contribute:

1. **Fork** this repository.  
2. Create a new branch: `git checkout -b feature/your-feature`.  
3. Make your changes and commit: `git commit -am 'Add new feature'`.  
4. Push to your branch: `git push origin feature/your-feature`.  
5. Submit a Pull Request.  
