const regeneratorRuntime = require("regenerator-runtime");

// prints all the matches in the csv
// export const results = d3.csv('../data/2021_Match_Data.csv')
// .then( (result) => console.log(result[0].player))



// returns all the matches for a single player
export const filterByPlayer = (playerName) => d3.csv('../data/2021_Match_Data.csv')
.then( (result) => {    
    let filteredResult
    filteredResult = result.filter( game => game.player === playerName)
    return filteredResult
}

)

// returns all the player's champions played

export const champsPlayed = (playerName) => {   
    filterByPlayer(playerName)
    .then ( (games) => {
        let champs = [];
        games.forEach(game => {
            champs.push(game.champion);
        });
        return champs;
    });
}


// creates it all really

export function topChampsData(playerName) {
    let champCount = {};
    filterByPlayer(playerName)
    .then ( (games) => {
        let champs = [];
        let bestCSGames = [];
        let damageTaken = [];
        let damageGiven = [];
        games.forEach(game => {
            champs.push(game.champion);
            bestCSGames.push(game.totalcs);
            damageTaken.push(game.damagetakenperminute)
            damageGiven.push(game.dpm)
        });
        champs.forEach(champ => {
            if (!champCount[champ]){
                champCount[champ] = 0
            }
            champCount[champ]++;
        })
        createFavoriteChamps(champCount, playerName);


        let averageCS = d3.mean(bestCSGames);
        let csSection = document.querySelector(".cs-div");
        let csStat = document.createElement("h1");
        csStat.innerHTML = `${playerName} sure loves to mess up those minions. They usually have an average CS of <span style="color:#cc0000">${averageCS}</span> by the end of the game!`;
        csStat.classList.add("csStat")
        csSection.appendChild(csStat);
        let minionDiv = document.createElement("div")
        minionDiv.classList.add("minion-div");
        csSection.appendChild(minionDiv);

        let averageGiven = d3.mean(damageGiven);
        let averageTaken = d3.mean(damageTaken);
        let dmgGiven = {name: "Average DMG Given per minute", amount: averageGiven}
        let dmgTaken = {name: "Average DMG Taken per minute", amount: averageTaken}
        let dmgData = [dmgGiven, dmgTaken]

        createDmg(dmgData, playerName);

        console.log(averageGiven)
        console.log(averageTaken)


    }); 
}


// export function bestCSGames(playerName) {
//     filterByPlayer(playerName)
//     .then ( (games) => {
//         let bestCSGames = [];
//         games.forEach(game => {
//             bestCSGames.push(game.totalcs);
//         });
//         console.log(bestCSGames)

//         let averageCS = d3.mean(bestCSGames);
//         let averagePerMin = d3.mean(bestCSmin);

//         let csSection = document.querySelector(".cs-div");
//         let csStat = document.createElement("h1");
//         csStat.textContent = `${playerName} sure loves to mess up those minions. They usually have an average CS of ${averageCS} by the end of the game!`;
//         csSection.appendChild(csStat);
        
//     }); 
// }










// actual chart creation

const createFavoriteChamps = (data, playerName) => {
    let champArr = [];
    Object.keys(data).forEach(champion => {
        let champObj = {champName: champion, timesPlayed: data[champion]};
        champArr.push( champObj )
    });
    champArr = champArr.sort((a,b) => d3.descending(a.timesPlayed, b.timesPlayed)).slice(0,5)
    const picContainer = document.querySelector(".pic-container");
    let svgContainer = document.createElement("div")
    svgContainer.setAttribute('class', 'champs-graph-container');
    picContainer.appendChild(svgContainer);
    let playedChampsHeader = document.createElement("h1");
    playedChampsHeader.textContent = `${playerName}'s Favorite Champions`;
    playedChampsHeader.classList.add("played-champs-header")
    svgContainer.append(playedChampsHeader);


    const width = 1000;
    const height = 500;
    const margin = { top: 50, bottom: 50, left: 50, right: 50};

    const svg = d3.select('.champs-graph-container')
        .append('svg')
        .attr('height', height - margin.top - margin.bottom)
        .attr('width', width - margin.left - margin.right)
        .attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(champArr.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 20])
        .range([height - margin.bottom, margin.top]);

    svg
        .append('g')
        .attr('fill', 'royalblue')
        .selectAll('rect')
        .data(champArr.sort((a,b) => d3.descending(a.timesPlayed, b.timesPlayed)))
        .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(0))
            .attr('height', d => y(0) - y(0))
            .attr('width', x.bandwidth())
            .attr('class', 'favorite-champ-rect')

    function xAxis(g) {
        g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => champArr[i].champName))
        .attr('font-size', '20px')

    }

    function yAxis(g) {
        g.attr('transform', `translate(${margin.left}), 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr('font-size', '20px')
    }

    var div = d3.select("favorite-champ-rect").append("div")
        .attr("class", "tooltip")
        .style("display", "none");


      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", ".006em")
      .style("text-anchor", "middle")
      .text("Times Played 2021 Season"); 

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.timesPlayed); })
        .attr("height", function(d) { return y(0) - y(d.timesPlayed); })

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg.node();

}



const createDmg = (data, playerName) => {

    const damageDiv = document.querySelector(".damage-div");
    let svgContainer = document.createElement("div")
    svgContainer.setAttribute('class', 'damage-graph-container');
    damageDiv.appendChild(svgContainer);
    let damageGraphHeader = document.createElement("h1");
    damageGraphHeader.textContent = `${playerName} taketh damage as they giveth`;
    damageGraphHeader.classList.add("damage-graph-header")
    svgContainer.append(damageGraphHeader);


    const width = 1000;
    const height = 500;
    const margin = { top: 50, bottom: 50, left: 50, right: 50};

    const svg = d3.select('.damage-div')
        .append('svg')
        .attr('height', height - margin.top - margin.bottom)
        .attr('width', width - margin.left - margin.right)
        .attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(2))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 1000])
        .range([height - margin.bottom, margin.top]);

    svg
        .append('g')
        .attr('fill', 'darkred')
        .selectAll('rect')
        .data(data.sort((a,b) => d3.descending(a.amount, b.amount)))
        .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(0))
            .attr('height', d => y(0) - y(0))
            .attr('width', x.bandwidth())
            .attr('class', 'damage-rect')

    function xAxis(g) {
        g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name))
        .attr('font-size', '20px')

    }

    function yAxis(g) {
        g.attr('transform', `translate(${margin.left}), 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr('font-size', '20px')
    }

    

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return y(0) - y(d.amount); })

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg.node();

}
