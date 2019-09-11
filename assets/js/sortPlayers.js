function printSortedPlayers(arr){
	var output = ''

	_.forEach(arr, function(value){
		output += '<tr class="player" id="' + value.ID + '">'
			output += '<td class="position">' + value.Position + '</td>'
			output += '<td class="name">' + value.Name + '</td>'
			output += '<td class="team">' + value.TeamAbbrev + '</td>'
			output += '<td class="team">' + value.Salary + '</td>'
			output += '<td class="team">' + (value.Salary * 1.5) + '</td>'
		output += '</tr>'
	})

	$('.players').html(output)
}

function sortPlayers(pos, game){
	let players = allPlayers
	players = sortPlayersByPosition(players, pos)
	players = sortPlayersByGame(players, game)
	return players
}

function sortPlayersByGame(players, game){

	let matching = players

	switch(game){
		
		case 'ALL':
			break
		
		default:

			matching =_.filter(players,function(item){
		    	return item.TeamAbbrev == game
		    })

			break
	}

	return matching
}

function sortPlayersByPosition(players, pos){
	
	let matching = players

	switch(pos){
		
		case 'ALL':
			break
		
		case 'FLEX':
			matching = players.filter(e => ['RB', 'WR', 'TE'].includes(e.Position))
			break
		
		default:
			matching = _.filter(players, { 'Position': pos })
			break
	}

	return matching
}

