import { defineComponent } from "vue"
import appleBasketLogo from "@/assets/images/apple-basket-logo.png" // adjust the path

export default defineComponent({
	name: "AboutView",
	setup() {
		return {
			logo: appleBasketLogo
		}
	}
})
