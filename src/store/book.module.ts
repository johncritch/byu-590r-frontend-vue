import bookService from "../services/book.service"

const initialState = {
	book: { name: "", book_cover_picture: "", description: "" }
}

export const books = {
	namespaced: true,
	state: initialState,
	actions: {
		getAllBooks({ commit }) {
			return bookService.getAllBooks().then(
				(response) => {
					commit("setBooks", response.data)
					return Promise.resolve(response.data)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		},
		createBook({ commit }, book) {
			return bookService.createBook(book).then(
				(response) => {
					commit("addBook", response.data)
					return Promise.resolve(response.data)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
		}
	},
	mutations: {
		setBooks(state, books) {
			state.books = books
		},
		addBook(state, book) {
			state.books.push(book) // Assuming `state.books` is an array
		}
	},
	getters: {
		getBooks: (state) => {
			return state.books
		}
	}
}
