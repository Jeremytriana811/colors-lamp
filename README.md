# COLORS LAMP Application

COLORS is a small web application I built for the COP 4331C COLORS lab. A user
logs in with an existing account, adds color names to their own list, and
searches that list by part of a name. The browser sends JSON requests to PHP
endpoints, and MySQL stores the users and colors. This repository documents
that finished lab project.

## Technologies
- Linux with Apache
- PHP with the MySQLi extension
- MySQL
- HTML, CSS, and vanilla JavaScript using XMLHttpRequest (AJAX) and JSON

## Repository layout
```
api/
  Login.php            Checks a login and password
  AddColor.php         Saves a color for a user
  SearchColors.php     Searches a user's colors
  config.example.php   Template for the database settings
public/
  index.html           Login page
  color.html           Add and search colors
  css/styles.css
  js/code.js, js/md5.js
  images/background.png
.gitignore
LICENSE.md
README.md
```

## Setup
1. Use a Linux server with Apache, PHP (with MySQLi), and MySQL installed.
2. Create a MySQL database named `COP4331` with two tables:
   - `Users` with columns `ID`, `firstName`, `lastName`, `Login`, `Password`
   - `Colors` (TODO: confirm the table and column names from AddColor.php)
3. Copy `api/config.example.php` to `api/config.php` and enter your own
   database host, user, password, and database name. `config.php` is listed in
   `.gitignore` so credentials are never committed.
4. Copy the contents of `public/` into your web root (for example
   `/var/www/html`).
5. Copy the contents of `api/`, including your `config.php`, into a folder
   named `LAMPAPI` inside the web root. The JavaScript calls `/LAMPAPI/...`,
   so the pages and the API must be served from the same site.
6. Add at least one row to the `Users` table by hand. There is no
   registration page.

## Running and accessing the app
Start Apache and MySQL, then open your server's address in a browser. You will
see the login page (`index.html`). Sign in with a user from the `Users` table.
On `color.html` you can add a color, search for part of a color name, and log
out.

## API overview
Every endpoint accepts a POST request with a JSON body.

| Endpoint | Request fields | What it does |
|---|---|---|
| `/LAMPAPI/Login.php` | `login`, `password` | Returns the user's ID and name, or an error |
| `/LAMPAPI/AddColor.php` | `color`, `userId` | Saves a color for that user |
| `/LAMPAPI/SearchColors.php` | `search`, `userId` | Returns the user's colors that contain the search text |

## Assumptions and limitations
- This is lab code and is not ready for production.
- `api/config.php` is not in the repository. You have to create it (step 3).
- Passwords are stored and compared as plain text. The MD5 hashing in
  `code.js` is commented out.
- The browser sends the user ID with each request and the server trusts it.
  There is no session-based authorization.
- Input validation is minimal.
- Users must already exist in the database.
- Search matches any part of a color name. Whether it ignores case depends on
  the database collation.

## AI usage
TODO: describe what you actually did. Example: "I used Claude to help with Git
commands, moving the database credentials out of the PHP files, and structuring
this README. I copied the lab files from my server and tested the changes
myself."

## License
MIT. See `LICENSE.md`.
