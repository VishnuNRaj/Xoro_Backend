// import {LoadOptions} from ''
// declare module '@grpc/proto-loader' {
//     interface PackageDefinition {
//       [package: string]: any;
//     }
  
//     function loadSync(filename: string, options: LoadOptions): PackageDefinition;
//   }
  
//   declare module '@grpc/grpc-js' {
//     interface Server {
//       addService(service: any, implementation: any): void;
//       bindAsync(address: string, creds: ServerCredentials, callback: (error: Error | null, port: number) => void): void;
//       start(): void;
//     }
  
//     interface ServerCredentials {
//       createInsecure(): ServerCredentials;
//     }
  
//     interface ServerUnaryCall<RequestType, ResponseType> {
//       request: RequestType;
//     }
  
//     interface sendUnaryData<ResponseType> {
//       (error: Error | null, value?: ResponseType): void;
//     }
//   }
  