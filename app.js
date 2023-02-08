const express = require("express");
const fortune = require("./lib/fortune");
const app = express();

// Setting up handlebars view engine
const handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

// Custom Home page
app.get("/", function (request, response) {
  response.render("home");
});

// Custom About page
app.get("/about", function (req, res) {
  res.render("about", { fortune: fortune.getFortune() });
});

// Custom 404 page
app.use(function (request, response, next) {
  response.status(404);
  response.render("404");
});

// Custom 500 page
app.use(function (request, response, next) {
  console.error(error.stack);
  response.status(500);
  response.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost: " +
      app.get("port") +
      "; press CTRL-C terminate"
  );
});
