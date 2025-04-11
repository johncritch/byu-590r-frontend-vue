import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class BookService {
	getAllBooks() {
		return axios.get(API_URL + "books", { headers: authHeader() })
	}

	createBook(bookData) {
		return axios.post(API_URL + "books", bookData, {
			headers: authHeader()
		})
	}
}

export default new BookService()
