/*
In the BELLOW example, the wrappedHandler function is used to wrap the myBusinessHandler function and provide additional logic or error handling before calling the myBusinessHandler function. The returned function is then exported as the lambdaHandler function, which can be used as the handler for an AWS Lambda function.
*/


/*
The bellow function, is will be called into aws lambda function
*/
const myBusinessHandler: any = (event: any, any: any): any => {
  // Perform some asynchronous operation
  console.log("-------> myBusinessHandler 3");
  return JSON.stringify("{'test':'test'}");
};

/*
Add your additional logic in the bellow function
*/
const wrappedHandler = (fctToBeExecuted: any): any => async (event: any, any: any): Promise<any> => {
  // Perform some additional logic or error handling before calling the myBusinessHandler function
  //event.splunkAttributes = preHandle(event, any);//==> Here we create object that will be sent to firehose
  let response;
  try {
    console.log("------->>>>>>wrappedHandler BEGIN 2");
    response = await fctToBeExecuted(event, any);
  } catch (err) {
    console.log("------->>>>>>ERROR");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }finally{
    console.log("------->>>>>>FINALLY 4");
    await new Promise(f => setTimeout(f, 1000));
  //await postHandle(event, any, any); //==> Here we call to firehose
  }
  return response;

};

const responseOfWrappedHandler = wrappedHandler(myBusinessHandler);

/*
the bellow function is the aws lambda fcuntion
*/
export const handler = async (event: any, any: any): Promise<any> => {
  console.log("------->>>>>>BEGIN mainHandler 1");
  const response = responseOfWrappedHandler(event, any);
  console.log("------->>>>>>END mainHandler>>>>>>>>>>>> 5");
  return  response;
};
