import multer from "multer"

let storage;
try {
   storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/temp')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
      }
    })
} catch (error) {
  console.log({multer:error.message})
}
  
  export const upload = multer({ storage: storage })
  