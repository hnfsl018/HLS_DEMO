const route = require("express").Router();
const VODCtl = require("../controller/VOD");

route.get("/index", VODCtl.index)
route.get("/", VODCtl.VOD);
route.get("/alpha/:id", VODCtl.serveM3U8)
route.get("/key/:id", VODCtl.serveKey)
module.exports = route;
