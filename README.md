![DTEmpire Banner](https://i.imgur.com/xQNNFoX.png)

# DTEmpire AI Chat Bot

[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue?logo=discord)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-hyperdargo/DTEmpire--Ai--Chat--Bot-blue?logo=github)](https://github.com/hyperdargo/DTEmpire-Ai-Chat-Bot)

A fast, feature-rich Discord bot with AI capabilities, Minecraft integration, and per-user memory. Built with Node.js and Express.

**[➕ Add Bot to Discord](https://discord.com/oauth2/authorize?client_id=1454372361485684870)**

## Features

✨ **AI Responses**
- Multiple AI models (DTEmpire, DeepSeek, Claude, Grok, Mistral, Gemini, OpenAI)
- Fast parallel model selection
- Per-user memory storage
- Identity overrides (name, creator, date)

🎮 **Minecraft Integration**
- DiscordSRV webhook support
- Minecraft chat AI triggers (`ai <message>`, `bot <message>`)
- Automatic message extraction from Minecraft chat

💬 **Discord Features**
- Prefix commands (`?help`, `?ai`, `?models`, etc.)
- Slash commands (`/help`, `/ai`, `/models`)
- Configurable AI channels
- Model selection per guild
- Beautiful embeds and buttons
- Typing indicators

⚙️ **Flexible Configuration**
- Configurable Message Content intent
- Environment-based settings
- Per-guild model preferences
- Easy setup commands

## Requirements

- Node.js 18+
- npm or yarn
- Discord bot token
- AI API access (for model endpoints)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/hyperdargo/DTEmpire-Ai-Chat-Bot.git
cd DTEmpire-Ai-Chat-Bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
# Discord Bot
DISCORD_TOKEN=your_discord_bot_token

# API Configuration
API_URL=http://localhost:3000
HOST=0.0.0.0
PORT=3000

# Bot Settings
BOT_PREFIX=?
DEFAULT_MODEL=nova-micro
ALLOW_MESSAGE_CONTENT_INTENT=true

# Optional
GUILD_ID=your_guild_id
UI_URL=http://localhost:3000/ui
```

4. **Run the bot**
```bash
npm start
```

The API will start on `http://localhost:3000` and the Discord bot will connect automatically.

## Setup Commands

### Set AI Channel (Auto-reply)
Makes a channel auto-reply to all messages with AI responses.

```
?setchannel
```

Users can also set multiple AI channels. Regular Discord users will get auto-replies, and Minecraft chat will respond to `ai <message>` commands.

### Set Minecraft Channel
Enables AI triggers for Minecraft chat via DiscordSRV.

```
?setmcchannel
```

Players in Minecraft can then use:
- `ai <message>` - Get AI response
- `bot <message>` - Alternative command
- `assistant <message>` - Another alternative

### Change Model (Admin Only)
```
?models <ModelName>
```

**Available Models:**
- DTEmpire (nova-micro) - Default, fastest
- DeepSeek
- Claude
- Grok
- Mistral
- Gemini
- OpenAI

## Commands

### Prefix Commands
| Command | Usage | Description |
|---------|-------|-------------|
| `?help` | `?help` | Show help embed |
| `?ai` | `?ai <message>` | Talk to AI |
| `?models` | `?models <model>` | Set model (admin) |
| `?setchannel` | `?setchannel` | Set AI channel (admin) |
| `?setmcchannel` | `?setmcchannel` | Set Minecraft channel (admin) |

### Slash Commands
| Command | Usage | Description |
|---------|-------|-------------|
| `/help` | `/help` | Show help (ephemeral) |
| `/ai` | `/ai prompt:<message>` | Talk to AI |
| `/models` | `/models model:<choice>` | Set model (admin, ephemeral) |

### Buttons
- **Model Selection**: Click DTEmpire, DeepSeek, Claude, Mistral, Gemini buttons to change model
- **Web UI**: Open the web interface to chat

## Configuration

### Environment Variables

```env
# Required
DISCORD_TOKEN=                    # Discord bot token

# API
API_URL=http://localhost:3000     # API URL for bot requests
HOST=0.0.0.0                      # API server host
PORT=3000                         # API server port

# Bot
BOT_PREFIX=?                      # Prefix for commands (?, !, etc.)
DEFAULT_MODEL=nova-micro          # Default AI model
ALLOW_MESSAGE_CONTENT_INTENT=true # Enable Message Content intent (required for Minecraft)
BOT_MODEL=                        # Force specific model (optional)

# Optional
GUILD_ID=                         # Restrict commands to guild (optional)
UI_URL=                           # Web UI URL (auto-detected if not set)
AI_CHANNEL_IDS=                   # Comma-separated channel IDs for auto-reply (optional)
```

## File Structure

```
.
├── index.js              # Main entry point
├── package.json          # Dependencies
├── .env                  # Environment variables
├── data/
│   ├── bot.json         # Guild settings (auto-created)
│   └── users.json       # User memory (auto-created)
├── public/
│   └── index.html       # Web UI
└── src/
    ├── server.js        # Express API
    ├── discordBot.js    # Discord bot
    ├── aiClient.js      # AI API client
    ├── botConfig.js     # Config manager
    ├── memoryStore.js   # User memory
    └── config/
        └── models.js    # Model configuration
```

## API Endpoints

### AI Smart (Main Endpoint)
```
POST /api/ai-smart
GET /api/ai-smart?prompt=...&userId=...&model=...

Body: { prompt, userId, model (optional) }
Response: { status, text, model, model_name, elapsedMs }
```

### AI Identity (Personality)
```
GET /api/ai-identity?prompt=...&userId=...

Response: Fixed answers for name/maker/date, else AI response
```

### Health Check
```
GET /api/health
Response: { status: "ok", date }
```

### User Memory
```
GET /api/user?userId=...
Response: { status, user { messages, ... } }
```

### Web UI
```
GET /ui
```

## DiscordSRV Integration

The bot automatically detects Minecraft chat messages from DiscordSRV webhooks using patterns:
- `[Member] PlayerName » message`
- `[Member] PlayerName > message`
- `[Member] PlayerName: message`

When a message matches `ai <text>` or `bot <text>`, it triggers the AI to respond.

## Features in Action

### Discord Auto-Reply
1. Set an AI channel with `?setchannel`
2. Type any message → Bot replies automatically
3. Click buttons to change models
4. Each guild can have different model preferences

### Minecraft Chat
1. Set Minecraft channel with `?setmcchannel`
2. Player types in Minecraft: `ai hello`
3. Response appears in Discord and Minecraft chat
4. No player name prefix in response

### Model Selection
- Per-guild model preferences
- Automatic fallback to default
- All models aliased for easy selection

## Development

### Run in Development
```bash
npm start
```

### Debug Mode
Set `DEBUG=*` to see detailed logs:
```bash
DEBUG=* npm start
```

### Testing
```bash
# Test AI endpoint
curl "http://localhost:3000/api/ai-smart?prompt=hello&userId=test"

# Test health
curl http://localhost:3000/api/health
```

## Troubleshooting

### Bot not responding to Minecraft chat
- Ensure `ALLOW_MESSAGE_CONTENT_INTENT=true` in `.env`
- Verify Minecraft channel is set with `?setmcchannel`
- Check bot has access to the channel
- Restart the bot after changes

### "Interaction failed" errors
- Ensure Message Content intent is enabled in Discord Developer Portal
- Check bot has proper permissions (Send Messages, Embed Links, etc.)

### AI models not responding
- Check API_URL is correct and accessible
- Verify model endpoints are working
- Check console for error logs
- Ensure network connectivity

### Commands not working
- Verify prefix matches BOT_PREFIX in .env
- For slash commands, wait for them to register (may take ~1 hour globally)
- Restart bot if slash commands don't appear

## Permissions Required

The bot needs these Discord permissions:
- `Send Messages`
- `Send Messages in Threads`
- `Embed Links`
- `Read Message History`
- `Add Reactions` (for buttons)

## Deploy on Pterodactyl

1. Create a new Node.js server
2. Set startup command: `node index.js`
3. Configure environment variables (see Configuration section)
4. Ensure port is accessible (default 3000)
5. Start the server

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review console logs for errors
3. Verify all environment variables are set
4. Make sure API is running and accessible

## License

This project is licensed under the MIT License.

## Credits

- Built with [discord.js](https://discord.js.org/)
- AI powered by Pollinations.ai
- DiscordSRV integration for Minecraft

## 👤 Author

**DargoTamber**

- GitHub: [https://github.com/hyperdargo](https://github.com/hyperdargo)
- Discord: DargoTamber
- Website: [https://ankitgupta.com.np](https://ankitgupta.com.np)

---

<p align="center">
  DTEmpire Ai Chat Bot • Built with ❤️ for the Discord community
</p>



