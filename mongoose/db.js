const mongoose = require('mongoose');
require('dotenv').config();
URI=`${process.env.MONGO_URI}/mb-collection`;

const connectionParams = { 
   useNewUrlParser: true, 
   useUnifiedTopology: true
};

mongoose.connect(URI,connectionParams) 
 .then( () => { 
   console.log('\n');
   console.log('[*] Connected to mongodb database successfully…!');
   console.log('\n');
}) 
.catch( (err) => { 
  console.error('[*] Something went wrong ! Cause:');
  console.log(err);
});