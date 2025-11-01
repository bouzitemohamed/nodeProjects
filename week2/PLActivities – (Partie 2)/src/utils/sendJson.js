function sendJson(res, codeStatus, data) {
    if (codeStatus < 300) {
        res.status(codeStatus).json({
            status: 'success',
            data: data
        });
    } else {
        res.status(codeStatus).json({
            status: 'error',
            message: data
        });
    }
}

module.exports = sendJson;
