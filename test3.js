// Data
const allTunnels = [
	{
		id: 1,
		diamond: false,
		parent_id: 0,
		tunnels: [
			{
				id: 2,
				diamond: true,
				parent_id: 1,
				tunnels: [
					{
						id: 3,
						diamond: false,
						parent_id: 2,
						tunnels: [
							{
								id: 4,
								diamond: false,
								parent_id: 3,
								tunnels: [
									{ id: 5, diamond: false, parent_id: 4 },
									{ id: 6, diamond: true, parent_id: 4 },
									{ id: 7, diamond: false, parent_id: 4 }
								]
							},
							{
								id: 8, diamond: false, parent_id: 3
							},
							{
								id: 9,
								diamond: false,
								parent_id: 3,
								tunnels: [
									{ id: 10, diamond: false, lvl: 4, parent_id: 9 }
								]
							}
						]
					},
					{
						id: 11, diamond: false, parent_id: 2
					}
				]
			},
			{
				id: 12,
				diamond: true,
				parent_id: 1,
				tunnels: [
					{
						id: 13, diamond: false, parent_id: 12
					}
				]
			},
			{
				id: 14,
				diamond: false,
				parent_id: 1
			}
		]
	},
	{
		id: 15,
		diamond: false,
		parent_id: 0,
		tunnels: [
			{ id: 16, diamond: false, parent_id: 15 }
		]
	}
]

const findTunnelById = (initialTunnels, id) => {
	// Data
	const parentTunnels = []
	
	// Actions
	const goDown = (p) => {
		p[p.length] = 0
		return p
	}
	
	const goBack = (p) => p.slice(0, p.length-1)
	
	const goToNext = (p) => {
		p[p.length-1]+=1
		return p
	}
	
	// Conditions
	const isExactTunnel     = (tunnel, currId) => tunnel['id'] === currId
	const hasTunnels        = (tunnel) => tunnel['tunnels']
	const isTunnelExist     = (parTunnel, position) => parTunnel['tunnels'][position[position.length-1]]
	const areInitialTunnels = (position) => position.length <= 3
	
	const isOverSearch      = (position) => {
		const maxLength = initialTunnels.length
		const currPosition = position[position.length-1]
		
		return currPosition >= maxLength
	}
	
	// Function
	const findTunnel = (tunnels, currId, position) => {
		const currTunnel = tunnels[position[position.length-1]]
		
		if (isExactTunnel(currTunnel, currId)) return currTunnel
		
		position = goDown(position)
		
		if (hasTunnels(currTunnel) && isTunnelExist(currTunnel, position)) {
			parentTunnels.unshift(currTunnel)
			return findTunnel(currTunnel['tunnels'], currId, position)
		}
		
		if (areInitialTunnels(position)) {
			position = goBack(position)
			position = goBack(position)
			position = goToNext(position)
			
			if (isOverSearch(position)) return -1
			
			const nextTunnel = initialTunnels[position[position.length-1]]
			
			if (isExactTunnel(nextTunnel, currId)) return nextTunnel
			
			position = goDown(position)
			
			return findTunnel(nextTunnel['tunnels'], currId, position)
		}
		
		const findNextTunnel = (p) => {
			const parentTunnel = parentTunnels[0]
			
			p = goBack(p)
			p = goToNext(p)
			
			if (isTunnelExist(parentTunnel, p))
				return findTunnel(parentTunnel['tunnels'], currId, p)
			
			parentTunnels.shift()
			
			return findNextTunnel(p)
		}
		
		return findNextTunnel(position)
	}
	
	return findTunnel(initialTunnels, id, [0])
}

console.log(findTunnelById(allTunnels, 16))
console.log(findTunnelById(allTunnels, 18))