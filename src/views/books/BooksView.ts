export default {
	name: "BooksView",
	data: function () {
		return {
			headers: [
				{
					text: "Book Cover",
					value: "book_cover_picture",
					sortable: false
				},
				{ text: "Book Name", value: "name" },
				{ text: "Description", value: "description" }
			],
			books: []
		}
	},
	computed: {
		allBooks() {
			return this.$store.state.books.books
		}
	},
	created() {
		this.getBooks()
	},
	methods: {
		getBooks() {
			this.$store
				.dispatch("books/getAllBooks")
				.then(() => {
					this.books = this.$store.state.books.books.results // Ensure you access the results part
				})
				.catch((error) => {
					console.error(
						"There was an error fetching the books: ",
						error
					)
				})
		}
	}
}
