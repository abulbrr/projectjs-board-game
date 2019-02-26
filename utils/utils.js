var Utils = {};
Utils.uid = 0;

Utils.getUniqueId = function() {
  return this.uid++;
};
