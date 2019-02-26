const Events = {
  ON_MODE_CHANGE: "onmodechange",
  ON_PLAYER_CHANGE: "onplayerchange",
  ON_HEROES_COUNT_CHANGE: "onHeroesCountChange",
  ON_HERO_ADDED_TO_BOARD: "onheroaddedtoboard"
};

var PubSub = {};
PubSub.eventsCollection = {};

PubSub.publish = (topic, data) => {
  var events = PubSub.eventsCollection[topic];
  if (events == undefined) return;
  for (let index = 0; index < events.length; index++) {
    const element = events[index];
    element(data);
  }
};

PubSub.subscribe = (topic, actCallback) => {
  var event = PubSub.eventsCollection[topic];
  if (PubSub.eventsCollection[topic] == undefined)
    PubSub.eventsCollection[topic] = [];

  PubSub.eventsCollection[topic].push(actCallback);
};
