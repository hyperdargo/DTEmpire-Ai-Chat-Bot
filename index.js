import dotenv from "dotenv";
dotenv.config();

// Entrypoint for hosting platforms (e.g., Pterodactyl).
// Start the HTTP API and the Discord bot in the same process.
import "./src/server.js";
import { startBot } from "./src/discordBot.js";

// Only start bot if a token is provided
if (process.env.DISCORD_TOKEN) {
	startBot();
} else {
	console.warn("[dt-empire] DISCORD_TOKEN not set. Web API running; bot not started.");
}
