import multer from "multer";

export function uploadErrorHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                error: "File too large. Max size is 10MB.",
            });
        }

        if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                error: "Too many files uploaded.",
            });
        }

        return res.status(400).json({
            error: err.message,
        });
    }

    next(err);
}
