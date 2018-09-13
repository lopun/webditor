const { c, cpp, node, python, java } = require("compile-run");

module.exports = app => {
  app.post("/api/compile/script", (req, res, next) => {
    const compileOption = req.body.option;
    const script = req.body.script;
    console.log(req.body);

    let resultPromise = null;

    switch (compileOption) {
      case "c":
        resultPromise = c.runSource(script);
        break;
      case "cpp":
        resultPromise = cpp.runSource(script);
        break;
      case "js":
        resultPromise = node.runSource(script);
        break;
      case "python":
        resultPromise = python.runSource(script);
        break;
      case "java":
        resultPromise = java.runSource(script);
        break;
      default:
        next(err);
        break;
    }

    resultPromise
      .then(result => {
        res.status(200).send({
          result: result
        });
      })
      .catch(err => next(err));
  });
};
