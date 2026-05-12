import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const unique =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(
            null,
            unique + path.extname(file.originalname)
        );
    },

});

//  File filter (security)
const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
    ];

    if (!allowed.includes(file.mimetype)) {
        return cb(
            new Error(
                "Invalid file type. Only images and PDF allowed."
            ),
            false
        );
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { files: 5,
        fileSize: 10 * 1024 * 1024 },//10MB PER FILE 5 MAX
});
