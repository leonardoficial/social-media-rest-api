const express = require("express");
const router  = express.Router();

const query = function(b, id) {
  return(
    "INSERT INTO posts" + id + " "
  + "(title, theme, body, comments) "
  + "VALUES ('"+b.title+"', '"+b.theme+"', '"+b.body+"', '[]');"
  );
}

router.post("/", function(req, res) {
 
  const q = query({
    title: req.body.head.title,
    theme: req.body.head.theme,
    body:  req.body.body
  }, req.session.user.id);
  
  return res.json({query: query});
  
  req.getConnection(function(err, conn) {
    conn.query(q, function(err, results) {
      res.json({status: "OK"});
    });
  });
  
});

module.exports = router;


