const Events = {
  ON_MODE_CHANGE: "onmodechange",
  ON_PLAYER_CHANGE: "onplayerchange"
};

var PubSub = {};
PubSub.eventsCollection = {};

PubSub.publish = (topic, data) => {
  var events = PubSub.eventsCollection[topic];
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
