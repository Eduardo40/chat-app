const moment = require("moment");
const generateMesg = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().format("DD.MM.YYYY, kk:mm")
    }
}

module.exports = {
    generateMesg
}