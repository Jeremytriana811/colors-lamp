# COLORS UML diagrams

These diagrams describe the COLORS LAMP application in `Jeremytriana811/colors-lamp`.

- `usecase.puml` / `usecase.png`: actions available to an existing-account user.
- `activity.puml` / `activity.png`: high-level login, search, add, and logout workflow.
- `class.puml` / `class.png`: conceptual module/data model of this procedural application.

## Notes about the implementation

- The browser code is `public/js/code.js` and calls `/LAMPAPI/Login.php`, `/LAMPAPI/AddColor.php`, and `/LAMPAPI/SearchColors.php`.
- The PHP source files live in `api/` in the GitHub repository; deployment copies them into `LAMPAPI/`.
- Each PHP endpoint imports a private `api/config.php` and instantiates its own MySQLi connection. `config.example.php` is the public configuration template. No `database.php` shared connection helper exists in this repository.
- `Users` and `Colors` are database tables. The `User`/`Color` link is intended logical ownership, not a confirmed foreign key.
- UML "class" boxes for PHP/JS files are stereotyped conceptual modules; the code does not define corresponding OOP classes.
- This is a simplified normal-operation model. It does not show every error condition; e.g., searching with no matches can cause the current JS callback to fail while reading `results.length`.

To render editable `.puml` files, use PlantUML (e.g. its online editor or a local PlantUML JAR). The PNG files are previews; the class PNG was laid out separately, so rerendering its source may produce a slightly different arrangement while retaining the same semantics.
