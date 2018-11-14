# Sweet Bot
## Project Goal
Sweet Bot is a visually impaired friendly chatbot, aims to help [甜裡開始](https://www.facebook.com/sweet51909/) cafe.

Utilizing IBM Watson Assistant, cafe managers could take orders through simple Mandarin Chinese voice commands.

This project is funded by IBM Taiwan.

## Contact Line Bot 
<img src ="https://qr-official.line.me/M/BG8sHhWSe6.png" height="100px">

Link: https://line.me/R/ti/p/BG8sHhWSe6

## IBM Watson Assistant

### Intents
We had defined 5 intents, `#positive_reaction`, `#negative_reaction`, `#order`, `#checkout` and `#打招呼`

Each intents corresponds to one kind of user's action or response

The bot will base on the `#intent` type to perform a specific action.

### Entities
<img src="https://i.imgur.com/hafmUmV.png" height="400px">

We imported the cafe menu and product names to our entity values database.

From these values, IBM Watson Assistant could find out what kind of product the customer is looking for.

### Dialog
<img src="https://i.imgur.com/jkWLGLf.png" height="500px">

We define the logics and levels of responses at the Dialog section. The flow of the conversation and the keywords are defined here.

<img src="https://i.imgur.com/uEgJNB8.png" height="400px">

Here is an example for having a `#positive_reaction` when the users were asked about checking out or not.

The assistant will grab the values of the number of products, and set `orderSubmit` to `true`. Then kindly replies that you have submited your order.

### Demo 

<img src="https://i.imgur.com/r1wzm2v.png" height="720px">

1. The assistant recognized that the user is demanding an `#order`, and found out the detailed `@number` and `@products`

2.  Recognized `#positive_reaction`, adding the products to cart

3. Recognized `#checkout`, finishing the order

## Why Line Bot?
The Line Bot works as an interface for visually impaired members to interact with our assistant. Most of the cafe members are already extremely familiar with Line. Thus, they could interact with the bot easily through speech-to-text.

We have a backend API server (developed by Frank) that records orders (works as the POS system).

## Related Projects
### [Sweet-Web](https://github.com/CryoliteZ/Sweet-Web)

A Web App integrating iOS VoiceOver, where the manager of the café can use a few simple gestures to access SOP functions.

Also a part of the project to help  [甜裡開始](https://www.facebook.com/sweet51909/) cafe.