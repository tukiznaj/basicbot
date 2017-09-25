const builder = require('botbuilder');
const express = require('express');

const app = express();
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MCIROSOFT_APP_PASSWORD,
//     // when deploying it live to use, must register the bot with Microsoft with developer portal
//     // process.env are the environment variables for node.js. environment variables are variables stored locally
});

const PORT_NUMBER = 3978;
// // similar to the listen function on the console bot. using the app variable.
// // expres is the backbone for the server
app.listen(PORT_NUMBER, ()=>{
    console.log(`chatbot server started and listening to port ${PORT_NUMBER}`);
});

// // using express to open an api endpoint. exposing a service for other eople to consume.
// // expecting a post request
// // now the express server will expect messages from /api/messages
// // the 2nd argument is normally used as the callback function
app.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector
//     // , (session) => {
//     // let userMessage = session.message.text; // represents the input the user is keying in within the console
//     // session.send('you said: %s', userMessage);
// }
);

// the '/' represents the root dialog
bot.dialog('/', (session)=>{
    // if want only 1 single message
    // if(session.message.text === 'hi'){
    //     session.beginDialog('greeting');
    // }

    switch(session.message.text){
        case 'hi':
        case 'hello':
            session.beginDialog('greeting');
            break;

        default:
            session.send('I did not understand that');
    }
});

// if want only 1 single message
// bot.dialog('greeting', (session)=>{
//     session.endDialog('Hello, I am Najulah');
// });

bot.dialog('greeting',[
    (session) => {
        if(!session.userData.name){
            builder.Prompts.text(session, 'Hello, what is your name?'); // prompts is a object in botframework and expects an input
        } else {
            session.endDialog('Hello %s', session.userData.name)
        }
    },
    (session, results) => {
        session.userData.name = results.response;
        session.endDialog('Nice to meet you, %s', session.userData.name);
    }
]);

// expecting a get request
// app.get('/', (req, res, err) => {

// });
// now wish to talk tothe chat


/**
 * Creates a simple chatbot that you can interact with through the bot framework emulator.
 * 
 * To run this bot, ensure that you have the following packages installed:
 * - botbuilder
 * - express
 * 
 * You can install all the required packages at one go using 'npm install'
 * or you can install them manually using 'npm install <package> --save'
 */