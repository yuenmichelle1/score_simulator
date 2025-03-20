const CURRENT_STANDINGS = {
    GB: {
        pointsWon: 153,
        pointsLoss: 63
    },
    LSF: {
        pointsWon: 138.5,
        pointsLoss: 71.5
    },
    NSRC: {
        pointsWon: 133.5,
        pointsLoss: 82.5
    },
    MT2: {
        pointsWon: 123.5,
        pointsLoss: 86.5
    },
    MT1: {
        pointsWon: 126.5,
        pointsLoss: 89.5
    },
    MTB: {
        pointsWon: 102,
        pointsLoss: 108
    },
    MTP: {
        pointsWon: 84.5,
        pointsLoss: 131.5
    },
    CPE: {
        pointsWon: 78.5,
        pointsLoss: 134.5
    },
    LSL: {
        pointsWon: 68.5,
        pointsLoss: 141.5
    },
    CPW: {
        pointsWon: 56.5,
        pointsLoss: 156.5
    }

}

let teamTable = $("#team-table")
let projectedTeamTable = $("#projected-team-table")
let projectedStandings = JSON.parse(JSON.stringify(CURRENT_STANDINGS));

function sortProjectedStandings(projected) {
    var sortedHash = {}

    var teams = Object.keys(projected)
    teams.sort(function(a, b) {
        var pointsWonA = projected[a].pointsWon
        var pointsWonB = projected[b].pointsWon
        var pointsLossA = projected[a].pointsLoss
        var pointsLossB = projected[b].pointsLoss
        var winPercentageA = pointsWonA / (pointsWonA + pointsLossA) * 100;
        var winPercentageB = pointsWonB / (pointsWonB + pointsLossB) * 100;
        return winPercentageB - winPercentageA
    }).forEach(function(k) {
        sortedHash[k] = sortedHash[k];
    });
    return sortedHash
}

$.each(CURRENT_STANDINGS, function(key) {
    var pointsWon = CURRENT_STANDINGS[key].pointsWon;
    var pointsLoss = CURRENT_STANDINGS[key].pointsLoss;
    var winPercentage = pointsWon / (pointsWon + pointsLoss) * 100;
    var tRow = $(`<tr key=${key}>`);

    tRow.append(`<td> ${key} </td>`);
    tRow.append(`<td id="${key}PointsWon"> ${pointsWon}</td>`);
    tRow.append(`<td id="${key}PointsLoss">${pointsLoss}</td>`);
    tRow.append(`<td id="${key}WinPercentage"> ${winPercentage.toFixed(2)}%</td>`);

    teamTable.append(tRow);
})

function displayProjectedStandings() {
    $.each(sortProjectedStandings(projectedStandings), function(key) {
        var pointsWon = projectedStandings[key].pointsWon;
        var pointsLoss = projectedStandings[key].pointsLoss;
        var winPercentage = pointsWon / (pointsWon + pointsLoss) * 100;
        var tRow = $(`<tr class='projectedRow' key=${key}>`);

        tRow.append(`<td> ${key} </td>`);
        tRow.append(`<td id="${key}PointsWon"> ${pointsWon}</td>`);
        tRow.append(`<td id="${key}PointsLoss">${pointsLoss}</td>`);
        tRow.append(`<td id="${key}WinPercentage"> ${winPercentage.toFixed(2)}%</td>`);

        projectedTeamTable.append(tRow);
    })
}


displayProjectedStandings()


let gbProjectedPoints = $("#gbProjectedPoints");
let cpeProjectedPoints = $("#cpeProjectedPoints");
let mt1ProjectedPoints = $("#mt1ProjectedPoints");
let lslProjectedPoints = $("#lslProjectedPoints");
let nsrcProjectedPoints = $("#nsrcProjectedPoints");
let lsfProjectedPoints = $("#lsfProjectedPoints");
let mtpProjectedPoints = $("#mtpProjectedPoints");
let mtbProjectedPoints = $("#mtbProjectedPoints");
let cpwProjectedPoints = $("#cpwProjectedPoints");
let mt2ProjectedPoints = $("#mt2ProjectedPoints");

function updateProjectedPoints(team1, team2, team1Key, team2Key) {
    team1.on('change', function() {
        team1Points = parseInt(team1.val());
        team2.val(18 - team1Points);
        team1CurrentPoints = CURRENT_STANDINGS[team1Key]['pointsWon'];
        team2CurrentPoints = CURRENT_STANDINGS[team2Key]['pointsWon'];
        team1CurrentPointsLost = CURRENT_STANDINGS[team1Key]['pointsLoss'];
        team2CurrentPointsLost = CURRENT_STANDINGS[team2Key]['pointsLoss'];
        projectedStandings[team1Key]['pointsWon'] = team1CurrentPoints + team1Points;
        projectedStandings[team2Key]['pointsWon'] = team2CurrentPoints + 18 - team1Points;
        projectedStandings[team1Key]['pointsLoss'] = team1CurrentPointsLost + 18 - team1Points;
        projectedStandings[team2Key]['pointsLoss'] = team2CurrentPointsLost + team1Points;
        $("#projected-team-table tr").remove();
        displayProjectedStandings();
    })
}

updateProjectedPoints(gbProjectedPoints, cpeProjectedPoints, 'GB', 'CPE');
updateProjectedPoints(cpeProjectedPoints, gbProjectedPoints, 'CPE', 'GB');

updateProjectedPoints(mt1ProjectedPoints, lslProjectedPoints, 'MT1', 'LSL');
updateProjectedPoints(lslProjectedPoints, mt1ProjectedPoints, 'LSL', 'MT1');

updateProjectedPoints(nsrcProjectedPoints, lsfProjectedPoints, 'NSRC', 'LSF');
updateProjectedPoints(lsfProjectedPoints, nsrcProjectedPoints, 'LSF', 'NSRC');

updateProjectedPoints(mtpProjectedPoints, mtbProjectedPoints, 'MTP', 'MTB');
updateProjectedPoints(mtbProjectedPoints, mtpProjectedPoints, 'MTB', 'MTP');

updateProjectedPoints(cpwProjectedPoints, mt2ProjectedPoints, 'CPW', 'MT2');
updateProjectedPoints(mt2ProjectedPoints, cpwProjectedPoints, 'MT2', 'CPW');

gbProjectedPoints.trigger('change');
mt1ProjectedPoints.trigger('change');
nsrcProjectedPoints.trigger('change');
mtpProjectedPoints.trigger('change');
mt2ProjectedPoints.trigger('change');