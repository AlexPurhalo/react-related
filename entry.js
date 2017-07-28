import './style.css'
import React from 'react';
import ReactDOM from 'react-dom';

const JSON = {
	shop: {
		id: 1,
		name: 'Super shop',
		categories: [
			{
				id: 2,
				name: 'man',
				categories: [
					{ id: 3, name: 'shorts', categories: [ { id: 7, name: 'green', categories: [
						{id: 11, name: 'go'}
					] } ] },
					{ id: 6, name: 'boots' }
				]
			},
			{
				id: 4,
				name: 'woman',
				categories: [
					{ id: 5, name: 'woman-boots' }
				]
			}
		]
	}
}

const Category = ({category}) => (
	<li>
		<h2>{category.name}</h2>
		{category.categories && category.categories.map(nestedCategory =>
			<ul key={nestedCategory.id}>
				<Category category={nestedCategory} key={nestedCategory.id} />
			</ul>
		)}
	</li>
)

class App extends React.Component {
	render() {
		return (
			<ul>
				{JSON.shop.categories.map(category =>
					<Category category={category} key={category.id} />
				)}
			</ul>
		
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

