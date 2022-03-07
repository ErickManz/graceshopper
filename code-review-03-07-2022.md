# Code Review 03-07-2022

## Code Quality

- The server crashes on start in the main branch in gatekeeping.js
- OrderItems.js is capitalized but the require in index.js isn't. This works on macOS (which is case-retentive but not case-sensitive) but doesn't work on Linux (which is case-senstive). Make sure you are consistent with filenames. (Heroku is linux so this would break once deployed)
- More comments documenting the code.


## Security and Authentication

- I can signup with a user with an empty username and password, then login with that empty username and password. (although after logging in with that empty username user, the navbar is broken)
- I can add/update/delete memes without being logged in
- I can add/update/delete the user's order info without being logged in
- You have some middleware in the gatekeeping.js file but it's not being used.

## Products

- You shouldn't be able to delete a product because this will leave broken orders.

## Add to Cart

- I can add items to my cart, it gives the user no indication it did anything.
- When I view the cart, the cart page crashes, unless I reload the page (this points to you not updating the cart data in the redux store properly when the add to cart button is pressed)
- Adds the same item to the cart multiple times with quantity 1. It should instead increase the quantity if I already have that item in the cart.

## Styling

- Needs some. At least style the pages with a nice font and adjust the layout. Product lists should have smaller images than product detail pages. You might use flex-wrap to get the product cards to wrap (if you are going for a card based layout, I don't know at this point)

## Project Management

- Avoid generic sounding task cards such as "Security". Write more specific tasks. What are you changing about the security?
- Avoid generic sounding Pull requests. Describe in detail what is changing because of the PR. Having a good title for your PR goes a long way.
- Same goes for commit messages. I see generic messages such as "server bugs fixed"  What bug was fixed? How was it fixed?
