import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "devices",
			component: () => import("../views/devices/DevicesView.vue")
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/about/AboutView.vue")
		},
		{
			path: "/books",
			name: "books",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("../views/books/BooksView.vue")
		},
		{
			path: "/collection",
			name: "collection",
			component: () => import("../views/collection/CollectionView.vue")
		}
		// {
		// 	path: "/devices",
		// 	name: "devices",
		// 	component: () => import("../views/devices/DevicesView.vue")
		// }
	]
})

export default router
