// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import * as path from 'path';

// const PROTO_PATH = path.join(__dirname, 'service.proto');

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true
// });

// interface ExampleRequest {
//   key: string;
// }

// interface ExampleResponse {
//   message: string;
//   data: string;
// }

// const serviceProto = grpc.loadPackageDefinition(packageDefinition) as any;

// const exampleMethod = (call: grpc.ServerUnaryCall<ExampleRequest, ExampleResponse>, callback: grpc.sendUnaryData<ExampleResponse>): void => {
//   const requestData = call.request;
//   console.log('Received request:', requestData);
//   const response: ExampleResponse = { message: 'Data received', data: requestData.key };
//   callback(null, response);
// };

// const server = new grpc.Server();
// server.addService(serviceProto.ExampleService.service, { ExampleMethod: exampleMethod });

// const port = '0.0.0.0:6700';
// server.bindAsync(port, grpc.ServerCredentials.createInsecure(), (err, port) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(`gRPC server running on ${port}`);
//   server.start();
// });
