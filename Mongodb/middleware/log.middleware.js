/* import fs from "fs"

async function logfile(logfilename) {
    return (req, res, next) => {
        fs.appendFile(logfilename, `\n ${Date.now()}:${req.ip} ${req.path}\n`, (err) => {
            if (err) {
                console.log("err in logfile", err)
                res.json({ error: "error logging file" })
            }
            next()
        })
    }
}
export default logfile */
import fs from "fs";

const logfile = (logfilename) => {
    return (req, res, next) => {
        fs.appendFile(logfilename, `\n ${Date.now()}:${req.ip} ${req.path}\n`, (err) => {
            if (err) {
                console.log("err in logfile", err);
                res.json({ error: "error logging file" });
            } else {
                next();
            }
        });
    };
};

export default logfile;