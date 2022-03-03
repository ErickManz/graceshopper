# Code Review for 03-03-2022

## Entities

### Meme

- This seems to be your product entity.
- should Artist be a separate table so you can later on browse by artist? (also not Tier 1 necessarily)
- Stockquantity is nice to have but not a Tier 1 function (it's related to inventory management)
- Should genre be a table of genres? (Also not tier 1 necessarily)
- price should probably be DECIMAL(10, 2)
- imageURL should probably be TEXT (because of possible URL length)
- should the Meme name be unique?

### Users

- Instead of isAdmin as a boolean consider leaving this for a later tier (Tier 1 doesn't include inventory management)
- You would probably need a Roles table in the long run to future proof the app
- Address should be multiple fields. Standard fields are Address1, Address2, State, City, Postcode
- email should probably be a unique field

### Transactions

- I'm unsure what this is for?

### Shopping Session

- Unless you are planning on implementing express-session, I'm not sure you need a table for this...
- I'm unsure what this is for...
- Maybe this is what you really shoudl replace with an Orders model, since you have a total in it. But as I mention below, total is a derived value and doesn't need to be stored.

### Orders

- You should probably have an Orders table.
- _A Cart is just an order that is not yet completed._
- An order would contain an id, userId, and a state field
- The state of an order would be an ENUM with possible values like `new` or `completed` and maybe eventually `shipped`
- An order belongs to a user.
- A user has many orders (although they would only ever have one order in the "new" state. This is their current cart)
- An order doesn't need a total field, as this is a derived value, you can get it by summing up all of the order items sale prices.

### Cart Item

- This is what we would normally call a "Order Item" or "Line Item"
- It should include the quantity and a salePrice (the price the item was at the time of sale)
- An order belongs to a product.
- A product has many orders.
- An order has many Line Items, a Line Item belongs to an Order

## API Routes

### Memes

- You've got routes in here to create the memes, which won't be necessary in Tier 1, so I wouldn't spend time on those until you get to the inventory management feature.
- You should probably never send a database error back to the frontend. This means in the catch blocks, logging the error and constructing a new error with an HTTP status code. Using the `http-errors` npm package could streamline creating those.

### Cart

- There's some complexity happening in here because of your Shopping session stuff, which I think should probably go away. Instead you'll be creating "Orders".
- You'll need to check to see if the user has an order in "new" state and if not, create one.
- Then add an order item to the order, or update it's quantity, etc.

## Security

- You will need to add a piece of middleware to check for a user's JWT token and throw a 401 if they aren't allowed to access a certain route.
- Check the JWT Auth workshop for ideas on how to build this

## Components

- Excellent you are using hooks in some of the models.
- I'd try converting more of them to hooks.
- You should look now into creating some custom hooks to simplify your components. For instance you could create a `useMemes` hook and use that int he AllMemes component.
- Other useful custom hooks to create would be a `useCart` hook. This would allow multiple components to access the cart information, such as maybe an `<AddToCartButton>` component or a `<ShoppingCartIcon>` component for display in your NavBar.
- Anytime you have a `.map` and are rendering a bunch of markup, that's a perfect place to create a component. For instance, in `AllMemes` you could create a `MemeCard` component.
- I would make sure you are naming things consistently. For instance in the store folder you have `SingleMemes.js` which looks an awfully lot like a component because of the capital letter.
- the Checkout component seems to be triggering a `getMemes()` action. That seems like a mistake, it should probably triggering fetching the cart.
