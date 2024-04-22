import multer from 'multer';
const storage = multer.diskStorage({});
const memory = multer.memoryStorage();
const upload = multer({ storage: storage });

export const memoryStorage = multer({storage:memory})
export default upload