const regeneratorRuntime = require("regenerator-runtime");

// prints all the matches in the csv
// export const results = d3.csv('../data/2021_Match_Data.csv')
// .then( (result) => console.log(result[0].player))



// returns all the matches for a single player
export const filterByPlayer = (playerName) => d3.csv('https://oracleselixir-downloadable-match-data.s3-us-west-2.amazonaws.com/2021_LoL_esports_match_data_from_OraclesElixir_20210408.csv')
.then( (result) => {    
    let filteredResult
    filteredResult = result.filter( game => game.player.toLowerCase() === playerName.toLowerCase())
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

export function renderData(playerName) {
    let champCount = {};

    filterByPlayer(playerName)
    .then ( (games) => {
        let champs = [];
        let bestCSGames = [];
        let damageTaken = [];
        let damageGiven = [];
        let goldGames = [];
        let totalKills = [];
        let totalAssists = [];
        let totalDeaths = [];
        
        if (!games.length){
            const picContainer = document.querySelector(".pic-container");
            const noExist = document.createElement("h1");
            noExist.textContent = "Unfortunately, we do not have data on this player. Our dataset is limited to professional players in the 2021 season from January to April.";
            noExist.classList.add("no-exist-header");
            picContainer.appendChild(noExist);
        } else{


        
        games.forEach(game => {
            champs.push(game.champion);
            bestCSGames.push(game['total cs']);
            damageTaken.push(game.damagetakenperminute);
            damageGiven.push(game.dpm);
            goldGames.push(game.earnedgold);
            totalKills.push(game.kills);
            totalAssists.push(game.assists);
            totalDeaths.push(game.deaths);
        });
        champs.forEach(champ => {
            if (!champCount[champ]){
                champCount[champ] = 0
            }
            champCount[champ]++;
        })
        createFavoriteChamps(champCount, playerName);


        let averageCS = d3.mean(bestCSGames);
        createMinionsObserver(playerName, averageCS)
        // let csSection = document.querySelector(".cs-div");
        // let csStat = document.createElement("h1");
        // csStat.innerHTML = `${playerName} sure loves to mess up those minions. They usually have an average CS of <span style="color:#cc0000">${averageCS}</span> by the end of the game!`;
        // csStat.classList.add("csStat")
        // csSection.appendChild(csStat);
        // let minionDiv = document.createElement("div")
        // minionDiv.classList.add("minion-div");
        // csSection.appendChild(minionDiv);

        let averageGiven = d3.mean(damageGiven);
        let averageTaken = d3.mean(damageTaken);
        let dmgGiven = {name: "Average DMG Given per minute", amount: averageGiven}
        let dmgTaken = {name: "Average DMG Taken per minute", amount: averageTaken}
        let dmgData = [dmgGiven, dmgTaken]

        createDmgObserver(dmgData, playerName);
        // createDmg(dmgData, playerName);

        let averageGold = d3.mean(goldGames);
        createGoldObserver(averageGold, playerName)

        let totalKillCount = d3.sum(totalKills);
        let totalAssistCount = d3.sum(totalAssists);
        let totalDeathCount = d3.sum(totalDeaths);
        let totalKillData = {name: "Kills", amount: totalKillCount};
        let totalAssistData = {name: "Assists", amount: totalAssistCount};
        let totalDeathData = {name: "Deaths", amount: totalDeathCount};
        let totalKDAData = [totalKillData, totalAssistData, totalDeathData];

        createKDAObserver(totalKDAData, playerName);


    }});
}


const createMinions = (playerName, averageCS) => {
    let csSection = document.querySelector(".cs-div");
    let csStat = document.createElement("h1");
        csStat.innerHTML = `${playerName} sure loves to mess up those minions. They usually have an average CS of <span style="color:#cc0000">${averageCS}</span> by the end of the game!`;
        csStat.classList.add("csStat")
        csSection.appendChild(csStat);
        let minionDiv = document.createElement("div")
        minionDiv.classList.add("minion-div");
        csSection.appendChild(minionDiv);
}

const createMinionsObserver = (playerName, averageCS) => {
    
    let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
    }

    let renderCounter = 0;

    let handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            // Each entry describes an intersection change for one observed
            // target element:
            //   entry.boundingClientRect
            //   entry.intersectionRatio
            //   entry.intersectionRect
            //   entry.isIntersecting
            //   entry.rootBounds
            //   entry.target
            //   entry.time
            if (entry.isIntersecting && renderCounter === 0){
                createMinions(playerName, averageCS);
                renderCounter++;
            }
        });
    };

    let observer = new IntersectionObserver(handleIntersect, options);
    let csSection = document.querySelector(".cs-div");

    observer.observe(csSection);

}


const createGold = (playerName, averageGold) => {
    let goldSection = document.querySelector(".gold-div");
    let goldStat = document.createElement("h1");
        goldStat.innerHTML = `${playerName} is quite certainly getting that bread. They end up earning an average of <span style="color:#ffd736">${averageGold}</span> gold each game!`;
        goldStat.classList.add("goldStat")
        goldSection.appendChild(goldStat);
        let goldPicDiv = document.createElement("div")
        goldPicDiv.classList.add("gold-pic-div")
        goldSection.appendChild(goldPicDiv);
        let goldPic1 = document.createElement("div")
        goldPic1.classList.add("gold-pic1");
        goldPicDiv.appendChild(goldPic1);
        let goldPic2 = document.createElement("div")
        goldPic2.classList.add("gold-pic2");
        goldPicDiv.appendChild(goldPic2);
}

const createGoldObserver = (averageGold, playerName) => {

    let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
    }

    let renderCounter = 0;



    let handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            // Each entry describes an intersection change for one observed
            // target element:
            //   entry.boundingClientRect
            //   entry.intersectionRatio
            //   entry.intersectionRect
            //   entry.isIntersecting
            //   entry.rootBounds
            //   entry.target
            //   entry.time
            if (entry.isIntersecting && renderCounter === 0) {
                goldAnimate();
                setTimeout( () => {
                    createGold(playerName, averageGold);

                }, 1500)
                renderCounter++;
            }
        });
    };

    let observer = new IntersectionObserver(handleIntersect, options);

    let goldTarget = document.querySelector('.gold-div');
    observer.observe(goldTarget);

}

const goldAnimate = () => {
    let goldDiv = document.querySelector(".gold-div")

    for (let index = 0; index < 75; index++) {
        setTimeout( () => {
            let coin = document.createElement("span");
            coin.classList.add("coin");
            coin.style.top = "0";
            coin.style.marginLeft = `${Math.floor(Math.random() * 100) + 1 + '%'} `
            coin.style.marginRight = `${Math.floor(Math.random() * 100) + 1 + '%'}`
            coin.style.marginTop = `${Math.floor(Math.random() * 50) + 1 + '%'}`
            goldDiv.appendChild(coin);
        }, (Math.floor(Math.random() * 50) + 1))
    }
    setTimeout( () => {
        let coins = document.querySelectorAll(".coin");
        coins.forEach( coin => coin.remove());

    }, 2000)
}




const createDmgObserver = (dmgData, playerName) => {


    let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
    }

    let renderCounter = 0;



    let handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            // Each entry describes an intersection change for one observed
            // target element:
            //   entry.boundingClientRect
            //   entry.intersectionRatio
            //   entry.intersectionRect
            //   entry.isIntersecting
            //   entry.rootBounds
            //   entry.target
            //   entry.time
            if (entry.isIntersecting && renderCounter === 0) {
                createDmg(dmgData, playerName);
                renderCounter++;
            }
        });
    };

    let observer = new IntersectionObserver(handleIntersect, options);

    let damageTarget = document.querySelector('.damage-div');
    observer.observe(damageTarget);


}



const createKDAObserver = (kdaData, playerName) => {


    let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
    }

    let renderCounter = 0;



    let handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            // Each entry describes an intersection change for one observed
            // target element:
            //   entry.boundingClientRect
            //   entry.intersectionRatio
            //   entry.intersectionRect
            //   entry.isIntersecting
            //   entry.rootBounds
            //   entry.target
            //   entry.time
            if (entry.isIntersecting && renderCounter === 0) {
                createKDA(kdaData, playerName);
                renderCounter++;
            }
        });
    };

    let observer = new IntersectionObserver(handleIntersect, options);

    let kdaTarget = document.querySelector('.kda-div');
    observer.observe(kdaTarget);


}




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
        .selectAll('rect')
        .data(data)
        .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(0))
            .attr('height', d => y(0) - y(0))
            .attr('width', x.bandwidth())
            .attr('class', (d, i)  => `damage-rect-${d.name}`)

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
        .duration(2000)
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return y(0) - y(d.amount); })

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg.node();

}


const createKDA = (data, playerName) => {

    const kdaDiv = document.querySelector(".kda-div");
    let svgContainer = document.createElement("div")
    svgContainer.setAttribute('class', 'kda-graph-container');
    kdaDiv.appendChild(svgContainer);
    let kdaGraphHeader = document.createElement("h1");
    kdaGraphHeader.textContent = `${playerName}'s total kills, deaths, and assists this season`;
    kdaGraphHeader.classList.add("kda-graph-header")
    svgContainer.append(kdaGraphHeader);


    const width = 1000;
    const height = 500;
    const margin = { top: 50, bottom: 50, left: 50, right: 50};

    const svg = d3.select('.kda-div')
        .append('svg')
        .attr('height', height - margin.top - margin.bottom)
        .attr('width', width - margin.left - margin.right)
        .attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(3))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 300])
        .range([height - margin.bottom, margin.top]);

    svg
        .append('g')
        // .attr('fill', 'darkred')
        .selectAll('rect')
        .data(data)
        .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(0))
            .attr('height', d => y(0) - y(0))
            .attr('width', x.bandwidth())
            .attr('class', (d, i)  => `kda-rect-${d.name}`)
            .attr('fill', 'blue')

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
        .duration(2000)
        .attr("y", function(d) { return y(d.amount); })
        .attr("height", function(d) { return y(0) - y(d.amount); })

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    svg.node();

}
