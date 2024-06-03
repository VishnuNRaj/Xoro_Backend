import multer from 'multer';
const storage = multer.diskStorage({});
const memory = multer.memoryStorage();
const upload = multer({ storage: storage,limits: {
    fieldSize: 25 * 1024 * 1024, 
    fileSize: 1000 * 1024 * 1024,
    files: 5 
  }, });

export const memoryStorage = multer({storage:memory})
export default upload