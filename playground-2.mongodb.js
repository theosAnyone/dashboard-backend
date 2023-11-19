/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

const { default: mongoose } = require("mongoose");

// Select the database to use.
use('Discord');


// Insert a few documents into the sales collection.
//  db.users.updateOne(
//   {
//     "Discord_Infos.discordId":"315958375810596865",
//     "Journey_Infos.blocs.blocName":"surjeu"
//   },
//   {
//     "$push":{"Journey_Infos.blocs.$.reviews":""}
//   }
//   )
const id = new mongoose.Types.ObjectId("321036184472125451")

db.use
// .findOne({"Discord_Infos.discordId":"315958375810596865"})
