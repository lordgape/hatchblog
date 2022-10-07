const Request = require('request');
const { promisify } = require('util');

//Neat way to convert callback to promise object
const PostRemote = promisify(Request.post);
const GetRemote = promisify(Request.get);

module.exports = class HttpClient {
  static async getRemoteCall(url, requestHeaders, isJson = true) {
    try {
      let { statusCode, headers, body } = await GetRemote({
        url,
        headers: requestHeaders,
        json: isJson,
      });

      console.log(
        `G1 GET - URL ${url}- StatusCode ${statusCode} - Response ${JSON.stringify(
          body,
        )} - responseHeader - ${JSON.stringify(headers)}`,
      );

      if (statusCode >= 400) {
        throw { body, statusCode };
      }

      return body;
    } catch (error) {
      console.log(
        `G2 GET - URL ${url} - StatusCode ${error.statusCode || error.code} - Error ${JSON.stringify(error)} `,
      );
      throw error;
    }
  }

  static async postRemoteCall(url, requestHeaders, requestBody, isJson = true) {
    try {
      let { statusCode, headers, body } = await PostRemote({
        url,
        headers: requestHeaders,
        body: requestBody,
        json: isJson,
      });

      console.log(
        `P1 POST - URL ${url} - StatusCode ${statusCode} - Payload ${JSON.stringify(
          requestBody,
        )}- Response ${JSON.stringify(body)} - responseHeader - ${JSON.stringify(headers)}`,
      );

      if (statusCode >= 400) {
        throw { body, statusCode };
      }

      return body;
    } catch (error) {
      console.log(
        `P2 POST - URL ${url} - StatusCode ${error.statusCode || error.code} - Payload ${JSON.stringify(
          requestBody,
        )} - Error ${JSON.stringify(error)} `,
      );
      throw error;
    }
  }
};
