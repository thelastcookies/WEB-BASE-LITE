/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentType
 *
 * 类型 application/x-www-form-urlencoded
 * ```
 *   POST /test HTTP/1.1
 *   Host: foo.example
 *   Content-Type: application/x-www-form-urlencoded
 *   Content-Length: 27
 *
 *   field1=value1&field2=value2
 * ```
 *
 * 类型 multipart/form-data
 * ```
 *   POST /test HTTP/1.1
 *   Host: foo.example
 *   Content-Type: multipart/form-data;boundary="boundary"
 *
 *   --boundary
 *   Content-Disposition: form-data; name="field1"
 *
 *   value1
 *   --boundary
 *   Content-Disposition: form-data; name="field2"; filename="example.txt"
 *
 *   value2
 *   --boundary--
 * ```
 *
 * 类型 application/json
 * ```
 *   POST /test HTTP/1.1
 *   Host: foo.example
 *   Content-Type: application/json
 *
 *   Payload:
 *   {"key1":"value1","key2":"value2","key3":"value3"}
 * ```
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
