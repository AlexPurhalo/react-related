// Hi, you are gnome that catches diamonds, you how tunnel with different levels
// where locates what are you looking for
// Your issue is build the system that will check does diamond exist by certain level

const allTunnels = [
	{
		id: 1,
		diamond: false,
		lvl: 0,
		tunnels: [
			{
				id: 2,
				diamond: true,
				lvl: 1,
				tunnels: [
					{
						id: 3,
						diamond: false,
						lvl: 2,
						tunnels: [
							{
								id: 4,
								diamond: false,
								lvl: 3,
								tunnels: [
									{ id: 5, diamond: false, lvl: 4 },
									{ id: 6, diamond: true, lvl: 4 },
									{ id: 7, diamond: false, lvl: 4 }
								]
							},
							{
								id: 8, diamond: false, lvl: 3
							},
							{
								id: 9,
								diamond: false,
								lvl: 3,
								tunnels: [
									{ id: 10, diamond: false, lvl: 4 }
								]
							}
						]
					},
					{
						id: 11, diamond: false, lvl: 2
					}
				]
			},
			{
				id: 12,
				diamond: true,
				lvl: 1,
				tunnels: [
					{
						id: 13, diamond: false, lvl: 2
					}
				]
			},
			{
				id: 14,
				diamond: false
				, lvl: 1
			}
		]
	},
	{
		id: 15,
		diamond: false,
		lvl: 0
	}
]


const catchDiamonds = (allTunnels, id) => {
	
	const findDiamond = (tunnel, lvls, elId, row) => {
		// condition to up row or not
		console.log(tunnel.tunnels[lvls[row]])
		console.log(`id: ${tunnel['id']}, row: ${row}, [${lvls}]`)
		
		const subTunnel = tunnel['tunnels'][lvls[row]]
		
		if (subTunnel) {
			if (subTunnel['id'] === id) {
				if (!lvls[lvls.length-1]) { lvls[lvls.length] = 0 }
				return subTunnel
			}
			
			const isSubTunnelHasTunnels = subTunnel['tunnels']
			
			if (isSubTunnelHasTunnels) {
				if (!lvls[lvls.length-1]) { lvls[lvls.length] = 0 }
				
				return findDiamond(subTunnel, lvls, id, row+1)
			}
			
			const lastSubTunnelIndex = tunnel['tunnels'].length-1
			
			if (lvls[row] === lastSubTunnelIndex) {
				lvls = lvls.slice(0, lvls.indexOf(lvls[row]))
				lvls[lvls.length-1] = lvls[lvls.length-1]+1
				
				console.log('----------------------')
				
				return findDiamond(tunnelsObj, lvls, id, 0)
			}
			
			console.log('change condition here')
			console.log(`id: ${tunnel.id}, row: ${row}`)
			lvls[row] = lvls[row] + 1 // change condition here
			
			return findDiamond(tunnel, lvls, id, row)
		}
		
	}
	
	const tunnelsObj = { tunnels: allTunnels }
	
	return findDiamond(tunnelsObj, [0], id, 0)
}

// catchDiamonds(allTunnels, 6)
console.log(catchDiamonds(allTunnels, 10))
// console.log(catchDiamonds(allTunnels, 1))
