const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const VOD = async (req, res) => {
  return res.json({
    code: 200,
    result: {
      id: 175,
      title: "การเรียบเรียง",
      renderer: {
        elmtype: "lesson",
        controls: [{ type: "movecol", from: 0, to: 1 }],
        contents: [
          {
            type: "video",
            props: {
              type: "video/m3u8",
              videourl: "http://localhost:3000/VOD/alpha/playlist.m3u8"
            }
          },
          {
            type: "slide",
            props: {
              slidedata: [
                {
                  time: 0,
                  type: "image",
                  url: "https://picsum.photos/id/101/800/450"
                },
                {
                  time: 60,
                  type: "image",
                  url: "https://picsum.photos/id/1/800/450"
                },
                {
                  time: 120,
                  type: "image",
                  url: "https://picsum.photos/id/1006/800/450"
                }
              ]
            }
          }
        ]
      }
    }
  });
};

const index = async (req, res) => {
  return res.write(
    `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body style="width: 100vw; height: 100vw; background: antiquewhite;" >
            <video controls id="video"></video>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        
        <script>
          var video = document.getElementById('video');
          if(Hls.isSupported()) {
            console.log('Support HTL')
            var hls = new Hls();
            hls.loadSource('http://localhost:3000/VOD/alpha/playlist.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
              video.play();
          });
         }
        </script>
        </html>`
  );
};
const serveM3U8 = async (req, res) => {
  const filename = req.params.id;
  const file = path.join(__dirname, "..", "..", "public", "sample", filename);
  fs.exists(file, exists => {
    if (!exists) {
      console.log(exists);
      return res.status(404).json({
        code: 404,
        msg: "file not found"
      });
    }
  });
  fs.readFile(file, function(err, contents) {
    if (err) {
      res.status(500);
      res.end();
    } else if (contents) {
      const ae = req.headers["accept-encoding"];
      if (ae.match(/\bgzip\b/)) {
        zlib.gzip(contents, function(err, zip) {
          if (err) {
          } else {
            res.status(200).set("content-encoding", "gzip");
            res.end(zip);
          }
        });
      } else {
        res.status(500);
        res.end();
      }
    } else {
      res.status(500);
      res.end();
    }
  });
};

const serveKey = async (req, res) => {
  const filename = req.params.id;
  const file = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "sample",
    "key",
    filename
  );
  fs.exists(file, exists => {
    if (!exists) {
      console.log(exists);
      return res.status(404).json({
        code: 404,
        msg: "file not found"
      });
    }
  });
  fs.readFile(file, function(err, contents) {
    if (err) {
      res.status(500);
      res.end();
    } else if (contents) {
      const ae = req.headers["accept-encoding"];
      if (ae.match(/\bgzip\b/)) {
        zlib.gzip(contents, function(err, zip) {
          if (err) {
          } else {
            res.status(200).set("content-encoding", "gzip");
            res.end(zip);
          }
        });
      } else {
        res.status(500);
        res.end();
      }
    } else {
      res.status(500);
      res.end();
    }
  });
};
module.exports = {
  VOD,
  serveM3U8,
  serveKey,
  index
};
