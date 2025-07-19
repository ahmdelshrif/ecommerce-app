
const express=require("express")
const dotenv=require("dotenv")
const morgan=require("morgan")
const ApiError=require("./utils/apiError")
const {globleEorrs}=require("./middelweres/Eroors")
const dbconnnection=require("./config/dbconnection")

dotenv.config({path:"Config.env"})

// Routes
const routerCatrgory=require("./router/CategoryRouter")
const routersubCatrgory=require("./router/subcategoryRouter")
const routerBrdns=require("./router/BrandRouter")
const routerproducts=require("./router/productsRouter")
const RouterUser=require("./router/UserRouter")
const Routerauth=require("./router/auth")
const Routerorder=require("./router/order")

// Connect with db
dbconnnection();

// express app
const app=express()

// Middlewares بدال ال body_parser
app.use(express.json())

if(process.env.NODE_ENV === "Devlopment"){
    app.use(morgan("dev"))
    console.log(`dev equle ${process.env.NODE_ENV}`)
}

// Mount Routes
app.use("/api/v1/category",routerCatrgory)
app.use("/api/v1/subcategory",routersubCatrgory)
app.use("/api/v1/Brands",routerBrdns)
app.use("/api/v1/prooducts",routerproducts)
app.use("/api/v1/User",RouterUser)

app.use("/api/v1/auth",Routerauth)
app.use("/api/v1/order",Routerorder)

//Erros routing 
app.all('/*splat',(req,res,next)=>{
       // const err=new Error(`Can not find route:${req.originalUrl}`)
       // next(err.message)
       const err=new ApiError( `Can not find route:${req.originalUrl}`,400)
       next(err)   
    })


//Globle error handling middlewere for express
app.use(globleEorrs)



const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  })

})