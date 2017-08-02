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
		parent_id: 0
	}
]


// Realization
const findTunnelById = (initTunnel, id) => {
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
	const isExactTunnel = (tunnel, currId) => tunnel['id'] === currId
	const hasTunnels    = (tunnel) => tunnel['tunnels']
	const isTunnelExist = (parTunnel, position) => parTunnel['tunnels'][position[position.length-1]]
	
	// Function
	const findTunnel = (currTunnel, currId, position) => {
		if (isExactTunnel(currTunnel, currId)) return currTunnel
		
		position = goDown(position)
		
		if (hasTunnels(currTunnel) && isTunnelExist(currTunnel, position))
			return findTunnel(
				currTunnel['tunnels'][position[position.length-1]],
				currId,
				position
			)
		
		const findParentsNextTunnel = (tunnel, p) => {
			const parentTunnel = findTunnel(initTunnel, tunnel['parent_id'], [0])
			
			p = goBack(p)
			p = goToNext(p)
			
			if (isTunnelExist(parentTunnel, p))
				return findTunnel(parentTunnel['tunnels'][p[p.length-1]], currId, p)
			
			return findParentsNextTunnel(parentTunnel, p)
		}
		
		return findParentsNextTunnel(currTunnel, position)
	}
	
	return findTunnel(initTunnel, id, [0])
}

// Find tunnel bellow
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 0))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 1))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 3))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 5))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 10))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 13))

// Find tunnel behind
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 7))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 15))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 11))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 12))
console.log(findTunnelById({ id: 0, tunnels: allTunnels}, 15))
