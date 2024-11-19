# CheapWood Discord Bot 
This is a bot for cheap wood, but it may be expanded to other places. 

The document is split into the below secitons, one focusing on the commands and how to use them, the other on interacting with the code itself and contributing to the repository.

# Table of Contents 
- [Bot Commands](#bot-commands)
    - [Test](#test)
    - [ShunQuote](#shunquote)
    - [Dice](#dice)
    - [Localised Time](#localised-time)
- [Development and Contributing](#development-and-contributing)
    - [Getting Setup](#getting-setup)
    - [Running the Bot](#running-the-bot)
    - [Developing](#developing)
    - [Contributing](#contributing)


# Bot Commands 

## Test
Just a test to see that all is working

## ShunQuote
Performing `/shunquote` will give you a random quote from Shun! Lots of fun to be had here!

Using the *optional* parameter `[question]` will ask the shunbot a question too. This currently just gives a random response to the question and doesn't need to make sense, but we're looking to improve it as time goes on. 

## Dice 
Performing `/dice [dice_to_roll]` will allow you to enter any of `D2`, `D4`, `D6`, `D8`, `D10`, `D12`, `D20`, `D100` to get a result in that range. 

## Localised Time
Use `/localised_time [date] [time] [timezone]` and the bot will return a unix time that is localised in discord's formatting, so that users in different regions see the time that it will be for them. E.g. a user triggers this in GMT timezone, and sets a date time of `12:00 12/02/2025`, then a user in Germany would see `11:00 12/02/2025`, etc. 

The format for `date` is `yyyy-MM-dd`, for time is `HH:mm` (24 hour) and for timezone is `<+/->HH:mm` where the min input is `-12:00` and the max input is `+12:00`. The bot has regex handling to facilitate all of these formats. The user is informed of these formats while using the command. 

Examples of acceptable and unacceptable inputs, for further guidance: 

| Input     | Acceptable    | Not acceptable    | Reason                                                                                |
| --        | --            | --                | --                                                                                    |   
| Date      | `2024-08-13`  | `13-08-2024`      | Wrong order, needs to be `yyyy-MM-dd`                                                 |
|           | `2025-10-11`  | `2024-13-08`      | There are not 13 months in a year, will be caught by regex                            | 
| Time      | `14:00`       | `8:00 PM`         | Needs to be in 24h format, not AM/PM                                                  |
|           | `08:00`       | `24:00`           | 24:00 isn't acceptable as there aren't 25 hours in a day. Will be caught by regex.    | 
| Timezone  | `+12:00`      | `+13:00`          | The max is + 12:00                                                                    | 
|           | `+00:00`      | `GMT`             | Timezone text is not accepted, just the time modifier.                                |      

# Development and Contributing 

## Getting Setup
To get setup, first clone this repository and follow the relevant instructions from the [Official Discord Documentation](https://discord.com/developers/docs/quick-start/getting-started), with this repo in place of the example repo they provide. You can hook this code up to your own bot, which will let you test locally but with this bot's code.

Ensure you follow the steps for the `.env` file from the above instructions.  

## Running the Bot 
- Invite the bot to a test server (if you don't have one, make one!)
- Using `npm run start` will start the application on `localhost:3000`. 
- You can use [ngrok](https://ngrok.com/) to export this functionality remotely. Run `ngrok http 3000` to export this port remotely and start testing
- Once this URL is generated, you need to add the URL to the `Interactions Endpoint URL` on the app development portal

## Developing
While developing, here are a few points to consider:
- Try to follow the architecture that this repo has laid out. It should foster some more scalability and keep things modular
- If you are adding new commands to the bot, running `npm run register` should give you the payload results back in the terminal. Use this to see if your command and all it's options were added successfully. If they were added successfully, you may need to add the bot to the server again for the commands ot re-appear. This is because the commands sync each hour and sometimes are a bit longer than that, due to the way things are cached. Re-adding will give you the commands on the server instantly.   

## Contributing
Open a branch outside of `main` and create a PR with the content you wish to merge in. Request a review and it can be added, if approved by @rossbelldev.

After a PR is approved, the bot will be manually deployed on the RPi it's running on and you can see it working in any server it's added to. 

Please ensure that a PR follows the template, to make reviewes easier. 
