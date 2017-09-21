const generateMesg = (from, text)=>{
    return {
        from,
        text,
        createdAt: new Date().toDateString()
    }
}

module.exports = {
    generateMesg
}