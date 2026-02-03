import path from "path";
import express from "express";
import multer from "multer";

const app = express();

const port = 5000;

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
    
})

const upload = multer({storage})

app.set("view engine","ejs");

app.set("views",path.resolve("./views"));

// app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/", (req,res)=>{
    return res.render("homepage")
})
app.post("/upload",upload.fields([{name:"profileimage",maxCount:1},{name:"coverimage",maxCount:1}]),(req,res)=>{
    console.log(req.body);
    console.log(req.files);
    return res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})