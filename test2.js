const allTunnels = [
	{
		id: 1,
		diamond: true,
		parent_id: 0,
		tunnels: [
			{
				id: 2,
				diamond: false,
				parent_id: 1,
				tunnels: [
					{
						id: 3,
						diamond: true,
						parent_id: 2
					},
					{
						id: 4,
						diamond: false,
						parent_id: 2,
					}
				]
			}
		]
	},
	{
		id: 5,
		diamond: false,
		parent_id: 0,
		tunnels: [
			{
				id: 6,
				diamond: true,
				parent_id: 5,
			}
		]
	},
	{
		id: 7,
		diamond: true,
		parent_id: 0,
		tunnels: [
			{
				id: 8,
				diamond: false,
				parent_id: 7
			}
		]
	}
]

// const isLastSearch = (lvls) => {
// 	const currTunnelIndex = lvls[1]
// 	const lastTunnelIndex = initTunnel['tunnels'].length-1
//
// 	return currTunnelIndex >= lastTunnelIndex
// }

// if (lvls.length >= 2 && isLastSearch(lvls)) return 1

// if (!isTunnelExist(tunnel)) {
// 	lvls = backToPrevLvl(lvls)
// 	lvls = goToNextTunnel(lvls)
// 	tunnel = lvls[lvls.length-1]
//
// 	return findTunnel(tunnel, lvls)
// }

// if (parId) {
// 	if (isParentTunnel(tunnel, parId)) return tunnel
// }

const checkTunnel = (initTunnel, id) => {
	// Conditions
	const isExactTunnel    = (tunnel, currId) => tunnel['id'] === currId
	const isParentTunnel  = (tunnel, parId) => tunnel['id'] === parId
	const isTunnelExist    = (tunnel) => tunnel
	const hasSubTunnels    = (tunnel) => tunnel['tunnels']
	
	const hasTunnelsBehind = (tunnel, lvls) => {
		const lastTunnelIndex = tunnel['tunnels'].length-1
		const currTunnelIndex = lvls[lvls.length-1]
		
		return  currTunnelIndex < lastTunnelIndex
	}
	
	const findTunnel = (tunnel, lvls, currId) => {
		// console.log(`id: ${tunnel['id']}, [${lvls}]`)
		if (!isTunnelExist(tunnel)) {
			lvls = backToPrevLvl(lvls)
			lvls = goToNextTunnel(lvls)
			
			const parent = findTunnel(initTunnel, [0], 0)
			
			
			return parent['tunnels'][lvls[lvls.length-1]]
		}
		
		if (isExactTunnel(tunnel, currId)) return tunnel
		
		if (hasSubTunnels(tunnel)) {
			lvls = addLvl(lvls)
			tunnel = tunnel['tunnels'][lvls[lvls.length-1]]
			
			return findTunnel(tunnel, lvls, currId)
		}
		
		
		const parentTunnel = findTunnel(initTunnel, [0], tunnel['parent_id'])
		// console.log(hasTunnelsBehind(parentTunnel, lvls))
		
		if (hasTunnelsBehind(parentTunnel, lvls)) {
			lvls = goToNextTunnel(lvls)
			tunnel = parentTunnel['tunnels'][lvls[lvls.length-1]]
			
			return findTunnel(tunnel, lvls, currId)
		}
		
		lvls = backToPrevLvl(lvls)
		lvls = goToNextTunnel(lvls)
		
		const hugeParentTunnel = findTunnel(initTunnel, [0], parentTunnel['parent_id'])
		tunnel = hugeParentTunnel['tunnels'][lvls[lvls.length-1]]
		return findTunnel(tunnel, lvls, currId)
	}
	
	// Methods
	const backToPrevLvl  = (lvls) => lvls.slice(0, lvls.length-1)
	
	const goToNextTunnel = (lvls) => {
		lvls[lvls.length-1] += 1
		return lvls
	}
	
	const addLvl = (lvls) => {
		lvls[lvls.length] = 0
		return lvls
	}
	
	return findTunnel(initTunnel, [0], id)
}

console.log(checkTunnel({ id: 0, diamond: false,tunnels: allTunnels }, 5))
// checkTunnel({ id: 0, diamond: false,tunnels: allTunnels }, 3)
// checkTunnel({ id: 0, diamond: false,tunnels: allTunnels }, 3)
// checkTunnel({ id: 0, diamond: false,tunnels: allTunnels }, 4)
// checkTunnel({ id: 0, diamond: false,tunnels: allTunnels }, 5)
// checkTunnel({ id: 0, diamond: false,tunnels: allTunnels }, 8)