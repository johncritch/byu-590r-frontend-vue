<template>
	<h1>Here are 5 of My Favorite Books!</h1>
	<v-container>
		<v-data-table :headers="headers" :items="books" class="elevation-1">
			<template v-slot:item.book_cover_picture="{ item }">
				<div class="book-cover">
					<img
						height="100"
						:src="
							item.book_cover_picture || 'default_book_icon.png'
						"
						alt="Book Cover"
					/>
				</div>
			</template>
			<template v-slot:item.name="{ item }">
				<span>{{ item.name }}</span>
			</template>
			<template v-slot:item.description="{ item }">
				<span>{{ item.description }}</span>
			</template>
		</v-data-table>
	</v-container>
</template>

<script src="./BooksView.ts" type="ts"></script>
<style src="./BooksView.scss" scoped></style>
