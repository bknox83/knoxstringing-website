# Pull-based deploy (no self-hosted runner)

If you use **GitHub-hosted** runners, they cannot reach a private IP (e.g. 192.168.1.199). Instead of pushing from GitHub to your server, the **server pulls** from GitHub on a schedule (or via webhook).

## One-time setup on the server

1. **Clone the repo** into a directory *next to* your `html` folder (not inside it), e.g.:

   ```bash
   cd ~/Docker/KnoxStringing
   git clone https://github.com/bknox83/knoxstringing-website.git repo
   ```

2. **Copy the pull script** from this repo’s `scripts/pull-deploy.sh` to the server (or create it there). Make it executable:

   ```bash
   chmod +x ~/Docker/KnoxStringing/scripts/pull-deploy.sh
   ```

3. **Run it once** to confirm it works:

   ```bash
   ~/Docker/KnoxStringing/scripts/pull-deploy.sh
   ```

   That pulls the latest from `main` and copies the site files into `html/`.

4. **Schedule it with cron** so it runs every 5–10 minutes (or hourly):

   ```bash
   crontab -e
   ```

   Add a line (adjust paths if yours differ):

   ```cron
   */5 * * * * /home/brad/Docker/KnoxStringing/scripts/pull-deploy.sh >> /home/brad/Docker/KnoxStringing/deploy.log 2>&1
   ```

   Now whenever you push to `main`, the server will have the new files within a few minutes.

## Paths used by the script

The script in `scripts/pull-deploy.sh` assumes:

- **Repo (clone):** `~/Docker/KnoxStringing/repo`
- **Web root (Nginx):** `~/Docker/KnoxStringing/html`

If your paths differ, edit the script’s `REPO_DIR` and `HTML_DIR` at the top.
