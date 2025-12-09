<div align="center">
<img src="public/logo.svg" height="128"/>

# Generate your favorite album poster in just a few seconds!
</div>

## Features ⭐
- [x] Spotify OAuth
- [x] Searchbar
- [x] Poster preview
- [x] Multiple editing options
- [x] Current favorites greeting
- [ ] Proper mobile view
- [ ] *...and more to come!*

<details>
  <summary><h2><a href="#">&#x200B;</a>Screenshots 📷</h2><sub>*to be added!*</sub></summary>
</details>

## Developing 🧑‍💻

Built on top of [Next.js](https://nextjs.org), using [Bun](https://bun.sh) runtime.

1. Clone this repo.
```sh
$ git clone https://github.com/Jgrtowy/coverly.git
```

2. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new app.
* Set the Redirect URI to `http://127.0.0.1:3000/api/auth/callback/spotify`.
* *Optional:* For production environments, set the Redirect URL to `https://[YOUR_DOMAIN]/api/auth/callback/spotify`.
* Check `Web API` checkbox

3. Copy the `Client ID` and `Client Secret` values from the dashboard.

4. Add user to sign in with in `User Management` tab
    
5. Generate BetterAuth secret with
```sh
$ openssl rand -base64 32
```

1. Copy the `.env.example` file, rename it to `.env` and fill out all fields.

2. Install dependencies
```sh
$ bun install
```

1. Run development server
```sh
$ bun dev
```

And you're ready to go!

## Contributing 🌟

**Contributions are always appreciated in any form!**

*Found an bug? Have an idea for a new feature?*<br />
Create an issue!

*Want to fix or implement something new yourself?*<br />
Fork > make changes > create a PR<br />
I'll review it and if it looks good, merge it!