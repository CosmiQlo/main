// # Security
//
//
// ## Preventing Injection Attacks

;```javascript

// don't do this
app.post('/users', async (req, res, next) => {
	// via postman req.body = {name : 'Jess B', isAdmin : true}
	let newUser = await User.create(req.body)

	res.json(newUser);
})


// do this
app.post('/users', async (req, res, next) => {
	let {name, password, address} = req.body
	let newUser = await User.create({name, password, address})

	res.json(newUser);
})

```// ## Authorization via Express Gates

// Authentication == "who am i?"

// Authorization = "am I allowed to be here?"

```javascript

//n-ary, can take 1 or many callbacks

//write once
const isAdmin = (req, res, next) => req.user.isAdmin ? next() : res.send("None shall pass!")

// dependency injection! Write once, inject anywhere!
app.get('/secrets', isAdmin, async(req, res, next) => {
	let creditcards = await Secrets.findAll()

	res.send(creditcards)
})

app.get('/corporate-data', isAdmin, async(req, res, next) => {
	let creditcards = await MarketingData.findAll()

	res.send(MarketingData)
})

```// How can we extend this pattern, to make sure Dan doesn't have access to Jess' cart?
//
//
// ## Hiding Secrets

```javascript

app.get('/user/:id', await (req, res, next) => {

	// Don't do this!
	let user = await Users.findByPk(req.params.id) // returns all the user info

	// More like this...
	let user = await Users.findByPk(req.params.id, {
		include : { attributes : ['name', 'address', 'favoriteIceCream'] }
	}) // returns only the info we are ok sharing

	res.json({user})
})

```

// ## XSS (we don't have to worry about this)
//
// <form>
// 	<input value="name"> //User enters <script>alert('hahahah')</script>
// </form>

// React ensures this won't happen :)
