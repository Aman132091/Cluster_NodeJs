const cluster = require('cluster');
const os = require('os');
const express = require('express');
// const port = 3000

const numCPUs = os.cpus().length;
// console.log(numCPUs);

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.get('/',(req,res)=>{
    res.json(`Running at ${process.pid}`);
  })
  app.listen(3000, () => {

    console.log(`Worker process ${process.pid} is listening on port http://localhost:${3000}`);
  });


  // Configure Express app



}

// const express = require('express')
// const cluster = require('node:cluster')
// const numCPUs = require('node:os')//no. of cpus or processor avai;able inside our cpu
// const process = require('node:process')
// const app = express()


// if (cluster.isPrimary) {
//     console.log(`Primary ${process.pid} is running`);
  
//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }
// }

// // const TotalCpus = os.cpus.length
// app.get("/",(req,res)=>{
//     res.send(`Running at ${process.pid}`)
    
//     // return res.json({message:`Hello agai ${process.pid}`})
// })
// app.listen(4521,()=> console.log(`Server listened at http://localhost:4521`))