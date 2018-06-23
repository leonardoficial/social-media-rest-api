const express = require("express");
const router  = express.Router();

const query = function(data, id) {
  return "UPDATE users SET name='" + data + "' WHERE ID=" + id + ";";
}

// #
router.get("/data", function(req, res) {
  res.json({user: req.session.user});
});

// #
router.post("/name", function(req, res) {

  const q = query(req.body.data, req.session.user.ID);
  
  req.getConnection(function(err, conn) {
    conn.query(q, function(err, results) {
      if(err) console.log(err);
      
        req.session.user.name = req.body.data;
        res.json({data: req.body.data});
    });
  });
  
});

/*
router.post("/name", function(req, res) {
  const name = req.body.name;
  req.getConnection(function(err, conn) {
    conn.query(query, function(err, results) {
      res.json({user: req.user.name});
    });
  });
});
*/

module.exports = router;


