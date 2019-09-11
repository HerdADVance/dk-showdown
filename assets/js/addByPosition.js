function searchLineups(pos, num, captain){

	if(captain == 'yes') addCaptain(pos, num)
	else addRegular(pos, num)

}


function addCaptain(pos, numLineups){
	
	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this to update the global lineups at the end of this function

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		// Check to see if Captain spot is empty and skip to next lineup if so
		if(lineups[i].roster['CAP'][0].ID) continue;

		// Check to see if player is already somewhere else in this lineup and skip to next lineup if so
		let playerInLineup = checkLineupForRegularPlayer(lineups[i])
		if(playerInLineup) continue

		// Captain spot is empty and player isn't elsewhere in lineup so add him to captain spot and add to our local array
		lineups[i].roster['CAP'][0] = clickedPlayer
		addedTo.push(lineups[i].id)

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break
	}

	// Update the view to reflect player being added to lineups
	addLineupsToPlayer(clickedPlayer.ID, addedTo)

}

function addRegular(pos, numLineups){

	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this to update the global lineups at the end of this function

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		// Check to see if player is in captain spot and skip to next lineup if so
		if(lineups[i].roster['CAP'][0].ID == clickedPlayer.ID) continue;

		// Check to see if player is already somewhere else in this lineup and skip to next lineup if so
		let playerInLineup = checkLineupForRegularPlayer(lineups[i])
		if(playerInLineup) continue

		// Check if lineup has any empty spots
		for(var j = 0; j < 5; j++){
			
			// Found empty spot so add player to lineup and add to our local array
			if(!lineups[i].roster['REG'][j].ID){
				lineups[i].roster['REG'][j] = clickedPlayer
				addedTo.push(lineups[i].id)
				break
			}
		}

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break
	}

	// Update the player's lineups in selected players
	addLineupsToPlayer(clickedPlayer.ID, addedTo)

}



function addPlayerToHighlightedLineups(){

	let rows = eligibleHighlightedRowsToAdd // global
	let toAdd = [] // collecting lineup id's for selected players
	
	for(var i = 0; i < rows.length; i++){
		
		// find the index of each highlighted lineup
		let foundLineupIndex = lineups.findIndex(x => x.id == rows[i].lineup)
		
		// insert as captain or regular
		if(rows[i].row == 0) lineups[foundLineupIndex].roster['CAP'][0] = clickedPlayer
		else lineups[foundLineupIndex].roster['REG'][rows[i].row - 1] = clickedPlayer

		// Add to our collection to send to selected players
		toAdd.push(lineups[foundLineupIndex].id)
		
	}

	// Update the player's lineups in selected players
	addLineupsToPlayer(clickedPlayer.ID, toAdd)

}



function addLineupsToPlayer(pid, toAdd){
	let lineupsIn = clickedPlayerLineups
	
	if(lineupsIn.length == 0){
		
		// Create the player in SelectedPlayers 
		selectedPlayers.push({
			'ID': clickedPlayer.ID,
			'lineupsIn': toAdd
		})

		// Set global to update slider view
		clickedPlayerLineups = toAdd

	} else{

		// Player is already selected so find him and merge newlineups with existing lineups
		let foundPlayer = selectedPlayers.findIndex(x => x.ID == clickedPlayer.ID)
		let merged = _.concat(lineupsIn, toAdd);
		selectedPlayers[foundPlayer].lineupsIn = merged

		// Set global to update slider view
		clickedPlayerLineups = merged

		console.log(clickedPlayerLineups)
	}
}


function checkPlayerLineups(pid){
	let player = _.find(selectedPlayers, {'ID': pid })
	if(player) return player.lineupsIn
		else return []
}

function checkLineupForRegularPlayer(lineup){

	// Check the main position
	for(var i = 0; i < 5; i++){
		if(lineup.roster['REG'][i].ID == clickedPlayer.ID) return true
	}

	return false
}

