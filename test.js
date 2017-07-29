const categories = [
	{
		id: 2,
		name: 'man',
		categories: [
			{
				id: 3,
				name: 'shorts',
				parent_id: 2,
				categories: [
					{ id: 7, name: 'green', parent_id: 3 },
					{ id: 14, name: 'find', parent_id: 3 },
					{ id: 144, name: 'findgo', parent_id: 3 },
					{ id: 125, name: 'walad', parent_id: 3 }
				]
			},
			{
				id: 6,
				name: 'boots',
				categories: [
					{ id: 97, name: 'blue', parent_id: 6 },
					{ id: 101, name: 'wow', parent_id: 6 }
				]
			},
			{ id: 666, name: 'works', parent_id: 2 }
		]
	},
	{
		id: 4,
		name: 'woman',
		categories: [
			{ id: 5, name: 'woman-boots', parent_id: 4 }
		]
	}
]

const findById = (allTags, id) => {
	const find = (tag, i, elId) => {
		const subTag = tag['categories'][i]
		
		if (subTag['id'] === elId) return subTag
		if (subTag['categories']) return find(subTag, i, id)
		
		if (i < tag['categories'].length-1) return find(tag, i+1, id)
		
		const parObj = find(initObj, 0, tag['parent_id'])
		return find(parObj, 1, id)
	}
	
	const initObj  = { categories: allTags }
	return find(initObj, 0, id)
}

// 5. Checks has iteration has been finished at empty object and returns -1 // if obj > {} i = max

// 4. Checks is next element in categories array exist. If not returns to parent object's array
//    And looks to the other objects, that still wasn't checked following to iteration number
console.log(findById(categories, 6))

// 3. If first subcategory is not what we looking for goes to the next object in array
// console.log(findById(categories, 125))

// 2. If provided id is not equal to first object's id but equal to it's subCategory id
//    that located first in array with categories
// console.log(findById(categories, 7))

// 1. If provided id is equal to first object's id => obj
// console.log(findById(categories, 2))

// 2. If it's not exist looks deeper to objects nesting --- OK!
// 3. If nothing was found backs up to last parent of nested object and checks it's object nesting
// 4. If nothing was found returns to previous step
// 5. If nothing was found during returning to parent object - finishes with "-1"