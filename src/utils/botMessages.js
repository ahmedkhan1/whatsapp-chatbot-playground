module.exports = {

onBoardingMsg: function(userName, number) {
    return `Hi ${userName} 👋

Thank you for choosing Edenrobe WhatsApp service.

By replying with Yes, you hereby confirm that you agree to receive important alerts and updates to ${number} from us .`;
},
MainMenu: function(userName) {
    return `Hi ${userName} 👋
Welcome to Edenrobe WhatsApp Support. To start the conversation, please reply with the number from the main menu.
    
Press ⿡ for Online Orders
Press ⿢ for Sales and Promotions
Press ⿣ for Complaints and Queries
    `;
},

MainMenuOption1: `Please select the option from below

Reply with ⿡ for Order status.
Reply with ⿢ for Other info.
Reply with ⿣ for Main menu.`,

MainMenuOption2: `Please select the option from below

Reply with ⿡ for Latest Discounts.
Reply with ⿢ for New Collection.
Reply with ⿣ for Main menu.`,

supportMsg: `Dear Customer, our representative will contact you in 24 hours. Type Exit to end the conversaton at any time.`,
InvalidMainMenuOption: `Sorry I did not understand that.

Please select the option from below

Reply with ⿡ for Order status.
Reply with ⿢ for Other info.
Reply with ⿣ for Main menu.`,

salesLink:`Click on the link for our latest compaign

http://bit.ly/ewuwanew`
}