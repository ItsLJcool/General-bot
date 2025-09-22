# General Discord Bot (Using TypeScript with Discord.js)
This is just a Discord bot that you can fork and use to make your own bot from it.

It comes with a lot of features already built in, such as:
- Developer Commands for your Testing Server
- Custom Error Reporting (User friendly with Stack Traces)
- Directory Strucutre for Handling Events, and Commands
- And probably more im forgetting LMAO

## Building / Setup the Bot!
You will need to install these packages:
```bash
npm i discord.js dotenv
npm i -D tsx @types/node prisma
```
Make sure you have TypeScript installed globally as well.
```bash
npm i -g typescript
```
Make a new file called `.env` (outside `./src`) and add your Discord Bot Token, and Client ID found in your Developer Portal.
```ini
DISCORD_TOKEN=<token here>
CLIENT_ID=<client id here>
DEV_GUILD_ID=<guild id here (for dev commands)>

# We are using sqlite for easy local usage, but do whatever you want in Prisma lol.
DATABASE_URL="file:./dev.db" # Used for local file storage, name it whatever you want?? Idk I don't fully understand Prisma LMAO
```
Once you have installed all the packages, and setup your `.env` file, run `npm run setup` in the terminal.

And that's it! You can now these commands for testing and building the bot:
- `npm run dev` Run's the bot in Development Mode, watches for any changes in the files and reloads the bot!
- `npm run build` Builds the bot for production
- `npm run start` Runs the bot based on the current build.
- `npm run prisma-dev-migrate` this is just a helper command that runs `npx prisma migrate dev --name` (in which you can input the name for the migration)

## Contributing
You are welcome to fork and make Pull Requests to fix my shitty code if you want to.

Read the [Todo List](TODO.md) if you want to help with adding features.

# Support
If you can, support me on Ko-Fi (for one time donations) and [Patreon](https://www.patreon.com/LJcool) (for recurring donations)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X4PZBTA)