# Movie World Cup

A public static build of the "电影世界杯 / Movie World Cup" web app.

Features:

- built-in 32-movie starter bracket
- custom roster import from text or JSON
- local browser save/restore
- share image export for the champion bracket

This repository is meant to be published with GitHub Pages.

## Deploy

GitHub Pages can publish this repository automatically through the workflow in `.github/workflows/deploy-pages.yml`.

After the repository is created on GitHub:

1. Open `Settings -> Pages`
2. Set `Source` to `GitHub Actions`
3. Push to `main`

The site URL will be:

- `https://<owner>.github.io/<repo>/` for a project site
- `https://<owner>.github.io/` for a user site repository named `<owner>.github.io`

## Optional API

This public build is fully usable as a static site.

The public API is already deployed here:

- `https://movie-world-cup-api.vercel.app`

If you want to override it with another compatible API for Douban recommendation/import endpoints, you can connect it with:

- `?apiBase=https://your-api.example.com`

Example:

```text
https://<owner>.github.io/<repo>/?apiBase=https://your-api.example.com
```
