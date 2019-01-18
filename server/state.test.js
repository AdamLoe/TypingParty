let state = require("./state");

let gameID = 123;
let gameJSON = {
  id: 123,
  info: {
    playerCount: 0,
    name: "BigWow",
    password: "memes"
  },
  banList: {}
};

state.addGame(gameJSON);
let game = state.getGame(123);

test("addGame => getGame returns right object", () => {
  let expected = {
    ...gameJSON,
    info: {
      ...gameJSON.info,
      password: "No Hax"
    }
  };
  expect(game).toStrictEqual(expected);
});

test("getGame doesn't give password", () => {
  expect(game.info.password).not.toBe("memes");
  expect(game.info.password).toBe("No Hax");
});

test("doesPasswordMatch", () => {
  expect(state.doesPasswordMatch(gameID, "memes")).toBeTruthy();
  expect(state.doesPasswordMatch(gameID, "umm")).toBeFalsy();
});

test("isGameNameTaken", () => {
  expect(state.isGameNameTaken("BigWow")).toBeTruthy();
  expect(state.isGameNameTaken("wowwee")).toBeFalsy();
});
test("gameExists", () => {
  expect(state.gameExists(gameID)).toBeTruthy();
  expect(state.gameExists(456)).toBeFalsy();
});
test("getGameIDs", () => {
  state.addGame({
    ...gameJSON,
    id: 234
  });
  let ids = state.getGameIDs().sort();
  let expected = ["123", "234"].sort();
  expect(ids).toEqual(expected);
  expect(ids).not.toEqual([123]);
});
test("removeGameByID", () => {
  state.removeGameByID(234);
  expect(state.getGame(234)).toBeNull();
});

test("getPlayer", () => {});
test("editPlayer", () => {});
test("resetPlayer", () => {});
test("getPlayerBySocket", () => {});
test("getPlayerIDBySocket", () => {});
test("banPlayer", () => {});

//Need to expand this to include multiple packets/overwriting each other
test("NewPacket / FlushPackets / Apply Packets", () => {
  state.test.packets[123].pendingPackets = [];

  let { majorVersion, minorVersion } = state.test.packets[gameID];
  let oldGame = JSON.stringify(state.getGame(gameID));
  let newPacket = {
    info: {
      memes: 123
    }
  };
  state.editGame(123, newPacket);
  let expectedPendingPackets = [newPacket];

  //Adding to pendingpackets right
  let pendingPackets = state.test.packets[123].pendingPackets;
  expect(pendingPackets).toEqual(expectedPendingPackets);

  //We are sending right packets to users
  let newPacketObj = state.flushPackets(123);
  let expPacketObj = {
    majorVersion: majorVersion + 1,
    minorVersion: 0,
    packet: newPacket
  };
  expect(newPacketObj).toEqual(expPacketObj);

  //Server is updating right
  let newGame = JSON.parse(oldGame);
  newGame.info.memes = 123;
  expect(state.getGame(gameID)).toEqual(newGame);
});

test("combinePackets", () => {
  let packet1 = {
    memes: true
  };
  let packet2 = {
    bigwow: {
      wow: false,
      teeth: 63
    }
  };
  let packet3 = {
    bigwow: {
      wow: true
    },
    memes: [123]
  };
  let packets = [packet1, packet2, packet3];
  let expected = {
    memes: [123],
    bigwow: {
      wow: true,
      teeth: 63
    }
  };
  state.test.packets[gameID].pendingPackets = packets;
  expect(state.combinePackets(gameID)).toEqual(expected);
  state.test.packets[gameID].pendingPackets = [];
});
test("combineObjects", () => {
  let oldObj = {
    memes: true,
    testObj: {
      wow: false,
      bigWow: true
    },
    anArray: [1, 2, 3]
  };
  let addedObj = {
    memes: null,
    testObj: {
      memesvtwo: {
        dingus: "asdfasdfa"
      }
    },
    anArray: [3, 4]
  };
  let expectedObj = {
    memes: null,
    testObj: {
      wow: false,
      bigWow: true,
      memesvtwo: {
        dingus: "asdfasdfa"
      }
    },
    anArray: [3, 4]
  };
  let combined = state.test.combineObjects(oldObj, addedObj);
  expect(combined).toEqual(expectedObj);
});

let player = {
  id: 7,
  name: "Adam",
  gameID: 123,
  icon: {
    type: "icon2",
    primary: "green",
    secondary: "blue"
  }
};

test("addPlayer", () => {
  let expected = JSON.parse(JSON.stringify(state.test.players));
  expected[player.id] = player;

  state.addPlayer(player);

  expect(state.test.players).toEqual(expected);
});

test("addPlayerToGame", () => {
  let expected = JSON.parse(JSON.stringify(state.getGame(gameID)));
  expected.info.playerCount += 1;
  expected.players = {
    ...expected.players,
    7: player
  };
  expected.gameData = {
    7: {
      place: false,
      finished: false,
      currChar: 0,
      score: 0,
      readyUp: false
    }
  };

  state.addPlayerToGame(123, player);
  state.flushPackets(123);
  expect(state.getGame(gameID)).toEqual(expected);
});

test("getGameIDByPlayerID", () => {
  expect(state.getGameIDByPlayerID(player.id)).toBe(gameID);
});

test("updatePlayerInGame", () => {});
